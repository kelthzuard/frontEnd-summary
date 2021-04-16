function Observer(data) {
    return defineReactive(data)
}

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

var globalEffect = null //全局依赖注册
var targetMap = new Map()


function track(target, key) {
    if (globalEffect) { //如果全局依赖有，执行注册
        if (!targetMap.has(target)) {
            targetMap.set(target, new Map()) //给target注册一个全局得依赖表
        }
        let depMap = targetMap.get(target)
        if (!depMap.has(key)) {
            depMap.set(key, new Set())
        }
        let dep = depMap.get(key) //拿到key的依赖表
        dep.add(globalEffect) // 注入依赖
        globalEffect.deps.add(dep)
    }
}

function trigger(target, key) {
    if (targetMap.has(target)) {
        let depMap = targetMap.get(target)
        if (depMap.has(key)) {
            var effects = new Set()
            var computed = new Set()
            let dep = depMap.get(key)
            dep.forEach((effect) => {
                if (effect.computed) {
                    computed.add(effect) //如果时计算属性加入计算更新队列中
                }
                else {
                    effects.add(effect) //否则加入effect
                }
            })
            computed.forEach((computed) => computed.update()) //计算属性更新
            effects.forEach((effect) => effect.update()) //视图更新
        }
    }
}

function Vue(props) {
    this.data = new Observer(props.data)
}

var vm = new Vue({
    data: {
        name: 'kel',
        age: 1
    }
})

console.log(vm.data.name)