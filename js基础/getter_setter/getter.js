var obj = {
    val: 1,
    get getVal() {
        return this.val
    }
}
console.log(obj.getVal)
Object.defineProperty(obj, "getVal2", {get: function() {return this.val+1}});
console.log(obj.getVal2)
var temp = 'getVal3'
var obj2 = {
    get [temp]() {
        return 4
    }
}
console.log(obj2.getVal3)

var obj3 = {
    get important() {
        // 进行复杂的计算
        delete this.important;
        return this.important = 1
    }
}
console.log(obj3.important)