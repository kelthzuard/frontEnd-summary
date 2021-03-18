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