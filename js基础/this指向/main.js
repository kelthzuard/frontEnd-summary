function func() {
    console.log(this == global);
    return this;
}
console.log(func() == global)
var obj = {
    val: 1,
    method: function() {
        console.log(this.val)
    }
}
obj.method()
var b = obj.method;
b()

var obj2 = {
    m: function() {
        return function() {
            return this; 
        }
    },
    n: function() {
        return (() => this)
    }
}
var f = obj2.m()
console.log(f() == global)
var f1 = obj2.n()
console.log(f1() == obj2)
var f3 = obj2.n;
console.log(f3()() == global)

var obj3 = {
    a: 1,
    d: 2
}
obj3.b = {a: 2}
obj3.b.c = function() {
    console.log(this.a, this.d);
}
obj3.b.c()

function Father() {
    this.name = 'kel'
}
Father.prototype.say = function(){
    console.log(`im ${this.name}`)
}
function Son() {
    this.name = 'keke'
}
Son.prototype = Object.create(Father.prototype)
let s = new Son()
s.say()