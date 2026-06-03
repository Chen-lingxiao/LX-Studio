`HTML(Hyper Text Markup Language)` ，**超文本标记语言**用于创建网页的结构和内容

HTML 是 Web 页面的基础，描述了页面的语义结构，使浏览器能够正确地显示和解释内容

使用一系列的 **标签（也称为元素）** 来定义文本、图像、链接、表格等在网页上的排布和呈现方式

# HTML基本结构
```html
<!DOCTYPE html>
<html lang="en、zh-CN（过时）、cmn-hans（中国官方语言 汉字简体）">

<head>
  <meta charset="UTF-8">
  <meta name="keywords" content="网站关键字">
  <meta name="description" content="网站描述信息">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>标题</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="icon" href="./imgs/favicon.ico">
  <!-- 不推荐：@import 写法（CSS 内部使用，串行加载，可能 FOUC） -->
  <style>
    /* @import 是 CSS 语法，必须写在 style 或 css 文件最顶部 */
    @import url("./css/theme.css");
  </style>
</head>

<body>
</body>

</html>
```

> VS Code快速生成骨架：在 HTML 文件中，!（英文）配合 Enter / Tab 键
>
> HTML5 中推荐省略 `<html>`、`<head>`、`<body>` 的显式声明，但为了兼容性和清晰性，建议保留

## !DOCTYPE 文档类型声明

用于向浏览器说明当前文档使用哪种 HTML 或 XHTML 标准规范
触发浏览器进入 **标准模式 Standards Mode** 而非 **怪异模式 Quirks Mode**  详细查看 css 盒模型部分

**标准模式（Standards Mode）**

- 按照 **W3C 官方规范**解析渲染
- 盒模型：`width = 内容宽度`
- 现代浏览器默认使用

**怪异模式（Quirks Mode）**

- 为兼容**旧 IE 浏览器**的历史错误行为
- 盒模型：`width = 内容 + padding + border`（IE5.5 旧式盒模型）
- 缺少 `<!DOCTYPE>` 时会触发

**<html> 根元素** 页面唯一 ，H5中不是必需的元素

**<head>文档头**，包含一些文档的元信息，如标题、字符编码等

**<body>文档主体**，包含实际的页面内容，所有文本、图像、音频和视频等

**<title> 页面标题**，必须位于 `<head>` 标签之内

**<meta>文档元数据**，定义页面的元信息，可重复出现在 head 头部标签中

**<html lang 属性>**：languae 全局属性，告诉浏览器识别语言，触发如翻译、语音阅读等，值en、zh-CN（过时）、cmn-hans（中国官方语言 汉字简体）

## meta 标签核心功能

**meta name="名称" content="值"** `meta`是配置标签

 **/ˈmetə/**  

```html
<meta charset="UTF-8">
<meta name="keywords" content="网站关键字">
<meta name="description" content="网站描述信息">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**字符编码 charset 属性** ：

+ 指定网页内容编码格式，
+ 值 GB2312简体中文、GBK繁体中文、UTF-8万国码

**页面关键字 keywords 属性：**

+ 用于定义搜索内容为网页关键字
+ content 属性的值定义具体关键字内容，使用英文逗号进行分割
+ 现在搜索引擎对这个标签的依赖程度已经降低

**搜索结果摘要 discription 属性：**

+ 用于定义搜索内容为网页描述，搜索引擎在搜索结果中可能会显示这段描述
+ content 属性的值定义具体描述内容

**搜索结果作者 author 属性：**

+ 用于定义搜索内容为网页作者
+ content 属性的值定义作者信息

**移动端适配 viewport**

`content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"` 

+ 用于控制移动设备上网页的视口（viewport）
+ 移动设备的屏幕尺寸和分辨率各不相同，为了适应不同设备的显示效果
+ `width=device-width` 表示**页面宽度等于设备的屏幕宽度**
+ `initial-scale=1.0` 表示**初始缩放比例**为 1.0
+ `maximum-scale=1.0`：限制页面**最大缩放比例**为 1 倍，无法放大
+ `user-scalable=no`：禁止用户手动双指缩放页面

整体作用：让页面默认适配设备屏宽、原始比例展示，且**禁止任何缩放**，是移动端常用的固定视口配置

**模拟响应头 http-equiv="X-UA-Compatible" content="ie=edge"**

+ `http-equiv`：模拟 HTTP 响应头，让浏览器接收一些类似于服务器在 HTTP 响应中发送的指令
+  `"X-UA-Compatible"` 是一个特殊的 HTTP 响应头，它能指导浏览器采用特定的文档模式来渲染页面
+ `"ie=edge"`指IE8/9以及以后的版本都会以最高版本IE来渲染界面
+ 随着 Internet Explorer 逐渐被淘汰，这个标签在现代 Web 开发中的重要性也在降低

## link 与 @import 的区别

| **特性**     | `<link>`                   | `@import`                                          |
| ------------ | -------------------------- | -------------------------------------------------- |
| **归属**     | HTML 标签                  | CSS 语法                                           |
| **执行顺序** | 与 HTML 并行加载，不会阻塞 | 串行加载（等所在css加载完才加载，拖慢css加载速度） |
| **JS 控制**  | 可通过 JS 动态添加/移除    | 无法被 JS 直接控制                                 |
| **兼容性**   | 无限制，所有浏览器都支持   | **仅 IE5+ 支持**                                   |
| **其他功能** | 可引入 RSS、定义 rel 属性  | 仅加载 CSS                                         |

**踩坑点**：`@import` 加载 CSS 会产生 FOUC（无样式内容闪烁），因为要等 HTML 完全解析




# 标签（元素）

## 语法规则
HTML 标签是由 **尖括号** 包围的关键词，例如 `<html>`，用于定义和包围网页中的各种元素

HTML 标签通常是**成对**出现的，例如 `<html>` 和 `</html>` ，称为**双标签**

标签分为两种主要类型：单标签（Self-Closing Tags）和双标签（Paired Tags）

### **单标签（Self-Closing Tags）：**

+ 单标签通常用于表示没有内容的元素，栗如图像、换行、横线等
+ 以自封闭的方式出现，不需要闭合标签，因为它们没有内部内容
+ `<img src="image.jpg"/>` 表示插入一张图片， `<br>` 表示换行

### **双标签（Paired Tags）**：

+ 双标签用于定义包含内容的元素，例如段落、标题、列表等
+ 由两部分组成：开始标签和结束标签
+ 开始标签用于定义元素的起始位置，结束标签用于定义元素的结束位置

## 标签关系
明确标签的书写位置，让代码格式更整齐

### 嵌套（父子）
子级标签换行且缩进（Tab键），一个双标签里包含其他的标签，不可相互嵌套

```html
<body>
  <h1>标题一</h1>
  <a href=""></a>
</body>
```

### 并列（兄弟）
兄弟标签换行要对齐,两个标签处于同一级别，并且没有包含关系

```html
<head></head>
<body></body>
```

## 元素类型
**HTML 元素分为：** `**行内元素**` **、** `**块级元素**` **、** `**行内块元素**`

### 块元素（block）
+ **通常独占一行**
+ **可设置**其宽度、高度、对齐等属性
+ 在浏览器显示时，通常会以新行来开始
+ 例如段落、标题、列表、表格等
+ 常见的块级元素 `<div>`, `<p>`, `<h>` , `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>` 等

### 行内元素（inline）
+ **通常在同一行内呈现，不会独占一行**
+ 一般**不可设置**其宽度、高度、对齐等属性
+ 它们只占据其内容所需的宽度，而不是整行的宽度
+ 行内元素不能包含块级元素，但可以包含其他行内元素
+ 常见的行内元素包括 `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<br>`, `<input>` 等

### 行内块元素（inline-block）
+ **不会独占一行**
+ **可以设置**其宽度、高度、对齐等属性
+ 常见标签包括 `img`、`input`、`button`、`select`、`textarea`
+ 可通过 CSS 的 `display: inline-block` 转换元素类型

### 元素类型转换
**切换元素 display 属性**

+ inline 行内元素
+ block 块元素
+ inline-block 行内块元素
+ none 被隐藏，不占用空间

## 注释
概念：注释是对代码的解释和说明，能够提高程序的可读性，方便理解、查找代码

注释不会再浏览器中显示

在 VS Code 中，**添加 / 删除**注释的快捷键：**Ctrl + /**

`<!-- 我是 HTML 注释 -->`

## 页面格式化标签
### h1 标题标签
标题标签 `<h1> - <h6>`

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

一般用在新闻标题、文章标题、网页区域名称、产品名称等等

显示特点：

+ 文字加粗
+ 字号逐渐减小
+ 独占一行（换行）

一个网页只有一个 h1 标签，通常用于**网站 logo** ，便于浏览器检索

标题标签具有特殊语义，不应为了加粗或文字大小等 CSS 效果使用标题标签

一般不建议使用 align 属性进行对齐，使用 css 样式设置

### p 段落标签
`<p>`标签用于定义段落，它可以将整个网页分为若干个段落

一般用在新闻段落、文章段落、产品描述信息等等

显示特点：

+ 独占一行
+ 段落之间存在间隙

### 换行水平线标签
+ 换行：`<br>`
+ 水平线：`<hr>`

### 文本格式化标签
为文字设置**粗体**、**斜体**或**下划线**等效果,使文字以特殊的方式显示

| **语义** | **标签** | **说明** |
| :--- | :--- | :--- |
| 加粗 | `<strong></strong>`或者`<b></b>` | 推荐使用 `strong` |
| 倾斜 | `<em></em>`或者`<i></i>` | 推荐使用 `em` |
| 删除线 | `<del></del>`或者`<s></s>` | 推荐使用 `del` |
| 下划线 | `<ins></ins>`或者 `<u></u>` | 推荐使用 `ins` |

### 文本语义标签
### time 标签
`<time>` 标签用于表示日期、时间或者时间范围，可让机器更易理解和处理时间信息，利于搜索引擎优化和屏幕阅读器识别

```html
<p>我会在 <time datetime="2077-12-25">圣诞节</time> 那天回家</p>
```

在上述代码中，`datetime` 属性规定了具体的时间，其值为标准的日期时间格式，不过显示在页面上的内容是 “圣诞节”

### mark 标签
`<mark>` 标签用于高亮显示文本，通常用来表示与当前上下文相关的重要内容

```html
<p>请重点关注 <mark>这部分内容</mark>，它非常关键。</p>
```

在浏览器中，`<mark>` 标签内的文本默认会以黄色背景显示

### cite 标签
`<cite>` 标签用于标识作品的引用或参考，像书籍、文章、电影、歌曲等的标题

```html
<p>我最近读了一本很棒的书 <cite>《百年孤独》</cite>。</p>
```

在浏览器中，`<cite>` 标签内的文本默认会以斜体显示

### pre 标签
`<pre>` 标签用于显示预格式化的文本，它会保留文本中的空格、换行符等格式

一般用于展示代码、诗歌等需要保留原有格式的内容

```html
<pre>
function greet() {
    console.log('Hello, world!');
}
</pre>
```

上述代码会原样显示代码的格式，包括缩进和换行

## 元素属性
基本语法是：`<开始标签 属性名="属性值">`，

属性名和属性值之间用**等号** `=`隔开，属性值一般要用引号 `""` 将其括起来

```html
<img src="image.png" alt="图片">
```

`src` 是指定图片的文件路径的属性，`alt` 是指替代文本的属性

### class 属性
`class` 属性是用于向元素添加一个或多个类名，以便通过 CSS 样式表**批量定义样式**

此外类名还可以用来实现  `JavaScript`  的交互效果

```html
<p class="note">这是一个带有 note 类属性的 p 标签</p>
```

### id属性
`id` 属性是用于将元素标识为唯一的标识符

用于通过 CSS 精准选择单个元素（如`#map`）或通过 JS 快速获取元素

可以通过 `JavaScript` 或 `CSS` 来定位和操作该元素

```html
<div id="header">这是一个带有 header id 的 div 标签</div>
```

### style属性
`style` 属性是用于将`CSS`样式规则直接应用于元素

用于控制元素的颜色、字体、大小和布局等

```html
<div style="color: red; font-size: 20px;">这是一段红色的文字</div>
```

### hidden 属性

用于隐藏标签（隐藏后元素不占据页面空间），值为`hidden`或空 ，等同于 `display: none`

```html
<div hidden>加载中...</div>
```

### data- * 自定义属性

使用 `data-*` 前缀创建自定义属性，用于存储应用特定的数据：

```html
<div data-userId="123" >用户信息</div>
```

通过 `JavaScript` 访问：

```javascript
const div = document.querySelector('div');
console.log(div.dataset.userId); // 输出: 123
```

> 以上是所有标签都有的属性，也有一些标签具有独特的属性
>
> 比如 a 标签的 href 属性，img 标签的 src 属性等等

# 语义化
**语义学（源自古希腊）可定义为对语言意义的研究**

## 语义元素
语义元素清楚地向浏览器和开发者描述其意义

**非语义**元素的例子：`<div>` 和 `<span>` 无法提供关于其内容的信息

**语义**元素的例子：`<form>`、`<table>` 、`<img>`  清晰地定义其内容

所有现代浏览器均支持 HTML5 语义元素

+ 每一个元素都有具体的含义，例如`<a>` 超链接,`<p>` 段落
+ 所有元素与展示效果无关，元素页面展示效果依赖 CSS

> **选择什么元素，取决于内容的含义，而不是显示的效果**

## 语义化作用
1. **SEO 优化**：搜索引擎可精准解析页面结构，`main`/`article` 影响内容权重
2. **可访问性**：屏幕阅读器能正确识别区域（辅助残障人士）
3. **团队维护**：无 CSS 时也能看出页面结构
4. **设备解析**：便于移动设备、智能手表等以有意义的方式渲染

```html
<div class=“header”> </div>
<div class=“nav”> </div>
<div class=“content”> </div>
<div class=“footer”> </div>
```

## H5语义化容器元素
HTML5 新增了一些**语义化标签**，更加有利于浏览器的搜索引擎搜索，也方便了网站的 seo 

Search Engine Optimization，搜索引擎优化

+ `<header>` 头部标签
+ `<nav>` 导航链接集合
+ `<article>` 独立内容区块（如博客文章） 
+ `<section>` 文档中的逻辑分区
+ `<aside>` 侧边栏或附加内容
+ `<footer>` 尾部标签
+ ![](assets/1746160603364-f2b0360b-2d34-4d29-8e4d-12069de72d7c.png)

### 结构化标签
| **标签** | **用途说明** |
| :--- | :--- |
| `<header>` | 定义文档或区块的页眉（通常包含标题、Logo、导航栏等） |
| `<footer>` | 定义文档或区块的页脚（通常包含版权信息、联系方式等） |
| `<nav>` | 定义导航链接的容器（如主导航菜单、侧边栏导航等） |
| `<main>` | 定义文档的主要内容（一个页面中只能有一个 `<main>`） |
| `<article>` | 定义独立的自包含内容（如博客文章、新闻、论坛帖子等） |
| `<section>` | 定义文档中的通用区块（通常有标题，如章节、主题分组等） |
| `<aside>` | 定义与主内容间接相关的附加内容（如侧边栏、广告、引用等） |

### 内容分组标签
| **标签** | **用途说明** |
| :--- | :--- |
| `<figure>` | 定义与主内容相关的独立内容（如图表、图片、代码块等） |
| `<figcaption>` | 为 `<figure>` 内容添加标题或描述 |
| `<details>` | 定义用户可以展开/折叠的额外细节 |
| `<summary>` | 为 `<details>` 元素定义可见的标题 |
| `<time>` | 定义日期或时间（机器可读格式，如 `<time datetime="2023-10-01">`） |
| `<mark>` | 突出显示文本（如高亮搜索结果关键词） |

### 媒体相关标签
| **标签** | **用途说明** |
| :--- | :--- |
| `<video>` | 嵌入视频内容 |
| `<audio>` | 嵌入音频内容 |
| `<canvas>` | 用于绘制图形、动画（需配合 JavaScript） |
| `<svg>` | 定义矢量图形容器 |

### 表单增强标签
| **标签** | **用途说明** |
| :--- | :--- |
| `<datalist>` | 为输入框提供预定义选项列表（与 `<input>`的 `list`属性配合使用） |
| `<output>` | 显示计算结果（如表单提交后的计算结果） |
| `<progress>` | 显示任务进度条 |
| `<meter>` | 显示标量值（如磁盘使用量、评分等） |

### 语义化标签的优势
+ **SEO 友好**：帮助搜索引擎理解页面结构，提升排名
+ **可访问性**：屏幕阅读器能更准确地解析内容
+ **代码可读性**：开发者能快速理解页面结构
+ **维护性**：便于团队协作和后期修改

# 字符编码
## 实体字符
在 HTML 中某些字符是预留的。在页面中，显示`< ；> ；空格 ；`等

在 HTML 中不能使用`< ；> ；空格；`等，这是因为浏览器会误认为它们是标签

如果希望正确地显示预留字符，必须在 HTML 源代码中使用**字符实体**（character entities）

| **特殊字符** | **描述** | **字符的代码** |
| :---: | :---: | :--- |
| | 空格符 | `&nbsp;` |
| < | 小于号 | `&lt; 或 &#60;` |
| > | 大于号 | `&gt 或 &#62;` |
| © | 版权号 | `&copy;` |
| & | 和号 | `&amp;`
使用实体名而不是数字的好处是名称易于记忆 |

不过坏处是，浏览器也许并不支持所有实体名称（对实体数字的支持却很好）

## 编码（字符集）
**为了正确显示 HTML 页面，Web 浏览器必须知道要使用哪个字符集ASCII码表**

(American Standard Code for Information Interchange)美国信息交换标准码表

**GB2312编码：** 1981年5月1日发布简体中文汉字编码国家标准，收录7445个图形字符，包括6763个汉字

**BIG5编码：** 台湾地区繁体中文标准字符集，共收录13053个中文字，1984年实施

**GBK编码：** 2000年3月17日发布，收录21003个汉字，包含国家标准GB13000-1中的全部中日韩汉字和BIG5编码中的所有汉字

**Unicode编码：** 国际标准字符集，将世界各种语言的每个字符定义一个唯一的编码，以满足跨语言、跨平台的文本信息转换

### 从 ASCII 到 UTF-8
ASCII 是第一个字符编码标准

ASCII 定义了 128 种可以在互联网上使用的字符：数字（0-9）、英文字母（A-Z）和一些特殊字符

比如：`! $ + - ( ) @ < >`

ISO-8859-1 是 HTML 4 的默认字符集。此字符集支持 256 个不同的字符代码

ANSI（Windows-1252）是原始的 Windows 字符集

ANSI 与 ISO-8859-1 相同，不同之处在于 ANSI 具有 32 个额外的字符

HTML5 规范鼓励 Web 开发人员使用 UTF-8 字符集，该字符集涵盖了世界上几乎所有的字符和符号！

### ASCII 字符集
ASCII 使用 0 到 31（以及 127）之间的值作为控制字符

ASCII 使用 32 到 126 的值表示字母、数字和符号

ASCII 不使用 128 到 255 之间的值

### ANSI 字符集 (Windows-1252)
对于 0 到 127 的值，ANSI 与 ASCII 相同

ANSI 有一组专有的字符，其值从 128 到 159

对于 160 到 255 的值，ANSI 与 UTF-8 相同

### ISO-8859-1 字符集
对于 0 到 127 的值，8859-1 与 ASCII 相同

8859-1 不使用 128 到 159 之间的值

对于从 160 到 255 的值，8859-1 与 UTF-8 相同

### UTF-8 字符集
对于 0 到 127 的值，UTF-8 与 ASCII 相同

UTF-8 不使用 12 8到 159 之间的值

对于 160 到 255 之间的值，UTF-8 与 ANSI 和 8859-1 相同

UTF-8 从值 256 继续，包含超过 10000 个不同字符

如需深入研究，请阅读我们完整的 HTML 字符集参考手册

# 超链接
**链接的语法格式**

```html
<a href="链接地址" target="目标窗口的弹出方式">链接文本</a>
<a href="https://www.bilibili.com/" target="_blank" >哔哩哔哩</a>
```

**属性：**

+ `href`：（hyper reference）超文本引用,用于指定链接目标的`url`地址
+ `target`：用于指定链接页面的打开方式`_self`默认值； `_blank`新窗口打开
+ `#`：空链接,页面不会跳转，在当前页面刷新一次

## href 属性
### 外部链接: 
例如`<a href="http://www.baidu.com">百度</a >`

### 锚点链接: 
点击链接,可以快速定位到页面中的某个位置

`id`属性，全局属性，使用 id 属性创建 HTML 页面中的**书签**

当使用命名锚（named anchors）时创建直接跳至该命名锚（比如页面中某个小节）的链接

在**链接文本**的 `href` 属性中，设置属性值为`#名字` 的形式创建指向该锚的链接

```html
<a href="#tips">点击跳转</a>
```

找到**目标位置**标签，里面添加一个 `id 属性 = 刚才的名字` 对锚进行命名

```html
<a id="tips">锚点目标</a>
```

### 功能链接：
点击后执行JS代码

```html
<a href="javascript:alert('弹窗')">点击弹窗</a>
```

发送邮件 (需用户计算机安装邮件软件)

```html
<a href="mailto:12138@qq.com">发送邮件</a>
```

拨打电话（需安装拨号软件或者手机端使用）

```html
<a href="tel:123456789">拨打电话</a>
```

### 内部链接:
网站内部页面相互链接，例如 `<a href="index.html"> 首页 </a>`

### 空链接: 
如果当时没有确定链接目标时，`<a href="#"> 首页 </a> `默认会返回顶部

**空链接**的现代写法建议使用 `javascript:void(0);`，避免 `#` 导致页面跳转到顶部

图像超链接某些浏览器会自动添加边框，可将边框设置为0

### 下载链接: 
如果 href 里面地址是一个文件或者压缩包，会下载这个文件

网页元素链接: 在网页中的各种网页元素，如文本、图像、表格、音频、视频等都可以添加超链接

## target 属性
**用于指定链接页面的打开方式**

+ _self 在当前页面打开，默认值； 
+ _blank 新窗口打开

```html
<a href="https://www.baidu.com" target="myframe">百度</a>
<a href="https://douyu.com" target="myframe">斗鱼</a>
<a href="https://www.bilibili.com/" target="myframe">B站</a>
<iframe name="myframe" src="https://www.baidu.com/" frameborder="0"></iframe>
```

+ name值，在当前页面iframe标签中打开

## title 属性
title属性，全局属性，提示文字

```html
<a href="https://www.bilibili.com/" target="_blank" title="XXXX">哔哩哔哩</a>
```

# 统一资源定位器 URL
URL 用于定位万维网上的文档，是 Web 浏览器向 Web 服务器请求页面的依据

如 HTML 页面中`<a>`标签会指向万维网上的地址）

网页地址实例

`协议://域名/路径?参数#锚点`

1. **协议**：访问资源的规则（如 `http`/`https`、`ftp`）；
2. **域名 / IP**：服务器地址；
3. **路径**：服务器内文件位置；
4. **参数**：附加查询信息；

`http://www.runoob.com/html/html-tutorial.html`

**语法规则（各组成部分**）

+ **scheme**：定义因特网服务类型，最常见的类型是`http`
+ **host**：定义域主机，`http`的默认主机是`www`
+ **domain**：定义因特网域名，比如`runoob.com`
+ **:port**：定义主机上的端口号，`http`的默认端口号是`80`
+ **path**：定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）
+ **filename**：定义文档 / 资源的名称

## HTML 文件路径
文件路径描述了网站文件夹结构中某个文件的位置

文件路径会在链接外部文件时被用到：

+ 网页
+ 图像
+ 样式表
+ JavaScript

概念：路径指的是查找文件时，从**起点**到**终点**经历的**路线**

路径分类：

+ 相对路径：从当前文件位置出发查找目标文件
+ 绝对路径：从盘符出发查找目标文件

## 绝对路径
绝对文件路径是指向一个因特网文件的完整 URL：

Windows 默认是 \ ，其他系统是 /，建议统一写为`/`

**协议名://主机名:端口/路径**

协议名：http 、 https 、file

主机名：域名、IP地址

端口： 如果协议为http，默认为80；https默认为443

路径：/images/picture.jpg

```html
<img 
  src="https://www.w3school.com.cn/images/picture.jpg" 
  alt="flower"
>
```

**当跳转目标和当前页面的协议相同时可以省略协议域名（易记的地址标识）**：[baidu.com](https://baidu.com/)（百度）、[taobao.com](https://taobao.com/)（淘宝）、[zhihu.com](https://zhihu.com/)（知乎）

**IP 地址（网络设备的唯一标识）**：

+ 公网 IP：220.181.38.148（百度某服务器 IP）、183.232.231.172（淘宝某服务器 IP）
+ 内网 IP：192.168.1.1（家用路由器 IP）、10.0.0.5（公司内网设备 IP）

**主机名（设备在网络中的 “昵称”）**：

+ 本地主机：[localhost](https://localhost/)（默认本地主机名）、MyLaptop（自己给电脑设的主机名）

127.0.0.1 是 IPv4 的本地回环地址，专门用于设备自身访问自身

系统默认会把 [localhost](https://localhost/) 解析到 127.0.0.1（可通过 hosts 文件修改）

所以访问 [localhost](https://localhost/) 和 127.0.0.1 效果完全一致

## 相对路径
相对路径指向了相对于当前页面的文件

`/` 表示进入某个文件夹里面

`./ ` 表示当前资源所在目录

`../ ` 表示上一级目录

`./ `  **可以省略** 

| **路径** | **描述** |
| :--- | :--- |
| `<img src="picture.jpg">` | 位于与当前网页相同的文件夹 |
| `<img src="images/picture.jpg">` | 位于当前文件夹的 images 文件夹中 |
| `<img src="/images/picture.jpg">` | 当前站点根目录的 images 文件夹中 |
| `<img src="../picture.jpg">` | 位于当前文件夹的上一级文件夹中 |

**使用相对路径是个好习惯（如果可能）**

如果使用了相对路径，那么网页就不会与当前的基准 URL 进行绑定

所有链接在电脑上 (localhost) 或未来的公共域中均可正常工作

## href vs src 区别

**href (HyperText Reference)**

- **作用**：**建立关联**，表示当前页面与外部资源的**引用关系**
- **不会替代**当前内容，只是建立链接
- **加载方式**：**并行加载**，不阻塞页面解析
- **常用标签**：`<a>`、`<link>`

**src (Source)**

- **作用**：**嵌入替换**，把外部资源**直接嵌入到当前页面**
- **会替代**当前位置内容
- **加载方式**：**串行加载**，浏览器会暂停解析，等待 src 资源加载完成
- **常用标签**：`<script>`、`<img>`、`<iframe>`、`<video>`

**href = 引用（不阻塞、只是关联）**

**src = 嵌入（会阻塞、直接替换）**



# 图像 image 
## 常见的图像格式
**GIF 格式：** GIF是一种无损的图像格式，支持动画，颜色少，适合简单动画、小图

**PNG 格式：** 无损压缩，支持透明，文件较大，适合图标、logo 等需要透明的图

**JPG 格式：** 有损压缩，文件小，适合照片、色彩丰富的大图，不支持透明

## image 标签
在 HTML 中图像由 `<img>` 标签定义

浏览器将图像显示在文档中图像标签出现的地方

如果图像标签置于两个段落之间，那么浏览器会首先显示第一个段落，然后显示图片，最后显示第二段

`<img>` 是空标签，意思是说，它只包含属性，并且没有闭合标签

要在页面上显示图像，需要使用源属性（`src`）

`src指 "source"`，源属性的值是图像的 URL 地址

```html
<img src="url链接" alt="替换文本" title="提示文本" />
```

| **属性** | **属性值** | **描述** |
| :--- | :--- | :--- |
| src | URL | 图像的路径 |
| alt | 文本 | 图片资源失效文字替代 |
| title | 文本 | 鼠标指针悬停显示内容 |
| width / height | 像素值 | 图片宽度高度 |
| border | 数字 | 图像边框宽度 |
| vspace / hspace | 像素值 | 图像垂直/水平边距 |
| align | left /right/top/bottom/middle | 图片对齐方式 |
| object-fit | fill 、contain、cover | 填充、保持比例、保持大小和比例 |

## title vs alt 的区别

| 属性      | 含义     | 显示时机                                 | 核心作用                                        | 必要性       |
| :-------- | :------- | :--------------------------------------- | :---------------------------------------------- | :----------- |
| **alt**   | 替代文本 | 图片加载失败、图片不存在、屏幕阅读器读取 | 图片无法显示时**替代展示**，提升 SEO + 可访问性 | **必须写**   |
| **title** | 提示文本 | 鼠标**悬停**在图片上时                   | 额外补充说明信息                                | 可选，非必需 |

- **alt = 图片的 “替代品”**：加载失败显示，SEO / 无障碍必备
- **title = 鼠标悬停 “小提示”**：补充说明，非必需

## loading 属性

HTML5 新属性，用于**图片懒加载**，优化页面加载性能：

- **loading="lazy"**：**懒加载**，图片进入视口才加载，减少首屏请求
- **loading="eager"**：**立即加载**（默认值），页面一加载就请求
- **loading="auto"**：浏览器自动决定（默认策略，等同于 eager）

**lazy = 延迟加载；eager = 立即加载；auto = 浏览器自动**

```html
<!-- 首屏外的图片，推荐用 lazy -->
<img src="photo.jpg" alt="描述" loading="lazy">
```

## img 加载失败处理

**onerror 替换默认图**

原理：图片加载失败触发 `onerror`，替换为兜底图

必须加 `this.onerror=null`：防止默认图也加载失败导致死循环

优点：实现简单、兼容性好

缺点：属于行内脚本，不利于维护

```html
<img 
  src="avatar.jpg" 
  alt="用户头像"
  onerror="this.src='default.png'; this.onerror=null;"
>
```

**CSS 伪元素占位**

```html
<div class="img-box">
  <img src="avatar.jpg" alt="用户头像">
</div>
```

```css
.img-box {
  position: relative;
  width: 100px;
  height: 100px;
}
.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 加载失败隐藏原图，显示伪元素 */
.img-box img:invalid,
.img-box img[src=""],
.img-box img:not([src]) {
  opacity: 0;
}
.img-box::after {
  content: "加载失败";
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #999;
}
```

优点：纯 CSS、无死循环风险、样式可控

适用：头像、封面、列表图等统一占位场景

**JS 统一监听（推荐工程化）**

```javascript
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'default.png';
  }, { once: true });
});
```

`once: true` = 只执行一次，避免循环错误

## a 元素联用

```html
<a href="https://www.bilibili.com/" target="_blank">
  <img src="./image/xx.png" alt="哔哩哔哩">
</a>
```

## map 标签
```html
<a href="https://www.bilibili.com/" target="_blank">
  <img usemap="#xyzMap" src="./image/设置.png" alt="哔哩哔哩">
</a>
<!-- 划分区域 -->
<map name="xyzMap">
  <area shape="" coords="" href="" alt="">
</map>
```

定义 **图像映射（Image Map）** 的标准结构，允许在图片上创建可点击的热区区域

需与 `<img>` 标签配合使用

`<map>` 标签

**作用**：定义客户端图像映射（包含一组可点击区域）

**关键属性**：

+ `name`：映射的名称（必填），需与 `<img>` 标签的 `usemap` 属性对应
+ 示例：`<map name="myMap">` → `<img usemap="#myMap">`

---

`<area>`标签作用：在图像映射中定义一个可点击的热区（单个区域）

**关键属性**：

+ `shape`：热区的形状，可选值：
    - `rect`（矩形）
    - `circle`（圆形）
    - `poly`（多边形）
    - `default`（整个图像区域）
+ `coords`：坐标值（格式根据 `shape` 不同而变化，见下表）
+ `href`：点击区域后跳转的链接（类似 `<a>` 标签的 `href`）
+ `alt`：替代文本（可访问性必需，类似图片的 `alt` 属性）

---

### **坐标系统说明**
| `shape`类型 | `coords`格式 | **示例（单位：像素）** |
| --- | --- | :--- |
| `rect` | 左上角x,左上角y,右下角x,右下角y | `coords="34,44,270,350"` |
| `circle` | 圆心x,圆心y,半径 | `coords="100,200,50"` |
| `poly` | 各顶点x,y依次排列（至少3个点） | `coords="0,0,100,200,50,300"` |

### **关键注意事项**
+ **坐标单位**：坐标以图片左上角为原点 `(0,0)`，单位为像素
+ **工具提示**：可通过 `title` 属性添加鼠标悬停提示：
+ **现代替代方案**：图像热区映射已较少使用，更多通过 CSS 或 JavaScript 实现，简单场景仍有效

`herf` 属性点击后链接地址

`alt` 属性无法加载时显示内容

`target` 属性跳转方式

`figure`  标签指代、定义，通常用于把图片、图片标题、描述包裹起来

```html
<figure>
  <img src="./image/x.jpg" alt="加载失败" title="图1">
  <p>图片1</p>
  <figcaption>
    <h1>tup1</h1>
  </figcaption>
</figure>
```

### figure 标签
`<figure>` 标签用于表示一个独立的、自包含的内容单元，通常是可视化的内容，像图片、图表、代码示例等。它的主要作用是将相关的可视化内容进行分组，并且和周围的文本区分开来，让页面结构更加清晰

```html
<figure>
    <img src="example.jpg" alt="示例图片">
</figure>
```

在上述代码里，`<figure>` 标签把 `<img>` 标签包裹起来，表明这张图片是一个独立的内容单元

### figcaption 标签
`<figcaption>` 标签用于为 `<figure>` 元素添加标题或说明文字。它必须是 `<figure>` 标签的子元素，并且一个 `<figure>` 元素中最多只能有一个 `<figcaption>` 标签

```html
<figure>
    <img src="example.jpg" alt="示例图片">
    <figcaption>这是一张示例图片，展示了美丽的风景。</figcaption>
</figure>
```

# 音频多媒体
## HTML 媒体
**Web 上的多媒体指的是音效、音乐、视频和动画**

| **文件格式** | **IE9以上** | **Firefox4.0以上** | **Opear10.6** | **Chrome6.0** | **Safari3.0** |
| :--- | :--- | :---: | :---: | :---: | :---: |
| OGG 视频 | | 支持 | 支持 | 支持 | |
| MPEG4 视频 | 支持 | 支持 | 支持 | 支持 | 支持 |
| WEBM 视频 | | 支持 | 支持 | 支持 | |
| OGG 音频 | | 支持 | 支持 | 支持 | |
| MP3 音频 | 支持 | 支持 | 支持 | 支持 | 支持 |
| WAV 音频 | | 支持 | 支持 | 支持 | 支持 |

## 多媒体格式
多媒体元素（比如视频和音频）存储于媒体文件中

多媒体元素元素拥有带有不同扩展名的文件格式，比如 .swf、.wmv、.mp3 以及 .mp4

## 视频格式
MP4 格式是一种新的即将普及的因特网视频格式。HTML5 、Flash 播放器及优酷等视频网站均支持

| **格式** | **文件** | **描述** |
| :--- | :--- | :--- |
| AVI | .avi | AVI (Audio Video Interleave) 格式是由微软开发的。所有运行 Windows 的计算机都支持 AVI 格式。它是因特网上很常见的格式，但非 Windows 计算机并不总是能够播放。 |
| WMV | .wmv | Windows Media 格式是由微软开发的。Windows Media 在因特网上很常见，但是如果未安装额外的（免费）组件，就无法播放 Windows Media 电影。一些后期的 Windows Media 电影在所有非 Windows 计算机上都无法播放，因为没有合适的播放器。 |
| MPEG | .mpg.mpeg | MPEG (Moving Pictures Expert Group) 格式是因特网上最流行的格式。它是跨平台的，得到了所有最流行的浏览器的支持。 |
| QuickTime | .mov | QuickTime 格式是由苹果公司开发的。QuickTime 是因特网上常见的格式，但是 QuickTime 电影不能在没有安装额外的（免费）组件的 Windows 计算机上播放。 |
| RealVideo | .rm.ram | RealVideo 格式是由 Real Media 针对因特网开发的。该格式允许低带宽条件下（在线视频、网络电视）的视频流。由于是低带宽优先的，质量常会降低。 |
| Flash | .swf.flv | Flash (Shockwave) 格式是由 Macromedia 开发的。Shockwave 格式需要额外的组件来播放。但是该组件会预装到 Firefox 或 IE 之类的浏览器上。 |
| Mpeg-4 | .mp4 | Mpeg-4 (with H.264 video compression) 是一种针对因特网的新格式。事实上，YouTube 推荐使用 MP4。YouTube 接收多种格式，然后全部转换为 .flv 或 .mp4 以供分发。越来越多的视频发布者转到 MP4，将其作为 Flash 播放器和 HTML5 的因特网共享格式。 |

## 声音格式
| **格式** | **文件** | **描述** |
| :--- | :--- | :--- |
| MIDI | .mid.midi | MIDI (Musical Instrument Digital Interface) 是一种针对电子音乐设备（比如合成器和声卡）的格式。MIDI 文件不含有声音，但包含可被电子产品（比如声卡）播放的数字音乐指令。因为 MIDI 格式仅包含指令，所以 MIDI 文件极其小巧。上面的例子只有 23k 的大小，但却能播放将近 5 分钟。MIDI 得到了广泛的平台上的大量软件的支持。大多数流行的网络浏览器都支持 MIDI。 |
| RealAudio | .rm.ram | RealAudio 格式是由 Real Media 针对因特网开发的。该格式也支持视频。该格式允许低带宽条件下的音频流（在线音乐、网络音乐）。由于是低带宽优先的，质量常会降低。 |
| Wave | .wav | Wave (waveform) 格式是由 IBM 和微软开发的。所有运行 Windows 的计算机和所有网络浏览器（除了 Google Chrome）都支持它 |
| WMA | .wma | WMA 格式 (Windows Media Audio)，质量优于 MP3，兼容大多数播放器，除了 iPod。WMA 文件可作为连续的数据流来传输，这使它对于网络电台或在线音乐很实用。 |
| MP3 | .mp3.mpga | MP3 文件实际上是 MPEG 文件的声音部分。MPEG 格式最初是由运动图像专家组开发的。MP3 是其中最受欢迎的针对音乐的声音格式 |

**WAVE** 是因特网上最受欢迎的**无压缩**声音格式，所有流行的浏览器都支持它

**MP3** 是最新的**压缩录制**音乐格式

## HTML 插件
### MIME 
MIME (Multipurpose Internet Mail Extensions) 多用途互联网邮件扩展类型,是描述消息内容类型的标准，用来表示文档、文件或字节流的性质和格式

MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据

浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理URL，因此 Web服务器在响应头中添加正确的 MIME 类型非常重要。如果配置不正确，浏览器可能会无法解析文件内容，网站将无法正常工作，并且下载的文件也会被错误处理

[MIME类型查询](https://www.runoob.com/http/mime-types.html)

+ 超文本标记语言文本 **.html、.html**：text/html
+ 普通文本 **.txt**： text/plain
+ RTF 文本 **.rtf**： application/rtf
+ GIF 图形 **.gif**： image/gif
+ JPEG 图形 **.jpeg、.jpg**： image/jpeg

### 插件
插件（Plug-in）是扩展浏览器标准功能的计算机程序

插件被设计用于许多不同的目的：

+ 运行 Java 小程序
+ 运行 ActiveX 控件
+ 显示 Flash 电影
+ 显示地图
+ 扫描病毒
+ 验证银行账号

大多数浏览器不再支持 Java Applet 和插件

所有浏览器均不再支持 ActiveX 控件

在现代浏览器中，对 Shockwave Flash 的支持也已关闭

### object 元素
所有浏览器均支持 `<object>` 元素

`<object>` 元素定义 HTML 文档中的嵌入式对象

旨在将插件（例如 Java applet、PDF 阅读器和 Flash 播放器）嵌入网页中

```html
<object width="100%" height="500px" data="snippet.html" type=""></object>
<object data="图片.jpeg"></object>
```

### embed 元素
所有主要浏览器均支持 `<embed>` 元素。

`<embed>` 元素也可定义了 HTML 文档中的嵌入式对象

注意`<embed>` 元素没有结束标记，它无法包含替代文本

`<embed>` 元素也可用于在 HTML 中包含 HTML

```html
<embed src="图片.jpeg">
<embed width="100%" height="500px" src="snippet.html">
```

### 二者兼容性
```html
<object data="movie.mp4" width="320" height="240">
  <embed src="movie.swf" width="320" height="240" />
</object>
```

若object不可以正常加载，调用embed元素加载

## H5 audio 音频
当前 `<audio>` 元素支持三种视频格式： 尽量使用 **mp3格式使用语法：**

```html
<audio src="音频的 URL"></audio><audio src="音频的 URL"></audio>
```

### 兼容写法
由于各个浏览器的支持情况不同

```html
< audio controls="controls"  >
  <source src="happy.mp3" type="audio/mpeg" >
  <source src="happy.ogg" type="audio/ogg" >
  您的浏览器暂不支持 <audio> 标签。
</ audio>
```

**上面这种写法，浏览器会匹配audio标签中的source，如果支持就播放，如果不支持往下匹配，直到没有匹配的格式，就提示文本**

### audio 常用属性
| **属性** | **值** | **描述** |
| :--- | :--- | :--- |
| src | controls | 音频URL |
| controls | controls | 音频控制面板 |
| loop | loop | 循环播放 |
| autoplay | autoplay | 自动播放 |

**示例代码：**

```html
<audio src="media/music.mp3" autoplay="autoplay" controls="controls"></audio>
<!-- 在 HTML5 里面，如果属性名和属性值完全一样，可以简写为一个单词 -->
<audio src="./media/music.mp3" controls loop autoplay></audio>
```

+ 音频标签和视频标签使用方式基本一致
+ 浏览器支持情况不同
+ 谷歌浏览器把音频和视频自动播放禁止了
+ 可以给视频标签添加 muted 属性来静音播放视频，音频不可以（可以通过JavaScript解决）
+ 视频标签是重点，经常设置自动播放，不使用 controls 控件，循环和设置大小属性

### 使用 audio 标签
audio 元素是一个 HTML5 元素，在 HTML 4 中是非法的，但在所有浏览器中都有效


```html
<audio controls="controls">
  <source src="song.mp3" type="audio/mp3" />
  <source src="song.ogg" type="audio/ogg" />
  <embed height="100" width="100" src="song.mp3" />
  <p> 浏览器不支持</P>
</audio>
```

HTML5 `<audio>` 元素会尝试以 mp3 或 ogg 来播放音频

如果失败，代码将回退尝试 `<embed>` 元素，如果失败，会显示错误消息

+ 必须把音频转换为不同的格式
+ audio 元素无法通过 HTML 4 和 XHTML 验证
+ <embed> 元素无法通过 HTML 4 和 XHTML 验证
+ <embed> 元素无法回退来显示错误消息

注释：使用 `<!DOCTYPE html>` (HTML5) 解决验证问题

### 使用 embed 元素
`<embed>` 标签定义外部（非 HTML）内容的容器

下面的代码片段能够显示嵌入网页中的 MP3 文件：

```html
<embed height="100" width="100" src="song.mp3" />
```

+ < embed > 标签在 HTML 4 中是无效的。页面无法通过 HTML 4 验证
+ 不同的浏览器对音频格式的支持也不同
+ 如果浏览器不支持该文件格式，没有插件的话就无法播放该音频
+ 如果用户的计算机未安装插件，无法播放音频
+ 如果把该文件转换为其他格式，仍然无法在所有浏览器中播放

### 使用 object 元素
`<object tag>` 标签也可以定义外部（非 HTML）内容的容器

下面的代码片段能够显示嵌入网页中的 MP3 文件：

```html
<object height="100" width="100" data="song.mp3"></object>
```

+ 不同的浏览器对音频格式的支持也不同
+ 如果浏览器不支持该文件格式，没有插件的话就无法播放该音频
+ 如果用户的计算机未安装插件，无法播放音频
+ 如果把该文件转换为其他格式，仍然无法在所有浏览器中播放

### 雅虎媒体播放器
```html
<a href="song.mp3">Play Sound</a>
<script type="text/javascript" src="http://mediaplayer.yahoo.com/js">
</script>
```

使用雅虎播放器把这段 JavaScript 插入网页底部：

```html
<script type="text/javascript" src="http://mediaplayer.yahoo.com/js"></script>
```

把 MP3 文件链接到HTML 中，JavaScript 会自动地为每首歌创建播放按钮：

```html
<a href="song1.mp3">Play Song 1</a>
<a href="song2.mp3">Play Song 2</a>
...
...
...
```

雅虎媒体播放器为您的用户提供的是一个小型的播放按钮，而不是完整的播放器

点击该按钮，会弹出完整的播放器。

请注意，这个播放器始终停靠在窗框底部。只需点击它，就可将其滑出

## H5 video 视频
**使用语法**

```html
 <video src="media/mi.mp4"></video>
```

### 兼容写法
```html
<video  controls="controls"  width="300">
  <source src="move.ogg" type="video/ogg" >
  <source src="move.mp4" type="video/mp4" >
  您的浏览器暂不支持 <video> 标签播放视频
</video>
```

浏览器会匹配video标签中的source，支持就播放，如果不支持往下匹配，直到没有匹配的格式，就提示文本

### video 常用属性
| 属性 | 值 | 描述 |
| --- | --- | --- |
| autoplay | autoplay | 视频就绪自动播放（谷歌浏需添加muted来解决自动播放问题） |
| controls | controls | 向用户显示播放控件 |
| width | pixels(像素) | 设置播放器宽度 |
| height | pixels(像素) | 设置播放器高度 |
| loop | loop | 播放完是否继续播放该视频，循环播放 |
| preload | auto（预先加载视频)<br/>none（不应加载视频） | 规定是否预加载视频(如果有了autoplay就忽略该属性) |
| src | url | 视频url地址 |
| poster | Imgurl | 加载等待的画面图片 |
| muted | muted | 静音播放 |

**重点掌握：**

+ `autoplay` 自动播放
+ `width` 宽度
+ `height` 高度
+ `loop` 循环播放
+ `src` 播放源
+ `muted` 静音播放

### 使用 video 标签
`<video>` 标签的作用是在 HTML 页面中嵌入视频元素

以下 HTML 片段会显示一段嵌入网页的 ogg、mp4 或 webm 格式的视频：

```html
<video 
  style="width: 600px;" 
  controls 播放控件
  autoplay 自动播放
  muted 静音播放
  loop 循环播放>
  <source src="视频.mp4">
  <source src="视频.webm">
  <object data="视频.mp4" type="">
    <embed src="视频.swf" type="">
  </object>
</video>
```

HTML 5 `<video>` 元素会尝试播放以 mp4、ogg 或 webm 格式中的一种来播放视频。如果均失败，则回退到 `<embed>` 元素

+ 必须把视频转换为很多不同的格式
+ `<video> `元素无法通过 HTML 4 和 XHTML 验证
+ `<embed>` 元素无法通过 HTML 4 和 XHTML 验证

注释：使用 `<!DOCTYPE html> `(HTML5) 解决验证问题

**布尔属性**

某些属性，只有两种状态:不写 or 取值为属性名

controls 播放控件 autoplay 自动播放 muted 静音播放 loop 循环播放

**兼容性**

1.旧版本不支持这两个元素

2.浏览器支持格式不一致

### 使用 embed 标签
`<embed>` 标签的作用是在 HTML 页面中嵌入多媒体元素

下面的 HTML 代码显示嵌入网页的 Flash 视频：

`<embed src="movie.swf" height="200" width="200"/>`

+ HTML4 无法识别 `<embed>` 标签。您的页面无法通过验证
+ 如果浏览器不支持 Flash，那么视频将无法播放
+ iPad 和 iPhone 不能显示 Flash 视频
+ 如果将视频转换为其他格式，那么它仍然不能在所有浏览器中播放

### 使用 object 标签
`<object>` 标签的作用是在 HTML 页面中嵌入多媒体元素

下面的 HTML 片段显示嵌入网页的一段 Flash 视频：

`<object data="movie.swf" height="200" width="200"/>`

+ 如果浏览器不支持 Flash，将无法播放视频
+ iPad 和 iPhone 不能显示 Flash 视频
+ 如果将视频转换为其他格式，那么它仍然不能在所有浏览器中播放

### 视频网站解决方案
在 HTML 中显示视频的最简单的方法是使用视频网站代码内嵌

可以把视频上传到哔哩哔哩等视频网站，然后在网页中插入分享的HTML 代码即可播放视频：

![](assets/1746161351136-a0e2b2d1-8f7a-4b46-ad25-7734604e68a8.png)

**使用B站移动端iframe播放器参数更多**

`//player.bilibili.com/player.html`

`//www.bilibili.com/blackboard/html5mobileplayer.html`

```html
<iframe 
  src="//player.bilibili.com/player.html?xxxxx" 
  scrolling="no" 
  border="0" 
  frameborder="no" 
  framespacing="0" 
  allowfullscreen="true">
</iframe>
```

#### 常用参数
是否自动播放(默认否)：autoplay 

默认弹幕开关(默认开启)：danmaku 

是否默认静音(默认否)：muted 

一键静音按钮是否显示(默认不显示)：hasMuteButton 

视频封面下方是都显示播放量弹幕量等信息(默认显示)：hideCoverInfo 

是否隐藏弹幕按钮（默认不隐藏）：hideDanmakuButton 

是否隐藏全屏按钮(默认显示)：noFullScreenButton 

是否开始记忆播放(默认开启)：fjw 

默认开始时间(单位秒，默认0)：t 

是否显示高清(默认否)：highQuality（无用的，因为除了参数外它还判断了网址是否来自bilibili）

# 列表
列表最大的特点就是整齐、整洁、有序，它作为布局会更加自由和方便

根据使用情景不同，列表可以分为三大类：无序列表、有序列表和自定义列表

## ol 有序列表
表示有序列表，通常渲染为一个**带编号**的列表，歌曲排行榜、游戏排行榜等

ordered list

```html
<ol type="A" reversed start="4">
  <li>第一步</li>
  <li>第二步</li>
  <li>第三步</li>
</ol>
```

### type 属性
+ `a` 表示小写英文字母编号
+ `A` 表示大写英文字母编号
+ `i` 表示小写罗马数字编号
+ `I` 表示大写罗马数字编号
+ `1` 表示数字编号（默认）编号类型适用于整个列表

这个属性在 HTML4 中弃用，但是在 HTML5 中被重新引入

除非列表中序号很重要（比如，在法律或者技术文件中条目通常被需要所引用）

否则请使用 CSS [`list-style-type`]属性替代

### reversed 属性
此布尔值属性指定列表中的条目是否是倒序排列的，即编号是否应从高到低反向标注

### start 属性
一个整数值属性，指定了列表编号的起始值。此属性的值应为**阿拉伯数字**

尽管编号类型 `type` 属性可能指定为了罗马数字编号等其他类型的编号

比如想要让元素的编号从英文字母 "d" 或者罗马数字 "iv" 开始，**都应当使用**`start="4"`

## ul 无序列表
unordered list

常用于制作菜单或新闻列表、导航栏

```html
<ul type="disc">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

注意事项：

• ul 标签里面只能包裹 li 标签 

• li 标签里面可以包裹任何内容

### type 属性
+ disc 实心圆点（默认值）
+ circle 空心圆点
+ square 实现方点 

**不建议使用type 属性，尽量在css 中设置样式**

## 定义列表
HTML 定义列表 `<dl>` 的常规用法主要用于展示 **术语-描述** ，以下是其典型使用场景和示例：

![](assets/1746161377954-ae57793e-d311-4a98-8a30-c9d6f490fe4d.png)

**dl ：** definition list **定义列表**

**dt：** definition title 定义列表的**标题**

**dd：** definition description 是定义列表的**描述/ 详情**

```html
<dl>
  <dt>帮助中心</dt>
  <dd>账户管理</dd>
  <dd>购物指南</dd>
  <dd>订单操作</dd>

  <dt>服务支持</dt>
  <dd>售后政策</dd>
  <dd>自动服务</dd>
  <dd>相关下载</dd>
</dl>
```

+ 三个标签之间不允许出现其他标签
+ dl 与 dt 必须相邻
+ **dl 里面只能包含dt 和 dd**
+ dt 和 dd 里面可以包含任何内容

**常规用法场景词汇表/术语表用途**：专业术语解释

```html
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于构建网页结构</dd>

  <dt>CSS</dt>
  <dd>层叠样式表，用于控制网页外观</dd>
</dl>
```

**元数据展示用途**：键值对形式的信息

```html
<dl>
  <dt>作者</dt>
  <dd>鲁迅</dd>

  <dt>出版日期</dt>
  <dd>1918年4月</dd>

  <dt>出版社</dt>
  <dd>新青年杂志社</dd>
</dl>
```

**常见问题解答 (FAQ)用途**：问题与答案配对

```html
<dl>
  <dt>如何注册账号？</dt>
  <dd>点击首页右上角的「注册」按钮填写信息</dd>

  <dt>忘记密码怎么办？</dt>
  <dd>通过登录页的「找回密码」功能重置</dd>
</dl>
```

## 列表嵌套
**列表项**中也有可能包含**若干子列表项**。这种在**列表项**中定义**子列表项**的方法被称为列表的嵌套，某一类商品被分为若干小类，这些小类通常还包含若干的子类

# iframe 内联框架
提出用于网页中嵌入另一个页面，一般用于播放其他网站视频

iframe 可替换元素

1. 通常为行盒
2. 通常显示的内容取决于元素的属性
3. CSS 不能完全控制其中的样式
4. 具有行块盒的特点

页面上的每个`<iframe>`都需要**增加内存和其他计算资源**，这是因为每个浏览上下文都拥有完整的文档环境

虽然理论上来说能够在代码中写出来无限多的`<iframe>`，但是最好考虑性能问题 

```html
<iframe src="URL"></iframe>
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
<!-- 移除边框  -->
<iframe src="demo_iframe.htm" frameborder="0"></iframe>
```

## 属性
该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

+ [allow](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#allow)

用于为`<iframe>`指定其[特征策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Permissions_Policy).

+ [allowfullscreen](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#allowfullscreen)

设置为`true`时，可以通过调用 `<iframe>` 的 [requestFullscreen()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen) 方法激活全屏模式

**备注：** 这是一个历史遗留属性，已经被重新定义为 `allow="fullscreen"`

+ [allowpaymentrequest](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#allowpaymentrequest)

# HTML 表单
表单用于**收集用户输入的数据**，比如登录、注册、搜索框等。表单数据通常会被发送到服务器进行处理

一个完整的表单通常由表单域、表单控件（也称为表单元素）和 提示信息3个部分构成

+ **表单域：** 是一个包含表单元素的区域，容纳所有表单信息，处理表单数据所用的URL、提交方法等
+ **表单控件：** 包含具体表单功能，濡单行文本输入框、密码输入框、复选、提交等
+ **提示信息 ：** 表单中包含说明性的文字，提示用于进行填写操作

## 表单元素
**HTML 表单用于搜集不同类型的用户输入**

表单允许用户输入文本、选择选项、上传文件等，然后将这些数据提交到服务器进行处理

### form 元素
通常情况下会将整个表单元素，放置到form元素的内部，作用是当提交表单时，会将form元素内部的表单内容以合适的方式提交到服务器

form 对开发静态页面没有什么意义，但要想表单中数据传输给服务器，必须要定义表单域，表单处理程序通常是包含用来处理输入数据的脚本的服务器页面

`<form>` 元素，已设置所有可能的属性，是这样的：

```html
<form 
  action="action_page.php" 
  method="GET" 
  target="_blank" 
  accept-charset="UTF-8"
  ectype="application/x-www-form-urlencoded" 
  autocomplete="off" 
  novalidate>
</form>
```

| **属性** | **描述** |
| :--- | :--- |
| accept-charset | 规定用于表单提交的字符编码。 |
| action | 规定提交表单时将表单数据发送到何处。 |
| autocomplete | 规定表单是否应打开自动完成（填写）功能。 |
| enctype | 规定将表单数据提交到服务器时应如何编码（仅供 method="post"）。 |
| method | 规定发送表单数据时要使用的 HTTP 方法。 |
| name | 规定表单名称。 |
| novalidate | 规定提交时不应验证表单。 |
| rel | 规定链接资源和当前文档之间的关系。 |
| target | 规定提交表单后在何处显示接收到的响应。 |

#### Action 属性
`action`属性用于指定接收并处理表单数据的服务器程序的`url`地址

```html
<form action="url地址" method="提交方法" name="表单名称">
  账号：<br>
  <input type="text" name="usermane" id=""><br>
  密码<br>
  <input type="password" name="" id=""><br>
  <button type="submit">提交数据</button>
</form>
```

向服务器提交表单的通常做法是使用提交按钮

通常，表单会被提交到 web 服务器上的网页，指定某个服务器脚本来处理被提交表单：

`<form action="action_page.php">`

如果省略 action 属性，则 action 会被设置为当前页面

#### Method 属性
`method` 属性规定在提交表单时所用的 **HTTP 方法（ GET 或 POST）**

```html
<form action="action_page.php" method="GET">
<form action="action_page.php" method="POST">
```

**何时使用 GET？**

使用 GET（默认方法）：

如果表单提交是被动的（比如搜索引擎查询），并且**没有敏感信息**

当您使用 GET 时，表单数据在页面地址栏中是可见的：

`action_page.php?firstname=Mickey&lastname=Mouse`

注释：GET 最适合少量数据的提交。浏览器会设定容量限制

**何时使用 POST？**

使用 POST：

如果表单正在更新数据，或者包含**敏感信息（例如密码）**

POST 的安全性更好，因为在页面地址栏中被提交的数据是不可见的

**关于 GET 的注意事项**：

+ 以名称/值对的形式将表单数据追加到 URL
+ 永远不要使用 GET 发送敏感数据！（提交的表单数据在 URL 中可见！）
+ URL 的长度受到限制（2048 个字符）
+ 对于用户希望将结果添加为书签的表单提交很有用
+ GET 适用于非安全数据，例如 Google 中的查询字符串

**关于 POST 的注意事项：**

+ 将表单数据附加在 HTTP 请求的正文中（不在 URL 中显示提交的表单数据）
+ POST 没有大小限制，可用于发送大量数据
+ 带有 POST 的表单提交无法添加书签

提示：如果表单数据包含敏感信息或个人信息，请务必使用 POST！

#### Name 属性
`name`属性用于指定表单的名称，以区分同一个页面中的多个表单，如果要正确地被提交，每个输入字段必须设置一个 name 属性

本例只会提交 "username 、userpsd" 输入字段：

```html
<form action="" method="">
  账号：<br>
  <input type="text" name="username" id=""><br>
  密码<br>
  <input type="password" name="userpsd" id=""><br>
  <button type="submit">提交数据</button>
</form>
```

#### Target 属性
`target` 属性规定提交表单后在何处显示响应

`target` 属性可设置以下值之一：

| **值** | **描述** |
| :--- | :--- |
| _blank | 响应显示在新窗口或选项卡中 |
| _self | 响应显示在当前窗口中 |
| _parent | 响应显示在父框架中 |
| _top | 响应显示在窗口的整个 body 中 |
| framename | 响应显示在命名的 iframe 中 |

默认值为 `_self`，这意味着响应将在当前窗口中打开

#### Autocomplete 属性
`autocomplete` 属性规定表单是否应打开自动完成功能

启用自动完成功能后，浏览器会根据用户之前输入的值自动填写值

启用自动填写的表单：

```html
<form action="/action_page.php" autocomplete="on">
```

#### Novalidate 属性
`novalidate` 属性是一个布尔属性

如果已设置，它规定提交时不应验证表单数据

未设置 novalidate 属性的表单：

```html
<form action="/action_page.php" novalidate>
```

### input 输入框
`input` 元素是最重要的表单元素，网页中常见的单行文本框、单选按钮、复选框等都是通过它定义的

+ type 属性：输入框类型
+ value 属性：输入框的值
+ placeholder属性：显示提示的文本，文本框没有内容时显示

表单本身并不可见，还要注意文本字段的默认宽度是 20 个字符

实际使用中，**通常会将 input 控件与 lable 联合使用**，扩大控件选择范围，提供更好的体验

`type` 属性：指定输入字段的类型，它可以有以下不同的值：

+ `text`：创建文本输入框，用于用户输入文本
+ `password`：创建密码输入框，输入内容会被隐藏
+ `radio`：创建单选按钮，用户只能选择一个选项
+ `checkbox`：创建复选框，用户可以选择多个选项
+ `number`：创建数字输入框，允许用户输入数字
+ `email`：创建用于输入电子邮件地址的输入框
+ `file`：创建文件上传字段，用户可以上传文件
+ `submit`：创建提交按钮，用于提交表单数据
+ `reset`：创建重置按钮，用于重置表单数据
+ `button`：创建自定义按钮，通常与 JavaScript 一起使用
+ `hidden` **：隐藏域，在表单中并不会显示出来，但是在提交表单的时候是会提交到服务端的**
+ ![](assets/1774612844038-7f2881e5-c74d-47f7-830a-7601581de300.png)

---

#### text 文本
`input type="text"` 定义供文本输入的单行输入字段：栗如用户名、账号、证件号等

```html
<input type="text" name="firstname">
```

#### password 密码
`input type="password"` 定义密码字段：

```html
<input type="text" name="username">
<input type="password" name="psw">
```

注释：password 字段中的字符会被做掩码处理（显示为星号或实心圆）

#### date 日期
`input type="date"`用于应该包含日期的输入字段

根据浏览器支持，日期选择器会出现输入字段中

+ month 选择月份和年份；
+ week 选择周和年；
+ time 允许用户选择时间（无时区）；
+ datetime允许用户选择日期和时间（有时区）

根据浏览器支持，日期选择器会出现输入字段中

#### search 搜索字段
`input type="search"`用于搜索字段（搜索字段的表现类似常规文本字段）

```html
<input type="search" name="googlesearch">
```

#### color 颜色
`input type="color"` 用于应该包含颜色的输入字段

```html
Select your favorite color:
<input type="color" name="favcolor">
```

#### range 滑块范围值
`input type="range"` 用于应该包含一定范围内的值的输入字段

```html
<input type="range" name="points" min="0" max="10">
```

使用如下属性来规定限制：min、max、step、value

#### number 数字值
`input type="number"` 用于应该包含数字值的输入字段

```html
<input type="number" min="1" max="50" step="5">
```

min：最小值  max：最大值  step：步进值

#### radio 单选框
`input type="radio"` 定义单选按钮

单选框允许用户在有限数量的选项中只选择一个选项

```html
<input type="radio" name="sex" value="male">男
<input type="radio" name="sex" value="female">女
```

单选框需要设置 name 属性进行分组，用于提交表单，表单提交值为 value

#### checkbox 多选框
`input type="checkbox"`定义复选框

复选框允许用户在有限数量的选项中选择零个或多个选项

多选框需要设置 name 属性进行分组，用于提交表单，表单提交值为 value

默认选中：`checked`

```html
<input type="checkbox" name="hobby" value="唱">唱
<input type="checkbox" name="hobby" value="跳">跳
<input type="checkbox" name="hobby" value="rap">rap
```

#### file 文件
当定义文件域时，页面中将出现一个文本框和一个“浏览...”按钮，用户可以通过填写文件路径或直接选择文件的方式，将文件提交给后台服务器

```html
<input type="file">
```

#### email 电子邮件
`input type="email"`用于应该包含电子邮件地址的输入字段

根据浏览器支持，能够在被提交时自动对电子邮件地址进行验证

某些智能手机会识别 email 类型，并在键盘增加 ".com" 以匹配电子邮件输入

```html
E-mail:
<input type="email" name="email">
```

#### tel 电话号码
`input type="tel"`用于应该包含电话号码的输入字段

目前只有 Safari 8 支持 tel 类型

```html
Telephone:
<input type="tel" name="usrtel">
```

#### url 链接地址
`input type="url"`用于应该包含 URL 地址的输入字段

根据浏览器支持，在提交时能够自动验证 url 字段

某些智能手机识别 url 类型，并向键盘添加 ".com" 以匹配 url 输入

```html
Add your homepage:
<input type="url" name="homepage">
```

#### submit 提交按钮
`input type="submit"`定义提交表单数据至表单处理程序的按钮

表单处理程序（form-handler）通常是包含处理输入数据的脚本的服务器页面

在表单的 action 属性中规定表单处理程序（form-handler）：

```html
<input type="submit" value="Submit">
```

如果省略了提交按钮的 value 属性，那么该按钮将获得默认文本：

#### button 点击按钮
`input type="button"` 定义按钮

```html
<input type="button" 
  onclick="alert('Hello World!')" 
  value="Click Me!"
>
```

以上 HTML 代码在浏览器中看上去是这样的

注释：老式 web 浏览器不支持的输入类型，会被视为输入类型 text

#### reset 重置按钮
当用户输入的信息有误时，可单击重置按钮取消已输入的所有表单信息

可以对其应用value属性，改变重置按钮上的默认文本

```html
<input type="reset" />
```

#### 输入限制
这里列出了一些常用的输入限制（其中一些是 HTML5 中新增的）：

| **属性** | **描述** |
| :--- | :--- |
| disabled | 规定输入字段应该被禁用 |
| max | 规定输入字段的最大值 |
| maxlength | 规定输入字段的最大字符数 |
| min | 规定输入字段的最小值 |
| pattern | 规定通过其检查输入值的正则表达式 |
| readonly | 规定输入字段为只读（无法修改） |
| required | 规定输入字段是必需的（必需填写） |
| size | 规定输入字段的宽度（以字符计） |
| step | 规定输入字段的合法数字间隔 |
| value | 规定输入字段的默认值 |

### select 下拉列表
`<select>`元素定义下拉列表：

```html
<select name="city" size="指定下拉菜单的可见数" multiple（多选） >
  <option value="shanghai">上海</option>
  <option value="beijing">北京</option>
  <option value="zhangye">张掖</option>
  <option value="jinan">济南</option>
</select>
```

#### selection
+ size 指定下拉菜单的可见选项数，取值为正整数
+ multiple：定义下拉菜单是否具有多项选择的功能，Ctrl 按住选择

#### option
`option`元素定义待选择的选项

列表通常会把首个选项显示为被选选项

能够通过添加 selected 属性来定义预定义选项

```html
<option value="zhangye" selected>张掖</option>
```

#### optgroup
`<optgroup>`元素定义分组

```html
<select name="">
  <optgroup label="B站主播">
    <option value="">1</option>
    <option value="">2</option>
    <option value="">3</option>
  </optgroup>
  <optgroup label="斗鱼主播">
    <option value="">1</option>
    <option value="">2</option>
    <option value="">3</option>
  </optgroup>
</select>
```

### textarea 文本域
`textarea` 元素定义多行输入字段（文本域）：

使用多行文本输入控件，可以输入更多的文字，该控件常见于留言板，评论

rows ：行数

cols：列数

内部无空白折叠

由于各浏览器对cols 和 rows 理解不同，显示效果会有差异

实际开发中不会使用，建议使用 CSS 宽高属性控制文本域大小

```html
<textarea name="message" rows="10" cols="30">
  The cat was playing in the garden.
</textarea>
	
```

实际开发中，使用 CSS 设置 文本域的尺寸 

实际开发中，一般禁用右下角的拖拽功能

### button 按钮
`button` 元素定义可点击的**按钮**：

```html
<button type="button" onclick="alert('Hello World!')">点击按钮</button>
<!-- form 表单区域 -->
<!-- action="" 发送数据的地址 -->
<form action="">
  用户名：<input type="text">
  <br><br>
  密码：<input type="password">
  <br><br>

  <!-- 如果省略 type 属性，功能是 提交 -->
  <button type="submit">提交</button>
  <button type="reset">重置</button>
  <button type="button">普通按钮</button>
</form>
```

type 属性：reset、submit、button，默认值为 submit

| **type属性值** | **说明** |
| :--- | :--- |
| submit(默认) | 提交按钮，点击提交数据到后台 |
| button | 普通按钮，默认无功能，配合JS |
| reset | 重置按钮，恢复表单控件默认值 |

**补充说明**：`button`与 `input type="submit"` 的区别：

+ `button` 可包含文本、图标或其他 HTML 元素，更灵活
+ `input type="submit"` 仅支持纯文本

### lable 元素关联标签

通常配合单选多选框使用，用于绑定一个表单元素,

当点击`<label>` 标签内的文本时，浏览器就会自动将焦点(光标)转到或者选择对应的表单元素上,用来增加用户体验,增大表单控件的点击范围

作用：网页中，某个标签的说明文本

+ 显示关联

```html
<input id="radman" type="radio" name="sex" value="man">
<label for="radman">男</label>
```

lable 关联某一个表单元素，设置 `for属性=“ 表单元素id ”`，实现点击文本部分也可以选择

+ 隐式关联

使用 label 标签包裹文字和表单控件，不需要属性

```html
<label>
  <input type="radio" name="sex" value="man">
  男
</label>
<label>
  <input type="radio" name="sex" value="femal">
  女
</label>
```

提示：

**支持 label 标签增大点击范围的表单控件：文本框、密码框、文件、单选框、多选框、下拉菜单、文本域等等**

### datalist 元素
数据列表，该元素本身不会显示到页面，通常和普通文本框配合使用

`<datalist>`元素为 `<input>`元素规定预定义选项列表

用户会在他们输入数据时看到预定义选项的下拉列表

`<input>` 元素的 **list** 属性必须引用 `<datalist>` 元素的 **id** 属性

通过 `<datalist>` 设置预定义值的 `<input>` 元素：

```html
<input list="userAgent" type="text" placeholder="输入常用的浏览器">

<datalist id="userAgent">
  <option value="Chrome">谷歌浏览器</option>
  <option value="IE">IE浏览器</option>
  <option value="Firefox">火狐浏览器</option>
</datalist>
```

输入 字母 C 后会提示输入谷歌浏览器

### fieldset 元素
`<fieldset>`元素用于在 HTML 表单中对相关数据进行组合。它能将表单内的相关控件分组，形成一个逻辑上的单元。比如在一个注册表单中，可将个人信息部分（姓名、年龄等）用`<fieldset>`包裹起来，使其与其他部分（如联系方式部分）区分开，这样在视觉和逻辑上都更清晰

`<fieldset>`元素有助于组织和管理表单内容，提升用户体验和表单的可维护性

`<legend>` 元素为 `<fieldset>` 元素定义标题

```html
<form action="" method="">
  <fieldset>
    <legend>账号信息</legend>
    账号：<input type="text" name="username" id=""><br>
    密码：<input type="password" name="userpsd" id=""><br>
  </fieldset>

  <fieldset>
    <legend>性别信息</legend>
    <input type="radio" name="sex" value="man">男
    <input type="radio" name="sex" value="femal">女
  </fieldset>
</form>
```

## 表单状态属性
### value 字段初始值
`value` 属性规定输入字段的初始值：

```html
<form action="">
  First name:<br>
  <input type="text" name="firstname" value="Bill"><br>
  Last name:<br>
  <input type="text" name="lastname">
</form>
```

### readonly 只读
`readonly` 属性规定输入字段为只读（不能修改）：

```html
<form action="">
  First name:<br>
  <input type="text" name="firstname" value="Bill" readonly><br>
  Last name:<br>
  <input type="text" name="lastname">
</form>
```

readonly 属性不需要值。它等同于 readonly="readonly"

### hidden 隐藏
### disabled 禁用
`disabled` 属性规定输入字段是禁用的

被禁用的元素是不可用和不可点击的

被禁用的元素不会被提交

```html
<form action="">
  First name:<br>
  <input type="text" name="firstname" value="Bill" disabled>
  <br>
  Last name:<br>
  <input type="text" name="lastname">
</form>
```

disabled 属性不需要值。它等同于 `disabled="disabled"`

### size 字段尺寸
`size` 属性规定输入字段的尺寸（以字符计）：

```html
<form action="">
  First name:<br>
  <input type="text" name="firstname" value="Bill" size="40">
  <br>
  Last name:<br>
  <input type="text" name="lastname">
</form>
```

### maxlength 最大长度
`maxlength` 属性规定输入字段允许的最大长度：

```html
<form action="">
  First name:<br>
  <input type="text" name="firstname" maxlength="10"><br>
  Last name:<br>
  <input type="text" name="lastname">
</form>
```

如设置 maxlength 属性，则输入控件不会接受超过所允许数的字符

该属性不会提供任何反馈。如果需要提醒用户，则必须编写 JavaScript 代码

注释：输入限制并非万无一失。JavaScript 提供了很多方法来增加非法输入。如需安全地限制输入，则接受者（服务器）必须同时对限制进行检查

### autocomplete 自动填充
`autocomplete `属性规定表单或输入字段是否应该**自动完成**

当自动完成开启，浏览器会基于用户之前的输入值自动填写值

提示：可以把表单的 autocomplete 设置为 on，同时把特定的输入字段设置为 off，反之亦然

autocomplete 属性适用于 `<form> `以及如下 `<input>` 类型：text、search、url、tel、email、password、datepickers、range 以及 color

敏感字段添加`autocomplete="off"`

```html
<form action="action_page.php" autocomplete="on">
  First name:<input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br>
  E-mail: <input type="email" name="email" autocomplete="off"><br>
  <input type="submit">
</form>
```

提示：在某些浏览器中也许需要手动启用自动完成功能

### novalidate 不验证
`novalidate` 属性属于 `<form>` 属性

如果设置，则 novalidate 规定在提交表单时不对表单数据进行验证

指示表单在被提交时不进行验证：

```html
<form action="action_page.php" novalidate>
  E-mail: <input type="email" name="user_email">
  <input type="submit">
</form>
```

### autofocus 自动焦点
`autofocus` 属性是布尔属性

如果设置，则规定当页面加载时 `<input>` 元素应该自动获得焦点

使 "First name" 输入字段在页面加载时自动获得焦点：

```html
First name:<input type="text" name="fname" autofocus>
```

### height 和 width
height 和 width 属性规定 < input> 元素的高度和宽度

height 和 width 属性仅用于 `<input type="image">`

注释：请始终规定图像的尺寸。如果浏览器不清楚图像尺寸，则页面会在图像加载时闪烁

把图像定义为提交按钮，并设置 height 和 width 属性：

```html
<input type="image" src="img_submit.gif" alt="Submit" width="48" height="48">
```

## 表单简单验证
### min max 最大最小值
min 和 max 属性规定 `<input>` 元素的最小值和最大值

min 和 max 属性适用于如需输入类型：number、range、date、datetime、datetime-local、month、time 以及 week

具有最小和最大值的 `<input>` 元素：

```html
请输入 1980 年 01 月 01 日之前的日期：
<input type="date" name="bday" max="1979-12-31">
请输入 2000 年 01 月 01 日之后的日期：
<input type="date" name="bday" min="2000-01-02">
数量（1 至 5 之间）：
<input type="number" name="quantity" min="1" max="5">
```

### multiple 是否多个值
multiple 属性是布尔属性

如果设置，则规定允许用户在 `<input>` 元素中输入一个以上的值

multiple 属性适用于以下输入类型：email 和 file

接受多个值的文件上传字段：

```html
请选择图片：<input type="file" name="img" multiple>
```

### pattern 检测正则
pattern 属性规定用于检查 `<input>` 元素值的正则表达式

pattern 属性适用于以下输入类型：text、search、url、tel、email、and password

提示：请使用全局的 title 属性对模式进行描述以帮助用户

提示： JavaScript 教程有关正则表达式的知识

只能包含三个字母的输入字段（无数字或特殊字符）：

```html
Country code: 
<input 
  type="text" name="country_code" pattern="[A-Za-z]{3}" 
  title="Three letter country code"
>
```

实际使用建议[直接查询](https://stackoverflow.org.cn/regexsucha/#google_vignette)

### placeholder 属性
`placeholder` 属性规定用以描述输入字段预期值的提示（样本值或有关格式的简短描述）

该提示会在用户输入值之前显示在输入字段中

placeholder 属性适用于以下输入类型：text、search、url、tel、email 以及 password

拥有占位符文本的输入字段：

```html
<input type="text" name="fname" placeholder="First name">
```

### required 是否必填
required 属性是布尔属性

如果设置，则规定在提交表单之前**必须填写**输入字段

required 属性适用于以下输入类型：text、search、url、tel、email、password、date pickers、number、checkbox、radio、and file

必填的输入字段：

```html
Username: <input type="text" name="usrname" required>
```

### step 合法间隔
step 属性规定`<input>` 元素的合法数字间隔

示例：如果 step="3"，则合法数字应该是 -3、0、3、6、等等

提示：step 属性可与 max 以及 min 属性一同使用，来创建合法值的范围

step 属性适用于以下输入类型：number、range、date、datetime、datetime-local、month、time 以及 week

拥有具体的合法数字间隔的输入字段：

```html
<input type="number" name="points" step="3">
```

## 表单样式元素
### : focus 聚焦
获得焦点的元素（如表单输入）。当点击或轻触一个元素或使用键盘的 Tab 键选择它时会被触发

```css
input:focus {
  background: yellow;
  color: red;
  outline:1px solid red;
}
```

### : checked 选中
单选多选框被选中的样式

```css
input:checked+label {
  color: red;
}
```

```html
<input id="radman" type="radio" name="sex" value="man">
<label for="radman">男</label>
<input id="radfemal" type="radio" name="sex" value="felman">
<label for="radfemal">女</label>
```

### 常见用法
**重置表单元素样式**

方便自定义样式

```css
input,select,textarea,button {
  border: none;
}
input:focus,select:focus,textarea:focus,button:focus {
  outline: none;
  outline-offset：0;
}
```

**设置多行文本框 textarea 是否允许调整尺寸**

调整css 属性 resize:

+ both：默认值，两个方向都能调整
+ none：不能调整尺寸
+ horizontal：水平方向调整
+ vertical：垂直方向调整

文本框边缘到内容的距离

	方法一：padding 调整内边距
	
	方法二：使用text-indent，首行缩进

控制单选和多选的样式

# HTML 表格
## 表格介绍
css未出现之前，使用表格对网页进行布局，后台管理系统中使用表格

表格的渲染速度过慢，嵌套过深，不适合用来布局

**tr** - table -row 表格行

**th**- table header 表格头

**td**- table -data 表格单元格

| 标签 | 描述 |
| --- | --- |
| <table> | 定义表格整体 |
| <thead> | 用于定义表格头部(可选) |
| <tbody> | 定义表格中的主体部分(可选) |
| <tr> | 表格的行，可以包裹多个 <td> |
| <td> | 表格单元格(普通)，可以包裹内容； |
| <th> | 如果是表头单元格，可以替换为 <th> |

```html
<table>
  <tr>
    <th>表头1</th>
    <th>表头2</th>
    <th>表头3</th>
    <th>表头4</th>
  </tr>
  <tr> ///第1行
    <td>单元格内的文字</td>///1.1
    <td>单元格内的文字</td>///1.2
  </tr>
  <tr> ///第2行
    <td>单元格内的文字</td>///2.1
    ...
  </tr>
  ...
</table>
```

`<table> </table>` 是用于定义表格**开始结束**的标签

`<tr> </tr>` 标签用于定义表格中的**行**，必须嵌套在 `<table> </table>`标签中

`<td> </td>` 用于定义表格中的**单元格**，必须嵌套在`<tr></tr>`标签中

字母 `td` 指表格数据（table data），即数据单元格的内容

在网页中，表格默认没有边框线，使用 border 属性可以为表格添加边框线

## table 标签属性
控制表格的整体显示样式

| **属性** | **描述** | **常见属性值或单位** |
| :--- | :--- | :--- |
| border | 设置表格边框（默认border=0） | 像素 |
| cellspacing | 设置单元格与单元格之间的距离 | 已废弃 |
| cellpadding | 设置单元格内容与单元格边缘的距离 | 已废弃 |
| width | 设置表格宽度 | 像素 |
| height | 设置表格高度 | 像素 |
| align | 设置表格在网页中的水平对齐方式 | left、center、right |
| bgcolor | 设置表格背景颜色 | 预定义、十六进制、rgb |
| background | 设置表格背景图像 | url 地址 |

+ 要在表格单元格上添加填充，请使用CSS`padding`属性：
+ 要更改表格**单元格之间的间距**，请使用CSS`border-spacing`属性：
+ 直接使用边框或其他取值为像素的属性时，可以省略单位 px
+ align属性控制表格在页面中的对齐方式，单元格内容不受影响

## tr 标签属性
控制表格中某一行的样式

| **属性** | **描述** | **常见属性值或单位** |
| :--- | :--- | :--- |
| height | 设置行高 | 像素 |
| align | 设置一行内容的水平对齐方式 | left、center、right |
| valign | 设置一行内容的垂直对齐方式 | top、center、bottom |
| bgcolor | 设置行背景颜色 | 预定义、十六进制、rgb |
| background | 设置行背景图像 | url 地址 |

+ 无 width 宽度属性，宽度取决于 table 标签
+ 实际开发使用css 控制对应样式

## td 标签属性
控制表格中某一单元格的样式

| **属性** | **描述** | **常见属性值或单位** |
| :--- | :--- | :--- |
| colspan | 合并水平方向单元格 | 正整数 |
| rowspan | 合并垂直方向单元格 | 正整数 |
| align | 设置单元格内容的水平对齐方式 | left、center、right |
| valign | 设置单元格内容的垂直对齐方式 | top、center、bottom |
| bgcolor | 设置单元格背景颜色 | 预定义、十六进制、rgb |
| background | 设置单元格背景图像 | url 地址 |

在`<td>`标签的属性中，重点掌握colspan和rolspan，其他的属性了解即可不建议使用，均用CSS样式属性替代

当对某一个`<td>`标签应用width、height属性设置宽高，该列中的所有单元格均会以设置的宽度显示

## th 标签属性
一般表头单元格位于表格的第一行或第一列，表头单元格里面的文本内容默认加粗居中显示

`<th> `标签表示 HTML 表格的表头部分(table head 的缩写)，属性与 td 标签完全一致，只是语义不同

```html
<table>
  <tr>
    <th>姓名</th>
    <th>年龄</th>
    ...
  </tr>
  ...
</table>
```

## 表格属性
表格标签这部分属性实际开发不常用，后面通过 CSS 来设置

| **属性名** | **属性值** | **描述** |
| :--- | :--- | :--- |
| align | left、center、right | 规定表格相对周围元素的对齐方式。 |
| border | 1 或 "" | 规定表格单元是否拥有边框，默认为 ""，表示没有边框 |
| cellpadding | 像素值 | 规定单元边沿与其内容之间的空白，默认 1 像素。 |
| cellspacing | 像素值 | 规定单元格之间的空白，默认 2 像素。 |
| width | 像素值或百分比 | 规定表格的宽度。 |

## 表格结构标签
使用场景:因为表格可能很长,为了更好的表示表格的语义，可以将表格分割成 表格头部和表格主体两大部分在表格标签中，分别用：`<thead>`标签表示表格的头部区域、`<tbody>`标签表示表格的主体区域，这样可以更好的分清表格结构

**总结:**

+ `<thead> </thead>`：用于定义表格的头部,内部必须拥有`<tr>`标签
+ `<tfoot> </tfoot>`：用于定义表格的页脚，一般包含网页底部信息
+ `<tbody> </tbody>`：用于定义表格的主体，主要用于放数据本体 

注意：

+ 一个表格只能定义一对 thead，一对 tfoot ，但可以定义多对 tbody 
+ 需按照 thead，tfoot ，tbody 顺序使用
+ tfoot 置于 tbody 之前，为了浏览器在接收到全部数据之前就可以显示页脚

## 合并单元格
**合并单元格方式：跨行合并**：`rowspan`="合并单元格的个数" 

	最上侧单元格为目标单元格, 写合并代码

**跨列合并**：`colspan`="合并单元格的个数"

	最左侧单元格为目标单元格, 写合并代码

**合并单元格三步曲：**

先确定是跨行还是跨列合并

找到目标单元格. 写上合并方式 = 合并的单元格数量

	比如：`<td colspan="2"></td>`

删除多余的单元格

# Canvas 画布
网页中把用于绘制图形的特殊区域也称为“画布”，网页设计师可以在该区域义绘制自定的图形样式

## 使用画布
**创建画布**

使用HTML5中的`canvas`标签可以在网页中创建画布

```html
<canvas id="画布名称" width="数值" height="数值">
  您的浏览器不支持canvas
</canvas>
```

**获取画布**

在JavaScript中控制画布首先要使用`getElementById()` 方法获取网页中的画布对象

```javascript
let canvas = document.getElementById('mycanvas');
```

**准备画笔**

`context` 对象也被称为绘制环境，通过该对象，可以在画布中绘制图形

在JavaScript中通常会定义一个变量来保存获取的`context` 对象

```javascript
let context = canvas.getContext('2d');
```

**初始化路径**

开始一条新的路径，这意味着后续绘制的图形将独立于之前的路径

避免新绘制的图形与旧图形相互连接或产生不必要的合并效果

例如，要绘制一个圆形和一个矩形，且它们相互独立不相连时

绘制圆形前调用 `context.beginPath ();` 

绘制矩形前再调用一次，就能确保两者是分开的独立图形

```javascript
context.beginPath();
```

## 绘制线
一条最简单的线由三部分组成，分别为**初始位置、连线端点**以及**描边**

```javascript
// 获取画布
let canvas = document.getElementById('mycanvas');
// 获取画笔
let context = canvas.getContext('2d');
// 绘制线
context.beginPath(); //初始化一个新的路径
// 将画笔移动到坐标 (100, 100) 的位置
// 这里的坐标以 Canvas 元素的左上角为原点 (0, 0)
// 此操作不会绘制线条，只是定位画笔的起始点
context.moveTo(100, 100);
// 从当前画笔位置
// （即通过moveTo设定的 (100, 100)）绘制一条直线到坐标 (300, 300) 处
context.lineTo(300, 300);
// 对当前路径进行描边操作
context.stroke(); 
```

**初始位置context.moveTo(100, 100);**

在平面中（2d），初始位置可以通过“x，y”的坐标轴来表示

在画布中从最左上角“0，0”开始，x轴向右增大， y轴向下增大

**连线端点context.lineTo(100,100);**

连线端点用于定义一个端点，并绘制一条从该端点到初始位置的连线

**添加描边context.stroke();**

通过初始位置和连线端点可以绘制一条线，但这条线并不能被看到

需要为线添加描边，让线变得可见

## 线的样式
**宽度**

使用画布中的lineWidth属性可以定义线的宽度，该属性的取值为数值（不带单位），以像素为计量

```javascript
context.lineWidth='10';
```

**描边颜色**

使用画布中的strokeStyle属性可以定义线的描边颜色，该属性的取值为十六进制颜色值或颜色英文

```javascript
context.strokeStyle='#f00';
context.strokeStyle='red';
```

**端点形状**

默认情况下，线的端点是方形的，通过画布中的lineCap属性可以改变端点的形状

```javascript
context.lineCap = 'round';
```

+ `'butt'`：无延伸，平端
+ `'square'`：延伸方形帽（长度 = 线宽 / 2）
+ `'round'`：延伸圆形帽（半径 = 线宽 / 2）

## 线的路径
**重置路径**	

在同一画布中添加再多的连线端点也只能有一条路径，如果要开始新的路径，就需要使用`beginPath()` 方法

当出现`beginPath()`即表示**路径重新开始闭合路径**

闭合路径就是将我们绘制的开放路径，进行封闭处理，多点的路径闭合后会形成特定的形状

在画布中，使用`closePath()`方法**闭合路径填充路径**

使用画布中的`fill()`方法填充图形

```javascript
var context = document.getElementById("cas").getContext('2d');
context.moveTo(10,10);//定义初始位置
context.lineTo(10,100);//定义连线端点
context.lineTo(100,100);//定义连线端点
context.fill();//填充图形
```

## 绘制圆
在画布中，使用`arc()`方法可以绘制圆或弧线

`arc(x,y,r,开始角,结束角,方向)`

```javascript
// 绘制圆
context.beginPath();
context.arc(100, 100, 50, 0, Math.PI * 2);
context.fill();
```

**x 和 y：** x 和 y 表示圆心在 x 轴和 y 轴的坐标位置

**r ：** 表示圆形或弧形的半径，用于确定图形的大小

**开始角：** 初始弧点位置，这里是 0，以弧度为单位

**结束角：** 结束弧点位置，这里是`Math.PI * 2`，即 2π 弧度，代表完整的一圈

**方向：** 分为顺时针和逆时针绘

# HTML5 数据存储
基于网页的应用越来越普遍，同时也变得越来越复杂，为了满足日益更新的需求，经常会在本地设备上存一些数据，例如记录历史活动信息（用户的登录账号、主题颜色等等）

## Cookie
基本概念

+ 由服务器发送到浏览器的小型文本文件
+ 存储在客户端，每次请求会自动发送到服务器
+ 大小限制：约 4KB

特点

+ **自动发送**：每次 HTTP 请求都会携带同域的 Cookie
+ **过期时间**：可设置过期时间
+ **作用域**：可设置 domain 和 path

在页面中的“下次自动登录”的提示，提醒我们保存账号密码，这样我们下次访问就不再需要输入账号密码，直接登录，这是Cookie的作用之一

当用户第一次访问服务器时，服务器会在响应消息中增加Set-Cookie头字段，将信息以Cookie的形式发送给浏览器，一旦用户接收了服务器发送的Cookie信息，就会将它保存到浏览器的缓冲区中。这样，当浏览器后续访问该服务器时，都会将信息以Cookie的形式发送给服务器，从而使服务器分辨出当前请求是由哪个用户发出的

+ Cookie 被附加在HTTP消息中，无形中增加了数据流量
+ Cookie 在HTTP消息中是明文传输的，所以安全性不高，容易被窃取
+ Cookie 存储于浏览器，可以被篡改，服务器接收后必须先验证数据的合法性
+ 浏览器限制 Cookie 的数量和大小（通常限制为50个，每个不超过4KB），对于复杂存储需求来说不够用

## localStorage
本地存储是指将数据按照键值对的方式保存在客户端计算机中，直到用户或者脚本主动清除数据，否则该数据会一直存在

+ 持久化存储，数据不会过期（除非手动清除）
+ 大小限制：5-10MB（因浏览器而异）
+ 同源策略：同协议+域名+端口

```typescript
// 基本操作
localStorage.setItem('user', JSON.stringify({name: 'John', age: 25}));
const user = JSON.parse(localStorage.getItem('user'));

// 删除
localStorage.removeItem('user');
localStorage.clear(); // 清空所有

// 监听存储变化
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', e.key, e.newValue, e.oldValue);
});
```

## sessionStorage
翻译成中文就是会话的意思，例如现实生活中，打电话时从拿起电话拨号到挂断电话这中间的一系列过程可以称之为一次会话

Web开发中，一次会话是指从一个浏览器窗口打开到关闭的期间，当用户关闭浏览器会话就将结束

**生命周期不同：**

locaStorage是永久性存储，而sessionStorage的生命周期与会话保持一致，**会话结束时数据消失存储位置不同：**

localStorage的数据是存储子在硬盘中，而sessionStorage的数据保存在浏览器的内存中，当浏览器关闭后，内存将被自动清除

+ 会话级存储，关闭标签页后清除
+ 不可跨标签页共享

```typescript
// 用法同 localStorage
sessionStorage.setItem('sessionData', '临时数据');
const data = sessionStorage.getItem('sessionData');
```





## Web 存储对比

| **特性**     | **Cookie**         | **LocalStorage**       | **SessionStorage**         |
| ------------ | ------------------ | ---------------------- | -------------------------- |
| **容量**     | ~4KB               | **5-10MB**             | 5-10MB                     |
| **生命周期** | 可设置过期时间     | **永久**，除非手动删除 | **会话结束**（关闭标签页） |
| **请求携带** | 每次 HTTP 自动携带 | 不参与                 | 不参与                     |
| **作用域**   | 所有同源标签页共享 | 同源共享               | **仅当前标签页**           |
| **访问限制** | 可设 HttpOnly      | 仅客户端               | 仅客户端                   |
| **适用场景** | 身份认证、Session  | 用户偏好、离线数据     | 临时表单、状态             |

**重要**：三者都只能存**字符串**，存对象需 `JSON.stringify()`，取时 `JSON.parse()`



# HTML 层面优化

## DOM 结构优化

1. 控制标签嵌套层级，避免过深，降低解析、重排开销
2. 减少冗余 `<div>`/`<span>`，优先使用语义化标签
3. 缩减 DOM 节点总数，长列表采用虚拟列表、节点懒加载
4. 禁止空 `src`、空 `href`，避免触发无效网络请求

## 资源加载顺序优化

**CSS 放** `<head>`：让浏览器提前加载 CSS提前构建 CSSOM，生成渲染树，规避 FOUC 无样式闪烁

**JS 放** `<body>` **底部**：JS 加载会阻塞 DOM 解析（除非加 `defer`/`async`），放底部可确保 DOM 先解析完成，避免脚本操作未渲染的 DOM

**对关键 JS 用 `defer`/`async`：**

- `defer`：文件并行加载，DOM 解析完成后**按书写顺序**执行，适用于依赖 DOM 的脚本
- `async`：文件并行加载，加载完成**立即执行**，执行顺序不可控，适用于独立脚本（埋点、统计等）



## 图片资源优化

1. 原生懒加载：`<img loading="lazy">`，视口触达后加载，减少首屏请求
2. 响应式图片：使用 `srcset` + `sizes`，根据屏幕尺寸加载对应规格图片
3. 多格式兼容：通过 `<picture>` + `<source>` 优先加载 WebP 等高效格式
4. 所有 `<img>` 必须配置 `alt` 属性，兼顾可访问性与 SEO

## 预加载 / 预连接 / 预解析

1. 资源预加载：`<link rel="preload" href="xxx" as="资源类型">`，提前加载核心静态资源
2. 域名预连接：`<link rel="preconnect" href="域名">`，提前建立 TCP 连接
3. DNS 预解析：`<link rel="dns-prefetch" href="域名">`，提前完成域名解析

## iframe 优化

1. 尽量减少使用，iframe 初始化开销大，阻塞主页面 `onload` 事件
2. 不利于搜索引擎抓取内容，跨域通信成本高
3. 地图类场景优先使用容器挂载 SDK，规避嵌套 iframe

## 代码体积优化

1. 精简代码：移除注释、多余空行、空格
2. 服务端开启 Gzip / Brotli 压缩，减小传输体积

## 渐进式渲染优化

1. 首屏核心 CSS 内联（Critical CSS），非关键样式异步引入
2. 采用骨架屏，提升加载感知体验
3. 结合懒加载、代码分割，优先渲染视口内内容。

## SEO 优化

1. 语义化标签：`<h1>` 唯一，搭配 `<main>`、`<article>`、`<nav>` 等构建清晰页面结构
2. `<title>`：包含核心关键词，控制字符长度
3. `<meta name="description">`：精准概括页面内容，作为搜索摘要
4. 优化 URL，保证路径简洁、语义化
5. 合理使用面包屑导航，提升站内链接权重
6. 规避关键词堆砌、核心内容纯 JS 渲染、大量 iframe 等负面影响。
