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

## null 和 undefined的区别

- null代表未定义，此处不应该出现值
- null作为原型链的终点
- typeof null 为object
- null会被转义为0 null + 0 = 0

- undefined代表此处已经定义，但没有值
- typeof undefined 为 "undefined"
- undefined会被转义为NaN 0 + undefined = NaN

- null == undefined true
- null ==== undefined false

## == 

- 在使用 == 会做隐式转换
- 使用 === 不做隐式转换，需要类型相同且指相同（引用类型地址相同）
- undefined和null和除本身外任何值都不相同，但undefined == null，但undefined !== null
- 只有 0, '', false, undefined, null, NaN 在判断时视为false，但undefined， null, NaN 均和 false不相等。即 undefined != false

## 其他

- 0 + undefined == NaN
- a = [], a[5] = undefined, a.length = 6