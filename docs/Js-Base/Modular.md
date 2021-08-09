# Js - 模块化

```js
let module = (function() {
  // 定义一个容器来存储我们的模块
  const moduleList = {};
  // name - 模块名称
  // modules - 依赖的模块
  // action - 想要发生的动作
  function define(name, modules, action) {
    // 从容器中 拿出依赖 完成
    modules.map((m, i) => {
      // moduleList 对象存 key-value 所以拿 key
      // 然后放入 modules 数组中
      // 
      modules[i] = moduleList[m];
    })
    moduleList[name] = action.apply(null, modules); // 容器里面压入一个模块
    // 模块只有在 第一次 初始化的时候 它会执行一次
    console.log('moduleList', moduleList);
  }
  return { define };
})();

module.define('gl', [], function() {// 定义一个 gl 模块 没有依赖模块 function表示 handle-callback
  console.log('123');
  return {
    first(arr) {
      return arr[0]
    },
    max(arr, key) {
      return arr.sort((a, b) => b[key] - a[key])[0];
    }
  }
}) // define 帮助我们定义模块

module.define('lesson', ['gl'], function(gl) { // 定义来一个 less 的模块  依赖模块 - gl function表示 handle-callback
  let data = [
    { name: 'js', price: 199 },
    { name: 'css', price: 79 },
  ]
  console.log(gl.max(data, 'price'));
}); // define 帮助我们定义模块
```

+ **模块在初始化的时候 返回内容 后续我们在 使用模块的时候 共用的一个内容**

## 模块的基本使用

```html
<script type='module'>
  import { title } from 'xxx.js' // 加了 type-module 之后 才可以解析 import 方法
  // 不导出的时候 是私有的    所以我们就需要 按照要求 导出少量的接口
</script>
```

### 模块的延迟解析与严格模式

+ 因为模块之间会有依赖关系 所以系统会有一个**延迟解析**来处理他们

  `严格模式` - 使用模块的时候 **默认就是严格模式 和 class 一样**

### 作用域与在模块中的体现

+ 模块有自己独立的 独立的作用域  使用的话 导出才可以使用 (按需导出的场景)

### 模块的 预解析 （模块之间只解析一次的好处）

+ `import` 导入多个相同的  只会执行一次里面的代码  使用的只是导出的变量 方法等等(预解析之后产物)

  **然后 共同操作 同一个模块的内容  例如 vuex 等等**

### **模块的具名 导入和导出**

```js
export let site = '123' // 具名导出
export function show() {} // 具名导出 如果 export function() {} 会报错
export class User {}

import { site, show, User } from 'xxx.js' // 具名导入
import * as api from 'xxx.js' // 批量导入 但是下面使用的时候 也不少写，而且不用的方法 打包工具也会都打包  不太推荐
// 更 推荐 具名导入;
```

+ `{ site as shahaha }` 起别名

+ 如果只导出一个的话 那就是 `export default class User {}` ， **默认导出就一个 所有任意变量来接受 都可以**

+ **接受的话 就是 import 任意名称 from 'xxx.js'**

+ `export { User as default }` 这块跟上面的默认导出 效果是一样的 名字就是 `default`

  ```js
  // 混合导入导出的使用
  export site = '123';
  export default class User { show() {} }
  
  // 方法一
  import User from 'xxx.js'
  import { site } from 'xxx.js'
  // 写一行就是
  import User, { site } from 'xxx.js'
  
  // ------------------------------------------------------------------
  
  // 方法二 也不算方法二
  export { User as default, site } // 这样导出
  import User, { site } from 'xxx.js' // 也是这样引入
  // 如果批量导入的话 调用就得 这么调用了
  import * as api form 'xxx.js'
  api.default.show();
  api.site
  ```

+ 默认导出模块的使用规范

  起名字 要 按规范走   名字要和文件名字要有关联

+ 模块的合并导出

  在一个文件中 都导入  然后在这个文件中统一导出  类似之前小程序协议

  ```js
  import { web, url } from 'xxx.js'
  import User, { site } from 'xxx.js'
  
  export { web, url, User, site };
  // 如果可能有 名字重复了 比如两个模块都有 url
  import * as a from 'xxx.js'
  import * as b from 'xxx.js'
  export { a, b }
  
  import * as tongyi from 'xxx.js'
  tongyi.a.url // 这样放置一个具名空间再写
  tongyi.a.default.show();
  ```

  ```js
  // 按需加载的函数 动态加载模块
  import * as b from 'xxx.js' // 这个是需要放置在 顶层的
  // if (true) { import * as b from 'xxx.js' } // 这样也会报错
  
  import('xxx.js').then(module => {
    console.log(module); // ⚠️ 这个就是按需加载
  })
  if (true) { // 这样也是可以的
    import('xxx.js').then(({ site, url }) => { // 因为是对象 可以使用 展开语法来使用
      console.log(module); // ⚠️ 这个就是按需加载
    })
  }
  
  // webpack
  'dev': 'webpack --mode development --watch'
  ```

  ```js
  // style.js
  export default class Style {
    constructor() {}
    init() {
      console.log('123');
    }
  }
  
  // index.js  webpack 的入口文件
  import Style from './style.js'
  new Style().init();
  
  // npm run dev 编译之后 就把 es6的文件 编译成 es5了
  ```

## ⚠️ 补充-sub

### `EsModule` 不是按照 `解构` 这种来实现的

```js
export const a = {}; // 导出
import { a } from './index.js' // 引入

export default {}; // 导出
import a from 'index.js'  // 引入

// ❌ 但是这样 导出引入 是不可以的
const a = {};
export default {
	a,
}
import { a } from './index.js'
```

+ ⚠️ 怎么说呢 就是 `EsModule` 他不是按照 解构 这种方式实现的

+ 就是 `export` 导出 我就 `import {}` 引入

+ `export default {}` 我就 `import a` 一个变量接收

  ```js
  // 下面这种方法 也可以 不过不推荐 因为也麻烦~  👆 也提到过
  export const a = {}; // 导出 引入
  export const b = {}; // 导出 引入
  import * as aAndb from './index.js';
  aAndb.a // 调用
  ```

### `node` && `EsModule`

```js
export default () => {}; // 导出
const a = require('index').default; // 引入

// ---------------- 也可以 🍓 ----------------
// 导出~
module.exports = () => {console.log('123')}
// 引入
import a from './index.js'
a();
```

+ 🍓🍓🍓 不过 `node` 的**导出引入** 是严格按照 **`解构`** 流程走的~