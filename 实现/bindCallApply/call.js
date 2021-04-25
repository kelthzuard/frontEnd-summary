Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
        throw TypeError('not function')
    }
    context.fn = this
    var r = context.fn(...args)
    delete context.fn
    return r
}


var obj = {a:1}
function func(b) {
    console.log(this.a + b)
}

func.myCall(obj, 2)