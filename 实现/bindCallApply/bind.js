// es6
Function.prototype.myBind = function(context, ...args) {
    if(typeof this !== 'function') {
        throw new TypeError('not function')
    }
    return (...newArgs) => {
        return this.apply(context, [...args, ...newArgs])
    }
}

Function.prototype.yourBind = function(context) {
    var that = this //拿到this。后面返回的function调用时this会改变，所以需要先保存
    if (typeof this != 'function') { //判断调用的是不是函数
        throw TypeError('not function')
    }
    var args = Array.prototype.slice.call(arguments, 1) //拿到的是除了上下文后面的所有参数
    return function() {
        var newArg = Array.prototype.slice.call(arguments)
        var arg = args.concat(newArg) //拿到新的参数并且把新参数拼接到老参数后面
        return that.apply(context, arg)
    }
}

var obj = {a:1}

function func(c, d) {
    console.log(this.a + c + d)
}

var func1 = func.myBind(obj, 2)
var func2 = func.yourBind(obj, 3)
func1(5)
func2(5)