# watch

用法
```
watch: {
    watchedData: function(newVal, oldVal) {

    }
}
```

watch用来监听一个属性，并捕捉变化后得值和变化前得值。  
watch得基本流程和渲染属性一致

- 初始化时生成watcher，调用依赖属性得get，将自己注册进依赖属性得订阅器中。
  - 如果watcher得对象是obj.a.b这种，会从外到内依次注入每一个依赖，确保依赖收集
- 依赖属性发生变换时，通过notify通知订阅器，订阅器调用watch得update
- watch在update中计算新属性并执行回调函数。

## watch得深层监听原理

在开启deep后，如果监听是对象或者数组，watcher会遍历这个对象，并且对每一个数据都进行依赖注入。  
为了防止重复注入，会用一个set记录访问过得是对象得dep得id