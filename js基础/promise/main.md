# promise

promise中主要有三种状态

1. pending:状态未确定
2. resolved:成功执行
3. rejected:执行失败
4. settled:状态确定，可以为resolved或rejected中的一种。

Promise方法：
- Promise.prototype.reject(onReject) 添加一个拒绝回调
- Promise.prototype.then(onFulfilled, onRejceted) 添加一个解决和拒绝回调
- Promise.prototype.finally(onFinally) 返回一个回调，无论是成功还是失败

新建promise方法的时候需要指定resolve()和reject()方法。
可以用catch方法捕获前面所有的错误，错误会一直传递到第一个then里面有reject调用的或者第一个catch。
需要注意的是promise是立即执行方法，当new以后会立即执行，当结束时进入settled状态。
需要注意的是一次promise链的调用的结束标志为所有promise状态进入settled。而其后所有的下一次调用会在事件循环结束后被调用。
但会在settimeout之前，因为promise属于内部引擎行为，settimeout是浏览器行为。promise优先级高。
例子
```
var p1 = new Promise((resolve, reject) => {
    console.log('p1');
    resolve(); //立即执行。
})
p1.then(() => {
    console.log('p2'); //p1的状态已经是settled了，所以对于p1的then调用会在下一个事件循环里执行。
})
console.log('p3');
setTimeout(() => {
    console.log('p4');
},0);
```
输出
```
p1
p3
p2
p4
```
```
new Promise((resolve, reject) => {
    console.log('1')
    resolve()
    console.log('2')
}).then(() => { // 此时第一个promise已经为settle，下一次then调用为异步调用。
    console.log('3')
})
console.log('4')
```
输出
```
1,2,4,3
```


promise两个基础静态方法
1. Promise.resolve()
2. Promise.reject()
在不清楚一个值是否为promise对象的情况下，可以用Promise.resolve(value)的方式将值以promise链的形式传递
```
Promise.resolve('p1').then((val) => {
    console.log(val);
})
```
输出:
p1

promise链式调用的方式取绝于其返回值
1. 无返回值：不继续往下执行 (但是这里自己实验是会执行的！！不知道怎么回事)
2. 返回数值：作为下一个链节点的输入值
3. 返回promise：执行该promise
```
Promise.resolve().then(() => {
    return 'p1';
}).then((val) => {
    console.log(val);
    return new Promise((resolve, reject) => {
        console.log('p2')
        resolve('p3');
    });
}).then((val) => {
    console.log(val);
}).then(() => {
    console.log('p4');
})
```
输出
```
p1
p2
p3
p4
```

Promise的进阶静态方法有
1. Promise.all()等全部promise执行完成后一起返回，返回结果是promise输出的数组
2. Promise.race()任一promise完成后返回。
3. Promise.allSettled()所有promise都settled后
```
function Get(value) {
    return new Promise((resolve,reject) => {
        console.log(value);
        setTimeout(() => {
            resolve(value);
        }, 1000);
    })
}
Promise.all([Get('p1'), Get('p2')]).then((val) => {
    console.log(val);
})
```
输出
```
p1
p2
一秒后
[p1 p2]
```

Promise的应用主要在进行接口请求的时候请求到一个值以后请求下一个值。比如
```
function requestData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data'); //输出返回的数据
        }, 1000); //请求数据耗时一秒
    })
}
requestData('firstUrl').then((val) => {
    //解析数据
    console.log(val)
    return requestData('secondUrl');
}).then((val) => {
    console.log(val); //处理最终数据
})
```

在面对一个长的调用链的时候，可以结合reduce函数。
reduce函数按顺序一次调用数组中的前后两个值,有两个参数值
```
arr.reduce((prev,cur) => {})
```
1. prev:前一个调用的结果
2. cur:本此调用的值
```
function requestData(url) {
    return new Promise((resolve, reject) => {
        resolve(url)
    })
}
list = ['1','2','3'];
list.reduce((prev, cur) => {
    return prev.then((url) => { //用一个初始的promise串起整个链
        return requestData(cur+url); //用上一个请求得到的url请求接口
    }).then((val) => {
        // do something with the response
        console.log(val);
        return val; //把得到的url传给下一个值
    })
}, Promise.resolve('init_url')); //初始化一个promise和一个初始url
```
返回值
```
1init_url
21init_url
321init_url
```