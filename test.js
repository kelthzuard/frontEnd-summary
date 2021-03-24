function a() {
    this.va = 'va'
}
a.prototype.ap = 1

function b() {
    this.vb = 'vb'
}

b.prototype = new a()

let B = new b()

console.log(b.__proto__)