# var

1. 在函数体中用var声明的为局部对象而不使用var声明的为全局对象。
2. 在函数外不论用不用var都是全局对象。
3. 全局对象是window对象的属性。
4. 用var是声明全局变量而不用则是给全局对象新增一个属性。区别在于用var不能用delete删除，而不用var可以删除。

```
var a = 1;
b = 2
function func() {
    var c = 3;
    d = 4;
}
func();
console.log(window.a, window.b, window.c, window.d);
console.log(delete a);
console.log(delete b);
```
返回
```
1,2,undefined,4
false
true
```