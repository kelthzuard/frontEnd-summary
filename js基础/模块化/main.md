# commonJs

- commonJs使用module.exports对象暴露模块方法，使用require加载模块
- commonJs是同步执行的，必须加载完模块才执行下一步
- 用require时的值是传递的拷贝的副本，所以无法对其进行更改，只能通过函数式返回值来得到更改后的值。
- require第一次执行时会生成一个对象`{id: ,exports: {}, loaded: true}`,以后再require这个脚本后就会再在这个对象上取值，不会再重复加载。

```
// a.js
var a = 1;
function increment() {
    a ++;
}
function getA() {
    return a;
}
module.exports = {a, increment, getA}
```
```
//b.js
var a = require('./a.js');

console.log(a.a) //输出1
a.increment();
console.log(a.a) //输出1，此时取得一直是a的副本，所以不会被a的原始值影响
console.log(a.getA()) //此时拿到a的原始值，输出2
```

# AMD (Asynchronous Module Definition 异步模块定义)

- AMD是异步加载的，模块的加载不影响后面模块的运行。所有依赖该模块的语句都写在异步函数中。

```
define(id, dependencies, factory)
```
- id:模块名称
- dependencies: 依赖的模块['module','exports','所要依赖的模块']
- factory:模块初始化需要执行的函数或对象。

```
define('a', ['require', 'exports', 'b'], function(require, exports, b) {
    exports.verb = function() { // 暴露变量verb
        return b.verb() //读取b文件中的verb方法.
    }
})
```
```
require([module], callback);
```
- module:要加载的模块名
- callback：回调函数
```
require('a', function() {
    console.log(a.verb());
})
```

# CMD(Common Module Definition)

- CMD由sea.js推广，也是异步引入，与AMD不同的有两点
- 对于define依赖的前置模块，AMD是提前执行，CMD是延后执行
- CMD推崇依赖后置，AMD推崇依赖前置。

```
define(function(require, exports, module) {
    var a = require('./a'); //使用require延迟执行
    var b = require('./b')
    exports.c = a + b;
})
```

# es6 Module

- 使用export导出模块，import导入模块，export default导出默认模块
- module在编译时加载，即可以在编译时确定模块的引用关系，属于异步加载。
- module输出的是值的引用，而不是值的拷贝，所以加载别的模块值会随着输出模块变化。
- 多次import同样只会执行一次。

```
// a.js
var a = 1;
var increment = function() {
    a ++;
}
export {
    a as exportA,
    increment as exportF
}
```
```
// b.js
import {exportA, exportF} from './b'

console.log(exportA); //输出1
exportF()
console.log(exportA); //输出2，以为输出的是值得引用。
```

## import()按需调用

- 可以使用import()来按需加载一个模块(可以为变量)，返回一个promise

```
import(`./module/${moduleVariable}`).then((module) => {
    dosomthing()
})
```

# 循环引用

- 在循环引用中commonJs在其他调用阻塞时会输出已经执行的部分。
- 在es6 module中会动态引用，所以不存在阻塞的情况。

```
// a.js
exports.done = false;
var b = require('./b.js');
console.log(b.done) 
exports.done = true;
console.log('a执行完')
```
```
// b.js
exports.done = false;
var a = require('./a.js')
console.log(a.done);
exports.done = true;
console.log('b执行完')
```
执行a.js输出结果
```
false -阻塞执行b.js，引入a.js的以执行部分，此时a.js中done为false
'b执行完'：顺序执行完b.js
true: 此时a.js中b为真，输出true
'a执行完'
```