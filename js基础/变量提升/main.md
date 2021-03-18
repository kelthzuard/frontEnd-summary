# 变量提升

1. 变量的声明会被提升到作用域的顶部，而变量的赋值不会。
2. 函数的声明永远优先于变量的声明。所以如果有同名变量和函数，函数的声明会被提前。
3. 多个同名函数的声明会采用最晚声明的那个函数。
4. let,const,class出现的作用域顶部到变量声明语句之间会出现临时性死区，在这个范围内调用未声明变量会报错。


```
console.log(a) // 输出undefined
var a = 1;
```
这段代码等同于
```
var a;
console.log(a)
a = 1;
```
变量提升只会提升变量声明，不会提升变量赋值。



```
f()
var f = 1;
function f() {
    console.log('f')
}
```
打印f，函数的声明永远大于变量声明。

```
f1()
function f1() {
    console.log('2')
}
function f1() {
    console.log('3')
}
```
输出3，同名函数声明永远取最后的

```
console.log(let1) // let1 is undefined
console.log(const1) // const1 is undefined
console.log(asd) // asd is undefined
let let1 = 1
const const1 = 2
class asd{}
```
在临时性死区中变量都处于不可访问状态。

- let和const不能重复声明，否则报错。var可以
```
var a = 1;
var a = 2;// 不报错
let b = 1;
let b = 2; // 报错，already declared
```