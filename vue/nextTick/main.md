# nextTick原理

Vue.nextTick将回调函数延迟放在下一次DOM更新之后执行。也就是说你修改了一些数据需要执行，可以使用该方法立即执行并且拿到发生改变后的dom。

```
Vue.nextTick(callback) //通过回调函数
Vue.nextTick().then(callback) //或者使用promise
```

## 原理

- 浏览器的事件执行机制有同步任务执行栈和异步队列。异步任务在准备好后会将回调函数加入异步队列中。
- 同步执行栈执行完毕后会检查异步队列，并将异步队列任务加入执行栈中直到清空异步队列。重复这个过程
- 异步任务分为宏任务（js和宿主交互产生的任务）和微任务（js内部机制产生的任务）。在宏任务执行完成或者一个微任务执行完成后叫一个tick
- vue的dom渲染就发生在两个tick之间，所以拿到dom渲染后的结果，就是要手动执行一个微任务(或者宏任务)来强制dom进行渲染。


## 实现

Vue根据所在浏览器对异步任务的兼容性运用了如下方案去完成一个tick的切换  
优先级从上到下递减

- promise
- mutationObserver
- setImmdiate
- setTimeout

### Promise

如果支持Promise的话，使用promise.resolve().then(callback)去手动执行完一个微任务
```
let timefunc //异步执行函数
if (typeof Promise !== 'undefined') {
    const p = Promise.resolve()
    timefunc = () => {
        p.then(flushCallbacks) //该函数执行所有的nextTick中的回调
    }
}
```

### MutationObserver

MutationObserver是html5的一个特性，用来监测目标dom的变化，如果变化来触发回调函数。  
MutationObserver属于微任务

```
let counter = 1
const observer = new MutationObserver(flushCallbacks) //创建一个observer并将回调函数加入
const textnode = document.createTextNode(String(counter)) // 创建一个文本节点
observer.observe(textNode, { //手动使观测器观测节点
    characterData: true //表明监测节点数据的变化
})

timefunc = () => {
    counter = (count+1) % 2
    textnode.data = counter //手动改变counter，使observer观测到变化，调用回调函数
}
```

## setImmediate

setImmediate是一个宏任务，用来替代setTimeout(fn, 0),因为setTimeout有最小延迟4ms

```
timefunc = () => {
    setImmediate(flushCallbacks)
}
```

## setTimeout

最后都不兼容情况下使用setTimeout

```
timefunc = () => {
    setTimeout(flushCallbacks)
}
```