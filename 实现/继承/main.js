function Father(name) {
    this.name = name
}

// 1.原型链继承，就是child.prototype = new Father()，共享父实例属性

// 2.构造函数继承: 就是father.call(this, arg1, arg2)

// 组合继承:会执行两次构造函数

function child_combie(name) {
    Father.call(this, name)
}

child_combie.prototype = new Father()
child_combie.prototype.constructor = child_combie
var child_c = new child_combie('kel')
console.log(child_c)

// 1. 原型式继承：就是Object.create(一个对象)
// 2. 寄生式继承：原型式继承加原型方法
// 组合寄生继承

function Mother(age) {
    this.age = age
}

function Son(name, age) {
    Father.call(this, name)
    Mother.call(this, age)
}

Son.prototype = Object.create(Father.prototype)
Object.assign(Son.prototype, Object.create(Mother.prototype))
Son.prototype.constructor = Son

var s = new Son('kel', 1)
console.log(s)

// es6继承
// es6 继承的本质是调用父构造函数并修改父构造函数实例的this来得到子类。所以必须先super()
// 对于非es6继承。Child.__proto__ == Function.prototype
// 对于es6继承 Child.__proto__ = Father

class Father2{
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(this.name)
    }
}

class Son2 extends Father2{
    constructor(name, age) {
        super(name)
        this.age = age
    }
}

var son  = new Son2('kel', 1)
son.say()
