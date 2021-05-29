Number.prototype.toMyLocale = function() {
    let s = String(this)
    s = s.split('.')
    let r = '.' + s[1]
    let x = s[0]
    const n = x.length
    for (let i = n - 1; i >= 0; i --) {
        r = x[i] + r
        if ((n - i) % 3 === 0 && i > 0) { // 这里注意要大于0，等于0就不能往前加了
            r = ',' + r
        }
    }
    return r
}

console.log(Number(1223214124.123123).toMyLocale())