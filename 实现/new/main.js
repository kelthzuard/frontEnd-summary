//思路：建立一个新对象并把对象的__proto__指向构造函数的prototype
//将新对象的this指向新对象，并且执行构造函数得到返回值
//如果返回值是obj返回返回值，否则返回新对象

// 使用es6语法
function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const r = fn.apply(obj, args)
    return r instanceof Object?r:obj
}

// 不使用
function myNew2(fn) {
    var obj = {}
    obj.__proto__ = fn.prototype
    var args = Array.prototype.slice.call(arguments)
    args.shift()
    var r = fn.apply(obj, args)
    return r instanceof Object?r:obj
}

function MyClass(name) {
    this.name = name
}

MyClass.prototype.say = function() {
    console.log(this.name)
}

var me = myNew(MyClass, 'kel')
var me2 = myNew2(MyClass, 'kel')
console.log(me)
me.say()
console.log(me2)
me2.say()