# generator

```
function* maker() {
    yield 1;    
}
let m = maker()
console.log(m.next()) // 输出 { value: 1, done: false }
console.log(m.next()) // 输出 { value: undefined, done: true }
```

- 在函数后面加星号构造一个迭代器函数 function*
- 使用yield关键词进行一次迭代输出.
- 返回值为一个对象，value代表返回的值，done代表是否结束。
- Generator.prototype.return()返回给定的值并结束生成器。
- Generator.prototype.throw()向生成器抛出一个错误。

# 迭代器

- 可迭代对象必须拥有可迭代行为，这个对象的或原型中必须带Symbol.iterator键。
- 默认可迭代对象:Array, String, Map, Set, TypedArray
- 默认不可迭代对象: Object

可迭代对象默认迭代的方法有：
- for of
- yield*
- 展开表达式

```
var arr = [1,2,3];
for (let val of arr) {
    console.log(val) //1,2,3
}
```

```
function* geneArr(arr) {
    for (let val of arr) {
        yield val;
    }
}
var g = geneArr(arr);
console.log(g.next().value) // 1
console.log(g.next().value) // 2
console.log(g.next().value) // 3
```

```
console.log(...arr) // 1 2 3
```

```
function* gene2(arr) {
    yield* arr;
}
var g2 = gene2(arr);
console.log(g2.next().value) // 1
console.log(g2.next().value) // 2
console.log(g2.next().value) // 3
```