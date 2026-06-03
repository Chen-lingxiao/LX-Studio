#!/usr/bin/env python3
"""
fix_md_bold.py - 修复 Markdown 加粗语法在 markdown-it (CommonMark) 下的渲染问题

问题根因:
  markdown-it 遵循 CommonMark 规范，对 ** 有严格的"边界判定"规则。
  以下写法会导致 ** 无法被识别为加粗标记，原样输出星号：
    1. ** 后紧跟空格：  ** 文字**
    2. ** 前紧跟空格：  ** 文字 **
    3. 闭合 ** 前是全角标点（如 ）】），后接普通字符：**（内容）**文字
    4. 开合 ** 后是标点（如 { (），前接普通字符：文字**{内容}**
    5. 路径类内容：**/my/**

用法:
    python fix_md_bold.py <目录路径>              # 预览模式，只显示问题和修复建议
    python fix_md_bold.py <目录路径> --apply      # 执行实际修改
    python fix_md_bold.py <目录路径> --verbose    # 显示每个文件的详细检查过程
"""

import os
import re
import sys
import io
import unicodedata
from pathlib import Path

# Windows 终端编码兼容
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')


# ============================================================
#  Unicode 字符分类工具
# ============================================================

def is_punctuation(ch: str) -> bool:
    """判断是否为 Unicode 标点符号（类别 P 开头）"""
    if not ch:
        return False
    return unicodedata.category(ch).startswith('P')


def is_whitespace(ch: str) -> bool:
    """判断是否为 Unicode 空白字符（类别 Z 开头，或制表/换行）"""
    if not ch:
        return False
    return unicodedata.category(ch).startswith('Z') or ch in '\t\n\r'


# ============================================================
#  CommonMark 边界判定规则
# ============================================================

def check_open_delimiter(text: str, pos: int) -> bool:
    """
    检查 text[pos:pos+2] 即开标记 ** 是否满足"左边界"条件。
    规则:
      1. 后面不能是空白
      2. 后面不是标点 → 满足
      3. 后面是标点 → 前面必须是空白或标点
    """
    before = text[pos - 1] if pos > 0 else '\n'
    after = text[pos + 2] if pos + 2 < len(text) else '\n'

    if is_whitespace(after):
        return False
    if not is_punctuation(after):
        return True
    return is_whitespace(before) or is_punctuation(before)


def check_close_delimiter(text: str, pos: int) -> bool:
    """
    检查 text[pos:pos+2] 即闭标记 ** 是否满足"右边界"条件。
    规则:
      1. 前面不能是空白
      2. 前面不是标点 → 满足
      3. 前面是标点 → 后面必须是空白或标点
    """
    before = text[pos - 1] if pos > 0 else '\n'
    after = text[pos + 2] if pos + 2 < len(text) else '\n'

    if is_whitespace(before):
        return False
    if not is_punctuation(before):
        return True
    return is_whitespace(after) or is_punctuation(after)


# ============================================================
#  代码区域检测（跳过代码块和行内代码）
# ============================================================

def is_in_code_span(line: str, pos: int) -> bool:
    """判断 pos 位置是否在行内代码 `...` 中"""
    count = 0
    i = 0
    while i < len(line) and i < pos:
        if line[i] == '`':
            count += 1
        i += 1
    return count % 2 == 1


# ============================================================
#  核心修复逻辑
# ============================================================

BOLD_PATTERN = re.compile(r'\*\*(.+?)\*\*')


def diagnose_issue(line: str, start: int, end: int, content: str) -> list:
    """诊断一个 **...** 匹配的具体问题，返回问题描述列表"""
    issues = []
    before_open = line[start - 1] if start > 0 else ''
    after_close = line[end] if end < len(line) else ''

    open_ok = check_open_delimiter(line, start)
    close_ok = check_close_delimiter(line, end - 2)

    if open_ok and close_ok:
        return []

    # 诊断具体原因
    if content.startswith(' '):
        issues.append("开头**后有空格")
    if content.endswith(' '):
        issues.append("结尾**前有空格")

    if not open_ok and not content.startswith(' '):
        after_char = content[0] if content else ''
        before_char = before_open
        if is_punctuation(after_char) and not is_whitespace(before_char) and not is_punctuation(before_char):
            issues.append(f"开头**后是标点'{after_char}'且前面是普通字符")

    if not close_ok and not content.endswith(' '):
        before_char = content[-1] if content else ''
        after_char = after_close
        if is_punctuation(before_char) and not is_whitespace(after_char) and not is_punctuation(after_char):
            issues.append(f"结尾**前是标点'{before_char}'且后面是普通字符")

    if not issues:
        # 兜底描述
        if not open_ok:
            issues.append("开标记不满足左边界条件")
        if not close_ok:
            issues.append("闭标记不满足右边界条件")

    return issues


def fix_bold_in_line(line: str) -> tuple:
    """
    修复一行中的所有不合规加粗语法。
    返回 (修复后的行, [(原始文本, 修复后文本, 问题列表), ...])
    """
    fixes = []
    result_parts = []
    last_end = 0

    for m in BOLD_PATTERN.finditer(line):
        original = m.group(0)
        content = m.group(1)
        start = m.start()
        end = m.end()

        # 跳过行内代码中的匹配
        if is_in_code_span(line, start):
            continue

        before_open = line[start - 1] if start > 0 else ''
        after_close = line[end] if end < len(line) else ''

        open_ok = check_open_delimiter(line, start)
        close_ok = check_close_delimiter(line, end - 2)

        if open_ok and close_ok:
            continue

        # 记录问题
        issues = diagnose_issue(line, start, end, content)

        # --- 修复策略 ---

        # 策略1: 去除内容首尾空格
        fixed_content = content.strip()

        if fixed_content:
            # 检查去空格后是否解决问题
            # 构造临时文本来检查边界
            temp_line = line[:start] + '**' + fixed_content + '**' + line[end:]
            temp_end = start + 2 + len(fixed_content)
            new_open_ok = check_open_delimiter(temp_line, start)
            new_close_ok = check_close_delimiter(temp_line, temp_end)

            if new_open_ok and new_close_ok:
                new_bold = f'**{fixed_content}**'
                result_parts.append(line[last_end:start])
                result_parts.append(new_bold)
                last_end = end
                fixes.append((original, new_bold, issues))
                continue

        # 策略2: 去空格后仍有问题，尝试在边界添加空格
        if fixed_content:
            extra_before = ''
            extra_after = ''

            # 检查去空格后的开标记
            temp2 = (before_open if before_open else ' ') + '**' + fixed_content
            if not check_open_delimiter(temp2, 1 if before_open else 0):
                extra_before = ' '

            # 检查去空格后的闭标记
            temp3 = fixed_content + '**' + (after_close if after_close else ' ')
            close_pos = len(fixed_content) + 2
            if not check_close_delimiter(temp3, len(fixed_content)):
                extra_after = ' '

            if extra_before or extra_after:
                new_bold = f'{extra_before}**{fixed_content}**{extra_after}'
                result_parts.append(line[last_end:start])
                result_parts.append(new_bold)
                last_end = end
                fixes.append((original, new_bold, issues))
                continue

        # 策略3: 无法自动修复，保持原样并记录
        fixes.append((original, original, issues + ['[!] 无法自动修复，建议手动改为 <strong>...</strong>']))

    if not fixes:
        return line, []

    result_parts.append(line[last_end:])
    return ''.join(result_parts), fixes


# ============================================================
#  文件处理
# ============================================================

def is_in_code_block(lines: list, line_index: int) -> bool:
    """判断第 line_index 行是否在代码块 ``` 中"""
    count = 0
    for i in range(line_index):
        if lines[i].strip().startswith('```'):
            count += 1
    return count % 2 == 1


def process_file(file_path: str, apply: bool = False, verbose: bool = False) -> dict:
    """
    处理一个 Markdown 文件。
    返回统计信息 {total_lines, issues_found, fixes_applied, details}
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    original_lines = [line.rstrip('\n') for line in lines]
    new_lines = []
    all_fixes = []
    in_code_block = False

    for i, line in enumerate(original_lines):
        stripped = line.strip()

        # 跟踪代码块状态
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            new_lines.append(line)
            continue

        if in_code_block:
            new_lines.append(line)
            continue

        # 处理非代码块行
        fixed_line, fixes = fix_bold_in_line(line)
        new_lines.append(fixed_line)

        for orig, fixed, issues in fixes:
            all_fixes.append({
                'line_num': i + 1,
                'original': orig,
                'fixed': fixed,
                'issues': issues,
            })

    # 输出结果
    stats = {
        'file': file_path,
        'total_lines': len(original_lines),
        'issues_found': len(all_fixes),
        'fixes_applied': 0,
        'details': all_fixes,
    }

    if all_fixes:
        # 统计可修复数量
        stats['fixes_applied'] = sum(1 for f in all_fixes if f['original'] != f['fixed'])

        if verbose or not apply:
            # 预览模式：显示问题
            rel_path = os.path.relpath(file_path)
            print(f"\n{'='*60}")
            print(f"FILE: {rel_path}")
            print(f"{'='*60}")
            for fix in all_fixes:
                status = "[可修复]" if fix['original'] != fix['fixed'] else "[需手动]"
                print(f"  第 {fix['line_num']} 行 [{status}]")
                print(f"    原始: {fix['original']}")
                if fix['original'] != fix['fixed']:
                    print(f"    修复: {fix['fixed']}")
                print(f"    原因: {'; '.join(fix['issues'])}")

        if apply:
            # 写回文件
            with open(file_path, 'w', encoding='utf-8') as f:
                for line in new_lines:
                    f.write(line + '\n')

    return stats


def scan_directory(dir_path: str, apply: bool = False, verbose: bool = False):
    """扫描目录下所有 .md 文件"""
    md_files = []
    for root, dirs, files in os.walk(dir_path):
        # 跳过 node_modules、.git 等目录
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', '.trae', 'dist')]
        for f in files:
            if f.endswith('.md'):
                md_files.append(os.path.join(root, f))

    if not md_files:
        print(f"未在 {dir_path} 中找到 .md 文件")
        return

    print(f"[SCAN] 目录: {dir_path}")
    print(f"[SCAN] 找到 {len(md_files)} 个 .md 文件")

    total_issues = 0
    total_fixed = 0
    total_manual = 0
    files_with_issues = 0

    for fp in sorted(md_files):
        stats = process_file(fp, apply=apply, verbose=verbose)
        if stats['issues_found'] > 0:
            files_with_issues += 1
            total_issues += stats['issues_found']
            total_fixed += stats['fixes_applied']
            total_manual += stats['issues_found'] - stats['fixes_applied']

    print(f"\n{'='*60}")
    print(f"[STATS] 扫描统计")
    print(f"{'='*60}")
    print(f"  扫描文件数:   {len(md_files)}")
    print(f"  存在问题的文件: {files_with_issues}")
    print(f"  问题总数:     {total_issues}")
    print(f"  可自动修复:   {total_fixed}")
    print(f"  需手动修复:   {total_manual}")

    if apply and total_fixed > 0:
        print(f"\n[OK] 已自动修复 {total_fixed} 处问题")
        if total_manual > 0:
            print(f"[WARN] 仍有 {total_manual} 处需要手动修复（建议改用 <strong>...</strong> 标签）")
    elif not apply and total_issues > 0:
        print(f"\n[TIP] 以上为预览，添加 --apply 参数执行实际修改")
        print(f"   python fix_md_bold.py \"{dir_path}\" --apply")


# ============================================================
#  主入口
# ============================================================

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    dir_path = sys.argv[1]
    apply = '--apply' in sys.argv
    verbose = '--verbose' in sys.argv

    if not os.path.isdir(dir_path):
        print(f"错误: {dir_path} 不是有效目录")
        sys.exit(1)

    if apply:
        print("[WARN] 执行模式：将直接修改文件！")
        confirm = input("确认继续？(y/N): ").strip().lower()
        if confirm != 'y':
            print("已取消")
            sys.exit(0)

    scan_directory(dir_path, apply=apply, verbose=verbose)


if __name__ == '__main__':
    main()
