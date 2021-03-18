# 基本数据类型

js中数据类型包含六种基本类型
- null
- undefined
- String
- Number
- Boolean
- Symbol(ES6新添加)
和一种引用类型
- Object

其中String, Number 和 Boolean三者拥有包装对象
使用包装对象会返回一个对象而非原始基本数据类型。
包装对象只有在必要时（比如比较）才会转换为原始类型。
原始变量不拥有类方法，在需要调用类方法的时候会将基本变量转换为包装变量并调用方法。
```
var a = new Number(123)
console.log(a == 123); // true
console.log(a === 123); // false
console.log(typeof(a)); // object
var c = a + 1; // a转换为原始类型
console.log(c) //124
```
不要使用包装对象，只有当值为false, null, undefined时，new Boolean才为false
```
console.log(new Boolean(null)) // false
console.log(new Boolean(undefined)) // false
console.log(new Boolean(false)) // false
```

而直接调用Number(), String(), Boolean()会执行类型转换。返回原始类型，调用Number时如果不能转换为数字则返回NaN
```
console.log(Number(undefined)) // NaN
```

注意点：
在对数字调用方法时比如
```
1.toString()
```
时会报错，因为.可能会被当作小数点。所以正确的调用方法
```
1..toString()
1 .toString()
(1).toString90
```