# vue3 响应式原理 Proxy

```
new Proxy(target, handler)
```

- Proxy相当于拦截器，对目标进行一层拦截。可以拦截get,set,delete和数组操作等方法。
- Vue3用Proxy代替了defineProperty
- 在get时进行拦截，对对象属性的递归拦截发生在对对象属性的get过程中，所以初始化只拦截一次
- 在set时对相应的依赖进行更新。
- Reflect是一个类object但不能实例化。可以调用object类似的方法例如get(target, key), set(target, key, value)

```
defineReactive = function(data) {
    const handler = {
        get: function(target, key) {
            const res = Reflect.get(target, key)
            // 懒加载，只有get到子元素时才会触发依赖收集
            track(target, key)
            // 注入依赖
            return typeof res == 'object'?defineReactive(res):res
        },
        set: function(target, key, value) {
            Reflect.set(target, key, value)
            trigger(target, key)
            // 通知更新
        }
    }
    const observed = new Proxy(data, handler)
    return observed
}
```

proxy 和 defineProperty的对比

- Proxy是对对象的监听而defineProperty对属性的监听，所以新添加属性时defineProperty无法监听而proxy可以
- proxy能正确监听原生数组的方法，而defineProperty需要劫持
- proxy能在访问对象元素时进行懒劫持，而defineProperty需要在第一次劫持时对对象进行递归劫持。
- proxy无法polyfill，defineProperty兼容性好。