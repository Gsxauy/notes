## Js - `Sub`

**补充一些遗漏的知识点**

---

> **'use strict' // 多使用 严格模式编写代码**

---

## `++`操作

```js
既然 n+=2 那么 %= |= x= /= 都是可以的~

++n n++ 不参与运算的时候结果都是一样的 参与运算的时候就需要注意了~
// 1+ ++n -> n=n+1; 1+n;
// 1+ n++ -> 1+n; n=n+1;
```

## `true` && `false`

```js
false || 执行的代码
true && 执行的代码
```

## `for` 循环

**for循环参数 1-初始值 2-为true执行 3-改变变量(也可以作为执行代码)**

**break continue 是针对循环的 --- return是针对当前函数的~**

```js
// for循环做label标签跳转 - 这种状态最适合 多层嵌套的时候使用
gl: for(let i = 1; i< 10; i++) {
  if (i%3) continue gl;
  console.log(i); // 3 6 9
}
// continue - break 都可以搭配标签做 运算
```

## `DOM`

+ **DOM 节点元素 可以使用 for...of来遍历**

+ **\t\t \n 在字符串中可以识别 但是html中只识别一个空格 ～ 如果还需要再加那就是 &nbsp**

```js
document.querySelectorAll('div, span') //  - 这样可以一次查找多个~
```

## `typeof` - 判断定义变量

```js
typeof function a() {}  // function
typeof 也可以用来判断 有没有定义变量 如果没有返回 undefined; 如果只声明但是未赋值 也是 undefined
let a;
console.log(typeof a); // undefined
console.log(typeof ab); // undefined
```

## 模版字符串&&`label`

+ **模版字符串是可以嵌套的**

  ```js
  let a = 'a1';
  let b = 'b1';
  console.log(`a=${a+`b=${b}`}`); // a=a1b=b1 模版字符串是可以进行嵌套的
  ```

### 标签模版~ - 可以对标签里面的变量进行二次处理~

```js
let a = 'haha';
let b = 'hbhb';
tag`a=${a},b=${b}`;
function tag(strings, ...args) {
  console.log(args); // ["haha", "hbhb"]
  // 字符串的数量 是大于变量的 在 字符串的 标签模版里面~
  console.log(strings); // ["a=", ",b=", "", raw: Array(3)]
}
```

---

## 值类型

---

## `string`

```js
'string'.startsWith('s') // true // 查找开始的字符串 区分大小与 返回 true || false
'string'.endsWith('s') // fasle // 查找结束的字符串 区分大小与 返回 true || false

// replace
const word = ['php', 'css'];
const string = '我喜欢学习php和css';
const repaceStr = word.reduce((pre, item) => {
  // replace 不改变原字符串
  return pre.replace(item, `<a herf='#'>${item}</a>`);
}, string);
console.log(repaceStr);
```

### 对手机号进行模糊处理

```js
function phone(mobile, len = 3) {
  return String(mobile).slice(0, len*-1) + '*'.repeat(len);
}
console.log(phone(15122266151, 8)); // 151********
```

## 类型转换使用技巧

```js
// string - number
string*1 +string Number(string) // -有字符串的话就返回NaN (parseInt parseFloat)-如果字符串在前面就是 NaN了
// number - string
number+'' String(number) number.toString()
// string - array
stringify.split('')
// array - string
array.join('-') array.toString()
```

```js
let str = '123';
typeof str // string
let str1 = new String('123');
typeof str1 // object
```

**为什么 str 也能 调对象的方法 呢 - 是因为系统会 隐式的帮助你转换 并 调用方法**

```js
1 == true  // 两个等号的时候 会隐式转换成 数值类型 false-0 true-1
if (1) // 相当于 Boolean(1) 去判断的
let arr = [];
console.log(arr == 0); // true 会隐式转换成数字 Number([]) === 0
console.log(Number([2])); // 2
console.log(Number([1, 2, 3])); // NaN 多个数值 就会转换成 NaN
// 但是 [] 是引用类型 所以 就会判断为true if判断的时候 引用类型 也就都为true
Boolean({}) // true
Boolean([]) // true
```

### 显示转换成 `Boolean`

```js
! !! // ! 一个 感叹号 做两件事情 取反和转换布尔类型
Boolean()
```

## 值类型 和 引用类型的关联

```js
new String()  new Number() new Boolean()  - 这个 引用类型 object
'123' 123 true - 这是 值类型 但是不妨碍 我们使用里面的方法 会隐式转换成对象来调用~
let a = 88;
console.log(typeof a.valueOf()); // number
console.log(typeof a.toString()); // string
Number.isInteger() // 判断是不是一个 整数
Number.isNaN() // 判断是不是一个 NaN
Object.is(Number('askjdksa'), NaN) // 判断是不是一个 NaN
number.toFixed(2) // 保留几位小数 整数就是 .0000 啥的-保留几位留几位 - 转换之后是字符串类型
NaN == NaN // false
Number({}) // NaN
Number({ valueOf() {return '78'} }) // 78
```

## `Math`

```js
Math.max([1, 2, 3, 6]); // NaN
Math.max.apply(null, [1, 2, 3, 6]) // 6
```

## `Date`

```js
const a = new Date(); // - 返回对象 可以 +new Date() 变成时间戳
const a = Date() // - 返回字符串 就不可以进行转换操作了 会变成NaN
Date.now() // 这样也能返回时间戳
```

```js
console.time('for')
console.timeEnd('for') // 标志一样就行
```

```js
let date = new Date('1997-7-5 08:10:23');
console.log(+date); // 868061423000
console.log(Number(date)); // 868061423000
console.log(date.valueOf()); // 868061423000
console.log(date.getTime()); // 868061423000
```

## 自己封装一个 时间处理 库 - 太酷了~

**获取月份的时候 是从0开始的 需要加一**

```js
function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm:date.getMinutes(),
    ss: date.getSeconds(),
  }
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}
console.log(dateFormat(new Date('1997-7-5 08:10:23'))); // 1997-7-5 8:10:23
console.log(dateFormat(new Date('1997-7-5 08:10:23'), 'YYYY年MM月')); // 1997年7月
```

**优秀的 日期处理库 `momentjs` - 🍓 还是有很多便捷的 时间相关的方法 - 减少重复造轮子的过程**

## `null` && `undefined`

**null-引用类型 与 undefined-基本类型值类型**

**如果要保存 引用类型 赋空 就是 null  基本值类型就是 undefined**

**未声明 或者 声明了未赋值 都是 undefined**

## `let` - `const`

**TDC 暂时性死区... let const - 不影响 window 变量**