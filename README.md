# webpack_demo

> 练习 webpack 配置

此处通过一些简单的搭建熟悉 `webpack` 的常用项;

首先需要了解到 `webpack` 中如何实现对不同格式文件处理 -- 通过不同的 `loader` 完成外部脚本或者程序的调用;

`loaders` 的功能相对单一但是通过组合就可以完成常用的很多功能，例如：`Scss`、`ES6`、`JSX` 等编译为浏览器（较低低版本）支持，利于进行兼容等功能；

### 在 `webpack` 项目中添加 `sass/scss` 编译

```javascript
// 安装(ps: sass-loader依赖于node-sass)
cnpm i sass-loader node-sass style-loader css-loader -D
        // sass-loader  -- 将 sass/scss 转成 css
        // css-loader   -- 将 css 转成 CommonJS 模块
        // style-loader -- 将 js 转成 style 节点

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
