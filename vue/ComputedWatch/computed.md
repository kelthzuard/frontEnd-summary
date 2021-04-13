# computed

用法

```
watch: {
    watchedData: function() {
        return this.data
    }
}
```


- computed初始化得时候并不会调用get，也就是不会访问依赖属性，真正更新得时候是页面渲染时渲染属性执行get得时候
- computed使用dirty来保证懒加载，依赖属性更新时才会设置dirty为true，代表需要更新，返回更新值。其他时候直接返回缓存值。
- 在渲染属性将自己注册进computed dep中时，计算属性会把自己和渲染属性一起注册进依赖属性中。这样当依赖属性改变时，渲染属性会主动访问计算属性，实现更新，要不然计算属性只会把dirty设为true，无法进行渲染属性更新。 
  
computed流程如下

- 初始化computed，给每个computed值设置一个watcher，这时得watcher构造不会触发get。

```
var watchers = []
for (const key in computed) {
    const getters = typeof computed[key] == 'function'?computed[key]:computed[key].get
    watchers[key] = new Wathcer({
        vm: vm,
        getters,
        lazy: true
    })
}
```

- 当渲染属性触发计算属性得get时，将渲染属性注册进自己的dep中，并且将自己和渲染属性注册进依赖属性得dep中。计算值并缓存
```
function watcher(vm, gettes, lazy) {
    this.dirty = lazy //设置dirty为lazy的值。dirty代表了当前值是否需要更新
    this.value = null
    //this.get() 注意没有这一步，初始化不进行get
    this.dep = []
    get() {
        if (Dep.target) {
            this.dep.push(Dep.target) //如果是视图属性想要注册依赖，进行注册。
        }
        this.register(Dep.target, this) //将自己和渲染属性都注册进依赖属性。防止依赖属性更新而自己不更新导致渲染属性无法更新。
        if (this.dirty) { //如果需要更新
            this.dirty = false //获取第一次值，设置lazy为false表示不需要更新
            this.value = this.vm.data[getters]
        }
        return this.value //缓存取过得值
    }
}
```

- 当依赖属性更新时通过notify通知订阅器更新watcher时，wathcher不立即进行更新，而是将dirty设置为true，表示该值需要更新，随后再取值的时候才去做值得更新。  
- 在dirty为false得时候，直接返回缓存得值，不需要更新。
- 而渲染属性更新是由于依赖属性更新通知渲染属性，渲染属性调用计算属性得get进行更新。

```
update() {
    this.dirty = true
}
```