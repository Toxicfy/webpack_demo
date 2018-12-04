# webpack_demo

> 练习 webpack 配置

此处通过一些简单的搭建熟悉 `webpack` 的常用项;

首先需要了解到 `webpack` 中如何实现对不同格式文件处理 -- 通过不同的 `loader` 完成外部脚本或者程序的调用;

`loaders` 的功能相对单一但是通过组合就可以完成常用的很多功能，例如：`Scss`、`ES6`、`JSX` 等编译为浏览器（较低低版本）支持，利于进行兼容等功能；

### 在 `webpack` 项目中添加 `sass/scss` 编译

```JavaScript
//安装(ps: sass-loader依赖于node-sass)
cnpm i sass-loader node-sass style-loader css-loader -D
        // sass-loader  -- 将 sass/scss 转成 css
        // css-loader   -- 将 css 转成 CommonJS 模块
        // style-loader -- 将 js 转成 style 节点
```

```javascript
// webpack.config.js
const path = require("path");
module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "boundle.js"
  },
  //loader 配置位置
  modules: {
    // test(用于进行正则匹配文件);  use(loader的名字);
    // include/exclude(手动添加、屏蔽文件); option(可选配置)
    rules: [
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ["style-loader", "css-loader", "sass-loader"] // 用的loader，必须顺序调用: loader是从右往左编译
      }
    ]
  }
};
```

### babel 配置

Babel 的核心配置在 babel-core 中，同样的我们可以将 babel 不同的包整合到一起完成我们需要的功能；

```javascript
cnpm i babel-core babel-loader babel-preset-env babel-plugin-transform-runtime -D
cnpm i babel-polyfill babel-runtime --save
```

- **babel-polyfill**

  `Babel` 默认只转换新的 `JavaScript` 语法，而不转换新的 `API`。例如，Iterator、Set、Maps、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 `Object.assign`）都不会转译。如果想使用这些新的对象和方法，必须使用 `babel-polyfill`，很多功能改写全局 prototype；

- **babel-runtime**
  对于 `babel` 转译代码需要用到工具函数，编译过程中则会重复出现导致编译后的代码体积变大，所以提供了单独的包 `babel-runtime` 供编译模块复用工具函数，并且工具函数自动引用了 polyfill。这样可以避免污染全局命名空间；在 webpack 中，`babel-plugin-transform-runtime` 实际上是依赖 `babel-runtime`

```javascript
//webpack.config.js (add)
rule: [
  {
    // 配置信息 - .babelrc
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader"
    }
  }
];

// .babelrc
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions"]
        }
      }
    ]
  ],
  "plugins": ["transform-runtime"]
}
```

当我们完成规则的编写，我们看到错误信息如下：
![error_image](https://raw.githubusercontent.com/Toxicfy/webpack_demo/master/src/image/error_image.png)

因为 babel-loader | babel 对应的版本需要一致(此处回退到原版本即可)

> cnpm i babel-loader@7 babel-core babel-preset-env -D

此时我们就完成 `webpack` 转译 `ES6+` 语法

### 本地服务器 && 热更新

当我们完成一些简单的 `webpack` 配置，我们需要在频繁修改文件的时候，考虑搭建一个本地的服务以及热更新，进行自动化更新文件和打包；

基于`node.js` ，在 `webpack` 提供了一个本地开发服务器，安装 `webpack-dev-server` 作为项目依赖：

```javascript
// cnpm i webpack-dev-server -D


//package.json
{
  // ****
  "scripts": {
    "start": "webpack-dev-server --open"
  }
  // ****
}

```

对于 `webpack.config.js` 配置如下：

```javascript
const webpack = require("webpack"); // 引入webpack模块，这样才能使用热更新插件
module.exports = {
  // ****
  devServer: {
    contentBase: "./dist", // 本地服务器所加载文件的目录
    port: "8080",
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, //不跳转
    hot: true // 热更新
  },
  // ****
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热更新插件：webpack中自带的插件
  ]
};
```
