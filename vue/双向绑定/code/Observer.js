var Dep = require('./Dep.js')

function Observer(data) {
    Object.keys(data).forEach(key => { //给每个属性值进行劫持
        this.defineReactive(data, key, data[key])
    })
    return data
}

Observer.prototype.defineReactive = function(obj, key, val) {
    var dep = new Dep() //给每个属性值建立一个订阅器。
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function getter() { // 这里因为getter和setter都引用了val的值，而getter和setter一直没有被销毁，所以形成了闭包，val一直在内存中。
            if (Dep.target) { //如果有全局target，则添加一个watcher
                dep.addWatcher(Dep.target)
            }
            return val
        },
        set: function setter(newVal) {
            if (newVal != val) {
                val = newVal
                dep.notify() //通过订阅器通知更新
            }
        }
    })
}

module.exports = Observer


