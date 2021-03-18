# 展开语法

1. 展开操作符将可迭代对象展开。如果是数组字符串元素则按元素展开，如果是对象元素按key: value 展开。

用例
- 替代apply作为传入的参数
```
function add(x, y, z) {
    return x + y + z
}
console.log(add.apply(null, [1,2,3])) // 6
console.log(add(...[1,2,3])) // 6
```
在构造函数的实例当中不能使用apply进行传参，但可以用展开操作符。

- 构造字面量数组。（一层）
```
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [...arr1, ...arr2]
console.log(arr3) // [1,2,3,4,5,6];
```
这种方式等同于
```
arr1.push.apply(arr1, arr2); // [1,2,3,4,5,6]
console.log(arr1)
```
可以用这种方式构造数组的浅拷贝，注意是浅拷贝，只能有一层拷贝。
```
var arr4 = [...arr2];
arr2.pop()
console.log(arr4) // 4，5，6
```

- 构造字面量对象（一层）
```
var obj1 = {
    a: 1,
    b: 2
}
var obj2 = {
    c: 3,
    d: 4
}
var obj3 = {...obj1, ...obj2}
console.log(obj3)
```
这种方法等同于
```
var obj4 = Object.assign(obj1, obj2);
console.log(obj4)
```
但这种方式不能替代assign，因为仅仅是一层浅拷贝。

# 剩余参数

剩余参数可以将未捕获的参数全部作为一个数组返回
```
function add(x, ...args) {
    return x + args.reduce((sum, cur) => { // 因为x占位了，所以args为[2,3]
        return sum + cur;
    }, 0);
}
console.log(add(1,2,3)); // 6
```

剩余参数和arguments的不同
- 剩余参数只包含未占位的参数，而arguments包含所有的传入参数
- 剩余参数为真正的数组，而arguments需要先转换为数组
argument转换为数组的方法有
```
function test() {
    var a1 = Array.prototype.slice.call(arguments); //注意参数只有arguments
    var a2 = [].slice.call(arguments)
    var a3 = Array.from(arguments)
    console.log(a1, a2, a3)
}
test(1,2,3)
```
- 箭头函数中无法使用arguments，而剩余参数可以
