import "babel-polyfill"; //polyfill需要在你的源代码之前运行，所以安装dependency, 而不是devDependency
import "./css/index.scss";

const log = console.log.bind(this);
const hello = require("./js/hello.js");
document.querySelector("#root").appendChild(hello());

const TEXT_NUM = 2018;
let arr = [1, 2, 3, 3];
let arr2 = arr.map(item => {
  item * 2;
});

log(arr2.includes(6));

log(new Set(arr2));
