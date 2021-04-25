Function.prototype.myApply = function(context, args) {
    if (typeof this !== 'function') {
        throw TypeError('not function')
    }
    if (Object.prototype.toString.call(args) !== '[object Array]') {
        throw TypeError('args must be array')
    }
    context.fn = this
    var r = context.fn(...args)
    delete context.fn
    return r
}

var obj = {
    a: 1
}
function func(c, d) {
    console.log(this.a, c, d)
}
func.myApply(obj, [2, 3])