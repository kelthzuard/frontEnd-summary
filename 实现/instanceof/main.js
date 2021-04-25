function myInstanceof(target, pro) {
    //判断target是不是在pro的原型链上就是判断target.__proto__ == pro.prototype
    var left = target.__proto__
    var right = pro.prototype
    while(true) {
        if (left == null) return false //原型链的终点
        if (left == right) return true
        left = left.__proto__
    }
}
var f = Object.create({})
console.log(myInstanceof(f, Object))