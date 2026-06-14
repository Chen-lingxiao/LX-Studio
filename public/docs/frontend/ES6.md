ECMAScript [ek - ma - script] 在中文中, ECMAScript 可以读作 "伊克玛Script"

官方定义: ECMAScript 是定义脚本语言的规范, 而 JavaScript 是遵循 ECMAScript 规范实现的一种编程语言

通俗说法: ECMAScript 好比是一本书的目录, 而 JavaScript 是这本书的具体内容

ES6 和 JavaScript 区别

ES6(ECMAScript 2015)是ECMAScript规范的第六个版本,而JavaScript是基于ECMAScript规范实现的编程语言,

ES6可以被看作是 JavaScript 的一个重要的版本更新

ES6引入了"块级作用域",使用let和const关键字来声明变量和常量,使变量的作用域清晰可控

ES6引入了"箭头函数",箭头函数比传统的函数语法更简洁, 具有更少的冗余代码

ES6引入了"类(Class)"的概念,这是一种基于原型的面向对象编程的语法糖, 使用类可以更方便地创建和管理对象

ES6引入了"模板字符串", 使用反引号(`)创建字符串可以方便地嵌入变量和表达式

ES6引入了"解构赋值", 这是一种新的赋值语法,可以将数组或对象的属性直接赋值给变量

ES6引入了"函数参数默认值"

ES6引入了"Promise对象", 简化了异步编程, 使其更可读和可维护

ES6引入了 Set、Map 等

ES6引入了"模块化"(ES Module)

ES6 ~ ES13 新特性

ES6 (ECMAScript 2015)

块级作用域，使用 let 和 const 关键字来声明变量和常量,使变量的作用域清晰可控

箭头函数表达式

类 Class 定义和继承

模板字符串

解构赋值

函数参数默认值

Promise 异步编程

异步函数 async/await

Map 和 Set 数据结构

模块化 import 和 export

ES6兼容性

[https://compat-table.github.io/compat-table/es6](https://compat-table.github.io/compat-table/es6)

# 变量声明
## let
变量(Variable) 是用于存储数据的名称(标识符), 变量可以是任何类型, 如 "数值、字符串" 等

**核心作用**：解决`var`的作用域缺陷，提供更安全的变量声明方式

## const 常量
 常量(Constant) 是一个固定的值, 在程序运行中常量的值保持不变

**基本类型**：声明后不可修改（值固定）

```javascript
const PI = 3.14;
PI = 3.15; // TypeError: Assignment to constant variable.
```

**引用类型**：声明的是**引用地址不可变**，但对象 / 数组内部属性可修改

```javascript
const obj = { name: 'Alice' };
obj.name = 'Bob'; // 允许（修改属性）
obj = { name: 'Charlie' }; // TypeError: 不能重新赋值引用地址
```

> **何时用 const**：优先使用`const`，仅当需要重新赋值时用`let`（避免变量被意外修改）

## 与 var 的区别对比
| **特性** | **var** | **let/const** |
| :--- | :--- | :--- |
| 作用域 | 函数作用域 | 块级作用域 |
| 变量提升 | 存在（声明前为`undefined`） | 存在（声明前处于 TDZ，无法访问） |
| 重复声明 | 允许（会覆盖） | 不允许（同作用域内报错） |
| 初始值 | 自动初始化为`undefined` | 需手动初始化 |

## 数据类型
字符串类型 string

+ 字符串类型用于存储字符序列

数值类型 number

+ 用于存储数字, 可以表示整数、浮点数

布尔类型 boolean

+ 布尔类型只能取两个值,true(真) 和 false(假)

对象 object

+ 对象是一种复合的数据类型, 可以通过键值对的方式存储多个值

```javascript
/定义了一个包含姓名、年龄和体重的对象
let person= {
name: "张三",
age: 18,
weight: 70.5
}
console.log(person)
```

map 映射

map 是一种特殊的数据结构,用于**存储键值对的有序集合**

```javascript
//定义了一个包含姓名、年龄和体重的map
let girl = new Map([
  ["name", "小红"],
  ["age", 20],
  ["weight", 50.5]
])
console.log(girl)
```

Map相对于对象提供了更灵活、有序、高效的键值对存储和操作方式

当需要在大量键值对中快速查找或删除特定键值对时, Map比对象更高效

Map提供了一些便捷的方法来操作键值对, 如: get()、set()、delete()

Map提供了一些便捷的迭代方法, 如: forEach()、keys()、values()、entries()

set 集合

Set 是一种特殊的数据结构, 用于存储**无序且唯一的值**的集合

```javascript
let number = new Set([1, 2, 3, 4, 5]) //定义了一个包含5个"不重复"的整数的集合
console.log(number)

//let numbers = new Set([1, 2, 3, 4, 5, 5]) //错误示范    
```

数组 array

数组是一种有序集合, 可以包含不同类型的元素，并且数组的长度是可变的

```javascript
let str = ["a","b","c","b"] //定义了一个包含4个字符串的数组
console.log("str", str)

// 可以包含不同类型的元素
let arr = ["1","3.14","a"]
console.log(arr)
```

函数 function

函数是一段可重复执行的代码块，可以接收输入参数并返回一个值或执行某些操作

```javascript
function add(a, b) {
  return a + b
}
console.log(add(1, 2))
```

类 class

类是一种蓝图或模板，用于创建具有相同属性和方法的对象

```javascript
class Person {
  constructor(UserName, userAge) {
    this.name = UserName
    this.age = userAge
  }
  info() {
    console.log("姓名", this.name, "年龄", this.age)
    }
}

const person1 = new Person("张三", 20)
const person2 = new Person("李四", 22)
person1.info()
person2.info()
```

# 作用域
## 块级作用域（Block Scope）
**作用域范围**：

`let`/`const`的作用域由`{ }`代码块限制（如`if`、`for`、`function`内部），而`var`是函数作用域

```javascript
// var的函数作用域
function fn() {
  var x = 10;
  if (true) {
    var x = 20; // 同个作用域，覆盖外层x
  }
  console.log(x); // 输出20
}

// let的块级作用域
function fn() {
  let x = 10;
  if (true) {
    let x = 20; // 新的块级作用域，与外层x不冲突
  }
  console.log(x); // 输出10
}
```

**应用场景**：循环中声明计数器变量（避免`var`的变量覆盖问题）

```javascript
for (let i = 0; i < 5; i++) {
  // 每次循环都是新的i（块级作用域）
  setTimeout(() => {
    console.log(i); // 依次输出0,1,2,3,4
  }, 100);
}
```

## 暂时性死区（Temporal Dead Zone, TDZ）
**规则**：

`let`/`const`声明的变量在声明前无法访问（会报错）

而`var`存在 “变量提升”（声明前为`undefined`）

```javascript
// var的变量提升（先使用后声明，不会报错）
console.log(foo); // 输出undefined
var foo = 10;

// let的暂时性死区（声明前使用会报错）
console.log(bar); // ReferenceError: bar is not defined
let bar = 20;
```

**注意**：TDZ 存在于**块级作用域内**，从块开始到变量声明处

# 解构赋值
Destructuring Assignment

“Assignment” 常见意思为 “任务；作业；分配；（财产等的）转让” 。在编程语境中常表示 “赋值”，比如在语句 “int a = 5;” 中，就是将数值 5 赋值给变量 a ，这里就体现为一种赋予变量特定值的操作。

**核心作用**：快速从数组 / 对象中提取值，简化变量赋值

## 数组解构
**基本用法**：按位置匹配数组元素

```javascript
const arr = [1, 2, 3];
const [a, b, c] = arr; // a=1, b=2, c=3
```

**默认值**：当数组元素不足时，使用默认值

```javascript
const [x, y = 'default'] = [1]; // x=1, y='default'（原数组只有1个元素）
```

**剩余参数（...）**：**拓展运算符**提取剩余元素为新数组

```javascript
const [first, ...rest] = [1, 2, 3, 4]; 
// first=1, rest=[2,3,4]
```

**交换变量**：无需临时变量，直接交换值

```javascript
let a = 10, b = 20;
[a, b] = [b, a]; // a=20, b=10
```

## 对象解构
**基本用法**：按属性名匹配（与顺序无关，需属性名一致）

```javascript
const user = { name: 'Alice', age: 25 };
const { name, age } = user; // name='Alice', age=25
```

**重命名属性**：使用`新名称: 原属性名`语法

```javascript
const { name: userName, age: userAge } = user; // userName='Alice', userAge=25
```

**嵌套解构**：提取嵌套对象的属性

```javascript
const student = {
  info: {
    name: 'Bob',
    score: { math: 90, english: 85 }
  }
};
const { info: { name, score: { math } } } = student; // name='Bob', math=90
```

**默认值**：对象属性不存在时使用默认值

```javascript
const { gender = 'unknown' } = user; // user中无gender属性，gender='unknown'
```

## 函数参数解构
**直接在参数中解构**：简化函数参数处理

```javascript
// 接收数组参数
function sum([a, b]) {
  return a + b;
}
sum([1, 2]); // 3

// 接收对象参数
function greet({ name = 'Guest', age }) {
  return `Hello, ${name}! You are ${age} years old.`;
}
greet({ age: 30 }); // "Hello, Guest! You are 30 years old."
```

# Symbol
原始数据类型 Symbol ，表示**独一无二的值**

最大的用法是用来定义**对象的唯一属性名**

对象的属性名只能是字符串（或数字，会被自动转为字符串）

如果多人协作开发，或引入第三方库时，很容易出现**属性名冲突**的问题

```javascript
// 你写的代码
let obj = { name: "张三" };

// 同事写的代码，不小心用了同样的属性名
obj.name = "李四"; // 你的"name"被覆盖了！
```

ES6 数据类型除了 Number 、 String 、 Boolean 、 Objec t、 null 和 undefined ，还新增了 Symbol 

## 基本用法
用 **Symbol()` 函数**创建，注意**不能用 `new 关键字**

因为它是原始类型，不是对象

```javascript
// 创建一个 Symbol
let s1 = Symbol();

// 可以传入一个字符串作为"描述信息"（方便调试，不影响唯一性）
let s2 = Symbol("id"); 
let s3 = Symbol("id"); // 虽然描述相同，但仍是不同的值
```

关键特性：**即使描述相同，两个 Symbol 也不相等**：

```javascript
console.log(s2 === s3); // false（重点！独一无二）
```

## 作为属性名
由于每一个 Symbol 的值都是不相等的，所以 Symbol 作为对象的属性名，可以保证**属性不重名**

```javascript
// 创建一个 Symbol 作为属性名
let id = Symbol("id");

// 定义对象
let user = {
  [id]: 1001, // 用方括号包裹 Symbol 作为属性名
  name: "张三"
};

// 访问 Symbol 属性（必须用方括号，不能用点语法）
console.log(user[id]); // 1001（正确）
console.log(user.id); // undefined（错误，点语法会把"id"当字符串处理）
```

```javascript
let otherId = Symbol("id");
user[otherId] = 1002; 

console.log(user[id]); // 1001（你的值还在）
console.log(user[otherId]); // 1002（新值独立存在）
```

## 全局共享 Symbol.for()
上面的 `Symbol()` 创建的是 “局部 Symbol”（仅当前作用域有效）

如果想在不同地方复用同一个 Symbol，可以用 `Symbol.for()`：

+ **Symbol.for("key")：** 会在全局注册表中查找 key 对应的 Symbol，找到就返回；没找到就新建并注册
+ **Symbol.keyFor(symbol)**：根据全局 Symbol，获取它的 **key**

```javascript
// 第一次调用：全局没有"age"，创建并注册
let age1 = Symbol.for("age");

// 第二次调用：全局已有"age"，直接返回同一个
let age2 = Symbol.for("age");

console.log(age1 === age2); // true（全局共享）

// 获取 key
console.log(Symbol.keyFor(age1)); // "age"
```

## 注意事项
**不能和其他类型直接拼接字符串**：

```javascript
let s = Symbol("hello");
console.log("say " + s); // 报错！Symbol 不能直接拼接
console.log("say " + String(s)); // 正确：转为字符串后拼接（结果："say Symbol(hello)"）
```

**Symbol 属性不会被常规遍历方法获取**：

用 `for...in`、`Object.keys()` 等遍历对象时，不会遍历到 Symbol 属性（适合做 “私有属性”）：

```javascript
let id = Symbol("id");
let obj = { [id]: 1, name: "张三" };

for (let key in obj) {
  console.log(key); // 只输出 "name"，不会输出 Symbol 属性
}

// 要获取 Symbol 属性，需用专门的方法：
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]
```

## 实际应用场景
**避免对象属性名冲突**：在给对象扩展属性时，用 Symbol 确保不覆盖原有属性

**定义 “常量” 集合**：表示一组互斥的选项（比如状态码、类型标识）：

```javascript
// 用 Symbol 定义不同的状态（确保不会重复）
const STATUS = {
  PENDING: Symbol("pending"),
  SUCCESS: Symbol("success"),
  ERROR: Symbol("error")
};

// 使用时不用担心和其他值冲突
function handleStatus(status) {
  if (status === STATUS.PENDING) { ... }
}
```

**模拟私有属性**：因为 Symbol 属性不易被遍历到，可模拟 “私有” 效果（非真正私有，只是隐蔽）

记住一句话：**只要需要一个 “绝不重复” 的标识符，就用 Symbol**

# Map 映射
`Map` 是一种**键值对集合**，类似普通对象，但它的**键可以是任意类型**（字符串、数字、对象、Symbol 等），而普通对象的键只能是字符串或 Symbol

## 创建 Map
通过 **new Map() 创建**，参数可以是一个“键值对数组”

数组中的每个元素是 `[key, value]` 形式：

```javascript
// 空 Map
let m = new Map();

// 从键值对数组创建
let m1 = new Map([
  ["name", "张三"],
  [123, "数字键"],
  [Symbol("id"), 1001] // Symbol 作为键
]);
console.log(m1); // Map(3) { 'name' => '张三', 123 => '数字键', Symbol(id) => 1001 }
```

## 常用方法
| **方法** | **作用** | **示例** |
| :--- | :--- | :--- |
| `set(key, value)` | 添加键值对，可链式 | `m.set("name", "李四").set("age", 20)` |
| `get(key)` | 获取指定键的值（没有 undefined） | `m.get("name") // "李四"` |
| `has(key)` | 判断是否包含指定键（布尔值） | `m.has("age") // true` |
| `delete(key)` | 删除指定键（布尔值，是否删除） | `m.delete("age") // true` |
| `clear()` | 清空所有键值对（无 返回值） | `m.clear()` |
| `size` | 属性，返回键值对总数 | `m.size // 1` |

```javascript
let map = new Map();
let objKey = { id: 1 }; // 用对象作为键

// 添加键值对
map.set("name", "张三")
   .set(objKey, "用对象当键")
   .set(Symbol("score"), 90);

// 获取值
console.log(map.get("name")); // "张三"
console.log(map.get(objKey)); // "用对象当键"

// 判断是否包含键
console.log(map.has(Symbol("score"))); // true

// 删除键
map.delete("name");
console.log(map.has("name")); // false

// 键值对数量
console.log(map.size); // 2（剩下 objKey 和 Symbol(score) 两个键）
```

## 遍历方法
`Map` 也是可迭代对象，遍历顺序为**插入顺序**，常用遍历方式：

+ `forEach()`：回调参数为 `(value, key, map)`
+ `for...of`：直接遍历键值对数组 `[key, value]`
+ 还有 `keys()`（遍历键）、`values()`（遍历值）、`entries()`（遍历键值对，默认）

```javascript
let map = new Map([["a", 1], ["b", 2]]);

// forEach 遍历
map.forEach((value, key) => {
  console.log(key, value); // "a" 1 ； "b" 2
});

// for...of 遍历（默认 entries()）
for (let [key, value] of map) {
  console.log(key, value); // "a" 1 ； "b" 2
}

// 遍历所有键
for (let key of map.keys()) {
  console.log(key); // "a" ； "b"
}
```

## Map 与普通对象的区别
| **特性** | **普通对象** | **Map** |
| :--- | :--- | :--- |
| 键的类型 | 只能是字符串或 Symbol | 可以是任意类型 |
| 键的顺序 | ES6 前无序，ES6 后按插入顺序 | 严格按插入顺序保存 |
| 键值对数量 | 手动计算（`Object.keys(obj).length`） | 直接通过 `size`属性获取 |
| 遍历方式 | 主要用 `for...in`（会遍历原型链） | 支持 `forEach`、`for...of`等 |
| 频繁增删性能 | 一般 | 更好（专门为频繁操作设计） |

## 实际应用场景
+ **需要用非字符串作为键**：比如用 DOM 元素作为键存储数据（`map.set(domElement, data)`）
+ **频繁添加 / 删除键值对**：Map 的性能优于普通对象
+ **需要保留键的插入顺序**：比如需要按添加顺序遍历键值对时
+ **存储复杂关系数据**：比如映射表（如 ID 到用户信息的映射）

```javascript
//创建Map集合
//let person = new Map() //创建一个空的Map集合
let person = new Map([
    ["name", "邓瑞"],
    ["gender", "男"],
    ["web", "dengruicode.com"]
])

//向Map集合中添加新的元素
person.set('height', 175)
//在Map集合中, 每个键都是唯一的, 当使用相同的键再次调用 set() 方法时, 会替换原来键对应的值
person.set('web', "www.dengruicode.com")
console.log("person", person)

//删除元素
person.delete('gender')
console.log("person", person)

//检查Map集合是否包含指定元素
console.log("person.has", person.has('gender'))

//获取Map集合的大小
console.log("person.size", person.size)

//将Map集合转换为数组
let arr = Array.from(person)
console.log("arr", arr)

//使用扩展运算符将 Map集合 转换为 数组
let arr2 = [...person]
console.log("arr2", arr2)

//使用for...of循环遍历Map集合
//解构可以从数组或对象中提取值并赋给变量
//[key, value] 就是一种解构语法, 用于将 Map 集合中的键值对解构为 key 和 value 两个变量
for (let [key, value] of person) {
    console.log("for...of", key, value)
}

//使用forEach方法遍历Map集合的键值对
person.forEach((value, key) => {
    console.log("forEach", key, value)
})

//清空Map集合
person.clear()
console.log("person.size", person.size)
```

# Set集合
`Set` 是一种**无序的集合**

核心特点是：**成员的值都是唯一的，没有重复**，可以理解为 “**没有重复元素的数组**”

## 创建 Set
通过 **new Set() 创建**，参数可以是一个可迭代对象（如数组、字符串等）：

```javascript
// 空 Set
let s = new Set();

// 从数组创建（自动去重）
let s1 = new Set([1, 2, 3, 2, 3]); 
console.log(s1); // Set(3) {1, 2, 3}（重复的2、3被自动过滤）

// 从字符串创建（去重字符）
let s2 = new Set("hello"); 
console.log(s2); // Set(4) {'h', 'e', 'l', 'o'}（重复的'l'被去重）
```

## 常用方法
| **方法** | **作用** | **示例** |
| :--- | :--- | :--- |
| `add(value)` | 添加成员（返回 Set 本身，可链式调用） | `s.add(1).add(2)` |
| `delete(value)` | 删除指定成员（返回布尔值，表示是否删除成功） | `s.delete(1) // true` |
| `has(value)` | 判断是否包含指定成员（返回布尔值） | `s.has(1) // false` |
| `clear()` | 清空所有成员（无返回值） | `s.clear()` |
| `size` | 属性，返回成员总数（类似数组的 length） | `s.size // 0` |

```javascript
let set = new Set();

// 添加成员
set.add("a").add("b").add("a"); // 链式添加，重复的"a"只保留一个
console.log(set.size); // 2（成员是"a"、"b"）

// 判断是否包含
console.log(set.has("a")); // true

// 删除成员
console.log(set.delete("a")); // true（删除成功）
console.log(set.has("a")); // false

// 清空
set.clear();
console.log(set.size); // 0
```

## 遍历方法
`Set` 是可迭代对象，支持以下遍历方式（遍历顺序为**插入顺序**）：

+ `forEach()`：和数组的 forEach 用法类似
+ `for...of`：直接遍历成员值

```javascript
let set = new Set(["a", "b", "c"]);

// forEach 遍历
set.forEach((value, index, set) => {
  // 注意：Set 没有索引，这里的 value 和 index 是同一个值
  console.log(value); // "a"、"b"、"c"
});

// for...of 遍历
for (let value of set) {
  console.log(value); // "a"、"b"、"c"
}
```

## 数组去重
这是 `Set` 最常用的场景，结合扩展运算符 `...` 可快速去重：

```javascript
let arr = [1, 2, 2, 3, 3, 3];
let uniqueArr = [...new Set(arr)]; 
console.log(uniqueArr); // [1, 2, 3]
```

## 实现集合运算（交集、并集、差集）
利用 `Set` 的唯一性，可以方便地实现数学中的集合操作：

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([2, 3, 4]);

// 并集（合并两个集合，去重）
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}

// 交集（两个集合都有的成员）
let intersection = new Set([...a].filter(x => b.has(x))); // Set {2, 3}

// 差集（a 有但 b 没有的成员）
let difference = new Set([...a].filter(x => !b.has(x))); // Set {1}
```

```javascript
//创建Set集合
//let fruits = new Set() //创建一个空的Set集合
let fruits = new Set(['apple', 'orange', 'banana']) //创建一个包含初始值的Set集合

//向Set集合中添加新的元素
fruits.add('mango')
//fruits.add("orange") //若该元素已经存在, 则不会重复添加, 因为 Set 中的元素必须唯一
console.log("fruits", fruits)

//从Set集合中删除元素
fruits.delete('banana')
console.log("fruits", fruits)

//检查Set集合是否包含指定元素
console.log("fruits.has", fruits.has('banana'))

//获取Set集合的大小
console.log("fruits.size", fruits.size)

//使用 Array.from() 方法将 Set集合 转换为 数组
let arr = Array.from(fruits)
console.log("arr", arr)

//使用扩展运算符将 Set集合 转换为 数组
let arr2 = [...fruits]
console.log("arr2", arr2)

//扩展运算符是用于展开可迭代对象(如数组、字符串等)
//let web = 'dengruicode.com'
let web = '邓瑞编程'
let webArr = [...web] //使用扩展运算符将 字符串 转换为 数组
console.log("webArr", webArr) //['邓', '瑞', '编', '程']

//使用for...of循环遍历 Set集合
for (let item of fruits) {
    console.log("for...of", item)
}

//使用forEach方法来遍历 Set集合
fruits.forEach(value => {
    console.log("forEach", value)
})

//清空 Set
fruits.clear()
console.log("fruits.size", fruits.size)

//将 数组 转换为 Set集合 实现数组去重
let numberArr = [1, 2, 3, 3, 2, 1]
let numberSet = new Set(numberArr)
console.log(numberSet)
```

# Reflect 与 Proxy
Proxy 与 Reflect 是 ES6 为了操作对象引入的 API 

Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作

Reflect 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的

**Proxy** 负责 **“拦截”** 对象的各种操作（比如读属性、改属性）

**Reflect** 负责 **“执行”** 对象的原始操作（确保拦截时不破坏原生行为）

## Proxy：对象的 “代理器”
`Proxy` 可以理解为给目标对象 “套了一层壳”，所有对目标对象的操作（如访问属性、赋值、删除等）都会先经过这层壳，我们可以在壳里自定义这些操作的逻辑

创建 `Proxy` 的语法：

```javascript
const proxy = new Proxy(target, handler);
```

+ `target`：被代理的目标对象（可以是对象、数组、函数等）
+ **handler：** 一个对象，里面定义了**拦截器方法**（当对代理对象执行特定操作时，触发对应拦截器）

## 常用拦截器方法
`handler` 中可以定义多种拦截器，对应不同的对象操作

| **拦截器方法** | **触发场景** | **示例** |
| :--- | :--- | :--- |
| `get(target, prop, receiver)` | 读取代理对象的属性（`proxy.prop`<br/>） | 拦截属性访问，自定义返回值 |
| `set(target, prop, value, receiver)` | 给代理对象的属性赋值（`proxy.prop = value`<br/>） | 拦截赋值，做数据校验 |
| `has(target, prop)` | 使用 `in`<br/> 操作符（`prop in proxy`<br/>） | 控制哪些属性可被 `in`<br/> 检测 |
| `deleteProperty(target, prop)` | 删除属性（`delete proxy.prop`<br/>） | 拦截删除，禁止删除特定属性 |
| `apply(target, thisArg, args)` | 代理对象是函数时，调用函数（`proxy()`<br/>） | 拦截函数调用，添加日志 |
| `construct(target, args, newTarget)` | 用 `new`<br/> 调用代理函数（`new proxy()`<br/>） | 拦截构造函数，自定义实例化逻辑 |

## 用拦截器实现功能
**数据校验（`set` 拦截器）**  
限制对象的 `age` 属性必须是数字且大于 0：

```javascript
const user = { name: '张三', age: 18 };

const userProxy = new Proxy(user, {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value <= 0) {
        throw new Error('年龄必须是正数');
      }
    }
    // 符合条件则赋值（这里暂时用原始方式，后面结合Reflect优化）
    target[prop] = value;
    return true; // 表示赋值成功
  }
});

userProxy.age = 20; // 成功（user.age变为20）
userProxy.age = -5; // 报错：年龄必须是正数
```

  

**拦截属性访问（`get` 拦截器）**  
访问不存在的属性时，返回默认值：

```javascript
const obj = { name: '李四' };

const objProxy = new Proxy(obj, {
  get(target, prop) {
    // 如果属性不存在，返回'默认值'
    return prop in target ? target[prop] : '默认值';
  }
});

console.log(objProxy.name); // 李四
console.log(objProxy.age); // 默认值（因为age不存在）
```

## Reflect：对象操作的 “标准工具库”
`Reflect` 是一个内置对象，它提供了一系列静态方法，**每个方法都对应一种对象操作**（与 `Proxy` 的拦截器一一对应）

  
统一对象操作的 API（把原本散落在 `Object` 上的方法，如 `Object.defineProperty`，集中到 `Reflect` 上）；

让对象操作更 “函数式”（比如用 `Reflect.has(obj, prop)` 替代 `prop in obj`）

与 `Proxy` 配合，在拦截器中安全地执行 “原始操作”（避免破坏原生行为）

## 常用方法（与 Proxy 拦截器对应）
`Reflect` 的方法和 `Proxy` 的拦截器参数完全一致，方便在拦截器中调用

| **Reflect 方法** | **对应操作** | **作用** |
| :--- | :--- | :--- |
| `Reflect.get(target, prop, receiver)` | 读取属性 | 等同于 `target[prop]`<br/>但更安全 |
| `Reflect.set(target, prop, value, receiver)` | 赋值 | 等同于 `target[prop] = value`<br/>返回布尔值表示成功与否 |
| `Reflect.has(target, prop)` | 检测属性是否存在 | 等同于 `prop in target` |
| `Reflect.deleteProperty(target, prop)` | 删除属性 | 等同于 `delete target[prop]`<br/>返回布尔值 |
| `Reflect.apply(target, thisArg, args)` | 调用函数 | 等同于 `target.apply(thisArg, args)` |

为什么要用 Reflect？

在 `Proxy` 的拦截器中，直接操作 `target`（如 `target[prop] = value`）可能有隐患（比如目标对象是冻结的、或有 getter/setter 时）。而 `Reflect` 方法会**规范化操作的返回值**（成功返回 `true`，失败返回 `false`），且能正确处理复杂场景

**优化前面的 `set` 拦截器示例**：  
用 `Reflect.set` 替代直接赋值，更可靠：

```javascript
const userProxy = new Proxy(user, {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value <= 0) {
        throw new Error('年龄必须是正数');
      }
    }
    // 用Reflect执行原始赋值，返回布尔值
    return Reflect.set(target, prop, value); 
  }
});
```

## Proxy 与 Reflect 的配合
`Proxy` 负责 “拦截”，`Reflect` 负责 “执行原始操作”，两者配合可以在自定义逻辑的同时，保证操作的规范性  

**例：日志记录 + 原始操作**  
拦截函数调用，记录参数和返回值，再用 `Reflect.apply` 执行原始函数：

```javascript
function add(a, b) {
  return a + b;
}

// 代理add函数
const addProxy = new Proxy(add, {
  apply(target, thisArg, args) {
    // 自定义逻辑：记录日志
    console.log(`调用add，参数：${args}`);
    // 用Reflect执行原始函数调用
    const result = Reflect.apply(target, thisArg, args);
    console.log(`返回值：${result}`);
    return result;
  }
});

addProxy(2, 3); 
// 输出：调用add，参数：2,3 → 返回值：5 → 最终结果：5
```

+ `Proxy` 是对象的 “代理层”，通过拦截器自定义对象操作（读、写、删等）；
+ `Reflect` 是对象操作的 “标准工具”，提供与拦截器对应的方法，用于在拦截时安全执行原始操作；
+ 两者配合使用，既能灵活扩展对象行为，又能保证操作的规范性，是 ES6 中处理对象的强大工具（常见于框架底层，如 Vue3 的响应式原理）

# 字符串拓展
```javascript
et web = "dengruicode.com"

// 字符串长度
let len = web.length
console.log("字符串长度:", len)

// 转小写
let str1 = "DAVID".toLowerCase()
console.log("转小写:", str1)

// 转大写
let str2 = "luna".toUpperCase()
console.log("转大写:", str2)

// 返回字符串在索引处的字符
let str3 = web[2]
console.log("返回字符串在索引处的字符:", str3)

// 字符串转为字符数组
let str4 = [...web]
console.log("字符串转为字符数组:", str4)

// 字符串转 int
let number = parseInt("168")
console.log("字符串转int:", number)

// 字符串替换
let str6 = web.replaceAll("co", "y")
console.log("替换全部字符串:", str6)

let str7 = web.replace("co", "y")
console.log("替换1个字符串:", str7)

// 去除字符串两侧指定的字符
let str8 = "   dengruicode.com   ".trim()
console.log("去除字符串两侧指定的字符:", str8)

// 判断是否包含某个字符串
let result = web.includes("dengrui") // true
console.log("是否包含某个字符串:", result)

// 返回字符串中第一次出现某个字符串的位置,若不存在则返回-1
let result2 = web.indexOf("dengrui")
console.log("返回字符串中第一次出现某个字符串的位置:", result2)

let result3 = "www.dengruicode.com".indexOf("dengrui")
console.log("返回字符串中第一次出现某个字符串的位置:", result3)

// 判断一个字符串是否以指定的前缀开头
let result4 = "www.dengruicode.com".startsWith("www")
console.log("判断一个字符串是否以指定的前缀开头:", result4)

// 判断一个字符串是否以指定的后缀结尾
let result5 = "www.dengruicode.com".endsWith("net")
console.log("判断一个字符串是否以指定的后缀结尾:", result5)

// 将字符串按照指定字符分割成数组
let arr = "a,b,c,d".split(",")
console.log("将字符串按照指定字符分割成数组:", arr)

// 字符串截取 substr(开始位置,截取长度)
let subStr = web.substr(0, 7) //dengrui
console.log("截取字符串的前7个字符:", subStr)

let subStr2 = web.substr(-3) //com
console.log("截取字符串的最后3个字符:", subStr2)

let subStr3 = web.substr(4) //ruicode.com [字符串下标是从 0 开始]
console.log("从字符串的第5个位置开始截取直至字符串末尾:", subStr3)

//重复字符串
let repeatstr = "David".repeat(3)
console.log("重复3次字符串", repeatstr)

//在字符串前添加指定数量的填充字符, 直到该字符串达到指定的长度
let padStart = "David".padStart(15, "-") //由于 David 占 5 个字符, 因此只需要再添加 10 个横线, 即可达到总长度 15
//let padStart = "David".padStart(15) //默认空格
console.log("padStart:", padStart)

//在字符串后添加指定数量的填充字符, 直到该字符串达到指定的长度
let padEnd = "David".padEnd(10, "-")
console.log("padEnd:", padEnd)
```

## 模板字符串（Template Literals）
**核心作用**：替代传统字符串拼接，支持动态插值、多行文本和标签模板

基本语法与表达式插值

+ 用反引号（`）包裹字符串**，通过`${}` 插入表达式：

```javascript
// 传统字符串拼接
const name = 'Alice';
const age = 25;
const oldMsg = 'My name is ' + name + ', and I am ' + age + ' years old.';

// 模板字符串插值
const newMsg = `My name is ${name}, and I am ${age} years old.`;
console.log(newMsg); // "My name is Alice, and I am 25 years old."

// 支持复杂表达式
const result = `1 + 1 = ${1 + 1}`; // "1 + 1 = 2"
const obj = { name: 'Bob' };
const msg = `Hello, ${obj.name.toUpperCase()}`; // "Hello, BOB"
```

**多行字符串：** 直接换行书写，无需`\n`或拼接：

```javascript
// 传统多行字符串
const html1 = '<div class="box">\n  <h1>标题</h1>\n  <p>内容</p>\n</div>';

// 模板字符串多行
const html2 = `
<div class="box">
  <h1>标题</h1>
  <p>内容</p>
</div>
`;
console.log(html2.trim()); // 输出格式化后的HTML（注意前后空格需手动处理）
```

**标签模板（Tagged Templates）语法**：`标签函数(模板字符串)`，用于自定义字符串处理逻辑：

```javascript
// 标签函数第一个参数是模板片段数组，后续参数是插值表达式的值
function highlight(strings, ...values) {
  let result = '';
  for (let i = 0; i < values.length; i++) {
    result += strings[i] + '<span class="highlight">' + values[i] + '</span>';
  }
  result += strings[strings.length - 1];
  return result;
}

const name = 'Alice';
const age = 25;
const highlighted = highlight`My name is ${name}, and I am ${age} years old.`;
console.log(highlighted); 
// 输出："My name is <span class="highlight">Alice</span>, and I am <span class="highlight">25</span> years old."
```

  
**应用场景**：

+ 模板编译（如 React 的 JSX 转换）；
+ 字符串格式化、国际化（i18n）处理；
+ HTML 转义（防止 XSS 攻击）

**模板字符串**

+ 占位符（${}）与表达式嵌入
+ 多行字符串与标签模板（Tagged Templates）

# 数值扩展
**数值新特性**

+ 二进制与八进制字面量
+ Number.isFinite()、Number.isNaN()
+ Math 扩展方法：trunc ()、cbrt ()、hypot ()

**核心作用**：增强数值字面量表示和计算能力，新增实用方法。

## 二进制与八进制字面量
+ **二进制**：以`0b`或`0B`开头（ES6 新增）：

```javascript
const bin = 0b1010; // 二进制1010，等价于十进制10
console.log(bin); // 10
```

+ **八进制**：以`0o`或`0O`开头（ES6 规范，替代旧版的前导 0）：

```javascript
const oct = 0o12; // 八进制12，等价于十进制10
console.log(oct); // 10

// 旧版八进制（前导0）在ES6中仍支持，但建议用0o前缀
const oldOct = 012; // 八进制12，等价于十进制10
```

## 数值判断方法
+ **Number.isFinite(value)**：严格判断是否为有限数（非 NaN、非 Infinity）：

```javascript
Number.isFinite(10); // true
Number.isFinite(Infinity); // false
Number.isFinite('10'); // false（需为数值类型）
```

+ **Number.isNaN(value)**：严格判断是否为 NaN（解决全局`isNaN()`的类型问题）：

```javascript
isNaN('10'); // true（'10'转换为NaN）
Number.isNaN('10'); // false（严格检查是否为NaN）
Number.isNaN(NaN); // true
```

## Math 扩展方法
+ **Math.trunc(x)**：去除小数部分，返回整数（类似`parseInt`，但更规范）：

```javascript
Math.trunc(3.14); // 3
Math.trunc(-2.5); // -2（直接截断，非四舍五入）
```

+ **Math.cbrt(x)**：计算立方根：

```javascript
Math.cbrt(8); // 2
Math.cbrt(-27); // -3
```

+ **Math.hypot(...values)**：计算平方根（√(x²+y²+...))：

```javascript
Math.hypot(3, 4); // 5（√(3²+4²)）
Math.hypot(5, 12, 13); // 13（√(5²+12²+13²) = √(25+144+169) = √338 ≈ 18.385？不，实际是√(5²+12²) = 13，因为hypot计算所有参数的平方和的平方根）
```

+ **指数运算符（**）：ES2016 新增，等价于`Math.pow()`：

```javascript
2 ** 3; // 8（2³）
Math.pow(2, 3); // 8
```

# 对象扩展
**属性简洁写法**：当变量名与属性名一致时，可直接省略属性名

```javascript
const name = 'Alice';
const age = 25;
const user = { name, age }; // 等价于 { name: name, age: age }
```

**方法简洁写法**：直接在对象中定义方法，省略`function`关键字

```javascript
const calculator = {
  sum(a, b) { // 等价于 sum: function(a, b) { ... }
    return a + b;
  }
};
calculator.sum(2, 3); // 5
```

**计算属性名：** 动态生成对象属性名（属性名由表达式计算得出）

```javascript
const key = 'name';
const user = {
  [key]: 'Alice', // 属性名是变量key的值（'name'）
  ['age' + 1]: 26 // 计算后属性名为'age1'
};
console.log(user.name); // 'Alice'
console.log(user.age1); // 26
```

**应用场景**：根据变量动态创建属性（如 API 接口名、动态配置）。

**Object.is(a, b)**：严格比较两个值是否相等（解决`===`的特殊值问题）

```javascript
// === 对NaN和-0的处理
console.log(NaN === NaN); // false
console.log(-0 === +0); // true

// Object.is的正确判断
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, +0)); // false
```

**Object.assign(target, ...sources)**：浅拷贝对象（合并多个对象）

```javascript
const defaults = { name: 'Guest', age: 30 };
const user = { name: 'Alice' };
const merged = Object.assign(defaults, user); // { name: 'Alice', age: 30 }

// 数组场景：合并数组会转为对象（不推荐，用扩展运算符更合适）
const arr1 = [1, 2], arr2 = [3, 4];
Object.assign(arr1, arr2); // arr1变为[3,4]（按索引覆盖）
```

**注意**：浅拷贝，若属性为对象，仅复制引用（修改会影响原对象）

# 数组拓展
```javascript
//定义数组
let arr = [10, 11]
console.log("arr", arr)

//向数组末尾添加一个或多个元素, 并返回修改后数组的长度
let arrLength = arr.push(12, 13)
console.log("arr", arr) //[10, 11, 12, 13]
console.log("arrLength", arrLength)

//向数组开头添加一个或多个元素, 并返回修改后数组的长度
arrLength = arr.unshift(8, 9)
console.log("arr", arr) //[8, 9, 10, 11, 12, 13]
console.log("arrLength", arrLength)

//删除数组中第一个元素, 并返回被删除元素
let delElement = arr.shift()
console.log("arr", arr) //[9, 10, 11, 12, 13]
console.log("delElement", delElement) //8

//删除数组最后一个元素, 并返回被删除元素
delElement = arr.pop()
console.log("arr", arr) //[9, 10, 11, 12]
console.log("delElement", delElement) //13

//删除元素, 并返回包含被删除元素的数组 splice(要删除元素的索引位置, 要删除的元素数量)
//let delArr = arr.splice(2, 1) // 删除第3个元素 [数组的索引是从 0 开始]
let delArr = arr.splice(2, 2) // 删除第3和第4个元素
console.log("arr", arr) //[9, 10]
console.log("delArr", delArr) //[11, 12]

//颠倒数组中元素的顺序
arr.reverse()
console.log("arr", arr) //[10, 9]

//数组中的元素按照首字母顺序排序
let arr2 = ['banana', 'apple', 'orange']
arr2.sort()
console.log("arr2", arr2) //['apple', 'banana', 'orange']

//数组中的元素按照数字排序
let arr3 = [5, 20, 13, 1, 4]
//arr3.sort() //默认情况下 sort() 方法使用字符串排序, 导致并没有按照数字大小排序
/*
    比较函数 (a, b) => a - b 接收两个参数 a 和 b, 用于比较这两个元素的大小, 返回 a - b 的结果决定了 sort() 方法的排序顺序
    若 a < b, 则 a - b 是一个负数, 表示 a 应该在 b 前面
    若 a = b, 则 a - b 是 0, 位置保持不变
    若 a > b, 则 a - b 是一个正数, 表示 a 应该在 b 后面
*/
arr3.sort((a, b) => a - b)
console.log("arr3", arr3) //[1, 4, 5, 13, 20]

//筛选符合条件的元素, 返回一个新的数组
let arr4 = [10, 11, 12, 13, 14, 15]
let newArr = arr4.filter((value, index) => {
    return value > 12
})
console.log("newArr", newArr) //[13, 14, 15]

//将多个数组或值合并为一个新数组
let arr5 = ["十六", "十七", "十八"]
//newArr = arr3.concat(arr5) //[1, 4, 5, 13, 20, '十六', '十七', '十八']
newArr = arr4.concat(arr5, 19, 20) //[10, 11, 12, 13, 14, 15, '十六', '十七', '十八', 19, 20]
console.log("newArr", newArr)

//使用for...of循环遍历数组
let arr6 = ["邓瑞", "dengruicode.com", 100] //数组可以包含不同的数据类型
for (let item of arr6) {
    console.log("for...of", item)
}

//使用forEach方法来遍历数组
arr6.forEach((value,index) => {
    console.log("forEach", value,"index", index)
})
```

**核心作用**：简化数组操作，增强功能性

### Array.from () 与 Array.of ()
**Array.from(arrayLike[, mapFn, thisArg])**

+ 将类数组对象（如 DOM 节点列表、arguments）或可迭代对象转为数组
+ 支持映射处理（第二个参数为转换函数）

```javascript
// 转换DOM节点列表
const divs = document.querySelectorAll('div');
const divArray = Array.from(divs);

// 转换并映射：生成0-9的平方数组
const nums = Array.from({ length: 10 }, (v, i) => i * i); // [0,1,4,9,...,81]
```

**Array.of(...items)**：

+ 根据参数创建数组（解决`new Array()`的歧义问题）

```javascript
Array.of(1); // [1]（避免new Array(1)创建长度为1的空数组）
Array.of(1, 2, 3); // [1,2,3]
```

  
 

### find()、findIndex()、includes()
**find(callback)**：返回第一个符合条件的元素（无匹配则返回`undefined`）

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const user = users.find(u => u.id === 2); // { id:2, name:'Bob' }
```

**findIndex(callback)**：返回第一个符合条件的元素索引（无匹配返回`-1`）

```javascript
const index = users.findIndex(u => u.name === 'Bob'); // 1
```

**includes(value[, fromIndex])**：判断数组是否包含某个值（支持`NaN`）

```javascript
const arr = [1, 2, NaN];
console.log(arr.includes(2)); // true
console.log(arr.includes(NaN)); // true（解决indexOf无法识别NaN的问题）
```

### 填充与复制：fill ()、copyWithin ()
**fill(value[, start[, end]])**：用指定值填充数组

```javascript
const arr = new Array(5).fill('a'); // ['a','a','a','a','a']
[1,2,3,4].fill('x', 1, 3); // [1,'x','x',4]（从索引1到3前填充）
```

**copyWithin(target[, start[, end]])**：复制数组片段到指定位置（覆盖原内容）

```javascript
const arr = [1,2,3,4,5];
arr.copyWithin(0, 3); // 从索引3开始复制到索引0，结果：[4,5,3,4,5]
```

### 遍历方法：keys ()、values ()、entries ()
+ **返回可迭代对象**：结合`for...of`循环遍历数组的键、值或键值对

```javascript
const arr = ['a', 'b', 'c'];

// 遍历索引（keys）
for (const i of arr.keys()) {
  console.log(i); // 0,1,2
}

// 遍历值（values）
for (const val of arr.values()) {
  console.log(val); // 'a','b','c'
}

// 遍历键值对（entries）
for (const [i, val] of arr.entries()) {
  console.log(i, val); // 0 'a', 1 'b', 2 'c'
}
```

# 函数增强
## 箭头函数（Arrow Functions）
**核心作用**：更简洁的函数写法，静态绑定`this`作用域

### 基本语法
**标准写法**：`(参数) => { 函数体; return 结果; }`

```javascript
const add = (a, b) => {
  return a + b;
};
console.log(add(2, 3)); // 5
```

**简洁写法**：

+ 单参数可省略括号：`n => n * 2`（等价于`(n) => { return n * 2; }`）
+ 无参数需保留空括号：`() => console.log('Hello')`
+ 函数体只有一行代码时，可省略大括号和`return`

```javascript
const square = x => x * x; // 等价于x => { return x * x; }
```

**对象返回**：若函数体返回对象，需用括号包裹（避免语法歧义）

```javascript
const createObj = id => ({ id: id, name: 'Guest' });
```

## this 绑定规则（静态作用域）
**传统函数**：`this`指向调用时的对象（动态作用域）

```javascript
const obj = {
  name: 'Alice',
  sayHi: function() {
    console.log(this.name); // 调用时this指向obj，输出'Alice'
  }
};
obj.sayHi();
```

**箭头函数**：`this`指向定义时的外层作用域（静态绑定），无自身`this`

```javascript
const obj = {
  name: 'Alice',
  sayHi: () => {
    console.log(this.name); // 定义时外层是全局作用域（浏览器中为window），输出undefined
  }
};
obj.sayHi();
```

**典型场景**：在回调函数中保持`this`一致（如定时器、数组遍历）

```javascript
// 传统函数：需要用that或bind固定this
const button = {
  text: 'Click me',
  handleClick: function() {
    const that = this; // 保存this
    setTimeout(function() {
      console.log(that.text); // 输出'Click me'
    }, 100);
  }
};

// 箭头函数：直接继承外层this
const button = {
  text: 'Click me',
  handleClick: function() {
    setTimeout(() => {
      console.log(this.text); // 直接使用外层的this（button对象），输出'Click me'
    }, 100);
  }
};
```

## 不适用场景
**构造函数**：箭头函数没有`prototype`属性，无法用于`new`实例化

```javascript
const Person = (name) => {
  this.name = name; // TypeError: Cannot set property 'name' on undefined
};
const p = new Person('Bob'); // 报错
```

**需要动态`this`的场景**：如事件处理函数需要绑定 DOM 元素的`this`

```javascript
button.addEventListener('click', () => {
  console.log(this); // 这里的this是外层作用域（如全局），而非button元素
});
```

参数处理

**核心作用**：简化函数参数的初始化和灵活传递

## 默认参数值
**作用**：为函数参数设置默认值，避免参数为`undefined`时的错误

```javascript
// ES5写法：手动判断参数是否为undefined
function greet(name) {
  name = name || 'Guest';
  console.log(`Hello, ${name}`);
}

// ES6写法：直接在参数中设置默认值
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}
greet(); // 输出"Hello, Guest"（未传参时用默认值）
greet('Alice'); // 输出"Hello, Alice"
```

**注意**：默认参数仅在参数值为`undefined`时生效，传入`null`会保留`null`

```javascript
function add(a = 1, b = 2) {
  return a + b;
}
add(null, 3); // 0 + 3 = 3（a为null，不触发默认值；b为3，使用传入值）
```

## 剩余参数（Rest Parameters）
**作用**：将多余的参数收集为数组（替代 ES5 的`arguments`对象）

```javascript
function sum(...nums) { // nums是数组
  return nums.reduce((acc, cur) => acc + cur, 0);
}
sum(1, 2, 3); // 6（nums = [1,2,3]）
```

**与 arguments 的区别**：

+ `...nums`是真正的数组，可直接使用数组方法（如`map`、`filter`）；
+ `arguments`是类数组对象，需转换为数组才能使用方法。

## 扩展运算符（Spread Operator）
**作用**：展开数组 / 对象为独立元素（与剩余参数语法相同，但作用相反）

```javascript
// 合并数组
const arr1 = [1, 2], arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1,2,3,4]

// 函数调用时传递数组参数
const nums = [1, 2, 3];
sum(...nums); // 等价于sum(1,2,3)，输出6

// 对象扩展（ES2018+）
const obj1 = { a: 1 }, obj2 = { b: 2 };
const mergedObj = { ...obj1, ...obj2 }; // { a:1, b:2 }
```

**应用场景**：

+ 数组克隆：`const copy = [...originalArray]`（浅拷贝）；
+ 函数参数传递：将数组拆分为独立参数

# 迭代器
**迭代器（Iterator）** 是一种统一的接口机制，用于**遍历各种数据结构**（如数组、Set、Map 等）

它的核心作用是：提供一种 “通用的遍历方式”，让不同的数据结构可以用相同的逻辑进行遍历

在 ES6 之前，JavaScript 中遍历数据的方式很混乱：

+ 数组用 `for` 循环、`forEach`
+ 对象用 `for...in`
+ 字符串用 `for` 循环按索引访问

这些方式不统一，且有些遍历方式有缺陷（比如 `for...in` 会遍历对象原型链上的属性）

迭代器的出现解决了这个问题：它定义了**一套标准的遍历接口**，任何数据结构只要实现了这个接口，就可以用相同的方式（比如 `for...of` 循环）遍历

## 迭代器的核心概念
**可迭代对象（Iterable）**

一个对象如果符合**迭代器协议**，就称为 “可迭代对象”

它必须有一个特殊的属性：**Symbol.iterator**（ES6 新增的内置 Symbol 值）

这个属性的值是一个**函数**，调用后会返回一个 “迭代器对象”

简单说：**可迭代对象 = 有 `Symbol.iterator` 属性的对象迭代器对象（Iterator）**

由 `Symbol.iterator` 函数返回的对象，它必须有一个 `next()` 方法，用于控制遍历过程

`next()` 方法的返回值是一个对象，包含两个属性：

+ `value`：当前遍历到的值
+ `done`：布尔值，表示是否遍历结束（`true` 表示结束，`false` 表示继续）

**迭代器的工作流程**

调用可迭代对象的 `Symbol.iterator` 方法，得到一个迭代器对象

反复调用迭代器对象的 `next()` 方法：

+ 每次调用返回 `{ value: 当前值, done: false }`，表示还有数据
+ 当遍历结束时，返回 `{ value: undefined, done: true }`

**原生可迭代对象**

ES6 中很多原生数据结构默认实现了迭代器接口，是 “可迭代对象”，可以直接用 `for...of` 遍历

+ 数组（`Array`）
+ 字符串（`String`）
+ Set
+ Map
+ 类数组对象（如 `arguments`、`NodeList`）

**手动调用迭代器遍历数组**

```javascript
const arr = [1, 2, 3];

// 1. 获取迭代器对象（调用 Symbol.iterator 方法）
const iterator = arr[Symbol.iterator]();

// 2. 调用 next() 方法遍历
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }（遍历结束）
```

## `for...of` 循环与迭代器
`for...of` 是 ES6 新增的遍历语法

它的本质是**自动调用迭代器的 `next()` 方法**，直到 `done` 为 `true`

```javascript
const arr = [1, 2, 3];

// for...of 自动遍历可迭代对象
for (const item of arr) {
  console.log(item); // 1 → 2 → 3
}
```

对比 `for...in`（遍历对象属性名，不推荐遍历数组）：

```javascript
// for...in 遍历的是数组的索引（字符串类型），还可能遍历到原型链属性
for (const key in arr) {
  console.log(key); // "0" → "1" → "2"（注意是字符串）
}
```

## 自定义迭代器
如果我们想让一个普通对象成为 “可迭代对象”（能被 `for...of` 遍历），可以手动为它添加 `Symbol.iterator` 属性，实现自定义迭代逻辑

**示例：自定义一个 “范围迭代器”（遍历 1~5 的数字）**

```javascript
const range = {
  start: 1,
  end: 5,

  // 添加 Symbol.iterator 属性，返回迭代器对象
  [Symbol.iterator]() {
    let current = this.start; // 当前值，初始为 start
    const end = this.end;     // 结束值

    // 返回迭代器对象（包含 next() 方法）
    return {
      next() {
        // 如果当前值 <= end，继续遍历；否则结束
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

// 现在 range 是可迭代对象，可以用 for...of 遍历
for (const num of range) {
  console.log(num); // 1 → 2 → 3 → 4 → 5
}
```

## 迭代器的应用场景
**for...of 循环**：自动遍历所有可迭代对象

**扩展运算符（`...`）**：将可迭代对象转为数组，依赖迭代器

```javascript
const set = new Set([1, 2, 3]);
const arr = [...set]; // [1, 2, 3]（扩展运算符调用了 Set 的迭代器）
```

**解构赋值**：对可迭代对象进行解构时，依赖迭代器

```javascript
const [a, b] = new Map([["x", 1], ["y", 2]]); // a: ["x", 1], b: ["y", 2]
```

**Generator 函数**：Generator 函数返回的是一个迭代器（后续会专门讲解）

**Promise.all()、Promise.race()**：参数是可迭代对象（通常是数组）

## 注意点
**迭代器是一次性的**：一个迭代器遍历结束后（`done` 为 `true`）

再次调用 `next()` 仍返回 `{ done: true }`，需要重新获取迭代器才能再次遍历

```javascript
const arr = [1, 2];
const iterator = arr[Symbol.iterator]();
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: undefined, done: true }
iterator.next(); // 仍返回 { value: undefined, done: true }
```

  
**不同数据结构的迭代器返回值不同**：

+ 数组 / 字符串：`value` 是元素 / 字符
+ Set：`value` 是成员值
+ Map：`value` 是 `[key, value]` 数组

# Class  类与继承
类的基本语法

**核心作用**：用`class`关键字简化面向对象编程（OOP），替代传统构造函数 + 原型链模式

## class 关键字、constructor 方法
**类的定义**：

```javascript
// 类声明
class Person {
  // 构造函数：创建实例时自动调用
  constructor(name, age) {
    this.name = name; // 定义实例属性
    this.age = age;
  }

  // 实例方法：挂载到原型上（等价于Person.prototype.sayHi）
  sayHi() {
    return `Hello, my name is ${this.name}.`;
  }
}

// 创建实例
const alice = new Person('Alice', 25);
console.log(alice.sayHi()); // "Hello, my name is Alice."
```

+ 类声明不存在变量提升（需先声明后使用）；
+ `constructor`可选，未定义时自动生成空构造函数

## 实例方法与静态方法
**实例方法**：通过实例调用（定义在原型上，共享方法） 

```javascript
class Animal {
  speak() {
    return 'Generic sound'; // 实例方法
  }
}
const dog = new Animal();
dog.speak(); // "Generic sound"
```

**静态方法**：用`static`修饰，通过类名直接调用（不绑定实例）

```javascript
class MathHelper {
  static add(a, b) { // 静态方法
    return a + b;
  }
}
MathHelper.add(2, 3); // 5（无需实例化）
```

**应用场景**：

+ 实例方法：与实例数据相关的操作（如`sayHi`依赖`this.name`）；
+ 静态方法：工具函数或与类相关的操作（如工厂方法）

## 类表达式与类声明的区别
**语法**：类似函数表达式，可赋值给变量或作为立即执行函数 

```javascript
// 命名类表达式（name属性可用于调试）
const Car = class Vehicle {
  constructor(model) {
    this.model = model;
  }
  static getType() {
    return Vehicle; // 此处name为Vehicle
  }
};
console.log(Car.getType()); // Vehicle（类表达式的name属性）
```

**与类声明的区别**：

+ 类表达式的名称仅在类内部可见；
+ 类声明必须先定义后使用，类表达式可立即使用

继承机制

**核心作用**：通过`extends`实现类的继承，简化原型链操作

## extends 关键字与 super 调用
**基础继承示例**：

```javascript
// 父类（基类）
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return '...'; // 父类默认方法
  }
}

// 子类（派生类）继承父类
class Dog extends Animal {
  constructor(name, breed) {
    // 子类构造函数必须先调用super()
    super(name); // 调用父类构造函数，初始化name属性
    this.breed = breed; // 定义子类特有属性
  }
  // 重写父类方法
  speak() {
    return `Woof! My name is ${this.name}.`;
  }
}

// 创建子类实例
const husky = new Dog('Snow', 'Husky');
console.log(husky.speak()); // "Woof! My name is Snow."
```

  
**关键规则**：

+ 子类必须在`constructor`中调用`super()`，否则无法使用`this`；
+ `super()`在构造函数中用于调用父类构造函数，在方法中用于调用父类方法

## 静态方法的继承与重写
**父类静态方法会被子类继承**：**javascript**

```javascript
class Parent {
  static greet() {
    return 'Hello from Parent';
  }
}

class Child extends Parent {}
Child.greet(); // "Hello from Parent"（继承静态方法）
```

**重写静态方法**：**javascript**

```javascript
class Child extends Parent {
  static greet() {
    return super.greet() + ' and Child'; // 调用父类静态方法
  }
}
Child.greet(); // "Hello from Parent and Child"
```

## 继承内置对象（如 Array）
**ES5 继承 Array 的痛点**：原型方法无法正确访问`this`（如自定义数组类）

**ES6 改进**：`super()`正确初始化子类实例

```javascript
class MyArray extends Array {
  first() {
    return this[0]; // 正确访问实例（ES5中可能为undefined）
  }
}
const arr = new MyArray(1, 2, 3);
console.log(arr.first()); // 1
```

# 模块化
ES6 模块化（ES6 Module，简称 ESM）是 ES6 引入的**原生模块化系统**

通过 **export` 和 `import** 语法，让 JavaScript 代码可以像其他编程语言（如 Java、Python）一样，实现 “拆分文件、按需导入、避免命名冲突” 的模块化管理

## 为什么需要模块化
在 ES6 之前，JavaScript 没有原生的模块化机制，代码通常通过以下方式组织，存在明显缺陷：

+ **全局变量污染**：多个脚本文件的变量共享全局作用域，容易重名冲突
+ **依赖混乱**：如果多个脚本有依赖关系（如 A 依赖 B），必须严格按顺序引入（先引入 B 再引入 A），否则会报错
+ **代码复用差**：无法优雅地将通用逻辑抽离成独立模块，供其他文件调用

ES6 模块化的出现就是为了解决这些问题，核心目标是：**将代码拆分成独立的 “模块文件”，每个模块拥有独立的作用域，通过明确的导入 / 导出机制复用代码**。

模块化的核心语法

ES6 模块化通过两个关键字实现：`export`（导出模块内容）和 `import`（导入其他模块内容）。

## `export`：导出模块内容
一个模块（通常是一个 `.js` 文件）可以通过 `export` 导出内部的变量、函数、类等，供其他模块使用。有两种导出方式

**命名导出（Named Export）**

可以导出多个成员，每个成员都有自己的名称，导入时需要使用对应的名称

```javascript
// 模块文件：math.js
// 导出变量
export const pi = 3.14;

// 导出函数
export function add(a, b) {
  return a + b;
}

// 导出类
export class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  area() {
    return pi * this.radius **2;
  }
}

// 也可以先定义，再集中导出
const subtract = (a, b) => a - b;
export { subtract }; // 注意用花括号包裹
```

**默认导出（Default Export）**

一个模块只能有一个默认导出（**default export**），导入时可以自定义名称（不需要和原名称一致）。适合导出 “模块的主要功能”

```javascript
// 模块文件：utils.js
// 默认导出一个函数
export default function formatDate(date) {
  return date.toLocaleString();
}

// 也可以先定义再导出
const log = (msg) => console.log(msg);
export default log; // 整个模块的默认导出是 log 函数
```

## `import`：导入其他模块内容
使用 `import` 可以从其他模块导入导出的成员，语法需与导出方式对应。

**导入命名导出的成员**

需使用花括号 `{}` 包裹，名称必须与导出时一致（可通过 `as` 重命名避免冲突）

```javascript
// 导入 math.js 中的命名成员
import { pi, add, Circle } from './math.js'; // 路径需正确（相对路径或绝对路径）

console.log(pi); // 3.14
console.log(add(2, 3)); // 5
const c = new Circle(2);
console.log(c.area()); // 12.56

// 重命名导入（避免名称冲突）
import { subtract as minus } from './math.js';
console.log(minus(5, 2)); // 3
```

**导入默认导出的成员**

不需要花括号，可以自定义名称

```javascript
// 导入 utils.js 的默认导出（自定义名称为 format）
import format from './utils.js'; 
console.log(format(new Date())); // 例如：2023/10/1 12:00:00

// 也可以给默认导出起其他名字
import log from './utils.js'; 
log('Hello'); // 打印 Hello
```

**混合导入（同时导入命名成员和默认成员）**

```javascript
// 假设有一个模块：tool.js
export const version = '1.0.0';
export default function main() { /* ... */ }

// 导入时：默认成员在前，命名成员在后
import main, { version } from './tool.js';
main();
console.log(version); // '1.0.0'
```

**整体导入（导入模块所有成员）**

用 `* as 模块名` 导入模块的所有导出成员，统一放在一个对象中

```javascript
import * as math from './math.js';

console.log(math.pi); // 3.14
console.log(math.add(2, 3)); // 5
```

## 导出 / 导入的注意事项
**路径必须完整**：`import` 时必须包含文件后缀（如 `.js`），除非通过工具（如 Webpack）配置省略

**只能在模块顶层使用**：`export` 和 `import` 不能在函数、条件语句等块级作用域中使用（属于 “静态分析”，编译时确定依赖）

**默认导出的本质**：默认导出其实是给导出的成员起了一个名为 `default` 的名称，因此也可以用命名导出的方式写：

```javascript
// 等价于默认导出
export { log as default };
```

## 模块的特点
**独立作用域：** 模块内部的变量、函数、类默认是 “局部的”，不会污染全局作用域（除非显式导出）

```javascript
// 模块文件：test.js
const msg = 'Hello'; // 局部变量，外部无法访问（除非 export）
```

**自动采用严格模式** ：模块内的代码默认运行在严格模式（`use strict`）下，例如变量必须声明后使用、禁止 `with` 语句等

**单例模式：** 同一模块被多次导入时，只会执行一次，后续导入的是缓存的结果

```javascript
// 模块：count.js
console.log('模块执行了');
export let count = 0;
export function increment() { count++; }

// 第一次导入：执行模块，打印 "模块执行了"
import { count } from './count.js';
// 第二次导入：不执行模块，直接用缓存
import { increment } from './count.js';
```

**依赖预解析：** 浏览器或 JS 引擎会先解析所有模块的依赖关系（形成依赖树），再按顺序执行，避免了传统脚本的 “依赖顺序问题”

## 如何使用模块
在浏览器中使用 ES6 模块，需要在 `<script>` 标签中添加 `type="module"` 属性

```html
<!-- 引入模块文件 -->
<script type="module">
  // 直接在脚本中使用 import
  import { add } from './math.js';
  console.log(add(1, 2)); // 3
</script>

<!-- 或引入外部模块文件 -->
<script type="module" src="./app.js"></script>
```

+ 模块脚本有跨域限制，本地开发需通过服务器（如 `http://localhost`）访问，不能直接打开 `file://` 协议的文件
+ 生产环境中，通常会用 Webpack、Vite 等工具将模块打包成兼容浏览器的代码

## 与 CommonJS 的区别（扩展）
CommonJS 是 Node.js 的模块化规范（用 `require` 和 `module.exports`）

| **特点** | **ES6 模块（ESM）** | **CommonJS 模块** |
| :--- | :--- | :--- |
| 加载时机 | 编译时静态分析（提前确定依赖） | 运行时动态加载 |
| 导入方式 | `import`（只读引用） | `require()`（值拷贝） |
| 适用环境 | 浏览器 + Node.js（需配置） | 主要用于 Node.js |
| 默认导出 | `export default` | `module.exports` |

# Promise 对象
**核心作用**：解决回调地狱（Callback Hell），用链式调用处理异步操作

**三种状态**：

+ **pending**（进行中）：初始状态，未完成也未失败
+ **fulfilled**（已完成）：操作成功，可获取结果
+ **rejected**（已拒绝）：操作失败，可获取错误

**状态特点**：

+ 状态一旦改变就不可逆转（pending→fulfilled 或 pending→rejected）
+ 非 pending 状态时，会触发对应的回调函数

**Promise 构造函数：**

+ **语法**：`new Promise((resolve, reject) => { ... })`

```javascript
// 示例：模拟异步请求
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('数据加载成功'); // 状态变为fulfilled，传递结果
    } else {
      reject(new Error('数据加载失败')); // 状态变为rejected，传递错误
    }
  }, 1000);
});
```

**链式调用：then ()、catch ()、finally ()then(onFulfilled, onRejected)**：

+ 成功时执行`onFulfilled`，失败时执行`onRejected`
+ 返回新 Promise，支持链式调用（解决回调嵌套问题）

```javascript
fetchData
  .then(result => {
    console.log(result); // "数据加载成功"
    return result + '，继续处理'; // 返回值会成为下一个then的参数
  })
  .then(nextResult => {
    console.log(nextResult); // "数据加载成功，继续处理"
  })
  .catch(error => {
    console.error('错误：', error); // 失败时触发
  });
```

+ **catch(onRejected)**：等价于`then(undefined, onRejected)`，专门处理错误

```javascript
fetchData
  .then(result => {
    // 假设这里抛出错误
    if (result.includes('失败')) {
      throw new Error('处理失败');
    }
    return result;
  })
  .catch(error => {
    console.error('全局错误处理：', error); // 捕获then中的错误
  });
```

+ **finally(onFinally)**：无论成功或失败都会执行（不接收参数）

```javascript
fetchData
  .then(...)
  .catch(...)
  .finally(() => {
    console.log('请求处理完毕，无论结果如何');
  });
```

  

Promise 组合使用

**核心作用**：处理多个异步操作的并行或顺序执行

## Promise.all(iterable)
+ **作用**：等待所有 Promise 都成功，返回成功结果数组；若有一个失败，则整体失败

```javascript
// 并行请求多个API
const request1 = fetch('api/1').then(res => res.json());
const request2 = fetch('api/2').then(res => res.json());

Promise.all([request1, request2])
  .then(results => {
    // results[0]是request1的结果，results[1]是request2的结果
    console.log('所有请求成功');
  })
  .catch(error => {
    console.error('任一请求失败', error);
  });
```

+ **应用场景**：需要等待所有资源加载完成（如图片、数据）再渲染页面

## Promise.race(iterable)
+ **作用**：只要有一个 Promise 率先改变状态，就返回其结果或错误

```javascript
// 超时控制：3秒内未返回则取消请求
const fetchWithTimeout = () => {
  const fetchPromise = fetch('api/data');
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('请求超时')), 3000);
  });
  return Promise.race([fetchPromise, timeoutPromise]);
};
```

+ **场景**：实时搜索（哪个接口先返回就用哪个结果）

## Promise.allSettled(iterable)
+ **ES2020 新增**：等待所有 Promise 都结束（无论成功或失败），返回包含每个结果的对象数组

```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject('错误'),
  Promise.resolve(3)
];

Promise.allSettled(promises).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('成功', result.value);
    } else {
      console.log('失败', result.reason);
    }
  });
});
```

**场景**：批量操作后需要统计所有结果（无论成败）

# Fetch
fetch 是基于 Promise 的 api, 它可以发送http请求并接收服务器返回的响应数据 

fetch 返回的是一个 **Promise 对象**

```javascript
/*
        fetch 是基于 Promise 的 api, 它可以发送http请求并接收服务器返回的响应数据
        fetch 返回的是一个 Promise 对象
    */

    //get请求
    fetch('http://127.0.0.1/get').then(response => {
        //返回的解析后的json数据会传递给下一个 then() 方法中的回调函数作为参数,这个参数就是 data
        return response.json() //response.json() 用于将响应数据解析为json格式的数据
    }).then(data => { //data 解析后的json数据
        console.log("get.data:", data)
    }).catch(error => {
        console.log("get.error:", error.message)
    }).finally(() => {
        console.log("get.finally")
    })

    //post请求 post
    fetch('http://127.0.0.1/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },            
        body: new URLSearchParams({//URLSearchParams 用于处理键值对类型的数据,并将其编码为url查询字符串
            name: '邓瑞',
            web: 'dengruicode.com',
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("post.data:", data)
    }).catch(error => {
        console.log("post.error:", error.message)
    }).finally(() => {
        console.log("post.finally")
    })

    //post请求 postJson
    fetch('http://127.0.0.1/postJson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({//JSON.stringify 用于将对象转换为json字符串
            name: '邓瑞编程',
            web: 'www.dengruicode.com',
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("postJson.data:", data)
    }).catch(error => {
        console.log("postJson.error:", error.message)
    }).finally(() => {
        console.log("postJson.finally")
    })
```

# ES7（2016）
###  Array.prototype.includes()
**核心作用**：判断数组是否包含指定值，返回布尔值，替代`indexOf !== -1`的写法

**语法：arr.includes(value, fromIndex)**

```javascript
const nums = [1, 2, 3];
nums.includes(2); // true
nums.includes(4); // false
```

**优势**：

+ 直接返回布尔值，无需额外判断；
+ 支持 NaN 的精确匹配（`indexOf`对 NaN 返回 - 1）

```javascript
[NaN].includes(NaN); // true
```

###   
指数运算符（`**`）
**核心作用**：简化幂运算，替代`Math.pow()`

**语法：base** exponent**

```javascript
2 ** 10; // 1024
Math.pow(2, 10); // 1024（等价）
```

**应用场景**：

+ 快速计算平方、立方等：

```javascript
const area = side ** 2; // 正方形面积
```

# ES8（2017）
## async/await
**核心作用**：以同步风格编写异步代码，简化 Promise 链式调用

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
  }
}
```

**对比 Promise**：

+ 代码更易读，避免回调嵌套；
+ 配合`try...catch`统一处理错误

## Object.values () 与 Object.entries ()
**核心作用**：简化对象遍历，分别返回对象值数组和键值对数组，类似 Map 的遍历方式

**Object.values(obj)**：返回对象值的数组：

```javascript
const user = { name: 'Alice', age: 25 };
Object.values(user); // ['Alice', 25]
```

**Object.entries(obj)**：返回键值对数组：

```javascript
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`); // name: Alice, age: 25
}
```

**应用场景**：将对象转为 Map 或数组：

```javascript
const map = new Map(Object.entries(user)); // Map { 'name' => 'Alice', 'age' => 25 }
```

## **String padding**
`padStart`和`padEnd`方法用于字符串填充：

```javascript
'42'.padStart(5, '0'); // '00042'
```

# ES9（2018）
## 异步迭代器（Async Iterators）
支持`for await...of`循环遍历异步可迭代对象

## Promise.finally()
**核心作用**：无论 Promise 成功或失败，都会执行的回调

**语法**：

```javascript
fetch('https://api.example.com/data')
  .then(data => process(data))
  .catch(error => handleError(error))
  .finally(() => console.log('请求完成'));
```

**应用场景**：

+ 清理资源（如关闭网络请求、释放内存）；
+ 统一处理加载状态（如隐藏 loading 动画）

## 正则表达式命名捕获组
**核心作用**：通过名称引用正则匹配结果

**语法**：`/(?<name>pattern)/`

```javascript
const url = 'https://example.com/path?query=value';
const regex = /https:\/\/(?<host>[^/]+)\/(?<path>.+)/;
const match = regex.exec(url);
console.log(match.groups.host); // 'example.com'
console.log(match.groups.path); // 'path?query=value'
```

**优势**：提高可读性，避免依赖索引取值

# ES10（2019）
## Array.flat () 与 flatMap ()
**核心作用**：扁平化数组或映射并扁平化

**Array.flat(depth)**：递归展开数组：

```javascript
const arr = [1, [2, [3]]];
arr.flat(Infinity); // [1, 2, 3]（展开所有层级）
```

**Array.flatMap()**：先映射后展开

```javascript
const words = ['hello', 'world'];
words.flatMap(word => word.split('')); // ['h','e','l','l','o','w','o','r','l','d']
```

## String.prototype.trimStart()/trimEnd()
替代`trimLeft`和`trimRight`，明确语义

## Symbol.prototype.description
返回 Symbol 的描述信息：

```javascript
const sym = Symbol('test');
sym.description; // 'test'
```

# ES11（2020）
## BigInt：任意精度整数
**核心作用**：处理超过`Number.MAX_SAFE_INTEGER`的整数

**语法**：数字后加`n`或`BigInt()`构造函数：

```javascript
const bigNum = 9007199254740993n; // 超过Number安全范围的整数
typeof bigNum; // 'bigint'
```

**应用场景**：

+ 金融计算（如比特币交易）；
+ 高精度时间戳（避免溢出）

## 空值合并运算符（`??`）
**核心作用**：仅当左侧为`null`或`undefined`时返回右侧值

**语法**：`left ?? right`

```javascript
const username = user.name ?? 'Guest'; // user.name为null/undefined时设为'Guest'
```

**对比逻辑或（`||`）**：

+ `||`会将`0`、空字符串等假值视为无效，而`??`仅处理`null/undefined`：

```javascript
0 ?? 10; // 0（保留0）
0 || 10; // 10（错误处理）
```

## 可选链操作符（`?.`）
**核心作用**：安全访问嵌套对象属性，避免`Cannot read property 'x' of undefined`错误

**语法**：`obj?.prop`

```javascript
const city = user?.address?.city; // 若user或address为null/undefined，返回undefined
```

**应用场景**：

+ 处理 API 响应中的嵌套数据；
+ 动态调用函数（避免函数不存在时报错）：

```javascript
callback?.(); // 若callback存在则调用
```

# ES12（2021）
## String.prototype.replaceAll()
全局替换字符串：

```javascript
a.b.c'.replaceAll('.', '-'); // "a-b-c"
```

## 逻辑赋值运算符（`&&=`、`||=`、`??=`）
**核心作用**：将逻辑运算与赋值合并

+ **语法**：**javascript**

```javascript
// 仅当变量未赋值时设置默认值
let name = 'Alice';
name ||= 'Guest'; // name仍为'Alice'
let age;
age ??= 30; // age设为30
```

**应用场景**：简化条件赋值逻辑

## Promise.any()
**核心作用**：返回**第一个成功**的 Promise 结果，忽略失败直到有一个成功

```javascript
const promises = [
  fetch('https://api1.example.com'),
  fetch('https://api2.example.com'),
  fetch('https://api3.example.com')
];

Promise.any(promises)
  .then(response => console.log('最快响应:', response))
  .catch(error => console.error('所有请求失败:', error));
```

**对比 Promise.race ()**：

+ `Promise.race()`返回第一个完成的 Promise（无论成功或失败）
+ `Promise.any()`仅返回第一个成功的 Promise，失败时返回`AggregateError`

## 数值分隔符 (`_`)
提高大数字可读性：

```javascript
javascriptconst billion = 1_000_000_000; // 等同于 1000000000
```

## `WeakRef` 和 `FinalizationRegistry`
弱引用与垃圾回收回调（高级 API，慎用）

```plain
const weakRef = new WeakRef(someObject);
const registry = new FinalizationRegistry(heldValue => {
  console.log(`${heldValue} 被回收了`);
});
registry.register(someObject, "someObject");
```

# ES13（2022）
## 类私有字段与方法（`#`）
**核心作用**：封装类的内部实现，防止外部直接访问

```javascript
class Counter {
  #count = 0; // 私有字段
  #increment() { this.#count++; } // 私有方法
  
  incrementAndGet() {
    this.#increment();
    return this.#count;
  }
}

const counter = new Counter();
counter.incrementAndGet(); // 1
counter.#count; // 报错：无法访问私有字段
```

**应用场景**：

+ 隐藏类的内部状态；
+ 防止外部意外修改

## 顶层 await
**核心作用**：在模块顶层使用`await`，简化异步模块加载

```javascript
// module.js
const data = await fetch('https://api.example.com/data').then(res => res.json());
export default data;
```

+ 仅适用于 ES6 模块（`.mjs`文件或`package.json`中设置`"type": "module"`）；
+ 多个模块中的顶层`await`会并行执行

# ES14（2023）
## Array.group () 与 Array.groupToMap ()
**核心作用**：按指定条件分组数组元素

## Array.group(callback)：返回分组对象：
```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

const grouped = users.group(user => user.age);
/* grouped = {
  '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
  '30': [{ name: 'Bob', age: 30 }]
} */
```

## Array.groupToMap(callback)：返回分组 Map
```javascript
const map = users.groupToMap(user => user.age);
map.get(25); // [Alice, Charlie]
```

+ **兼容性**：目前需通过`core-js`等 polyfill 支持

## 数组 findLast () 与 findLastIndex ()
**核心作用**：从数组末尾开始查找符合条件的元素

```javascript
const nums = [1, 2, 3, 4, 3];
nums.findLast(n => n === 3); // 3（最后一个3）
nums.findLastIndex(n => n === 3); // 4（索引4）
```

**应用场景**：

+ 查找最后一个匹配项（如日志记录、历史数据）

# ES2024（ES15）
## Array.prototype.group()/groupToMap()
按条件分组数组元素：

```javascript
const users = [{ role: 'admin' }, { role: 'user' }];
users.group(user => user.role); // { admin: [users[0]], user: [users[1]] }
```

## String.prototype.lines()
返回字符串行迭代器，支持`for...of`循环遍历：

```javascript
for (const line of 'a\nb\nc'.lines()) {
  console.log(line);
}
```

## Promise.withResolvers(）
简化 Promise 创建，同时获取`resolve`和`reject`函数：

```javascript
const { promise, resolve, reject } = Promise.withResolvers();
```

# ES2025（ES16）
## 显式资源管理（using 声明）
自动释放资源（如文件句柄、网络连接）：

```javascript
using file = await Deno.open('file.txt');
const data = await file.read();
```

## Promise.try()
包装同步或异步函数为 Promise，统一异常处理：

```javascript
Promise.try(() => syncFunctionThatMightThrow())
  .then(result => process(result))
  .catch(error => handleError(error));
```

## 正则表达式 v 标志
增强 Unicode 匹配能力，支持字符串属性、集合运算等

```javascript
/^\p{rgi_emoji}$/v.test('😵‍💫'); // true（匹配完整的Emoji序列）
```

## Iterator helpers
新增迭代器方法（如`filter`、`flatMap`、`reduce`），支持惰性处理大数据流：

```javascript
const iter = [1, 2, 3].values().filter(x => x > 1);
for (const x of iter) {
  console.log(x); // 2, 3
}
```

## Float16 支持
新增`Float16Array`类型和`Math.f16round()`方法，适用于图形渲染等场景

