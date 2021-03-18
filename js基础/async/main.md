#  async

```
async function() {
    await statement;
}
```

1. async创建一个异步函数，并且返回Promise。
2. async内部使用await，await会立即阻塞当前进程，并且等待表达式返回值后进行下一个。
3. async相当于链式调用Promise，为了捕获异常，使用try catch。

```
function f1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('1sec pass');
            resolve();
        }, 1000);
    });
}

function chainPromise() {
    Promise.resolve().then(() => {
        return f1()
    }).then(() => {
        return f1()
    }).then(() => {
        console.log('done')
    })
}

async function asyncFunction() {
    try {
        await f1();
        await f1();
    }
    catch{
        await console.log('error')
    }

    await console.log('done')
}
```

# 同步执行

首先给出一个错误的例子
```
async function wrong() {
    const t1 = f1();
    const t2 = f2();

    await t1;
    await t2;
}
```
在这个例子中即使t1和t2是同步执行的，所以整个程序的执行取决于最短的，但仍然会被t1阻塞。

正确的例子
```
function PromiseParrel() {
    return Promise.all([f1(), f1()]).then(() => {
        console.log('done')
    })
}
async function ChainParrel() {
    await Promise.all([
        (async() => await f1())(),
        (async() => await f1())(),
    ]).then(()=> {
        console.log('done');
    })
}
```