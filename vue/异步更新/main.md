# vue异步更新

vue对于在一个tick内多次数据更新采用异步更新的方式，依次更新1000条数据只会在最后延迟更新一次。

## 实现原理

- wathchr在update的时候如果需要更新，把watcher注册进一个watcher队列中。
```
function Watcher() {
    update() {
        queueWatcher(this)
    }
}
```

- queueWatcher的作用是监控一段时间内的watcher，把他们加入更新队列中。
- 更新队列对同一个watcher只保留一次，也就是去重，这样防止一个watcher的多次更新，将多次watcher的更新减少为一次。
- queueWatcher不会立刻执行更新，而是会在nextTick中进行更新，这样实现延迟更新。

```
let hash = {} //用一个set去重watch
let queue = [] //存储watch队列
let waiting = false //标志是否正在更新
function queueWatcher(watcher) {
    const id = watcher.id
    if (hash[id] == null) {
        queue.push(watcher)
        hash[id] = true
    }
    if (!waiting) {
        waiting = true
        nextTick(execQueue)
    }
}
function execQueue() {
    for (let watcher of queue) {
        hash[watcher.id] = null
        watcher.run()
    }
    waiting = false
}
```