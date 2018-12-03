import "babel-polyfill"; //polyfill需要在你的源代码之前运行，所以安装dependency, 而不是devDependency
import "./css/index.scss";

const log = console.log.bind(this);
const hello = require("./js/hello.js");
document.querySelector("#root").appendChild(hello());

const TEXT_NUM = 6;
let arr = [1, 2, 3, 3].map(item => {
  return item * 2;
});
log(arr.includes(TEXT_NUM));
log(new Set(arr));
