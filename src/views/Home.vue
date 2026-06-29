<template>
  <div ref="homeRootRef" class="home" :class="{ 'ambient--active': ambientActive }">
    <!-- ===== Ambient Glitch Overlay Layer ===== -->
    <div ref="ambientOverlayRef" class="ambient-overlay" :class="{ 'ambient-overlay--on': ambientActive }">
      <!-- CRT 扫描线 -->
      <div class="crt-scanlines"></div>
      <!-- 暗角 -->
      <div class="vignette"></div>
      <!-- RGB 色差分裂 + 闪烁 -->
      <div ref="chromaticLayerRef" class="chromatic-layer"></div>
      <!-- 入侵终端窗口 -->
      <div ref="terminalRef" class="intrusion-terminal" :class="{ 'terminal--on': ambientActive }">
        <div class="terminal-titlebar">
          <span class="terminal-dot dot-red"></span>
          <span class="terminal-dot dot-yellow"></span>
          <span class="terminal-dot dot-green"></span>
          <span class="terminal-title">SESSION_0x4F — ROOT</span>
        </div>
        <div ref="terminalBodyRef" class="terminal-body">
          <div class="terminal-line prompt">C:\Users\ROOT&gt; _</div>
        </div>
      </div>
    </div>
    <!-- 主故障 Canvas -->
    <canvas ref="glitchCanvasRef" class="glitch-canvas"></canvas>

    <!-- ==================== Header ==================== -->
    <header class="header">
      <div class="header-logo">揽星河 · 研习站</div>
      <nav class="header-nav">
        <a class="nav-link">首页</a>
        <a class="nav-link active">文章</a>
        <a class="nav-link active">项目</a>
        <a class="nav-link">知识库</a>
        <div class="nav-separator"></div>
        <div class="header-icons">
          <span class="icon-active">✉</span>
          <span class="icon-dim">⬡</span>
          <span class="icon-dim">☾</span>
          <span class="icon-dim">⚙</span>
        </div>
      </nav>
    </header>

    <!-- ==================== Hero ==================== -->
    <section class="hero">
      <div class="hero-status">&gt; SYSTEM_BOOT_OK ...</div>
      <h1 ref="heroTitleRef" class="hero-title">&gt; HELLO_WORLD</h1>
      <p class="hero-subtitle">天地一指也 · 万物一马也</p>
      <div class="hero-cursor"></div>
      <div class="hero-bottom">
        <div class="music-widget">
          <span class="music-widget-icon">♪</span>
          <div class="music-visualizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Projects ==================== -->
    <section class="projects" id="projects">
      <div class="section-label">&gt; /archives</div>
      <div class="project-grid">
        <div class="project-row">
          <div class="project-card glow-cyan">
            <div class="card-title cyan">OrbitStarraft</div>
            <div class="card-desc">Earth spacecraft data 3D visualization platform with real-time orbit tracking.</div>
            <div class="card-tags">
              <span class="tag pink">VUE3</span>
              <span class="tag pink">CESIUM</span>
              <span class="tag pink">TS</span>
            </div>
          </div>
          <div class="project-card glow-cyan">
            <div class="card-title cyan">Cultivation Realm</div>
            <div class="card-desc">UE5 open world immortal cultivation game with spherical planet exploration.</div>
            <div class="card-tags">
              <span class="tag pink">UE5</span>
              <span class="tag pink">PCG</span>
              <span class="tag pink">C++</span>
            </div>
          </div>
          <div class="project-card glow-cyan">
            <div class="card-title cyan">Tech Notes CLI</div>
            <div class="card-desc">Auto convert HTML frontend notes to clean Markdown with Python batch scripts.</div>
            <div class="card-tags">
              <span class="tag pink">PYTHON</span>
              <span class="tag pink">MARKDOWN</span>
              <span class="tag pink">CLI</span>
            </div>
          </div>
        </div>
        <div class="project-row">
          <div class="project-card glow-pink">
            <div class="card-title pink">WebGIS Toolkit</div>
            <div class="card-desc">Reusable Vue3 + Cesium component library for enterprise GIS applications.</div>
            <div class="card-tags">
              <span class="tag cyan">VUE3</span>
              <span class="tag cyan">GIS</span>
              <span class="tag cyan">3D</span>
            </div>
          </div>
          <div class="project-card glow-cyan">
            <div class="card-title cyan">Procedural World</div>
            <div class="card-desc">Experimental UE5 procedural generation for spherical planet terrain and biomes.</div>
            <div class="card-tags">
              <span class="tag pink">UE5</span>
              <span class="tag pink">PROC-GEN</span>
              <span class="tag pink">HERE</span>
            </div>
          </div>
          <div class="project-card glow-pink">
            <div class="card-title pink">AI Dev Pipeline</div>
            <div class="card-desc">WorkBuddy-powered multi-agent development workflow for solo game creation.</div>
            <div class="card-tags">
              <span class="tag cyan">AI</span>
              <span class="tag cyan">AGENT</span>
              <span class="tag cyan">DEV-OPS</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <span class="page cyan">«</span>
        <span class="page pink">1</span>
        <span class="page dim">2</span>
        <span class="page dim">3</span>
        <span class="page faint">…</span>
        <span class="page dim">8</span>
        <span class="page cyan">»</span>
      </div>
    </section>

    <!-- ==================== Articles ==================== -->
    <section class="articles" id="articles">
      <div class="section-label">&gt; /articles</div>
      <div class="tag-filter">
        <span class="tag-item active">全部 11</span>
        <span class="tag-item inactive">技术 8</span>
        <span class="tag-item inactive">闲聊 3</span>
      </div>
      <div class="article-grid">
        <div class="article-row">
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【前端】Vue3 + Cesium 三维地图实战</div>
            <div class="article-desc">从零搭建 WebGIS 可视化平台，涵盖相机控制与空间分析</div>
            <div class="article-meta">
              <span>2026-06-25</span>
              <span>8 分钟</span>
            </div>
          </div>
          <div class="article-card glow-pink">
            <div class="article-title pink">【UE5】程序化生成地形入门指南</div>
            <div class="article-desc">PCG 框架基础及球形星球地表生成技术预研</div>
            <div class="article-meta">
              <span>2026-06-22</span>
              <span>15 分钟</span>
            </div>
          </div>
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【Python】HTML 批量转 Markdown 脚本</div>
            <div class="article-desc">用 BeautifulSoup 清洗技术笔记，解放双手</div>
            <div class="article-meta">
              <span>2026-06-18</span>
              <span>5 分钟</span>
            </div>
          </div>
        </div>
        <div class="article-row">
          <div class="article-card glow-pink">
            <div class="article-title pink">【游戏设计】修仙开放世界顶层设计</div>
            <div class="article-desc">球形地图、境界系统、NPC 行为树的完整规划</div>
            <div class="article-meta">
              <span>2026-06-15</span>
              <span>20 分钟</span>
            </div>
          </div>
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【面试】WebGIS 前端面试核心题库</div>
            <div class="article-desc">涵盖 2D/3D GIS、Vue、TypeScript 高频考点</div>
            <div class="article-meta">
              <span>2026-06-10</span>
              <span>12 分钟</span>
            </div>
          </div>
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【工具】独立开发者的 AI 工作流搭建</div>
            <div class="article-desc">多 Agent 协作 + 自动化流水线提升 solo 开发效率</div>
            <div class="article-meta">
              <span>2026-06-05</span>
              <span>10 分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <span class="page cyan">«</span>
        <span class="page pink">1</span>
        <span class="page dim">2</span>
        <span class="page cyan">»</span>
      </div>
    </section>

    <!-- ==================== Music & Today ==================== -->
    <section class="music-today" id="now-playing">
      <div class="section-label">&gt; /now-playing</div>
      <div class="mt-quote">"Live long and prosper"</div>
      <div class="mt-columns">
        <!-- Music Player -->
        <div class="music-card">
          <div class="music-top">
            <div class="album-art"></div>
            <div class="track-info">
              <div class="track-title">Water</div>
              <div class="track-artist">Kontraa · Afro Pop</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-filled"></div>
          </div>
          <div class="time-row">
            <span>1:23</span>
            <span>3:45</span>
          </div>
          <div class="controls">
            <span class="ctrl-dim">↔</span>
            <span class="ctrl-bright">⏮</span>
            <span class="ctrl-play">▶</span>
            <span class="ctrl-bright">⏭</span>
            <span class="ctrl-dim">↻</span>
          </div>
          <div class="playlist-label">// PLAYLIST</div>
          <div class="playlist-separator"></div>
          <div class="playlist">
            <div class="track current">01    No Copyright              3:24</div>
            <div class="track normal">02    Romantic                  4:12</div>
            <div class="track normal">03    Better Day                3:56</div>
            <div class="track normal">04    Once In Paris             4:33</div>
            <div class="track normal">05    Waterfall                 5:01</div>
          </div>
        </div>
        <!-- Today Card -->
        <div class="today-card">
          <div class="today-label">// TODAY</div>
          <div class="today-date">2026 / 06 / 27</div>
          <div class="today-day">星期六 · SATURDAY</div>
          <div class="today-separator"></div>
          <div class="history-label">// HISTORY_ON_THIS_DAY</div>
          <div class="history-list">
            <div class="event">1969  ·  阿波罗11号登月成功</div>
            <div class="event">1977  ·  旅行者1号发射升空</div>
            <div class="event">1998  ·  国际空间站启建</div>
            <div class="event">2021  ·  韦伯望远镜发射</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Footer ==================== -->
    <footer class="footer">
      <div class="footer-left">
        <div class="footer-tag">[揽星河] SYS:v3.7.1</div>
        <div class="footer-copyright">© 2026 揽星河 · 研习站</div>
      </div>
      <div class="footer-right">
        <div class="footer-icp">陇ICP备2026123456号 甘公网安备62072202000212号</div>
        <div class="footer-sync">LAST_SYNC: 2026-06-26 22:53:00 UTC+8</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { PowerGlitch } from 'powerglitch'

// ==================== Template Refs ====================
const homeRootRef = ref(null)
const ambientOverlayRef = ref(null)
const glitchCanvasRef = ref(null)
const terminalRef = ref(null)
const terminalBodyRef = ref(null)
const chromaticLayerRef = ref(null)
const heroTitleRef = ref(null)

// ==================== Reactive State ====================
const ambientActive = ref(false)

// ==================== Internal State ====================
let glitchCtx = null
let heroGlitch = null

// Timer IDs — all managed for clean teardown
let fragmentTimer = null
let textGlitchTimer = null
let terminalTimer = null
let typewriterTimer = null
let flashTimer = null
let shakeTimer = null
let chromaticTimer = null
let tearTimer = null
let noiseTimer = null

// ==================== Canvas Resize ====================
function resizeCanvas() {
  const canvas = glitchCanvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

// ==================== Canvas Effects ====================

// 1) Glitch Blocks — RGB split horizontal slices (subtle)
function spawnGlitchBlocks(count) {
  const canvas = glitchCanvasRef.value
  if (!canvas || !glitchCtx) return
  const w = canvas.width
  const h = canvas.height
  for (let i = 0; i < count; i++) {
    const y = Math.random() * h
    const bw = 30 + Math.random() * (w * 0.2)
    const bh = 2 + Math.random() * 10
    const x = Math.random() * (w - bw)
    const rOff = (Math.random() - 0.5) * 40
    const bOff = (Math.random() - 0.5) * 35
    // Red channel offset
    glitchCtx.fillStyle = 'rgba(255,46,147,0.3)'
    glitchCtx.fillRect(x + rOff, y, bw, bh)
    // Blue channel offset
    glitchCtx.fillStyle = 'rgba(0,200,255,0.3)'
    glitchCtx.fillRect(x + bOff, y, bw, bh)
    // Thin white line atop
    glitchCtx.fillStyle = 'rgba(255,255,255,0.18)'
    glitchCtx.fillRect(x, y, bw, 1)
  }
}

// 2) Screen Tearing — narrow band, lighter
function spawnScreenTear() {
  const canvas = glitchCanvasRef.value
  if (!canvas || !glitchCtx) return
  const w = canvas.width
  const h = canvas.height
  const y = Math.random() * h * 0.8
  const th = 8 + Math.random() * 30
  const offset = (Math.random() - 0.5) * w * 0.35
  glitchCtx.fillStyle = 'rgba(255,46,147,0.15)'
  glitchCtx.fillRect(offset, y, w, th)
  glitchCtx.fillStyle = 'rgba(0,240,255,0.12)'
  glitchCtx.fillRect(offset + 1, y + 1, w, th - 2)
  glitchCtx.strokeStyle = 'rgba(255,255,255,0.25)'
  glitchCtx.lineWidth = 1
  glitchCtx.beginPath()
  glitchCtx.moveTo(0, y)
  glitchCtx.lineTo(w, y)
  glitchCtx.moveTo(0, y + th)
  glitchCtx.lineTo(w, y + th)
  glitchCtx.stroke()
}

// 3) Static Noise — draw random dots directly (perf: no ImageData buffer)
function spawnNoise(count) {
  const canvas = glitchCanvasRef.value
  if (!canvas || !glitchCtx) return
  const w = canvas.width
  const h = canvas.height
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const brightness = Math.floor(Math.random() * 255)
    glitchCtx.fillStyle = `rgba(${brightness},${brightness},${brightness},${Math.random() * 0.18})`
    glitchCtx.fillRect(x, y, 1 + Math.random() * 2, 1)
  }
  setTimeout(() => {
    if (ambientActive.value && glitchCanvasRef.value) {
      glitchCtx.clearRect(0, 0, w, h)
    }
  }, 60)
}

// 4) Full Screen Flash
function triggerScreenFlash(color, alpha) {
  const canvas = glitchCanvasRef.value
  if (!canvas || !glitchCtx) return
  glitchCtx.fillStyle = `rgba(${color},${alpha})`
  glitchCtx.fillRect(0, 0, canvas.width, canvas.height)
}

// ==================== CSS-based Effects ====================

// 5) Body Shake
function triggerBodyShake(intensity) {
  const root = homeRootRef.value
  if (!root) return
  const dx = (Math.random() - 0.5) * intensity
  const dy = (Math.random() - 0.5) * intensity
  root.style.transform = `translate(${dx}px, ${dy}px)`
  setTimeout(() => {
    if (root) root.style.transform = ''
  }, 80 + Math.random() * 60)
}

// 6) Chromatic Aberration Flash
function triggerChromaticFlash() {
  const layer = chromaticLayerRef.value
  if (!layer) return
  layer.classList.add('chromatic--on')
  setTimeout(() => layer.classList.remove('chromatic--on'), 80 + Math.random() * 100)
}

// 7) Intrusion Terminal — typewriter + auto-scroll
const TERMINAL_SESSIONS = [
  // Session 1: 系统突破 — SSH 入侵
  [
    { type: 'cmd', text: 'ssh root@10.7.3.9 -p 22' },
    { type: 'out', text: 'Connecting to 10.7.3.9:22...' },
    { type: 'out', text: 'SSH-2.0-OpenSSH_8.9p1 Ubuntu-3' },
    { type: 'out', text: 'auth [PUBLICKEY] ... ACCEPTED' },
    { type: 'cmd', text: 'whoami && id' },
    { type: 'out', text: 'root / uid=0(root) gid=0(root)' },
    { type: 'cmd', text: 'uname -a' },
    { type: 'out', text: 'Linux SRV-揽星河 6.8.0 #1 SMP x86_64' },
    { type: 'cmd', text: 'hostname -I' },
    { type: 'out', text: '10.7.3.9 172.17.0.1' },
  ],
  // Session 2: 权限扫描 & 数据定位
  [
    { type: 'cmd', text: 'find / -perm -4000 -type f 2>/dev/null | head -4' },
    { type: 'out', text: '/usr/bin/sudo' },
    { type: 'out', text: '/usr/bin/su' },
    { type: 'out', text: '/usr/bin/passwd' },
    { type: 'out', text: '/usr/lib/dbus-1.0/dbus-daemon-launch-helper' },
    { type: 'cmd', text: 'cat /etc/shadow | head -2' },
    { type: 'out', text: 'root:$6$h4ck...:19000:0:99999:7:::' },
    { type: 'out', text: 'admin:$6$p4ss...:19000:0:99999:7:::' },
    { type: 'cmd', text: 'ls -lh /var/lib/mysql/db_core/' },
    { type: 'out', text: '-rw------- ibdata1       12K  Jun 29' },
    { type: 'out', text: '-rw------- users.ibd     48M  Jun 29' },
    { type: 'out', text: '-rw------- sessions.ibd  22M  Jun 29' },
  ],
  // Session 3: 数据窃取
  [
    { type: 'cmd', text: 'mysqldump -u root db_core users > /tmp/.dmp' },
    { type: 'out', text: 'Dumping users... 48MB written.' },
    { type: 'cmd', text: 'scp /tmp/.dmp ghost@10.7.3.9:~/exfil/' },
    { type: 'out', text: '.dmp    100%   48MB  12.5MB/s   00:04' },
    { type: 'cmd', text: 'shred -zu /tmp/.dmp' },
    { type: 'out', text: 'Trace erased. No local copy remains.' },
    { type: 'cmd', text: 'history -c && unset HISTFILE' },
    { type: 'out', text: 'Shell history cleared.' },
  ],
  // Session 4: 横向移动 & 后门部署
  [
    { type: 'cmd', text: 'netstat -tlnp | grep LISTEN' },
    { type: 'out', text: 'tcp  :22    sshd        1024/sshd' },
    { type: 'out', text: 'tcp  :80    nginx       2048/nginx' },
    { type: 'out', text: 'tcp  :3306  mysqld      3072/mysqld' },
    { type: 'cmd', text: 'echo "* * * * * root /tmp/.sysd" >> /etc/crontab' },
    { type: 'out', text: 'Persistence established via crontab.' },
    { type: 'cmd', text: 'rm -rf /var/log/auth.log /var/log/syslog' },
    { type: 'out', text: 'Logs purged.' },
    { type: 'out', text: 'Ghost in the machine. 揽星河 OUT.' },
  ],
]

let terminalSessionIdx = 0
let isTypewriting = false

function clearTerminal() {
  const body = terminalBodyRef.value
  if (!body) return
  body.innerHTML = '<div class="terminal-line prompt">C:\\Users\\ROOT&gt; _</div>'
}

function appendTerminalLine(type, text) {
  const body = terminalBodyRef.value
  if (!body) return
  const el = document.createElement('div')
  el.className = `terminal-line ${type === 'cmd' ? 'cmd' : 'output'}`
  el.innerHTML = text
  body.appendChild(el)
  // Auto-scroll to bottom
  body.scrollTop = body.scrollHeight
}

function typewriterWrite(line, onDone) {
  if (!ambientActive.value) return
  const body = terminalBodyRef.value
  if (!body) return
  const promptEl = body.querySelector('.terminal-line.prompt:last-child')
  if (promptEl) promptEl.remove()

  const el = document.createElement('div')
  el.className = `terminal-line ${line.type === 'cmd' ? 'cmd' : 'output'}`
  body.appendChild(el)

  let idx = 0
  const fullText = line.text
  const speed = 15 + Math.random() * 35

  function tick() {
    if (!ambientActive.value || idx >= fullText.length) {
      el.innerHTML = fullText
      appendTerminalLine('prompt', 'C:\\Users\\ROOT&gt; _')
      body.scrollTop = body.scrollHeight
      if (onDone) onDone()
      return
    }
    el.innerHTML = fullText.substring(0, idx + 1) + '<span class="cursor-blink">|</span>'
    idx++
    body.scrollTop = body.scrollHeight
    typewriterTimer = setTimeout(tick, speed)
  }
  tick()
}

function playTerminalSession(sessionLines, lineIdx = 0) {
  if (!ambientActive.value || lineIdx >= sessionLines.length) {
    // Schedule next session after delay
    if (ambientActive.value) {
      terminalSessionIdx = (terminalSessionIdx + 1) % TERMINAL_SESSIONS.length
      terminalTimer = setTimeout(() => {
        clearTerminal()
        playTerminalSession(TERMINAL_SESSIONS[terminalSessionIdx])
      }, 3000 + Math.random() * 3000)
    }
    return
  }
  typewriterWrite(sessionLines[lineIdx], () => {
    const delay = sessionLines[lineIdx].type === 'cmd' ? 100 + Math.random() * 200 : 40 + Math.random() * 120
    terminalTimer = setTimeout(() => {
      playTerminalSession(sessionLines, lineIdx + 1)
    }, delay)
  })
}

function startTerminal() {
  clearTerminal()
  terminalSessionIdx = Math.floor(Math.random() * TERMINAL_SESSIONS.length)
  playTerminalSession(TERMINAL_SESSIONS[terminalSessionIdx])
}

function stopTerminal() {
  if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null }
  clearTerminal()
}

// ==================== Schedulers (recursive, random interval) ====================

// Glitch blocks — less frequent, smaller, fewer
function scheduleBlocks() {
  if (!ambientActive.value) return
  const count = 1 + Math.floor(Math.random() * 2)
  spawnGlitchBlocks(count)
  fragmentTimer = setTimeout(scheduleBlocks, 400 + Math.random() * 700)
}

// Screen tear — less frequent
function scheduleTear() {
  if (!ambientActive.value) return
  if (Math.random() < 0.35) spawnScreenTear()
  tearTimer = setTimeout(scheduleTear, 1000 + Math.random() * 2500)
}

// Static noise — faster dots, much less dense
function scheduleNoise() {
  if (!ambientActive.value) return
  if (Math.random() < 0.5) spawnNoise(200 + Math.floor(Math.random() * 400))
  noiseTimer = setTimeout(scheduleNoise, 600 + Math.random() * 2000)
}

// Screen flash — less frequent
function scheduleFlash() {
  if (!ambientActive.value) return
  const colors = [
    '255,46,147',
    '0,240,255',
    '255,255,255',
    '0,0,0',
  ]
  const color = colors[Math.floor(Math.random() * colors.length)]
  triggerScreenFlash(color, 0.05 + Math.random() * 0.1)
  setTimeout(() => {
    if (ambientActive.value && glitchCtx && glitchCanvasRef.value) {
      glitchCtx.clearRect(0, 0, glitchCanvasRef.value.width, glitchCanvasRef.value.height)
    }
  }, 50)
  flashTimer = setTimeout(scheduleFlash, 2500 + Math.random() * 5000)
}

// Body shake — moderate
function scheduleShake() {
  if (!ambientActive.value) return
  triggerBodyShake(1.5 + Math.random() * 4)
  shakeTimer = setTimeout(scheduleShake, 800 + Math.random() * 2500)
}

// Chromatic aberration
function scheduleChromatic() {
  if (!ambientActive.value) return
  triggerChromaticFlash()
  chromaticTimer = setTimeout(scheduleChromatic, 800 + Math.random() * 3000)
}

// Text glitch (same logic as before, targeting PowerGlitch wrappers)
function triggerAmbientTextGlitch() {
  if (!ambientActive.value) return
  const candidates = document.querySelectorAll('.glitchable-text')
  if (candidates.length === 0) {
    textGlitchTimer = setTimeout(triggerAmbientTextGlitch, 600 + Math.random() * 1400)
    return
  }
  const count = 1 + Math.floor(Math.random() * 3)
  const picked = new Set()
  for (let i = 0; i < count && picked.size < candidates.length; i++) {
    let idx
    do { idx = Math.floor(Math.random() * candidates.length) } while (picked.has(idx))
    picked.add(idx)
    const el = candidates[idx]
    const wrapper = el.closest('.powerglitch') || el
    wrapper.classList.add('text-glitch-ambient')
    setTimeout(() => { wrapper.classList.remove('text-glitch-ambient') }, 500)
  }
  textGlitchTimer = setTimeout(triggerAmbientTextGlitch, 600 + Math.random() * 1400)
}

// ==================== Start / Stop ====================
function startAmbientGlitch() {
  ambientActive.value = true
  scheduleBlocks()
  scheduleTear()
  scheduleNoise()
  scheduleFlash()
  scheduleShake()
  scheduleChromatic()
  startTerminal()
  triggerAmbientTextGlitch()
}

function clearAllTimers() {
  const timers = [fragmentTimer, textGlitchTimer, terminalTimer, flashTimer, shakeTimer, chromaticTimer, tearTimer, noiseTimer]
  timers.forEach(t => { if (t) clearTimeout(t) })
  fragmentTimer = textGlitchTimer = terminalTimer = flashTimer = null
  shakeTimer = chromaticTimer = tearTimer = noiseTimer = null
  if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null }
}

function stopAmbientGlitch() {
  ambientActive.value = false
  clearAllTimers()
  stopTerminal()

  // Clean text glitch classes
  document.querySelectorAll('.text-glitch-ambient').forEach(el => el.classList.remove('text-glitch-ambient'))

  // Clean canvas
  if (glitchCtx && glitchCanvasRef.value) {
    glitchCtx.clearRect(0, 0, glitchCanvasRef.value.width, glitchCanvasRef.value.height)
  }

  // Reset body transform
  const root = homeRootRef.value
  if (root) root.style.transform = ''

  // Reset chromatic layer
  const chroma = chromaticLayerRef.value
  if (chroma) chroma.classList.remove('chromatic--on')
}

// ==================== Lifecycle ====================
onMounted(() => {
  glitchCtx = glitchCanvasRef.value?.getContext('2d') || null
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // ===== PowerGlitch Initialization =====
  // Card hover glitch
  PowerGlitch.glitch(
    '.project-card, .article-card, .music-card, .today-card',
    {
      playMode: 'hover',
      hideOverflow: false,
      timing: { duration: 600, iterations: 1, easing: 'ease-in-out' },
      glitchTimeSpan: { start: 0, end: 0.5 },
      shake: { velocity: 20, amplitudeX: 0.12, amplitudeY: 0.12 },
      slice: {
        count: 8,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.30,
        cssFilters: 'blur(2px) brightness(1.2)',
      },
    }
  )

  // Text hover glitch
  PowerGlitch.glitch(
    '.hero-subtitle,.header-logo,.nav-link,.section-label,.card-title,.card-desc,.tag,.article-title,.article-desc,.page,.tag-item,.mt-quote,.track-title,.track-artist,.track,.today-date,.today-day,.event,.history-label,.today-label,.footer-tag,.footer-copyright,.footer-icp,.footer-sync,.playlist-label,.hero-status,.article-meta,.time-text',
    {
      playMode: 'hover',
      hideOverflow: false,
      timing: { duration: 500, iterations: 1, easing: 'ease-in-out' },
      glitchTimeSpan: { start: 0, end: 0.5 },
      shake: { velocity: 20, amplitudeX: 0.10, amplitudeY: 0.08 },
      slice: {
        count: 6,
        velocity: 14,
        minHeight: 0.03,
        maxHeight: 0.22,
        cssFilters: 'blur(1.8px) brightness(1.18)',
      },
    }
  )

  // Mark glitchable text elements
  document.querySelectorAll('.hero-title,.hero-subtitle,.header-logo,.nav-link,.section-label,.card-title,.card-desc,.tag,.article-title,.article-desc,.page,.tag-item,.mt-quote,.track-title,.track-artist,.track,.today-date,.today-day,.event,.history-label,.today-label,.footer-tag,.footer-copyright,.footer-icp,.footer-sync,.playlist-label,.hero-status,.article-meta,.time-text')
    .forEach(el => el.classList.add('glitchable-text'))

  // Hero title — manual mode glitch
  const heroTitle = heroTitleRef.value
  if (heroTitle) {
    heroGlitch = PowerGlitch.glitch(heroTitle, {
      playMode: 'manual',
      hideOverflow: false,
      timing: { duration: 600, iterations: 1, easing: 'ease-in-out' },
      glitchTimeSpan: { start: 0, end: 0.5 },
      shake: { velocity: 20, amplitudeX: 0.12, amplitudeY: 0.12 },
      slice: {
        count: 8,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.30,
        cssFilters: 'blur(2px) brightness(1.2)',
      },
    })

    heroTitle.addEventListener('mouseenter', () => {
      heroTitle.textContent = '你好 世界'
      heroGlitch.startGlitch()
      setTimeout(() => { startAmbientGlitch() }, 2000)
    })
    heroTitle.addEventListener('mouseleave', () => {
      stopAmbientGlitch()
      heroTitle.textContent = '> HELLO_WORLD'
      heroGlitch.startGlitch()
      setTimeout(() => heroGlitch.stopGlitch(), 600)
    })
  }

  // Tag filter toggle
  document.querySelectorAll('.tag-filter .tag-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.tag-filter .tag-item').forEach(t => {
        t.classList.remove('active')
        t.classList.add('inactive')
      })
      this.classList.remove('inactive')
      this.classList.add('active')
    })
  })

  // Nav link smooth scroll
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const text = this.textContent.trim()
      const map = { '首页': '.hero', '文章': '#articles', '项目': '#projects', '知识库': '#now-playing' }
      const target = map[text]
      if (target) {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })

  // Music playlist click
  document.querySelectorAll('.playlist .track').forEach(track => {
    track.addEventListener('click', function () {
      document.querySelectorAll('.playlist .track').forEach(t => {
        t.classList.remove('current')
        t.classList.add('normal')
      })
      this.classList.remove('normal')
      this.classList.add('current')
    })
  })

  // Pagination click
  document.querySelectorAll('.pagination .page').forEach(page => {
    page.addEventListener('click', function () {
      if (this.textContent === '\u00AB' || this.textContent === '\u00BB' || this.textContent === '\u2026') return
      const parent = this.closest('.pagination')
      parent.querySelectorAll('.page').forEach(p => {
        if (p.textContent !== '\u00AB' && p.textContent !== '\u00BB' && p.textContent !== '\u2026') {
          p.classList.remove('pink')
          p.classList.add('dim')
        }
      })
      this.classList.remove('dim')
      this.classList.add('pink')
    })
  })

  // Progress bar click
  document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
      this.querySelector('.progress-filled').style.width = pct + '%'
    })
  })
})

onBeforeUnmount(() => {
  stopAmbientGlitch()
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
/* ==================== CSS Variables ==================== */
.home {
  --bg: #000000;
  --neon-pink: #FF2E93;
  --neon-cyan: #00F0FF;
  --card-bg: #05050A;
  --white-55: rgba(255,255,255,0.55);
  --white-45: rgba(255,255,255,0.45);
  --white-40: rgba(255,255,255,0.40);
  --white-35: rgba(255,255,255,0.35);
  --white-50: rgba(255,255,255,0.50);
  --cyan-15: rgba(0,240,255,0.15);
  --cyan-25: rgba(0,240,255,0.25);
  --cyan-30: rgba(0,240,255,0.30);
  --cyan-60: rgba(0,240,255,0.60);
  --pink-12: rgba(255,46,147,0.12);
  --content-max: 1280px;
  --header-h: 72px;
}

/* ==================== Header ==================== */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-h);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--cyan-15);
}
.header-logo {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--neon-cyan);
  white-space: nowrap;
}
.header-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}
.nav-link {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--white-55);
  cursor: pointer;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--neon-cyan); }
.nav-link.active { color: var(--neon-cyan); }
.nav-separator {
  width: 1px;
  height: 16px;
  background: var(--cyan-30);
}
.header-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-icons span {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s;
}
.icon-active { color: var(--neon-cyan); opacity: 1; }
.icon-dim { color: #fff; opacity: 0.5; }
.header-icons span:hover { opacity: 1; }

/* ==================== Section Base ==================== */
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--header-h) + 40px) 80px 40px;
  position: relative;
}
.section-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--neon-cyan);
  margin-bottom: 40px;
  align-self: center;
}

/* ==================== Hero ==================== */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-top: var(--header-h);
  position: relative;
}
.hero-status {
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
  color: var(--cyan-60);
}
.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 8vw, 100px);
  color: var(--neon-pink);
  text-align: center;
  letter-spacing: -2px;
  text-shadow:
    0 0 80px rgba(255,46,147,0.15),
    0 0 40px rgba(255,46,147,0.25),
    0 0 20px rgba(255,46,147,0.50),
    0 0 10px rgba(255,46,147,0.80),
    0 0 4px rgba(255,46,147,1.0);
}
.hero-title:hover { cursor: pointer; }
.hero-subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 20px;
  color: var(--white-55);
  text-align: center;
}
.hero-cursor {
  width: 16px;
  height: 24px;
  background: var(--neon-cyan);
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.hero-bottom {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
}
.music-widget {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-25);
  border-radius: 20px;
  padding: 10px 14px;
  box-shadow: 0 4px 12px rgba(0,240,255,0.30);
}
.music-widget-icon {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: var(--neon-pink);
}
.music-visualizer {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 14px;
}
.music-visualizer .bar {
  width: 3px;
  background: var(--neon-cyan);
  border-radius: 1px;
  animation: visualize 0.8s ease-in-out infinite alternate;
}
.music-visualizer .bar:nth-child(1) { height: 12px; animation-delay: 0s; }
.music-visualizer .bar:nth-child(2) { height: 8px; animation-delay: 0.15s; }
.music-visualizer .bar:nth-child(3) { height: 14px; animation-delay: 0.3s; }
.music-visualizer .bar:nth-child(4) { height: 6px; animation-delay: 0.45s; }
@keyframes visualize {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}

/* ==================== Projects ==================== */
.projects {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: calc(var(--header-h) + 40px) 80px 40px;
}
.project-grid {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.project-row {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.project-card {
  flex: 1;
  max-width: 380px;
  min-height: 260px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-15);
  border-radius: 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.project-card.glow-cyan {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.40),
    inset 0 0 12px rgba(0,240,255,0.20);
}
.project-card.glow-pink {
  border-color: var(--pink-12);
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.30),
    inset 0 0 12px rgba(255,46,147,0.15);
}
.project-card:hover {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.60),
    inset 0 0 20px rgba(0,240,255,0.30),
    0 0 20px rgba(0,240,255,0.15);
}
.project-card.glow-pink:hover {
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.50),
    inset 0 0 20px rgba(255,46,147,0.25),
    0 0 20px rgba(255,46,147,0.15);
}
.card-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 22px;
}
.card-title.cyan { color: var(--neon-cyan); }
.card-title.pink { color: var(--neon-pink); }
.card-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--white-55);
  line-height: 22px;
  flex: 1;
}
.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.card-tags .tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
}
.card-tags .tag.pink { color: var(--neon-pink); }
.card-tags .tag.cyan { color: var(--neon-cyan); }

/* ==================== Pagination ==================== */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
}
.pagination .page { cursor: pointer; transition: color 0.2s; }
.pagination .page.cyan { color: var(--neon-cyan); }
.pagination .page.pink { color: var(--neon-pink); }
.pagination .page.dim { color: var(--white-45); }
.pagination .page.faint { color: var(--white-35); }
.pagination .page.dim:hover, .pagination .page.faint:hover { color: var(--neon-cyan); }

/* ==================== Articles ==================== */
.articles {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: calc(var(--header-h) + 40px) 80px 40px;
}
.tag-filter {
  display: flex;
  gap: 24px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
}
.tag-filter .tag-item { cursor: pointer; transition: color 0.2s; }
.tag-filter .tag-item.active { color: var(--neon-pink); }
.tag-filter .tag-item.inactive { color: var(--white-40); }
.tag-filter .tag-item.inactive:hover { color: var(--neon-cyan); }
.article-grid {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.article-row {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.article-card {
  flex: 1;
  max-width: 380px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-15);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.article-card.glow-cyan {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.30),
    inset 0 0 10px rgba(0,240,255,0.15);
}
.article-card.glow-pink {
  border-color: var(--pink-12);
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.25),
    inset 0 0 10px rgba(255,46,147,0.12);
}
.article-card:hover {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.50),
    inset 0 0 16px rgba(0,240,255,0.25),
    0 0 16px rgba(0,240,255,0.12);
}
.article-card.glow-pink:hover {
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.40),
    inset 0 0 16px rgba(255,46,147,0.20),
    0 0 16px rgba(255,46,147,0.12);
}
.article-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}
.article-title.cyan { color: var(--neon-cyan); }
.article-title.pink { color: var(--neon-pink); }
.article-desc {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--white-45);
  line-height: 20px;
  min-height: 40px;
}
.article-meta {
  display: flex;
  justify-content: space-between;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--white-35);
}

/* ==================== Music & Today ==================== */
.music-today {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: calc(var(--header-h) + 40px) 80px 40px;
}
.mt-quote {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--neon-pink);
  text-align: center;
}
.mt-columns {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: var(--content-max);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
/* Music Player Card */
.music-card {
  flex: 1;
  max-width: 720px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-15);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.30),
    inset 0 0 10px rgba(0,240,255,0.15);
}
.music-top {
  display: flex;
  gap: 20px;
  align-items: center;
}
.album-art {
  width: 72px;
  height: 72px;
  border-radius: 4px;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  box-shadow: 0 0 12px rgba(0,240,255,0.40);
  flex-shrink: 0;
}
.track-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.track-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--neon-cyan);
}
.track-artist {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--white-45);
}
.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
  overflow: hidden;
}
.progress-filled {
  width: 36.5%;
  height: 100%;
  background: var(--neon-pink);
  box-shadow: 0 0 6px rgba(255,46,147,0.60);
  border-radius: 2px;
}
.time-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--white-40);
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.controls span {
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: opacity 0.2s, color 0.2s;
}
.controls .ctrl-dim { font-size: 16px; color: rgba(255,255,255,0.40); }
.controls .ctrl-bright { font-size: 16px; color: rgba(255,255,255,0.60); }
.controls .ctrl-play { font-size: 24px; color: var(--neon-cyan); }
.controls span:hover { opacity: 1; color: var(--neon-cyan); }
.playlist-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--neon-cyan);
}
.playlist-separator {
  width: 100%;
  height: 1px;
  background: rgba(0,240,255,0.10);
}
.playlist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.playlist .track {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  line-height: 22px;
  cursor: pointer;
  transition: color 0.2s;
}
.playlist .track.current { color: var(--neon-pink); }
.playlist .track.normal { color: var(--white-40); }
.playlist .track.normal:hover { color: var(--neon-cyan); }

/* Today Card */
.today-card {
  flex: 1;
  max-width: 536px;
  background: var(--card-bg);
  border: 1px solid var(--pink-12);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.25),
    inset 0 0 10px rgba(255,46,147,0.12);
}
.today-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--neon-pink);
}
.today-date {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: var(--neon-pink);
}
.today-day {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--white-45);
}
.today-separator {
  width: 100%;
  max-width: 472px;
  height: 1px;
  background: rgba(255,46,147,0.10);
}
.history-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--neon-cyan);
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.history-list .event {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  line-height: 20px;
  color: rgba(255,255,255,0.55);
}

/* ==================== Footer ==================== */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  height: 140px;
  border-top: 1px solid var(--cyan-15);
}
.footer-left { display: flex; flex-direction: column; gap: 8px; }
.footer-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: var(--neon-cyan);
}
.footer-copyright {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  color: var(--white-35);
}
.footer-right { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
.footer-icp {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: var(--white-45);
}
.footer-sync {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--white-35);
}

/* ==================== Responsive ==================== */
@media (max-width: 1280px) {
  .header, .section, .projects, .articles, .music-today, .footer { padding-left: 40px; padding-right: 40px; }
  .hero-bottom { padding: 0 40px; }
}
@media (max-width: 1024px) {
  .project-row, .article-row { flex-direction: column; align-items: center; }
  .project-card, .article-card { max-width: 100%; width: 100%; }
  .mt-columns { flex-direction: column; }
  .music-card, .today-card { max-width: 100%; }
  .header { padding: 0 24px; }
  .header-nav { gap: 16px; }
  .section, .projects, .articles, .music-today { padding-left: 24px; padding-right: 24px; }
}
@media (max-width: 768px) {
  .header-logo { font-size: 16px; }
  .header-nav { gap: 12px; }
  .nav-link { font-size: 12px; }
  .header-icons { gap: 8px; }
  .hero-title { font-size: clamp(32px, 10vw, 64px); }
  .hero-subtitle { font-size: 16px; }
  .footer { flex-direction: column; justify-content: center; gap: 12px; height: auto; padding: 24px; }
  .footer-right { align-items: center; }
}
</style>

<!-- ⚡ Non-scoped: dynamic classes applied by PowerGlitch / JS -->
<style>
/* CSS Variables — global */
:root {
  --bg: #000000;
  --neon-pink: #FF2E93;
  --neon-cyan: #00F0FF;
  --card-bg: #05050A;
  --white-55: rgba(255,255,255,0.55);
  --white-45: rgba(255,255,255,0.45);
  --white-40: rgba(255,255,255,0.40);
  --white-35: rgba(255,255,255,0.35);
  --white-50: rgba(255,255,255,0.50);
  --cyan-15: rgba(0,240,255,0.15);
  --cyan-25: rgba(0,240,255,0.25);
  --cyan-30: rgba(0,240,255,0.30);
  --cyan-60: rgba(0,240,255,0.60);
  --pink-12: rgba(255,46,147,0.12);
  --content-max: 1280px;
  --header-h: 72px;
}

/* ==================== Ambient Overlay Container ==================== */
.ambient-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 9998;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.ambient-overlay--on {
  opacity: 1;
}

/* 1) CRT Scanlines */
.crt-scanlines {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.15) 0px,
    rgba(0,0,0,0.15) 2px,
    transparent 2px,
    transparent 4px
  );
  z-index: 1;
}

/* 2) Vignette — dark edges */
.vignette {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0,0,0,0.35) 70%,
    rgba(0,0,0,0.65) 90%,
    rgba(0,0,0,0.85) 100%
  );
  z-index: 2;
}

/* 3) Chromatic Aberration Flash Layer */
.chromatic-layer {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.05s ease;
  pointer-events: none;
}
.chromatic--on {
  opacity: 1;
  background: rgba(255,46,147,0.06);
  box-shadow:
    3px 0 0 rgba(255,46,147,0.15),
    -2px 0 0 rgba(0,240,255,0.12);
}

/* 4) Holographic Intrusion Terminal — Red Alert / Intrusion style */
.intrusion-terminal {
  position: absolute;
  bottom: 32px;
  right: 40px;
  width: 420px;
  height: 340px;
  display: flex;
  flex-direction: column;
  /* Dark crimson holographic glass */
  background:
    linear-gradient(180deg, rgba(18,2,4,0.94) 0%, rgba(12,4,6,0.90) 100%);
  /* Angled corners via clip-path */
  clip-path: polygon(
    14px 0, calc(100% - 14px) 0, 100% 14px,
    100% calc(100% - 14px), calc(100% - 14px) 100%,
    14px 100%, 0 calc(100% - 14px), 0 14px
  );
  /* Right-side fade out — dissolve from ~55% toward right edge */
  -webkit-mask-image: linear-gradient(to right, black 48%, transparent 93%);
  mask-image: linear-gradient(to right, black 48%, transparent 93%);
  overflow: hidden;
  z-index: 4;
  opacity: 0;
  /* 3D perspective rotation + entry animation */
  transform: perspective(1000px) translateY(20px) scale(0.92) rotateY(-15deg) rotateX(2deg);
  transition: opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1);
  transform-style: preserve-3d;
  /* Red neon border glow — multi-layer */
  box-shadow:
    0 0 14px rgba(255,40,60,0.4),
    0 0 45px rgba(255,40,60,0.14),
    0 0 90px rgba(255,30,50,0.08),
    inset 0 1px 0 rgba(255,60,80,0.14),
    inset 0 -1px 0 rgba(255,80,30,0.08);
}
/* Border via pseudo-element for clip-path compatibility */
.intrusion-terminal::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  clip-path: inherit;
  border: 1.5px solid rgba(255,40,60,0.45);
  box-shadow: 0 0 16px rgba(255,30,50,0.18) inset;
}
/* Corner diamond accent dots — red/amber diagonal */
.intrusion-terminal::after {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: 5;
  pointer-events: none;
  clip-path: inherit;
  background:
    linear-gradient(135deg, rgba(255,40,60,0.8) 2px, transparent 2px),
    linear-gradient(225deg, rgba(255,40,60,0.8) 2px, transparent 2px),
    linear-gradient(315deg, rgba(255,130,20,0.7) 2px, transparent 2px),
    linear-gradient(45deg, rgba(255,130,20,0.7) 2px, transparent 2px);
  opacity: 0.7;
  filter: blur(0.5px);
}
.terminal--on {
  opacity: 1;
  transform: perspective(1000px) translateY(0) scale(1) rotateY(-12deg) rotateX(1deg);
}
/* ===== Title Bar ===== */
.terminal-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px 10px;
  background:
    linear-gradient(180deg, rgba(255,40,60,0.10) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255,40,60,0.22);
  z-index: 1;
}
/* Accent glow line under title bar — red → amber */
.terminal-titlebar::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,40,60,0.55), rgba(255,130,20,0.35), transparent);
}
/* Status diamond indicators */
.terminal-dot {
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
  flex-shrink: 0;
  box-shadow: 0 0 4px currentColor;
}
.dot-red   { background: #FF2040; color: #FF2040; }
.dot-yellow { background: #FF8800; color: #FF8800; }
.dot-green  { background: #FF2E50; color: #FF2E50; }
.terminal-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: rgba(255,200,180,0.55);
  margin-left: 6px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
/* ===== Body / Content Area ===== */
.terminal-body {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 14px 20px;
  overflow-y: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  line-height: 21px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,40,60,0.28) transparent;
  /* Subtle scan grid — red tint */
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(255,40,60,0.02) 0px,
      transparent 2px,
      transparent 4px
    );
}
.terminal-body::-webkit-scrollbar {
  width: 3px;
}
.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}
.terminal-body::-webkit-scrollbar-thumb {
  background: rgba(255,40,60,0.28);
}
.terminal-line {
  white-space: pre-wrap;
  word-break: break-all;
  text-shadow: 0 0 4px currentColor;
}
.terminal-line.prompt {
  color: rgba(255,60,80,0.95);
}
.terminal-line.cmd {
  color: rgba(255,60,80,0.95);
}
.terminal-line.cmd::before {
  content: '▸ ';
  color: rgba(255,130,20,0.85);
  font-size: 10px;
}
.terminal-line.output {
  color: rgba(255,200,190,0.6);
}
/* Typewriter cursor blink */
@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor-blink {
  animation: cursorBlink 0.5s step-end infinite;
  color: rgba(255,130,20,0.9);
  font-weight: bold;
}

/* ==================== Canvas Overlay ==================== */
.glitch-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 9999;
  pointer-events: none;
}

/* ==================== Body Shake Transition ==================== */
.home {
  transition: transform 0.06s ease-out;
}

/* ==================== Text Glitch (PowerGlitch ambient trigger) ==================== */
@keyframes ambientTextGlitch {
  0%   { transform: translate(0);     opacity: 1;    filter: none; }
  8%   { transform: translate(3px,-2px); opacity: 0.75; filter: blur(1.2px) brightness(1.18); }
  16%  { transform: translate(-2px,3px); opacity: 1;    filter: blur(0.4px) brightness(1.06); }
  24%  { transform: translate(5px,0);   opacity: 0.7;  filter: blur(1.8px) brightness(1.22); }
  35%  { transform: translate(-4px,-1px); opacity: 0.85; filter: blur(0.6px) brightness(1.1); }
  45%  { transform: translate(0,2px);   opacity: 1;    filter: none; }
  55%  { transform: translate(1px,-1px); opacity: 0.9;  filter: blur(0.3px) brightness(1.04); }
  100% { transform: translate(0);       opacity: 1;    filter: none; }
}
.text-glitch-ambient {
  animation: ambientTextGlitch 0.5s ease-out;
}
</style>
