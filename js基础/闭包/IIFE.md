# IIFE 立即调用函数表达式 匿名函数

```
(function() {
    statement
})();
```

- IIFE创建一个匿名函数并立即执行
- IIFE拥有自己独立的词法作用域，外部无法调用

作用：控制一块区域的作用域范围，并且不污染全局变量
```
function a() {
    for (var i = 0; i < 3; i ++) {
        (function(i) {
            setTimeout(() => {
                console.log(i);
            },0);
        })(i);
    }
}
```
上述例子中匿名函数封闭了setTimeout的作用域，导致内部的i不会随着外部的i改变，从而避免闭包错误。

```
(function() {
    var x = y = 1
})()

console.log(y) // 1
console.log(x) // reference error
```

上述代码中由于表达式解析从右到左，所以实际上是

```
y = 1
var x = y
```

所以x被赋值为一，y为赋值为全局变量  
又由于IFFE独立作用域，所以x未定义，y可以访问为1
