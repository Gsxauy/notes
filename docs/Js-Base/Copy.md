# Js - 深浅拷贝

## 深浅拷贝 - 概念
+ 浅拷贝只是拷贝对象的引用地址，不拷贝对象本身。
  + 新旧对象还是 共用 一块内存。
+ 深拷贝会创建一个一摸一样的对象，各自引用各自存储。
+ 深浅拷贝的概念只存在与 引用数据类型（复杂数据类型）中
+ 基本数据类型（简单数据类型） 
  `Number` - `Boolean` -  `String` - `Undefined` - `Null` - `Symbol (ES6新增)`
  引用数据类型 （复杂数据类型）
  `Object` - `Array` - `Function` - `RegExp` - `Date`等

---

## 深浅拷贝 - 理解
```js
// e.g - 1
let b = 10,
a = b;
b = 20;
console.log(a); // 10
// 这个是什么拷贝呢？
```
+ 上面的例子，其实不存在拷贝。
   只是基本数据类型的一个简单的赋值操作。
```js
// e.g - 2
let obj = { a: 20 };
let obj2 = obj;
obj2.a = 10;
console.log(obj.a); // 10
// 这个是什么拷贝呢？
```
+ 答： 浅拷贝
   因为上面拷贝对象的值修改并把原对象的值也修改了。
+ 对此我的理解是：
  + 基本数据类型的存放时独立存放在 `栈（stack）`中的数据。
     在 `e.g - 1` 中，`b`赋值给 `a`，`a`又重新开辟了一份内存空间。他们两个互不干扰，所以 `b` 重新赋值， `a` 的值不会改变。 (**基本数据类型都是独立存储的**)。
  + 引用数据类型的数据存放一般都是在 `堆内存` 里面。
  ```js
    // e.g - 2.1
    let obj = { // 是在堆内存里面开辟了一块空间，这块空间命名为 data
      a: 20
    }
  ```
  在 `e.g - 2` 中， 声明了 `obj` ，**将存放地址放入了 栈内存 中，将数据放入了 堆内存 中**。声明 `obj2` 将 `obj` 的引用地址复制了一份给 `obj2` ，这时他们就指向了同一块 数据存放的地址。 所以 `obj2.a = 10` 之后，原来 `obj` 的值也就跟着改变了。 
### 延伸

  ```js
  // e.g - 2.2
  let data = {
    n: 10,
    m: data.n * 5
  };
  console.log(data.m);
 // 这个时候打印什么呢？
  ```
  + 答： **引用错误 - ReferenceError。**
  + 因为 **无法在数据初始化之前访问数据**。上面的 `data.n * 5` 是内存信息还没有存储完成，`data.n` 是个 undefined。
  + 解决办法： `data.m = data.n * 5;` 声明之后，去定义是可以的。

---

## 深浅拷贝 - 实现
+ `Object.assign()` 可以实现 深浅拷贝两种。取决于怎么使用。
+ 首先介绍一下 `Object.assign()` 这个方法
`Object.assign()` 可以将所有的可枚举（enum）属性的值或者多个源对象复制到目标对象上。返回的是目标对象。
```js
const target = { a: 1, b: 2 };
const source = { a: 3, c: 5 };

const result = Object.assign(target, source);

console.log(target); // {a: 3, b: 2, c: 5}; --- 目标对象也会改变，源对象会覆盖目标对象里相同的键
console.log(result); // {a: 3, b: 2, c: 5}; --- 返回的目标 拷贝后的目标对象
```

### 浅拷贝的实现方法

+ `Object.assign()` 
使用 `Object.assign()` 进行拷贝。如果拷贝的是对象属性的引用，不是对象本身。
这样可以实现 浅拷贝。
```js
const obj1 = { a: {a: 12, b: 21} };
let obj2 = Object.assign({}, obj1); // 空对象拷贝另外一个对象的属性
obj2.a.a = '123';
console.log(obj1.a.a); // ’123‘ 因为拷贝的是对象属性，所以只拷贝了引用。
```
+ 拷贝 对象的指针(存放地址) 可以做到浅拷贝的效果 - 个人理解是拷贝。
```js
let obj2 = obj1 = { a: 1, b: 2 }; 
obj1.a = 3;
console.log(obj1); // {a: 3, b: 2}
console.log(obj2); // {a: 3, b: 2}
```

### 深拷贝的实现方法

+ `Object.assign()`  - 只能实现一维对象的深拷贝。
```js
const a = { a: 1, b: 2, c: 3 };
let b = Object.assign({}, a);
a.a = 3;
console.log(a); // {a: 3, b: 2, c: 3}
console.log(b); // {a: 1, b: 2, c: 3}
```
+ `JSON.parse(JSON. stringify())`

  可以实现多维对象的深拷贝。但会忽略 `undefined` `Symbol值` `任意函数`
```js
const obj1 = {
  a: 1,
  b: { m: 1 },
  c: undefined,
  d: function(x, y) {
     return x + y;  
  },
  e: Symbol('foo'),
  f: null,
};
let obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1); // { a: 1, b: {m: 1}, c: undefined, d: ƒ, e: Symbol(foo), f: null }
console.log(obj2); // { a: 1, b: {m: 1}, f: null }
obj2.b.m = 2; // 修改 obj2.b.m 的值
console.log(obj1); // { a: 1, b: {m: 1}, c: undefined, d: ƒ, e: Symbol(foo), f: null }
console.log(obj2); // { a: 1, b: {m: 2}, f: null }
```
+ `递归拷贝`
就直接上代码啦。
```js
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if(obj.hasOwnProperty(key)) {
        // hasOwnProperty 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
        // 和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
        // 即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。
        if (obj[key] && typeof obj[key] === 'object') {
           objClone[key] = deepClone(obj[key]);
         } else {
           objClone[key] = obj[key];
         }
       }
    }
  }
  return objClone;
}

let a = [0, 1, 2, 3],
b = deepClone(a);
a[0] = 666;
console.log(a, b);
// (4) [666, 1, 2, 3] (4) [0, 1, 2, 3]
```
只是一个简单的实现。例如  `原型链` `基本数据类型` 等等都还没考虑。
+ `Object.create()`
可以使用 `let newObj = Object.create(oldObj)` 可以达到深拷贝的效果
```js
const a = Object.create(new Array()); // 可以拷贝数组对象的自带方法。
// ... 可以 遍历 基于原型链方法 的一些扩展。
```
+ `Array 的一些方法`
`slice` `concat` `Array.from()` `...操作符` ~ 可以实现对 一维数组 的深拷贝
```js
let arr1 = [1, 2, [3, 4]],
arr2 = arr1.slice();
console.log(arr1); // [1, 2, [3, 4]]
console.log(arr2); // [1, 2, [3, 4]]
arr2[0] = 2
arr2[2][1] = 5; 
console.log(arr1); // [1, 2, [3, 5]]
console.log(arr2); // [2, 2, [3, 5]]
```
### 延伸

```js
let a = {n: 1},
b = a;
a.x = a = {n: 2};
console.log('a', a); // a { n: 2 }
console.log('b', b); // b { n: 1, x: { n: 2 } }
// 对象是引用类型 所有的对象赋值其实是给了他这个对象的引用地址
// a.x 这里涉及到一个运算符优先级的问题 . 的优先级是比较高的, 会先执行。
```
