const { src, dest, series, watch } = require('gulp')
const fs = require('fs');
const path = require('path');
// 创建一个 子进程(异步进程)
const { exec } = require('child_process');
/**
 * through2经常被用于处理node的stream gulp常用
 * 它内置帮你创建好了相对应的 stream， 所以现在只需要实现 _transform 就行了
 * _transform - 转换流 (输出/输入 是相关联的)
 */
const through = require('through2');
// gulp-rename重定义打包生成文件的路径
const rename = require('gulp-rename');
// 字符串替换插件
const replace = require('gulp-replace');
// 解析参数选项
const minimist = require('minimist');
// 主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
const ora = require('ora');

const knownOptions = {
  boolean: ['watch'],
  string: ['product', 'type'],
  default: { watch: false, product: 'default', type: 'stage' },
};

/**
 * process.argv
 * 会返回一个数组。其中包含当 Node.js 被启动时 传入的 命令行参数
 * 第一个元素是 process.execPath (返回启动 Node.js 进程的可执行文件的绝对路径)
 * 第二个元素是 正在被执行的 js 文件路径
 * 之后的元素 是其余额外的命令行参数
 */
const options = minimist(process.argv.slice(2), knownOptions);
let mdPathList = [];

/**
 * 构建 md 文件路径
 */
const buildMdPath = () => {
  return src('docs/**/*.md')
    .pipe(through.obj(function (file, enc, callback) {
      this.push(file.path); // 添加路径
      callback();
    })).on('data', (data) => {
      // data:  /Users/guolin6/Desktop/Code/caprice/docs/Js/README.md
      let _path = path.relative(`${__dirname + path.sep}docs`, data);
      // path.sep - 提供平台特定的 片段分割符 window是'\' POSIX是'/'
      /**
       * __dirname 和 . 的区别
       * __dirname - 总是指向 被执行js文件的绝对路径。 so： 你在 /d1/d2/sciprt.js 中写了 __dirname, 它的值就是 /d1/d2
       * ./ 会返回你执行的 node 命令 的路径，例如你的 工作路径。
       *  - 例如 cd /d1 node 执行 scirpt中的 .命令 (. 就是 /d1) 而 __dirname 就是 /d1/d2( 被执行js的文件绝对路径 )
       */
      // path.relative - 返回 from 到 to 到文件路径， 如果 路径相同，则返回零长度到 字符串。
        // - path.relative('/a1/a1/a3/a4', '/a1/a2/a5/a6'); - // 返回 '../../a5/a6'
        // - path.relative('/a', '/a/c') - // 'c'

      /**
       * _path - Js/Function.md
       */
      let _pathList = _path.split(path.sep);
      if(_pathList.length==2 && _pathList[1].toLocaleLowerCase()!=='readme.md'){
        mdPathList.push(_pathList); // [[Js, 'Array']]
      }
    })
};

/**
 * 复制模版 并插入侧边栏路径
 */
const buildSidebarModel = () => {
  const sidebar = buildSidebarData(mdPathList);
  const navbar = buildNavbarData(mdPathList);
  return src('./build/config_template.js')
    .pipe(replace('sidebar,', `sidebar: ${JSON.stringify(sidebar, null, 4)}`))
    .pipe(replace('nav,', `nav: ${JSON.stringify(navbar, null, 4)},`))
    .pipe(rename((path) => {
      path.basename = 'config';
    }))
    .pipe(dest('./docs/.vuepress'))
}

/**
 * 生成 侧边栏数据
 */
const buildSidebarData = (pathList, excFiles) => {
  const __sidebarList = [{
    title: '首页',
    path: '/',
    collapsable: false,
  }];
  // 做一个Map 存储 键值对 对映射关系
  let map = new Map();
  pathList.forEach(item => {
    let [__path, __name] = item;
    if (excFiles && ~excFiles.indexOf(__path)) return;
    __name = __name.replace('.md', '');
    let __index = __sidebarList.length;
    if (map.has(__path)) {
      __index = map.get(__path);
    } else {
      map.set(__path, __index);
    };
    const __sidebarGenObj = (
      __sidebarList[__index] ||
      (__sidebarList[__index] = {
        title: __path,
        path: `/${__path}`,
        children: []
      })
    );
    __sidebarGenObj.children.push(`/${__path}/${__name}`)
  });
  return __sidebarList;
}

/**
 * 生成 导航栏数据
 */
const buildNavbarData = (pathList, excFiles) => {
  // 当前固定 引导坐标为 1 (数组下标)
  const guideIndex = 1;
  // Gitee 地址
  const GITEE_URI = 'https://gitee.com/gxsary';
  const __navbarList = [
    { text: '首页', link: '/' },
    {
      text: '引导',
      items: [],
    },
    { text: 'Gitee', link: GITEE_URI, target:'_blank' }
  ];
  let set = new Set();
  pathList.forEach(item => {
    const [__path, ] = item;
    if (excFiles && ~excFiles.indexOf(__path)) return;
    if (set.has(__path)) return;
    set.add(__path);
    const __navbarGenObj = {
      text: __path,
      link: `/${__path}/`
    };
    __navbarList[guideIndex].items.push(__navbarGenObj)
  })
  return __navbarList;
}

const runGulp = (cb) => {
  if(!options.watch) {
    const spinner = ora(`run vuepress ...`)
    spinner.start();
    exec('vuepress build .',(err, stdout)=>{
      spinner.stop()
      if (err && !stdout) {
        cb(err)
      }else{
        cb()
      }
      process.exit()
    })
  } else {
    cb();
    process.exit()
  }
};

const checkMdPathList = (cb) => {
  mdPathList && mdPathList.length && (mdPathList.length = 0);
  cb();
}

const assemble = series(buildMdPath, buildSidebarModel, runGulp);

// watch(['./docs/**/*.md', './gulpfile.js'], assemble);
exports.default = assemble;
