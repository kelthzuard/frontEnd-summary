# forEach

```
Array.prototype.forEach(callback(value,index,array),thisArg)
```
- value:值
- index:索引
- array:遍历的数组
- thisArg:如果有，则循环体内this指向thisArg，否则this指向全局，如果使用箭头函数，该参数会被忽略，因为箭头函数绑定了this。

1. forEach在循环体中除了错误捕捉以外不会被中断(即使是return)，不要在forEach中处理任何需要跳出的任务。
2. forEach没有返回值。
3. forEach按照既定的索引信息进行遍历，而不会因为中途数组的改变而改变。

```
[1,2,3,4].forEach(function(word,index,arr) {
    console.log(word)
    if (word == 2) {
        arr.shift()
    }
})
// 1，2，4
```
当循环到2时整体数组往前移，此时3被前移而跳过。

# filter

```
Array.prototype.filter(callback(value,index,array),thisArg)
```

1. filter会保留所有callback函数中返回为真的元素。
2. filter不会改变原数组，只会返回一个新创建的数组，所以记得新创建一个数组。

# map

```
Array.prototype.map(callback(value,index,array), thisArg)
```

1. map对数组中每个元素做处理后，返回一个新的数组，该数组不会修改原数组。

技巧1：将map方法用在其他数据类型上
- 使用call方法将调用对象指向其他数据结构。

```
let str = 'Hello World';
let s = Array.prototype.map.call(str, function(x) {
    return x;
})
```

技巧2：回调函数中传入其他函数的参数问题
- 当回调函数中传入parseInt函数的时候，因为回调函数会将三个参数传入，而parseInt接受两个参数。所以会出错

```
[1,2,3].map(parseInt)
// 1
// NaN
// NaN
```
因为parseInt有两个参数
```
parseInt(number, radix)
```
第一个为数组第二个为基，即将数组看成几进制数。
radix < 2 或者 radix > 36 时会返回NaN，同时当radix为0时，默认为十进制。
所以执行流程为
```
parseInt(1, 0); //radix为0，默认十进制，返回1
parseInt(2,1); // radix非法为1，返回NaN
parseInt(3,2); // radix为二进制，但二进制只能为0或1，3非法，返回NaN
```
解决方案
```
function parse(number) {
    return parseInt(number,10);
}
[1,2,3].map(parse)
```
输出
```
//1,2,3
```

- 当map遇到空位时会跳过元素，且保留元素
- 其他循环体遇到空位时会跳过元素，且不保留元素

```
var a = [,,1,,3].map((val) => {
    return Number(val);
})
var b = [,,1,,3].filter(() => {
    return true;
})
```
输出
```
a [,,1,,3]
b [1,3


]
```


# reduce

```
Array.prototype.reduce(callback(accumulator,currentValue,currentIndex,array),initialValue)
```

- 如果不给出initialValue，则currentIndex从1开始，即第二个元素，accumulator为第一个元素。
- 给出initialValue，currentIndex从0开始，accumulator起始为initialValue。

应用：
- reduce序列化执行promise
```
let j = [1,2,3].reduce((prev,cur) => {
    return prev.then(value => {
        return new Promise((resolve,reject) => {
            resolve(value + cur);
        })
    });
},Promise.resolve(0));
j.then(v => {
    console.log(v)
})
```
输出6

- reduce实现map

```
Array.prototype.mapUsingReduce = function(callback, thisArg) {
    return this.reduce((mappedArray, currentValue, currentIndex, array) => {
        mappedArray[currentIndex] = callback.call(thisArg, currentValue, currentIndex, array);
        return mappedArray;
    }, [])
}

let k = [1,2,3].mapUsingReduce((val, index, array) => {return val ++;})
console.log(k)
```