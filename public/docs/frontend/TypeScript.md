# TypeScript 介绍
TypeScript（简称 TS）是由微软开发的一门编程语言，官方定义是**JavaScript 的超集**

**与 JavaScript 的关系**：

超集意味着 TS 包含 JavaScript 的所有语法和功能（写的 JS 代码可以直接在 TS 环境中运行）

在此基础上增加了**静态类型系统**

由于浏览器和 Node.js 只能直接运行 JavaScript，TS 代码最终需要通过编译器（`tsc`）编译成纯 JavaScript 代码才能执行（编译过程会移除类型相关的语法）

**核心价值**：  

JavaScript 是**动态类型语言**，变量的类型可以随时改变（比如一个变量先赋值为数字，再赋值为字符串），这在大型项目中容易导致隐蔽的错误（例如调用一个不存在的方法，运行时才会报错）

TS 的**静态类型系统**则允许在代码编写阶段为变量、函数、对象等**标注类型**，编译器会在编译时（代码运行前）检查类型是否匹配，提前发现错误  

此外，类型标注还能作为「代码文档」，配合 IDE（如 VSCode）提供精准的自动补全、类型提示，大幅提升代码可读性和开发效率，尤其适合团队协作和大型项目

**为什么要学 TypeScript？**

JavaScript 是 Web 开发的基石，但在实际开发中（尤其是中大型项目），它的动态类型特性会带来不少问题，而 TypeScript 正是为解决这些痛点而生：

**1. 类型混乱，隐式错误多**  

JavaScript 中变量类型可以随意切换，比如：

```javascript
let num = 10; 
num = "hello"; // 合法，但后续若用num做数字运算（如num + 5）会得到"hello5"，逻辑错误
```

这种 “类型不固定” 的特性，会导致代码在运行时才暴露错误

比如调用一个字符串的`toFixed`方法，而 TS 通过**静态类型标注**，能在编写时就限制变量类型：

```typescript
let num: number = 10; 
num = "hello"; // TS编译报错：类型"string"不能赋值给类型"number"
```


**2. 运行时错误难排查**

JavaScript 的错误往往在代码运行时才出现（比如调用`undefined`的属性）而排查这类错误需要定位到具体执行场景，耗时且麻烦

TS 的**编译时类型检查**会提前拦截大部分类型相关错误

```typescript
function add(a: number, b: number) {
  return a + b;
}
add("1", 2); // TS编译报错：参数"1"的类型"string"不能赋值给参数类型"number"
```

无需运行代码，就能发现参数类型错误

**3. 代码维护与协作成本高**

大型项目中，JS 代码缺乏类型说明，开发者很难快速理解一个函数的参数 / 返回值含义、对象的结构等

比如接手别人写的`function doSomething(data) {}`，完全不知道`data`里有什么属性

TS 的类型标注相当于 “自文档化”，配合 IDE（如 VSCode）能提供**精准的类型提示和自动补全**

比如输入`data.`时，IDE 会自动列出`data`的所有属性，大幅降低理解成本，尤其适合团队协作

**4. 主流框架与工具的首选**  

目前 React、Vue、Angular 等主流框架均官方支持 TS，很多大型开源项目（如 Ant Design）也用 TS 开发

简单说：TS 不会替代 JS，但能让 JS 写得更安全、更易维护

**TypeScript 特性**

相对 JavaScript，TypeScript 增加了许多关键功能，特别是围绕类型系统和代码结构的增强功能

TypeScript 的一些关键特性：

+ **静态类型检查：**TypeScript 在编译时就会检查代码的类型是否匹配，能够发现很多潜在的错误。即使是简单的错误（例如拼写错误或类型不一致），也可以在编写代码时被捕获到
+ **类型推断：**TypeScript 能够自动推断变量的类型。比如当你声明一个变量并赋值时，TypeScript 会根据赋值来推断这个变量的类型，不需要每次都显式声明类型
+ **接口和类型定义：**TypeScript 提供了 `interface` 和 `type` 关键字，允许你定义复杂的数据结构。这对于项目中不同部分的代码协作和数据交互来说非常重要
+ **类和模块支持：**TypeScript 支持面向对象编程中的类（class）概念，增加了构造函数、继承、访问控制修饰符（如 `public`、`private`、`protected`），并且支持 ES 模块化规范
+ **工具和编辑器支持：**TypeScript 拥有良好的编辑器支持，特别是与 Visual Studio Code 集成时，能提供智能提示、自动补全、重构等工具，使开发过程更高效
+ **兼容 JavaScript：**TypeScript 是 JavaScript 的超集，这意味着所有合法的 JavaScript 代码都是合法的 TypeScript 代码。这使得 JavaScript 项目可以逐步迁移到 TypeScript，而无需完全重写

# TypeScript 入门
浏览器和 Node.js 只能直接运行 JavaScript，TypeScript 代码最终需要通过编译器（`tsc`）编译成纯 JavaScript 代码才能执行（编译过程会移除类型相关的语法）

## 环境搭建
要运行 TypeScript 代码，需要先搭建开发环境核心步骤包括：

安装 Node.js（提供运行环境）、安装 TS 编译器（将 TS 转为 JS）、配置开发工具（提升开发体验）

**安装 Node.js**

TypeScript 的**编译器（`tsc`）**依赖 Node.js 环境，因此首先需要安装 Node.js：

+ 访问 Node.js 官网（[nodejs.org](https://nodejs.org/)），下载「LTS 版本」（长期支持版，更稳定）
+ 安装时按默认选项即可（Windows 系统注意勾选「Add to PATH」，方便后续在终端调用命令）
+ 验证安装：打开终端（Windows 用 CMD/PowerShell，Mac/Linux 用终端），输入以下命令，若显示版本号则安装成功：

```bash
node -v  # 输出Node.js版本，v22.16.0 
npm -v   # 输出npm（Node.js自带的包管理工具）版本，如 10.9.2
```


**安装 TypeScript 编译器（`tsc`）**

Node.js 安装完成后，通过 npm 全局安装 TypeScript：  
在终端输入以下命令：

```bash
npm install -g typescript
```

+ `(-g)` 表示「全局安装」，这样在电脑任何目录都能使用`tsc`命令
+ 验证安装：输入 `tsc -v`，若显示版本号（如 `Version 5.4.5`）则安装成功

## 命令行编译
**第一个 TS 程序与编译流程**

安装完成后，写一个简单的 TS 程序，体验「TS→JS」的编译过程：

新建一个文件夹（如 `ts-demo`），在文件夹中创建文件 `hello.ts`（`.ts` 是 TS 文件的扩展名）

用编辑器打开 `hello.ts`，写入代码：

```typescript
// 定义一个字符串变量，标注类型为string  
let message: string = "Hello, TypeScript!";  
// 打印到控制台  
console.log(message);
```

编译 TS 文件：在终端进入 `ts-demo` 文件夹，输入命令：

```json
tsc hello.ts  
```


此时文件夹中会生成一个 `hello.js` 文件（TS 编译器自动将 TS 转为 JS），内容如下（类型标注被移除，只剩纯 JS）：

```javascript
var message = "Hello, TypeScript!";  
console.log(message);
```


运行 JS 文件：用 Node.js 执行编译后的 JS 文件：

```bash
node hello.js
```


终端会输出 `Hello, TypeScript!`，表示程序运行成功

## 自动化编译
**配置 `tsconfig.json`（核心配置文件）**

当项目中有多个 TS 文件时，逐个编译效率低。此时可以通过 `tsconfig.json` 文件统一配置编译规则，步骤如下：

在项目根目录（如 `ts-demo`）中，终端输入命令生成默认配置文件：

```bash
tsc --init
```

文件夹中会生成 `tsconfig.json`，包含大量注释的配置项（默认被注释，需手动开启）

常用核心配置项（建议开启）：

+ `target`: 指定编译后 JS 的版本（如 `"target": "ES6"`，生成 ES6 语法的 JS）
+ `outDir`: 指定编译后的 JS 文件存放目录（如 `"outDir": "./dist"`，JS 文件放到 `dist` 文件夹）
+ `rootDir`: 指定 TS 源文件的目录（如 `"rootDir": "./src"`，只编译 `src` 文件夹中的 TS 文件）
+ `strict`: 开启严格模式（推荐！启用所有严格的类型检查规则，减少隐藏错误）  
示例简化配置：

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noEmitOnError": true,   //如果报告了任何类型检查错误，则禁止生成文件。
  }
}
```


配置后，只需在终端输入 `tsc` 命令，编译器会自动根据 `tsconfig.json` 编译所有符合规则的 TS 文件

**开发工具设置（推荐 VSCode）**

VSCode（微软开发的编辑器）对 TypeScript 有原生支持，无需额外插件即可获得类型提示、自动补全、实时错误提示等功能，推荐作为 TS 开发工具：

+ 下载 VSCode（[code.visualstudio.com](https://code.visualstudio.com/)）并安装
+ 打开 TS 项目文件夹（如 `ts-demo`），VSCode 会自动识别 `tsconfig.json`，并在编辑时实时提示类型错误
+ 进阶：开启「自动编译」—— 终端输入**tsc --watch**，此后修改 TS 文件并保存时，编译器会自动重新编译，无需手动执行 `tsc`

## 编译的核心逻辑
TS 编译器（`tsc`）的核心工作有两个：

**类型检查**：验证代码中的类型标注是否符合规则（比如给`number`类型变量赋值`string`会报错）

**代码转换**：移除所有类型相关语法（如`:`后的类型标注、`interface`定义等），将 TS 代码转为等价的 JS 代码（转换规则由`tsconfig.json`中的`target`等配置决定）

**手动编译 vs 自动编译（`watch`模式）**

手动编译（`tsc 文件名`）每次修改代码后都需要重新执行命令，效率较低

实际开发中更常用**自动编译**：

在终端输入 `tsc --watch`（或简写 `tsc -w`），编译器会监听 TS 文件的变化，一旦保存修改，会自动重新编译

+ 运行 `tsc -w` 后，终端会显示 `Watching for file changes...`（正在监听文件变化）
+ 修改`hello.ts`中的代码（如把`message`改为`"Hello, TS Watch Mode!"`），保存后终端会自动输出编译结果：

```bash
[15:30:00] File change detected. Starting incremental compilation...  
[15:30:00] Compilation complete. Watching for file changes...
```

此时`hello.js`已自动更新，运行`node hello.js`会输出新内容

**编译错误示例（类型检查的实际作用**）

TS 的核心价值之一是 “编译时发现错误”

修改`hello.ts`为：

```typescript
let message: string = "Hello";  
message = 123; // 尝试给string类型变量赋值number
```

保存后，若开启了`tsc -w`，终端会立即报错：

```bash
hello.ts:2:1 - error TS2322: Type 'number' is not assignable to type 'string'.
```

此时编译器**仍然会生成`hello.js`文件**（默认行为，可通过`tsconfig.json`的`noEmitOnError: true`关闭，即报错时不生成 JS），但 JS 内容会忽略错误（直接执行`node hello.js`会输出`123`）

**TS 的类型错误不影响代码转换，只用于提前提醒开发者编译配置对输出的影响（`target`示例）**

`tsconfig.json`中的`target`配置决定了编译后 JS 的语法版本（如 ES5、ES6），直接影响代码转换结果

+ 示例：若`hello.ts`中有 ES6 的`const`和箭头函数：

```typescript
const add = (a: number, b: number): number => a + b;
```

+ 当`target: "ES5"`时（兼容旧浏览器），编译后的`hello.js`会转为 ES5 语法：

```javascript
var add = function (a, b) { return a + b; }; // const→var，箭头函数→普通函数
```

+ 当`target: "ES6"`时，编译后的`hello.js`保留 ES6 语法：

```javascript
const add = (a, b) => a + b; // 类型标注被移除，语法不变
```

# 类型注解
TypeScript 的基本类型是对 JavaScript 原生数据类型的 “类型标注”，用于**约束变量的取值范围**

## 类型声明
**定义方式**：变量后加 `: string` 标注类型，赋值需为字符串（单引号、双引号、反引号模板字符串均可）

```typescript
let a: string  //变量a只能存储字符串
let b: number  //变量a只能存储数值
let c: boolean  //变量a只能存储布尔值
a = 'hello'
// a=100//警告：不能将类型“number”分配给类型“string”
b = 666
// b='你好'//警告：不能将类型“string”分配给类型“number”
c = true
// c=666//警告：不能将类型“number”分配给类型“boolean”
// 参数x必须是数字，参数y也必须是数字，函数返回值也必须是数字
function demo(x: number, y: number): number {
  return x + y
  // return x + y + 'hello' //警告：返回值类型为“number”，但函数的返回类型为“number”
}
demo(100, 200)
// demo(100,'200')  //警告：类型“string”的参数不能赋给类型“number”的参数
// demo(100,200,300) //警告：应有 2 个参数，但获得 3 个
// demo(100)     //警告：应有 2 个参数，但获得 1 个
```

```typescript
let a: string  
let b: 'hello'
b = 'hello'
// b = 'world' // 不能将类型"world"分配给类型 "hello"
```

## 类型推断 
TypeScript 会在没有明确的指定类型的时候推测出一个类型

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：

若赋值非数字（如 boolean），TS 会报错：

```typescript
let d = -99//TypeScript会推断出变量d的类型是数字
// d = false  //警告：不能将类型“boolean”分配给类型“number”
```

## 类型总览
JavaScript 的类型分为两种：**原始数据类型**（[Primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)）和**对象类型**（Object types）

原始数据类型包括：

布尔值、数值、字符串、`null`、`undefined` 以及 ES6 中的新类型 `Symbol` 和 `BigInt`

| 原始类型  | 描述  | 举例 |
| --- | --- | --- |
| number   | 任意数字 | 1 ,  -33 , 2.5   |
| string   | 任意字符串 | 'hello' ,  'ok' ,  '你好'   |
| boolean   | 布尔值  true  或  false   | true 、  false   |
| null | 表示 “空值”，变量没有指向任何对象 |  |
| undefined | 表示 “未定义” |  |
| Symbol | 表示 “独一无二” 的值 |  |
| BigInt | 超出 Number 类型精度范围的大整数 | BigInt (9007199254740993) （ |

| **特殊**类型  | 描述  | 举例 |
| --- | --- | --- |
| 字⾯量 | 值只能是字⾯量值 | 值本身 |
| any   | 任意类型 | 1 、  'hello' 、  true .... |
| unknown   | 类型安全的  any   | 1 、  'hello' 、  true .... |
| never   | 不能是任何值 | ⽆值 |
| void   | 空 或  undefined   | 空 或  undefined   |
| object   | 任意的 JS 对象  | {name:'张三'}   |
| tuple   | 元组， TS 新增类型，固定⻓度数组  | [4,5]   |
| enum   | 枚举， TS 中新增类型  | enum{A, B}   |

# 类型转换&断言
在处理类型时，有时需要重写变量的类型，例如当库提供了错误的类型时

类型转换就是重写类型的过程，类型断言（Type Assertion）可以用来手动指定一个值的类型

## 使用 as 进行类型转换
使用**as**关键字，这将直接改变给定变量的类型

```typescript
let x: unknown = 'hello';
console.log((x as string).length);
```

类型转换实际上并**不会改变变量内部数据的类型**

以下代码将无法按预期工作，因为变量 x 仍然包含一个数字

```typescript
let x: unknown = 4;
console.log((x as string).length); // 打印 undefined，因为数字没有长度
```

TypeScript 仍然会尝试进行类型检查以防止看似不正确的类型转换

TypeScript 知道在不转换数据的情况下，将字符串转换为数字是没有意义的：

```typescript
console.log((4 as string).length);
// 错误：将类型“number”转换为类型“string”可能是一个错误
// 因为两种类型之间没有足够的重叠。如果这是有意的，请首先将表达式转换为“unknown”。
```

下面的“强制类型转换”部分介绍了如何重写这一点

## 使用 <> 进行类型转换
使用 `<>` 与使用 `as` 进行类型转换的效果相同

```typescript
let x: unknown = 'hello';

console.log((<string>x).length);
```

这种类型的类型转换在 TSX 中不起作用，例如在处理 React 文件时

## 强制类型转换
为了重写 TypeScript 在进行类型转换时可能抛出的类型错误

请首将类型**先转换为 unknown**，然后**再转换为目标类型**

```typescript
let x = 'hello';
console.log(((x as unknown) as number).length); 
// x 实际上不是一个数字，所以这将返回 undefined
```

# 基本类型
**JavaScript 中的数据类型： string** 字符串类型，表示文本数据，“Hello”，字符串需用单引号、双引号或反引号括起来

**number** 数字类型，表示整数和浮点数，像 10、3.14 等都是数字类型

**boolean** 布尔类型，只有两个值：true（真）和 false（假），常用来进行逻辑判断

**null** 空值，是一个表示 “无” 或 “空” 的特殊值，通常用于有意表示某个变量没有值的情况

**undefined** 未定义，当一个变量被声明但未被赋值时，其值就是 undefined

**bigint** 大整数类型，表示大于 Number.MAX_SAFE_INTEGER（即 2^53 - 1）或小于 -

**symbol** 符号类型，可创建唯一且不可变的值，常用于对象属性的键，以避免属性名冲突

**TypeScript 中的数据类型： **

+ **以上所有 **
+ **四个新类型：** void 、 never 、 unknown 、any 、  enum 、  tuple  
+ **⾃定义类型：** type 、  interface  

注意点： JS 中的这三个构造函数：  Number 、  String 、  Boolean ，他们只⽤于包装对象，正

常开发时，很少去使⽤他们，在 TS 中也是同理

TypeScript 的基本类型是对 JavaScript 原生数据类型的 “类型标注”，用于约束变量的取值范围

这些类型与 JS 中的数据类型一一对应，是 TS 类型系统的基础

## `string`（字符串类型）
用于表示文本数据，与 JS 中的字符串对应

**定义方式**：变量后加 `: string` 标注类型，赋值为字符串（单引号、双引号、反引号模板字符串均可）

```typescript
let name: string = "Alice"; // 单引号字符串  
let message: string = "Hello, " + name; // 字符串拼接  
let info: string = `Name: ${name}, Age: 20`; // 模板字符串（反引号）
```

**类型检查**：若赋值非字符串（如数字），TS 会报错

```typescript
name = 123; // 错误：Type 'number' is not assignable to type 'string'
```

## `number`（数字类型）
用于表示整数、浮点数、NaN、Infinity 等，与 JS 中的`number`对应

TS 不区分整数和浮点数，统一用`number`

**定义方式**：变量后加 `: number` 标注

```typescript
let age: number = 25; // 整数  
let height: number = 1.75; // 浮点数  
let zero: number = 0;  
let notANumber: number = NaN; // NaN属于number类型  
let infinity: number = Infinity; // 无穷大属于number类型
```

## `boolean`（布尔类型）
用于表示逻辑值，只有`true`和`false`两个值，与 JS 中的布尔值对应

**定义方式**：变量后加 `: boolean` 标注

```typescript
let isDone: boolean = false;  
let hasPermission: boolean = true;
```

**注意**：不能赋值为数字`0`或`1`（与 JS 中`0 == false`的隐式转换不同，TS 严格区分类型）：

```typescript
isDone = 0; // 错误：Type 'number' is not assignable to type 'boolean'
```

## `null` 与 `undefined`
+ `null`：表示 “空值”（主动赋值为 “无”）；
+ `undefined`：表示 “未定义”（变量声明后未赋值时的默认值）

在 TS 中，二者是独立的类型，默认情况下**可以赋值给任何其他类型**

但开启`strictNullChecks: true`严格模式后会被限制，见后文说明

**定义方式**：变量后加 `: null` 或 `: undefined` 标注

```typescript
let empty: null = null; // 只能赋值为null  
let uninitialized: undefined = undefined; // 只能赋值为undefined  

// 非严格模式下（默认），可以赋值给其他类型（不推荐，易导致错误）：  
let str: string = null; // 非严格模式下不报错，严格模式下报错
```

**最佳实践**：在`tsconfig.json`中开启 `strictNullChecks: true`（严格空值检查），此时`null`和`undefined`只能赋值给自身或`any`类型，避免意外的空值错误（如调用`null.toString()`）

## `symbol`（符号类型）
ES6 新增的原始类型，用于创建唯一的标识符（即使描述相同，两个 symbol 也不相等）

+ **定义方式**：变量后加 `: symbol` 标注，通过`Symbol()`创建值

```typescript
let id1: symbol = Symbol("id");  
let id2: symbol = Symbol("id");  

console.log(id1 === id2); // 输出 false（两个symbol永远不相等）
```

## `bigint`（大整数类型）
ES2020 新增的类型，用于表示超过`number`最大安全值（`2^53 - 1`）的整数  
**定义方式**：变量后加 `: bigint` 标注，值通过`数字n`或`BigInt()`创建

```typescript
let big: bigint = 9007199254740993n; // 数字后加n表示bigint  
let larger: bigint = BigInt(9007199254740993); // 也可通过BigInt()创建  

// 注意：bigint不能与number直接运算  
let sum = big + 1; // 错误：Operator '+' cannot be applied to types 'bigint' and 'number'
```

# 特殊类型 
## 字⾯量 
指的是在编程语言中，能够**直接表达其值的量**

它是一个固定的值，直接以常量的形式出现在代码中，无需进行计算或解析

```typescript
let a: '你好'//a的值只能为字符串“你好”
let b: 100   //b的值只能为数字100
a = '欢迎'//警告：不能将类型“"欢迎"”分配给类型“"你好"”
b = 200   //警告：不能将类型“200”分配给类型“100”
let gender: '男'|'⼥'//定义⼀个gender变量，值只能为字符串“男”或“⼥”
gender ='男'
gender ='未知'//不能将类型“"未知"”分配给类型“"男" | "⼥"”
```

## any 类型任意（关闭类型检查）
any 的含义是：**任意类型**

⼀旦将变量类型限制为  any ，那就意味着放弃了对该变量的类型检查

```typescript
//明确的表示a的类型是any —— 显式的any
let a: any
//以下对a的赋值，均⽆警告
a = 100
a = '你好'
a = false
//没有明确的表示b的类型是any，但TS主动推断了出来 —— 隐式的any
let b
//以下对b的赋值，均⽆警告
b = 100
b = '你好'
b = false
```

注意点： any 类型的变量，可以赋值给任意类型的变量 

```typescript
/* 注意点：any类型的变量，可以赋值给任意类型的变量 */
let a
let x: string
x = a// ⽆警告
```

## unknown 安全的`any`（不关闭类型检查）
unknown 的含义是：**未知类型**

备注1： unknown 可以理解为⼀个**类型安全的 any**

备注2： unknown 适⽤于：开始不知道数据的具体类型，后期才能确定数据的类型

```typescript
// 设置a的类型为unknown
let a: unknown
//以下对a的赋值，均正常
a = 100
a = false
a ='你好'
// 设置x的数据类型为string
let x: string
x = a//警告：不能将类型“unknown”分配给类型“string”
```

若就是想把 a 赋值给  x ，可以⽤以下三种写法： 

```typescript
// 设置a的类型为unknown
let a: unknown
a ='hello'
//第⼀种⽅式：加类型判断
if(typeof a==='string'){
    x = a
}
//第⼆种⽅式：加断⾔
x= a as string
//第三种⽅式：加断⾔
x= <string>a
```

any 后点任何的东⻄都不会报错，⽽  unknown 正好与之相反

```typescript
let str1: string='hello'
str1.toUpperCase() //⽆警告
let str2: any='hello'
str2.toUpperCase() //⽆警告
lets tr3: unknown='hello';
str3.toUpperCase() //警告：“str3”的类型为“未知”
    
// 使⽤断⾔强制指定str3的类型为string
(str3 as string).toUpperCase() //⽆警告
```

## never 永不存在的值
never 的含义是：**任何值都不是**，简⾔之就是不能有值

undefined 、  null 、  '' 、  0 都不⾏！

⼏乎不⽤ never 去直接限制变量，因为没有意义 

```typescript
/* 指定a的类型为never，那就意味着a以后不能存任何的数据了 */
let a: never
// 以下对a的所有赋值都会有警告
a = 1
a = true
a = undefined
a = null
```

never ⼀般是  TypeScript 主动推断出来的 

```typescript
// 指定a的类型为string
let a: string
// 给a设置⼀个值
a = 'hello'
if(typeof a==='string'){
    a.toUpperCase()
}else{
    console.log(a) // TypeScript会推断出此处的a是never，因为没有任何⼀个值符合此处的逻辑
}
```

never 也可⽤于限制函数的返回值 

```typescript
// 限制demo函数不需要有任何返回值，任何值都不⾏，像undeifned、null都不⾏
function demo():never{
    throw newError('程序异常退出')
}
```

## void 无返回值
void 的含义是：**  空 或  undefined **，严格模式下不能将  null 赋值给  void 类型

```typescript
let a:void = undefined
//严格模式下，该⾏会有警告：不能将类型“null”分配给类型“void”
let b:void = null
```

void 常⽤于限制函数返回值 

```typescript
// ⽆警告
function demo1():void{
 
}
// ⽆警告
function demo2():void{
    return
}
// ⽆警告
function demo3():void{
    return undefined
}
// 有警告：不能将类型“number”分配给类型“void”
function demo4():void{
    return 666
}
```

## object 
在类型限制时，Object ⼏乎不⽤，因为范围太⼤了，⽆意义

object 的含义：任何【⾮原始值类型】，包括：对象、函数、数组等，限制的范围⽐较宽泛

```typescript
let a:object//a的值可以是任何【⾮原始值类型】，包括：对象、函数、数组等
// 以下代码，是将【⾮原始类型】赋给a，所以均⽆警告
a = {}
a = {name:'张三'}
a = [1,3,5,7,9]
a =function(){}
// 以下代码，是将【原始类型】赋给a，有警告
a = null      // 警告：不能将类型“null”分配给类型“object”
a = undefined// 警告：不能将类型“undefined”分配给类型“object”
a = 1         // 警告：不能将类型“number”分配给类型“object”
a = true      // 警告：不能将类型“boolean”分配给类型“object”
a ='你好'    // 警告：不能将类型“string”分配给类型“object”
```

实际开发中，限制⼀般对象，通常使⽤以下形式

```typescript
// 限制person对象的具体内容，使⽤【,】分隔，问号代表可选属性
let person: { name: string, age?: number}
// 限制car对象的具体内容，使⽤【;】分隔，必须有price和color属性，其他属性不去限制，有没有都⾏
let car: { price: number; color: string; [k:string]:any}
// 限制student对象的具体内容，使⽤【回⻋】分隔
let student: {
    id: string
    grade:number
}
// 以下代码均⽆警告
person= {name:'张三',age:18}
person= {name:'李四'}
car= {price:100,color:'红⾊'}
student= {id:'tetqw76te01',grade:3}
```

限制函数的参数、返回值，使⽤以下形式

```typescript
let demo: (a: number, b: number) => number
demo = function(x,y) {
    return x + y
}
```

限制数组，使⽤以下形式

```typescript
let arr1: string[] // 该⾏代码等价于： let arr1: Array<string>
let arr2: number[] // 该⾏代码等价于： let arr2: Array<number>
arr1= ['a','b','c']
arr2= [1,3,5,7,9]
```

# tuple 元组 
元组是类型化的数组，具有预定义长度，且每个索引都有对应的类型

元组非常有用，因为它们允许数组中的每个元素都是已知类型的值

要定义一个元组，需要**指定数组中每个元素的类型**：

tuple 就是⼀个**⻓度固定的数组**

```typescript
let t: [string,number]
// 正确初始化
t = ['hello',123]

// 定义元组 
let ourTuple: [number, boolean, string];

// 初始化不正确会引发错误
ourTuple = [false, 'Coding God was mistaken', 5];
```

一个好的做法是将**元组设置为只读，**元组只对初始值有严格定义的类型：

```typescript
// 定义元组  
let ourTuple: [number, boolean, string];  
// 正确初始化  
ourTuple = [5, false, 'Coding God was here'];  
// 对于索引 3+，元组中没有类型安全性  
ourTuple.push('Something new and wrong');  
console.log(ourTuple);
```

**命名元组**

命名元组允许我们为每个索引处的值提供上下文

```typescript
const graph: [x: number, y: number] = [55.2, 41.3];
```

**解构元组**

由于元组是数组，因此也可以对它们进行解构

```typescript
const graph: [number, number] = [55.2, 41.3];
const [x, y] = graph;
```

# enum 枚举 
枚举是一种特殊的“类”，表示**一组常量**（不可更改的变量）

枚举（Enum）类型用于**取值被限定在一定范围内的场景**，比如一周只能有七天，颜色限定为红绿蓝等

枚举有两种类型：**string` 和 `numeric数字枚举 - 默认**

默认情况下，枚举会将第一个值初始化为 `0`，并为每个附加值加 1：

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

**数字枚举 - 已初始化**

可以设置第一个数值枚举的值，并从该值开始自动递增：

未手动赋值的枚举项会接着上一个枚举项递增

```typescript
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
......
console.log(Days["Sat"] === 6); // true
```

**如果未手动赋值的枚举项与手动赋值的重复了**，TypeScript 是不会察觉到这一点的~

```typescript
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

递增到 `3` 的时候与前面的 `Sun` 的取值重复了，但是 TypeScript 并没有报错

导致 `Days[3]` 的值先是 `"Sun"`，而后又被 `"Wed"` 覆盖了

**数字枚举 - 完全初始化**

可以为每个枚举值分配唯一的数字值，这些值将不会自动递增：

```typescript
enum StatusCodes {  
  NotFound = 404,  
  Success = 200,  
  Accepted = 202,  
  BadRequest = 400  
}  
// 记录 404  
console.log(StatusCodes.NotFound);  
// 记录 200  
console.log(StatusCodes.Success);
```

**字符串枚举**

枚举还可以包含 `string`，由于其可读性和意图，这比数字枚举更常见

```typescript
enum CardinalDirections {  
  North = 'North',  
  East = "East",  
  South = "South",  
  West = "West"  
};  
// 记录 "North"  
console.log(CardinalDirections.North);  
// 记录 "West"  
console.log(CardinalDirections.West);
```

# 联合类型
用于值可以是多个类型的情况

例如，当某个属性是 `string` 或 `number` 时

## Union | (OR)
使用 `|` 表示我们的参数是 `string` 或 `number`：

```typescript
function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}
printStatusCode(404);
printStatusCode('404');
```

## 联合类型错误
**注意：**当使用联合类型时，需要知道类型是什么，以避免类型错误：

```typescript
function printStatusCode(code: string | number) {  
  console.log(`My status code is ${code.toUpperCase()}.`) // 错误：属性“toUpperCase”在“string | number”类型上不存在。  
  // 错误：属性“toUpperCase”在“number”类型上不存在  
}
```

## 访问联合类型的属性或方法
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候

**只能访问此联合类型的所有类型里共有的属性或方法**：

```typescript
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.
```

上例中，**length` 不是 `string` 和 `number 的共有属性**，所以会报错

访问 `string` 和 `number` 的共有属性是没问题的：

```typescript
function getString(something: string | number): string {
    return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

上例中，第二行的 `myFavoriteNumber` 被推断成了 `string`，访问它的 `length` 属性不会报错

而第四行的 `myFavoriteNumber` 被推断成了 `number`，访问它的 `length` 属性时就报错了

# 自定义类型
⾃定义类型，可以更灵活的限制类型

类型别名可用于像 `string` 这样的**基本类型**，或者像 `object` 和 `array` 这样**复杂类型**：

```typescript
type CarYear = number
type CarType = string
type CarModel = string
const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
// 性别的枚举
enum Gender {
    Male,
    Female
}
// ⾃定义⼀个年级类型（⾼⼀、⾼⼆、⾼三）
type Grade = 1|2|3
// ⾃定义⼀个学⽣类型
type Student= {
    name:string,
    age:number,
    gender:Gender,
    grade:Grade
}
// 定义两个学⽣变量：s1、s2
let s1:Student
let s2:Student
s1 = {name:'张三',age:18,gender:Gender.Male,grade:1}
s2 = {name:'李四',age:18,gender:Gender.Female,grade:2}
```

# 类
传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承

而在 ES6 中迎来了 `class`

## 类的概念
+ **类（Class）：**定义了一件事物的抽象特点，包含它的属性和方法
+ **对象（Object）：**类的实例，通过 `new` 生成
+ **面向对象（OOP）的三大特性：**封装、继承、多态
+ **封装（Encapsulation）：**将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
+ **继承（Inheritance）：**子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
+ **多态（Polymorphism）：**由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
+ **存取器（getter & setter）：**用以改变属性的读取和赋值行为
+ **修饰符（Modifiers）：**修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
+ **抽象类（Abstract Class）：**抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
+ **接口（Interfaces）：**不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

## ES6 中类的用法
### 属性和方法
使用 `class` 定义类，使用 `constructor` 定义构造函数

通过 `new` 生成新实例的时候，会自动调用构造函数

```javascript
class Animal {
  public name;
  constructor(name) {
      this.name = name;
  }
  sayHi() {
      return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

### 类的继承
使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法

```javascript
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

### 存取器
使用 getter 和 setter 可以改变属性的赋值和读取行为：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

### 静态方法
使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```javascript
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

## ES7 中类的用法
### 实例属性
ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```javascript
class Animal {
  name = 'Jack';

  constructor() {
    // ...
  }
}

let a = new Animal();
console.log(a.name); // Jack
```

### 静态属性
ES7 提案中，可以使用 `static` 定义一个静态属性：

```javascript
class Animal {
  static num = 42;

  constructor() {
    // ...
  }
}

console.log(Animal.num); // 42
```

## TypeScript 中类的用法
### public private 和 protected
TypeScript 可以使用三种访问修饰符（Access Modifiers）

分别是 `public`、`private` 和 `protected`

+ `public` 修饰的属性或方法是公有的，在任何地方被访问，默认所有属性和方法都是 `public` 
+ `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
+ `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别在子类中也是允许被访问

下面举一些例子：

```typescript
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
```

上面的例子中，`name` 被设置为了 `public`，所以直接访问实例的 `name` 属性是允许的

很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 `private` 了：

```typescript
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

需要注意的是，TypeScript 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性

上面的例子编译后的代码是：

```javascript
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
```

使用 `private` 修饰的属性或方法，在子类中也是不允许访问的：

```typescript
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}

// index.ts(11,17): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

而如果是用 `protected` 修饰，则允许在子类中访问：

```typescript
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
```

当构造函数修饰为 `private` 时，该类不允许被继承或者实例化：

```typescript
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack');

// index.ts(7,19): TS2675: Cannot extend a class 'Animal'. Class constructor is marked as private.
// index.ts(13,9): TS2673: Constructor of class 'Animal' is private and only accessible within the class declaration.
```

当构造函数修饰为 `protected` 时，该类只允许被继承：

```typescript
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack');

// index.ts(13,9): TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.
```

### 参数属性
修饰符和`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值

```typescript
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

### readonly
只读属性关键字，只允许出现在属性声明或索引签名或构造函数中

```typescript
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面

```typescript
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

### 抽象类
`abstract` 用于定义抽象类和其中的抽象方法

什么是抽象类？

首先，抽象类是不允许被实例化的：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal('Jack');

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```

上面的例子中定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`

在实例化抽象类的时候报错了

其次，抽象类中的抽象方法必须被子类实现：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat('Tom');

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

上面的例子中定义了一个类 `Cat` 继承了抽象类 `Animal`

但是没有实现抽象方法 `sayHi`，所以编译报错了

下面是一个正确使用抽象类的例子：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```

上面的例子中，我们实现了抽象方法 `sayHi`，编译通过了

即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类，上面的代码的编译结果是：

```javascript
var __extends =
  (this && this.__extends) ||
  function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var Cat = (function (_super) {
  __extends(Cat, _super);
  function Cat() {
    _super.apply(this, arguments);
  }
  Cat.prototype.sayHi = function () {
    console.log('Meow, My name is ' + this.name);
  };
  return Cat;
})(Animal);
var cat = new Cat('Tom');
```

## 类的类型
给类加上 TypeScript 的类型很简单，与接口类似：

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

## 常规类
```typescript
class Person { name: stringage: number
 constructor(name:string,age:number){
         this.name=name
         this.age=age
    }
}
const p1 = newPerson('张三',18)
const p2 = newPerson('李四',19)
console.log(p1)
console.log(p2)
```

## 继承
```typescript
// Person类
class Person {	}
// Teacher类继承Person
class Teacher extends Person {	}
// Student类继承Person
class Student extends Person {	}
// Person实例
const p1 = newPerson('周杰伦',38)
// Student实例
const s1 = newStudent('张同学',18)
const s2 = newStudent('李同学',20)
// Teacher实例
const t1 = newTeacher('刘⽼师',40)
const t2 = newTeacher('孙⽼师',50)
```

## 抽象类
不能去实例化，但可以被别⼈继承，抽象类⾥有抽象⽅法

```typescript
// Person（抽象类）
abstract class Person {}
// Teacher类继承Person
class Teacher extends Person {
  // 构造器
  constructor(name: string,age: number){
     super(name,age)
  }
  // ⽅法
  speak(){
     console.log('你好！我是⽼师:',this.name)
  }
}
// Student类继承Person
class Student extends Person {}
// Person实例
// const p1 = new Person('周杰伦',38) 
// 由于Person是抽象类，所以此处不可以new Person的实例对象
```

# 接口
在 TypeScript 中，**使用接口（Interfaces）来定义对象的类型**

在面向对象语言中，接口（Interfaces）是一个很重要的概念

它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外

也常用于对对象的形状（Shape）进行描述

 

**对象 = 具体的实物**

**接口 = 设计图纸 / 规范契约（只定规矩，不做实物）**

**类 = 生产车间 / 实现模板（能造实物，还能加功能）**

**接口（Interface）是 TypeScript 用来「描述结构」的纯类型工具**

1. 它**只定义形状**：有哪些属性、什么类型、哪些方法
2. 它**不写具体逻辑**：没有方法体、不能赋值、不能 `new`
3. 编译成 JS 后**直接消失**，只在开发阶段做类型检查
4. 核心作用：**约束对象、约束类、统一规范**

它和类、对象的关系：

+ 接口约束对象 → 规定对象必须长什么样
+ 类实现接口 → 类必须遵守接口的规范
+ 类创建对象 → 对象是类的实例，也可以符合接口

## 接⼝定义
接⼝⽤于限制⼀个类中包含哪些属性和⽅法：

```typescript
// 1. 接口：定义「用户」的规范（模具）
interface User {
  name: string;   // 必须有name，字符串
  age: number;    // 必须有age，数字
}

// 2. 对象：必须严格符合接口规范（用模具造出来的东西）
const user1: User = { name: "张三", age: 18 }; // ✅ 合法

const user2: User = { name: "李四" }; // ❌ 报错：缺少age
```

接⼝是可以重复声明的：

```typescript
// Person接⼝
interface PersonInter {
  // 属性声明
  name: string
  age: number
}
// Person接⼝
interface PersonInter {
  // ⽅法声明
  speak():void
}
// Person类继承PersonInter
class Person implements PersonInter {
  name: string
  age: number
  // 构造器
  constructor(name: string,age: number){
     this.name=name
     this.age=age
  }
  // ⽅法
  speak(){
     console.log('你好！我是⽼师:',this.name)
  }
}
```

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的例子中定义了一个接口 `Person`，接着定义了一个变量 `tom`

它的类型是 `Person`，这样就约束了 `tom` 的形状必须和接口 `Person` 一致

接口一般首字母大写，有的编程语言中会建议接口的名称加上 `I` 前缀

定义的变量比接口少了一些属性是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

多一些属性也是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male' // 不允许
};

// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

**赋值的时候，变量的形状必须和接口的形状保持一致**

## 可选属性
有时希望不要完全匹配一个形状，那么可以用可选属性：

```typescript
interface Person {
    name: string;
    age?: number; // 可选属性
}

let tom: Person = {
    name: 'Tom'
};
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

选属性的含义是**该属性可以不存在**

这时仍然不允许添加未定义的属性：

```typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male' //不允许
};

// examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

## 任意属性
有时候希望一个接口允许有任意的属性，可以使用如下方式：

```typescript
interface Person {
    name: string;
    age?: number;
    // 前面key值取的string任意属性     后面值取的any任意值,并不是任意属性
    //或者取这个类型string | number值  确定属性和可选属性必须为任意属性的子集
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值

一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

```typescript
interface Person {
    name: string;
    age?: number;
    //任意属性为string     值为string
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

## 只读属性
有时候希望对象中的一些字段**只能在创建的时候被赋值**，那么可以用 `readonly` 定义只读属性：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757, //错误 试图对一个被定义为常量或只读属性的id进行赋值操作
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中报错信息有两处，第一处是在对 `tom` 进行赋值的时候，没有给 `id` 赋值

第二处是在给 `tom.id` 赋值的时候，由于它是只读属性，所以报错了

## 接口与⾃定义类型的区别
**共同点都能描述对象形状**

```typescript
// Type
type User = { name: string; age: number };
// Interface
interface User { name: string; age: number; }
```

1. **都能描述函数**
2. **都能实现「继承 / 扩展」**
3. **都能约束变量类型**

**单纯用来约束一个对象完全可以互换！**

**核心区别**

**1.定义范围不同：Type 全能，Interface 专一**

+ **type 可以定义任何类型**（基本类型、联合类型、元组）
+ **interface 只能定义「对象、函数、类」这种结构化类型**

```typescript
// -------- ✅ Type 能做到的，Interface 做不到 --------
// 1. 定义基本类型别名 联合类型
type ID = string | number; 

// 2. 定义联合类型
type Status = "success" | "fail" | "pending";

// 3. 定义元组
type Data = [number, string];

// 4. 定义工具类型（高级类型）
type PartialUser = Partial<User>;
```

**总结**：只要用到了 `|`（或）、元组、基本类型，**只能用 type**

**2. 扩展方式不同：合并 vs 交叉**

+ **Interface 用 `extends` 继承，且可以重复声明自动合并**
+ **Type 用 `&` 交叉，重复声明会报错**

① Interface 天生支持「合并」

```typescript
interface User { name: string; }
// 重复声明，自动合并！
interface User { age: number; }

// 最终 User = { name: string; age: number; }
const u: User = { name: "张三", age: 18 };
```

适合给第三方库**扩展类型**，或者写插件时用

② Type 用 `&` 拼接

```typescript
type Name = { name: string; }
type Age = { age: number; }
// 交叉类型拼接
type User = Name & Age;
```

**3. 类的实现（Implements）**

+ **Interface 可以直接被类 implements**
+ **Type 如果是联合类型，不能被类实现**

```typescript
interface Animal { run(): void; }
// 类实现接口 ✅
class Dog implements Animal {
  run() {}
}
```

接⼝

+ 当⾃定义类型去使⽤；
+ 可以限制类的结构；

⾃定义类型：

+ 仅仅就是⾃定义类型；

```typescript
// Person接⼝
interface Person {
  // 应该具有的属性
  name: string
  age: number
  // 应该具有的⽅法
  speak():void
}

// Person类型 
type Person = {
     // 应该具有的属性
     name: string
     age: number
     // 应该具有的⽅法
     speak():void
}

// 接⼝当成⾃定义类型去使⽤
let person:Person = {
  name:'张三',
  age:18,
  speak(){
    console.log('你好！')
  }
}
```

## 接⼝与抽象类的区别
抽象类：

+ 可以有普通⽅法，也可以有抽象⽅法；
+ 使⽤ extends 关键字去继承抽象类； 

接⼝中：

+ 只能有抽象⽅法；
+ 使⽤ implements 关键字去实现接⼝ 

抽象类举例：

```typescript
// 抽象类 —— Person
abstract class Person {
  // 属性
  name:string
  age:number
  // 构造器
  constructor(name:string,age:number){
       this.name=name
       this.age=age
  }
  // 抽象⽅法
  abstractspeak():void
  // 普通⽅法
  walk(){
       console.log('我在⾏⾛中....')
  }
}
// Teacher类继承抽象类Person
class Teacher extends Person {
  constructor(name:string,age:number){
       super(name,age)
  }
  speak(){
       console.log(`我是⽼师，我的名字是${this.name}`)
  }
}
```

接⼝举例：

```typescript
// 接⼝ —— Person，只能包含抽象⽅法
interface Person {
  // 属性，不写具体值
  name:string
  age:number
  // ⽅法，不写具体实现
  speak():void
}
// 创建Teacher类实现Person接⼝
class Teacher implements Person {
  name:string
  age:number
  constructor(name:string,age:number){
    this.name=name
    this.age=age
  }
  speak(){
       console.log('我在⻜快的⾏⾛中......')
  }
}
```

# 函数
TypeScript 有特定的语法来输入参数和返回值

## 返回类型
可以显式定义函数返回值的类型

```typescript
// 这里的 : number 表明此函数返回一个数字
function getTime(): number {
  return new Date().getTime();
}
```

如果没有定义返回类型，TypeScript 将尝试通过返回的变量或表达式的类型来推断它

## void 返回类型
void 类型可用于指示函数不返回任何值

```typescript
function printHello(): void {
  console.log('Hello!');
}
```

## 参数
函数参数的类型化使用与变量声明类似的语法

```typescript
function multiply(a: number, b: number) {
  return a * b;
}
```

如果没有定义参数类型，TypeScript 将**默认使用 any**

除非在下面的默认参数和类型别名部分中提供了额外的类型信息

## 可选参数
默认情况下，TypeScript 会假定所有参数都是必需的，但它们可以被明确标记为可选的

**? 操作符**将参数 c 标记为可选

```typescript
// 这里的 ? 操作符将参数 c 标记为可选
function add(a: number, b: number, c?: number) {
  return a + b + (c || 0);
}
```

## 默认参数
对于具有默认值的参数，默认值应在类型注释之后：

```typescript
function pow(value: number, exponent: number = 10) {
  return value ** exponent;
}
```

TypeScript 还可以从默认值推断类型

## 命名参数
为命名参数类型化遵循与为普通参数类型化相同的模式

```typescript
function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}
```

## 剩余参数
剩余参数可以像普通参数一样进行类型化，但其类型必须是数组，因为剩余参数始终是数组

```typescript
function add(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}
```

## 类型别名
可以使用类型别名将函数类型与函数分开指定

这些类型的编写类似于箭头函数

```typescript
type Negate = (value: number) => number;

// 在此函数中，参数 value 自动从类型 Negate 中获取类型 number
const negateFunction: Negate = (value) => value * -1;
```

# 属性修饰符 
| readonly   | 只读属性 | 属性⽆法修改 |
| --- | --- | --- |
| public   | 公开的 | 可以在类、⼦类和对象中修改 |
| protected   | 受保护的 | 可以在类、⼦类中修改 |
| private   | 私有的 | 可以在类中修改 |

# 泛型 
定义⼀个函数或类时，有些情况下⽆法确定其中要使⽤的具体类型

返回值、参数、属性的类型不能确定，此时就需要泛型了

举例： `<T>` 就是泛型，（不⼀定⾮叫  T ），设置泛型后即可在函数中使⽤  T 来表示该类型： 

**泛型就是「可插拔的类型参数」它让你的**代码能复用 ，同时还**不丢失类型检查**（不像 `any` 那样彻底摆烂）

一个**万能盒子**：

+ 不装东西时，它是空的模板；
+ 你说装**苹果**，它就变成苹果盒，只能放苹果；
+ 你说装**书**，它就变成书盒，只能放书

**泛型 = 这个万能盒子的「类型模板」**`<T>` 就是那个**占位符**，用的时候再指定具体类型

反面教材：`any` 类型，**类型丢失了**，TS 不知道返回的是啥，没有智能提示，也不检查错误  

```typescript
// 一个函数，返回传入的参数
function fn(arg: any): any {
  return arg;
}

fn(123);     // 返回 any
fn("abc");   // 返回 any
```

 泛型写法  

```typescript
// <T> 就是泛型占位符，代表“待定类型”
function fn<T>(arg: T): T {
  return arg;
}

// T = string
fn<string>("hello"); 

// T = number
fn<number>(123);  
```

+ 传字符串 → 返回字符串
+ 传数字 → 返回数字**类型安全保留，代码还能复用**

泛型可以写多个：

```typescript
function test<T, K>(a: T, b: K): K{
 return b;
}
// 为多个泛型指定具体⾃值
test<number, string>(10, "hello");
```

类中同样可以使⽤泛型：

```typescript
class MyClass<T>{
  prop: T;
  constructor(prop: T){
    this.prop=prop;
  }
}
```

也可以对泛型的范围进⾏约束：

```typescript
interface Demo{
  length: number;
}
// 泛型T必须是MyInter的⼦类，即：必须拥有length属性
function test<TextendsDemo>(arg: T): number{
    return arg.length;
}
test(10) // 类型“number”的参数不能赋给类型“Demo”的参数
test({name:'张三'}) // 类型“{ name: string; }”的参数不能赋给类型“Demo”的参数
test('123')
test({name:'张三',length:10})
```

## 例子
实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```typescript
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

上例中使用了之前提到过的数组泛型来定义返回值的类型

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

`Array<any>` 允许数组的每一项都为任意类型

预期的是，数组中每一项都应该是输入的 `value` 的类型

这时候，泛型就派上用场了：

```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型

在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了

接着在调用的时候，可以指定它具体的类型为 `string`

不手动指定让类型推论自动推算出来：

```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

## 多个类型参数
定义泛型的时候，可以一次定义多个类型参数：

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组

## 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意操作它的属性或方法：

```typescript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

上例中泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了

可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

上例中使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状

也就是必须包含 `length` 属性

此时如果调用 `loggingIdentity` ，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了：

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity(7);

// index.ts(10,17): error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```

多个类型参数之间也可以互相约束：

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```

上例中使用了两个类型参数，其中要求 `T` 继承 `U`，这样就保证了 `U` 上不会出现 `T` 中不存在的字段

## 泛型接口
可以使用接口的方式来定义一个函数需要符合的形状：

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

当然也可以使用含有泛型的接口来定义函数的形状：

```typescript
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

进一步，可以把泛型参数提前到接口名上：

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型

## 泛型类
与泛型接口类似，泛型也可以用于类的类型定义中：

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 泛型参数的默认类型
在 TypeScript 2.3 以后，可以为泛型中的类型参数指定默认类型

当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，默认类型就会起作用

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

# 声明合并
如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

## 函数的合并
可以使用重载定义多个函数类型：

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
//重载需要合并 否则报错
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
     return 0//这里必须加上一个return 数字或者字符串,否则报错没有返回值
}
```

## 接口的合并
接口中的属性在合并时会简单的合并到一个接口中：

```typescript
interface Alarm {
    price: number;
}
interface Alarm {
    weight: number;
}
```

相当于：

```typescript
interface Alarm {
    price: number;
    weight: number;
}
```

注意，合并的属性的类型必须是唯一的：

```typescript
interface Alarm {
    price: number;
}
interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
    weight: number;
}
interface Alarm {
    price: number;
}
interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
}

// index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
```

接口中方法的合并，与函数的合并一样：

```typescript
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
```

相当于：

```typescript
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```

## 类的合并
类的合并与接口的合并规则一致

# 日常业务使用

## 基础类型注解

**日常变量、函数入参返回**

```typescript
// 基础
let str: string = 'xxx'
let num: number = 1
let flag: boolean = true
let n: null = null
let un: undefined = undefined

// 数组两种写法
let arr1: string[] = ['a']
let arr2: Array<number> = [1,2]

// 对象字面量临时标注
let obj: {name:string;age?:number} = {name:'张三'}
```

**补充：void/never（函数常用）**

```typescript
// 无返回值函数
function fn():void{}
// 永远抛错/死循环 never（极少，接口报错函数用）
function err():never{ throw new Error() }
```

## 联合｜交叉｜可选｜只读

```typescript
// 1.联合 | 多种类型任选其一
type Id = string | number
let id:Id = 123

// 2.交叉 & 多个类型合并所有属性
type A = {name:string}, B={age:number}
type C = A & B

// 3.可选 ? 属性可有可无
interface User{
  name:string
  phone?:string
}

// 4.只读 readonly 不能修改
interface User{
  readonly id:number
}
```

## type 类型别名 /interface 接口

（定义对象结构，二选一场景）

规则：

**对象结构优先 interface；**

**联合 / 交叉 / 复杂组合优先 type**

```typescript
// interface 支持继承extends
interface User { name:string }
interface VipUser extends User { vip:boolean }

// type不能继承，靠&实现组合
type UserType = {name:string}
type VipType = UserType & {vip:boolean}
```

## 类型断言 as

dom、后端返回不规则数据

```typescript
// dom获取元素必用
const dom = document.getElementById('box') as HTMLDivElement
// 强制转类型
let data:any = '123'
const len = (data as string).length
// 非空断言 !（确定不为空）
dom!.style.color = 'red'
```

## 泛型 < T >

通用工具函数、axios 封装、通用组件

```typescript
// 通用取值函数，不固定类型
function getVal<T>(arg:T):T{
  return arg
}
getVal<string>('abc')
getVal<number>(99)
```

## 内置工具类型

**这 5 个工具，都是用来 “快速改造已有类型” 的，不用重复写 interface！**

### **`Partial<T>`  把所有属性变成 可选**

- 作用：把一个类型里**所有必填属性**，一次性变成 **可选（?）**
- 业务场景：**修改用户信息**：不需要传所有字段，只传要改的

```typescript
interface User {
  name: string
  age: number
}

// 用 Partial 一键变可选
type PartialUser = Partial<User>

// 等价于手动写：
// type PartialUser = {
//   name?: string
//   age?: number
// }
```

使用：

```typescript
const data: PartialUser = {
  name: "小明" // 只传一个也不会报错
}
```

------

### `Required<T>` 把所有属性变成必选

作用：把类型里**所有可选属性**，一次性变成**必填**

业务场景：表单提交必须全部填写

```typescript
interface User {
  name?: string
  age?: number
}

// 一键变必填
type RequiredUser = Required<User>
```



### `Pick<T, 要保留的属性>` 挑选几个属性

作用：从类型里**挑出你需要的字段**，生成新类型

业务场景：只需要用户的名字，不需要其他字段

```typescript
interface User {
  name: string
  age: number
  gender: string
}

// 只挑 name
type UserName = Pick<User, 'name'>
```

**结果：**

```typescript
type UserName = { name: string }
```



### `Omit<T, 要剔除的属性>` 剔除几个属性

作用：从类型里**删掉你不要的字段**，剩下的保留

业务场景：编辑用户时，不需要传 id

```typescript
interface User {
  id: number
  name: string
  age: number
}

// 剔除 id
type UserWithoutId = Omit<User, 'id'>
```

**结果：**

```typescript
type UserWithoutId = { name: string; age: number }
```



### `Record<K, T>`   定义对象键值类型（超级常用）

作用

快速定义一个 **对象类型**：

- K：**键（key）的类型**
- T：**值（value）的类型**

业务场景

字典、映射表、列表、缓存

```typescript
// 键是 string，值是 User
type UserMap = Record<string, User>
```

**使用：**

```typescript
const userList: UserMap = {
  zhangsan: { name: "张三", age: 18 },
  lisi: { name: "李四", age: 20 }
}
```

## 函数类型注解

```typescript
// 入参+返回值标注
function add(a:number,b:number):number{
  return a+b
}
// 箭头函数
const add = (a:number,b:number):number=>a+b
```

## any/unknown 使用规范

尽量少 any

1. `any`：放弃 TS 类型校验，随便赋值（实在不知道类型临时用）
2. `unknown`：未知类型，**必须断言 as 才能使用属性**，比 any 安全

```typescript
let res:unknown = 'abc'
(res as string).length
```

## 附录:其他内容

很少用

1. 命名空间 namespace、模块扩充
2. 条件类型`T extends U ? X:Y`、复杂映射类型 in（写组件库才用）
3. 协变逆变、类型递归、模板字面量类型（几乎遇不到）
