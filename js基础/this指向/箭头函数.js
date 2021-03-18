var obj = {
    val: 1,
    func: (v) => {
        console.log(this.val,v)
    }
}
obj.func(1)
obj.func.call(obj, 1)

var func = (a = 1) => {
    console.log(a)
}
func()
console.log(a)
var func1 = () => {
    b = 1
}
console.log(b)
var func2 = () => {
    var c = 1
}
console.log(c)