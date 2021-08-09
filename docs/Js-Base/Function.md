# Js - `函数`

## `函数`声明的多种方式

+ `let gl = new Function('title', 'console.log(title)');`

+ `function gl() {};`

+ `let gl = function() {};`

+ ```js
  let obj = { // 函数编组 
    setUsername: function() {},
    getUsername() {},
  }
  ```

## `全局函数` 定义的特点

**作为使用函数来说 就建议把 函数 都放置在 类(`class`) 里面**

```js
function a() {};
window.a // 这样就可以访问到
// 但是这样就有问题 因为可能会覆盖 `window` 里面的属性
`var` 声明
var gl = function() {};
window.gl(); // `var` 声明的函数 会往 `window` 里面压入属性
`let` 声明 - 不会往 `window` 里面压属性了
let gl = function() {};
// window.gl(); // 这样就会报错 `let` 声明的函数 就不会往 `window` 里面压了
gl(); // 可以通过 这样的方式来调用
```

## `匿名函数` 与 `函数` 的提升

```js
let gl = function() {}; // 使用匿名函数 赋值 给变量 这样是不会进行提升的
gl(); // gl() 写在 声明前 是会报错的~

// `var` 
// 来进行声明也是不会提升的 只是提升了定义 并没有提升赋值的函数 所以报错是 `gl is not a function`

show(); // show() 写在 声明之前也会可以进行调用的
function show() {}; // 这样声明的 具名函数 是会提升到 语法的开头
show(); // 当然这样也可以
```

**`函数提升` 在 `变量提升` 的前面, 且不会被 `变量声明` 覆盖， 但是会被 `变量赋值` 之后覆盖**

```js
gl(); // 1 打印的是 1 并不会打印 2
// 因为 只是提升了gl变量 然后没有赋值。 所以会执行 具名函数
function gl() { console.log('1'); };
var gl = function() { console.log('2'); }
```

```js
function gl() { console.log('1'); };
var gl = function() { console.log('2'); }
gl(); // 2 此时会 从上往下 执行 然后打印2
```

**`函数` 是个对象（引用类型）。**

## `函数提升` 与 `变量提升` 的一个例子

**`函数提升` 在 `变量提升` 的前面, 且不会被 `变量声明` 覆盖， 但是会被 `变量赋值` 之后覆盖**

```js
console.log(a); // f a() {console.log(10)}
console.log(a()); // undefined - 这里 a 执行打印了10 然后输出 a() 没有return返回就是 undefined
var a = 3;
function a() {
  console.log(10)
};
console.log(a); // 3
a = 6;
console.log(a()); // a is not a function;
// ------------------------ 原理 ------------------------
var a = function(){
  console.log(10)
}
var a;
console.log(a); // f a() {console.log(10)}
console.log(a()); // undefined
a = 3;
console.log(a)   //3
a = 6;
console.log(a());   //a() is not a function;
```

## `立即执行函数` 与 `块级作用域` 解决冲突

**模块化-类 的方式可以解决 - 推荐✨✨✨**

当同时引入了 多个文件 有两个 同样的函数名

+ **以前的 - 解决方式**

  ```js
  // 第三方包 - 我们使用 `立即执行函数` 包裹起来 起一个别名
  (function(window) {
    function gl() {};
    wondow.js = { gl }
  })(window)
  function gl() {};
  // 这样就可以做到防止方法 重名了
  js.gl();
  gl();
  ```

+ **还有一种方式 使用 `let` 来定义**

  ```js
  // 因为 `let` 是 块级 出了 块级 就访问不到了
  {
    let gl = function() {};
    window.js = { gl };
  }
  function gl() {};
  js.gl();
  gl();
  ```

## `形参` 与 `实参`

**一般来讲 实参的数量 要和 形参对应**

**默认参数的话就可以不对应了**

```js
function sum(a, b) { return a+b }; // a b 就属于形参
sum(1, 2); // 就属于 实参
```

## `默认参数` 的使用技巧

**一般情况下 可选的默认参数都要放置到后边 然后让需要传递的值在前面进行传递**

```js
function sum(a, b = 2) { // 新版本 - 直接赋值 来当作默认参数 - 方法2
  // 老方法 - b 的默认参数如下 - 方法1
  b = b || 2;
  return a + b;
}
```

## `函数参数` 与 `arguments`

**函数传递参数 一般来讲 是不受类型约束的**

**以前版本不确定传参个数 - 使用 arguments 就可以知道传递参数的内容 - 🍓**

**`arguments.length` 可以看到传递参数的个数**

**在 最新的版本的函数中，我们可以使用 `...语法` 来接受函数**

## `箭头函数` 的使用

```js
// function () {} --- () => {};
// () => {} --- 一行的话 就需要写 `return` 或者不写 {}
因为 箭头函数没有自己的名字 所以在写 递归的时候不太方便 ⚠️⚠️⚠️ 也可以用函数表达式解决
根据 `this` 的使用场景来 判断 使用 `箭头函数` 还是 `普通函数` ⚠️⚠️⚠️;
```

## `递归`

### 使用函数完成 `递归` 算法

**阶乘**

```js
function factorial(num) {
  return num === 1 ? 1 : num * factorial(--num);
}
factorial(5); // 120
```

### `递归` 求和 与 `...`点语法注意事项

```js
// 归并
let sum = [1, 2, 3].reduce((a, b) => a + b);
console.log(sum); // 6

// 递归 & 点语法
function sum(...args) {
  console.log('args', args); // [1, 2, 3] - [1, 2]
  if (args.length === 0) return 0;
  return args.pop() + sum(...args); // 这里也使用 点语法 是保证参数一致 🍓🍓🍓~
  // 不然传递过去点就是个数组  然后展开之后就是 数组嵌套了 ...

  // 优化成一行
  return args.length === 0 ? 0 : args.pop() + sum(...args);
};
console.log(sum(1, 2, 3)); // 6
```

### `递归` 实现 倒三角

**注意 `++i` 和 `i++` 的 先赋值后操作 还是 先操作后赋值，以防写递归的时候造成死循环** 

```js
function star(sum) {
  return sum
  ? document.write('*'.repeat(sum) + "<br />") || star(--sum)
  : '';
}
star(5);
/**
  *****
  ****
  ***
  **
  *
*/
```

## 什么是 `回调函数`

**简单理解 - 在其他函数里面调用的函数**

```js
// `map` 插一嘴 `map`~
let a = arr.map((value, index, array) => {}) // return 出去让 a 接收也可以
arr.map((value, index, array) => {
  array[index] += 10
}) // 或者 直接改变 原数组 也可以 然后 用原数组 来进行运算
```

## `展开语法` 的正确使用方式

```js
let gl = [1, 2, 3];
let [a, b, c] = [...gl]; // 赋值 - 在等号右边 - 那就是 `放`
let [b, ...a] = gl; // a就是[2, 3] - 赋值 - 在等号左边 - 那就是 `收`

// 在函数使用也是一样
// 🍓如果有多个参数的话, 展开语法一定是在后边的 展开来接受剩余的
function abc(...args) {
  // args 这样就是 数组了 就可以调用数组的方法进行运算了
}
```

## 函数与方法中 `this` 的不同

**`this` 其实就是 当前对象的引用 的意思 🍓**

**`this` 是当前 `function` 被定义的作用域 🍓🍓🍓**

****

+ **如果这个函数是 当前对象的方法 那么 `this` 就是当前的对象**

  **如果这个 只是一个普通的函数 那这个 `this` 默认来讲就是全局的对象 - `window`**

  ```js
  let gl = {
    name: 'gl',
    show() { // 这个在对象定义 就是方法 - 只是叫法不同...
      console.log(this); // 这里的 this 就是当前的对象
  
      function render() { // 这里就是函数了
        console.log(this); // window
      }
      render();
      // 如果这个函数是 当前对象的方法 那么 this 就是当前的对象
      // 如果这个 只是一个普通的函数 那这个 this 默认来讲就是全局的对象 - window
  
      return this.name;
    }
  }
  gl.show();
  ```

  ```js
  function User() {
    this.name = name; // 是因为没有定义参数接受
    // 所以 this.name 会一直向上查找 就找到了 window - 🍓🍓🍓
    this.show = function() { return this.name }
  }
  let gl = new User('gl');
  console.log(gl.show()); // 这是 window 的name
  ```

## 通过常量来改变 `this` 指针 - `以前的方法`

```js
const SELF = this; // 常量来保存 当前的 `this`
```

### 插一嘴 - map类似的方法

**`map` 第一个回调函数的第三个参数 是数组本身，也可以通过改变数组本身来编写代码，不需要返回新数组**

**`map` 的第二个参数 是可以指定 `this` 的定义的，如果使用普通函数，那我们可以指定一个父级`this`🍓🍓🍓**

```js
let user = {
  list: [1, 2, 3],
  show: function() {
    const self = this; // 保存this
    return this.list.map(
      function (value) {
        console.log(this); // {a: 1}
      }
    , { a: 1 }) // map 的第二个参数可以指定 this 对象
    // , this) // 🍓 这里指定this 需要普通函数 🍓
    // 所以我们就不需要在 外部保存this了 只需要 定义接受就可以
  }
};
user.show();
```

## 箭头函数带来的 `this` 变化 - `新版本的方法`

**`箭头函数`里面的 `this` 就是指向当前作用域的上下文 - 一般就是当前父级的 `this`**

```js
let user = {
  list: [1, 2, 3],
  show: function() {
    return this.list.map(value => {
      console.log(this); // {list: Array(3), show: ƒ} - 就是 user 了
    })
  }
};
user.show()
```

### 某些场景下的 `箭头函数` 就有点陷阱

**结合场景 大量使用当前对象就是 function 大量使用父级就是 ()=>{}** 

```js
button.addEventListener(function () { console.log(this); }) // 这里的this 就是 当前 button
button.addEventListener(() => { console.log(this); }) // 这里的this 上下文，父级this了
// 结合参数定义 或者 变量保存 或者 定一个特殊方法(handleEvent)点击的话回去找这个方法
// 结合场景 大量使用当前对象就是 function 大量使用父级就是 ()=>{} 
button.forEach(function(ele) {
  ele.addEventListener('click', () => {
    console.log(this); // 因为这里使用了 箭头函数 就会去找上一级的 this 定义
    // 上一级 是一个普通函数 那 this 就是 window 了 - 解决办法就是 forEach 也变成箭头函数 - ⚠️
  })
})
```

## `apply` - `call` - `bind`

**专门借别人东西的函数**

### `this`

```js
function User(name) { // 构造函数
  this.name = name;
}

let gl = new User('gl');
console.log(gl);

let newGl = { age: 18 };
User.call(newGl, '新的名字'); // cool ~ 这样就能生出一个新的对象 - 🍃
console.log(newGl); // {age: 18, name: "新的名字"}
```

## `call` - `apply`

**如果没有指定传递的`this` 可以传递 `null`，来进行占位 一般是 `null` 也默认指向 `window`**

**参数 可选可以不传递,  不传递就是只改变 `this`去执行**

+ **`call` - `apply` 的区别**

  **在修改 `this` 指针的情况下，都会立刻执行这个函数**

  + `call` -  **call 传递参数 就是一个一个的参数(逗号隔开就行)**
  + `apply` - **apply 传递参数 就是一个数组(之后也会自动分散进行传参)**

  **就看参数传递的多少 和 传递参数的类型 - 来决定使用 `call` 和 `apply`**

```js
let arr = [1, 3, 5];
console.log(Math.max.apply(Math, arr)); // 5
// 如果没有指定传递的this 可以传递 null，来进行占位 一般null 也默认指向 window
```

### `call` || `apply` 来实现构造函数的继承

```js
function Request() {
  this.get = function(params) {
    let str = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    return `https://www.vxecho.cn?${this.url}/${str}`;
  }
}
function Getname() {
  this.url = 'name/lists';
  Request.call(this); // 参数 可选可以不传递 也可以只改变this去执行
}
let a = new Getname();
console.log(a.get({ id: 1 })); // https://www.vxecho.cn?name/lists/id=1
```

### `call` || `apply` 实现展开面板操作

**html - css 代码省略**

```js
function panel(i) {
  let dds = ducoment.querySeletorAll('dd');
  dds.forEach(dd => dd.setAttribute('hidden', 'hidden'));
  dds[i].removeAttribute('hidden');
}
document.querySelectorAll('dt').forEach((dt, i) => {
  dt.addEventlistener('click', () => panel.call(null, i)); // 如果只传递参数 不改变this 就可以用 null 来进行占位
  // 虽然是为了展示语法 但这样写更加清晰
})
```

## `bind`

**和 `call` `apply` 作用是一样的** - **`call` && `apply` 会立刻执行**

**`bind` 则不会立即执行，`bind` 绑定完事之后会得到一个新的函数，🍓**

**如果想要执行呢 就后面加一个 括号 就执行了...**

```js
function show() {
  console.log(this.name);
};
console.log(show.bind({ name: 'gl' })); // f show() { console.log(this.name); }
console.log(show.bind({ name: 'gl' })()) // gl
```

```js
let a = function() {};
let b = a;
console.log(a === b); // true
b = a.bind(); // 因为他会重新开辟空间 赋值一份函数 得到一个新的函数
console.log(a === b); // false
```

### `bind` 的传参

**如果 `bind` 参数和执行函数 都传递了参数 优先执行 `bind()` 参数的传递参数**

```js
let a = b.bind({}, 1, 2); // 可以在绑定的时候传递参数
a(1, 2); // 也可以在 调用的时候传递参数
```

**如果函数需要两个传递参数 就会依次查找**

```js
function a() {}
let b = a.bind({}, 1);
b(3, 4)
// 如果函数需要两个传递参数 就会依次查找
// 这样的传递参数就是 1 3 剩下的 4 参数就没有什么用了~
// 如果需要一个 3 4 就没什么用了， 就是依次查找的一个关系...
```

**`bind` 就是 得到一个新函数🍓，就是只改变 `this` , 然后之后调用的时候 使用最为合理**

**或者是只改变 `this` 不调用的情况的下执行...**

```js
setInterval(function (){
  // 使用这种方式 改变 this  当然直接一点就是 使用 箭头函数 来改变就行
}.bind(this), 1000);
```