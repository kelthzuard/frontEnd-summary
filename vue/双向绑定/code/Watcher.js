var Dep = require('./Dep.js')

function Watcher(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get() //获得响应的初始值，并且绑定
}

Watcher.prototype.get = function() {
    Dep.target = this //设置全局target为自己
    var value = this.vm.data[this.exp] //通过访问目标的getter，将自己加入订阅器
    Dep.target = null //设置target为null防止反复加入
    return value
}

Watcher.prototype.update = function() {
    var newVal = this.vm.data[this.exp] //更新时重新拿取目标值，并且执行回调函数。
    if (newVal != this.value) {
        this.value = newVal
        this.cb(newVal)
    }
}

module.exports = Watcher