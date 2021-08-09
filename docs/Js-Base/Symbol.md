# Js - `Symbol` 

## `Symbol` 使用

**`Symbol` 代表唯一值**

## 声明定义 `Symbol` 的的几种方式

```js
let gl = Symbol(); // () 里面可以添加 一些描述 e.g: Symbol('郭霖')
console.log(typeof gl); // symbol
console.log(gl); // Symbol()
console.log(gl.toString()); // Symbol()
console.log(gl.description); // description 就是提供一个 symbol 的描述

let a = Symbol();
let b = Symbol();
console.log(a === b); // false;
```

## `Symbol.for`

```js
let a1 = Symbol.for('gl'); // 这里声明了 gl 描述的 symbol值
let b1 = Symbol.for('gl'); // 这里再次声明的时候 先去查找有没有相同描述的 如果有就直接引用了~
console.log(a1); // Symbol(gl)
console.log(a1 === b1); // true
```

## `Symbol.keyFor()`

**`Symbol.keyFor();` - 这个只跟 `Symbol.for` 有关系 如果只是指定了个 `Symbol` 值 会打印 `undefined`**

```js
let a = Symbol.for('gl'); // 这里会在全局的定义里面进行保存~
console.log(Symbol.keyFor(a)); // gl
let ab = Symbol('gl'); // 这个是只是没有定义在全局~
console.log(Symbol.keyFor(ab)); // undefined
```

## 使用 `Symbol` 解决字符串耦合的问题~

```js
let obj = {
  'gl': {name: 'gl'},
  'gl': {name: 'guolin'},
};
console.log(obj); // 同样的字符串类型 后面的就会把前面的覆盖掉~

let user1 = {
  name: 'gl',
  key: Symbol()
}
let user2 = {
  name: 'gl',
  key: Symbol()
}
let obj = {
  [user1.key]: { name: 'gl1' },
  [user2.key]: { name: 'gl2' },
}
console.log(obj); // {Symbol(): {…}, Symbol(): {…}} // 这样就有两个属性了~
console.log(obj[user2.key]); // { name: 'gl2' }
```

## `Symbol` 在缓存容器中的使用

```js
class Cache {
  static data = {}
  static set(name, value) {
    return this.data[name] = value;
  }
  static get(name) {
    console.log(this.data[name]);
    return this.data[name];
  }
}

// Cache.set('name', 'gl')
// Cache.get('name') // gl
let user = {
  name: 'apple',
  key: Symbol('User 信息')
};
let cart = {
  name: 'apple',
  key: Symbol('购物车信息')
}
Cache.set(user.key, user)
Cache.set(cart.key, cart)
Cache.get(user.key) // {name: "apple", key: Symbol(User 信息)}
Cache.get(cart.key) // {name: "apple", key: Symbol(购物车 信息)}
```

## `Symbol` - 扩展性与对象属性保护

```js
let sybom = Symbol('这是一个 symbol 类型');
let gl = {
  name: 'gl',
  [sybom]: 'www.baidu.com' // 这类的属性类似与 私有属性 - 受保护的~
}
for (const key in gl) {
  console.log(key); // name 
}
for(const key of Object.keys(gl)) {
  console.log(key); // name - 也打印不到~
}
```

### 如果想要遍历 对象里面的 Symbol 属性

```js
for (const key of Object.getOwnPropertySymbols(gl)) {
  console.log(key); // Symbol(这是一个 symbol 类型)
}
// 如果要遍历 对象里面的 所有属性
for (const key of Reflect.ownKeys(gl)) {
  console.log(key); // name Symbol(这是一个 symbol 类型)
}
```

```js
let site = Symbol('这是一个 Symbol ');
class User {
  constructor(name) {
    this.name = name;
    this[site] = 'gl';
  }
  getName() {
    console.log(`${this[site]} - ${this.name}`);
    return `${this[site]} - ${this.name}`
  }
}
let ls = new User('李四');
ls.getName(); // gl - 李四
// 但是 这个属性是隐藏的
for (const key in ls) {
  console.log(key); // name 这样是打印不到的~
  // 如果是 对象的私有属性 不想再外部访问到 就使用 Symbol 属性来进行设置
}
```

