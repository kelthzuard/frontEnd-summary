function Dep() {
    this.watcherList = []
}

Dep.prototype.notify = function() {
    this.watcherList.forEach(watcher => {
        watcher.update() //给每个订阅者提醒更新
    })
}

Dep.prototype.addWatcher = function(watcher) {
    this.watcherList.push(watcher)
}

Dep.target = null //全局只允许一个target存在

module.exports = Dep