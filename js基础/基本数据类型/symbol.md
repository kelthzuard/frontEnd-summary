# Symbol

1. Symbol用于创建一个独一无二的值。
2. Symbol可用于作为对象的键用于保证独一无二不会重复，但无法被 let val of ,let k in obj.keys()遍历到。无法被点操作符访问。
3. Symbol只能用Symbol()创建，不能用new，因为不是一个类。

```
var a = Symbol('a')
var b = Symbol('b')
console.log(a == b); //false，传入Symbol的参数仅作为注释，a和b为两个不同的值
```
```
var c = {
    [a]: 1 //Symbol对象作为键时必须要加上中括号
};
c[b] = 2;
console.log(c[a], c[b]) // 1，2
```

应用：作为传参的占位符。
```
var type_map = {
    type1: Symbol(), //因为每次调用都是通过type_map.type1，所以只需要保证他们的值不重复就可以了。Symbol恰好创建独一无二的值。
    type2: Symbol()
}
function f(type) {
    switch (type) {
        case type_map.type1: console.log('type1');
    }
}
f(type_map.type1);
```