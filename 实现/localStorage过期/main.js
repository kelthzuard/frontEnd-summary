function Storage() {
    this.store = window.localStorage
}

Storage.prototype.setItem = function(key, value, maxAge) {
    const v = {
        value: value,
        maxAge: maxAge,
        date: +new Date()
    }
    this.store.setItem(key, JSON.stringify(v))
}

Storage.prototype.getItem = function(key) {
    var now = +new Date()
    var item = this.store.getItem(key)
    item = JSON.parse(item)
    if (item === null) return null
    if (now - item.date >= item.maxAge) {
        this.store.removeItem(key)
    }
    return item.value
}