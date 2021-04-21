// 递归
Array.prototype.myFlatten = function() {
    let arr = []
    for (let val of this) {
        if (val instanceof Array) {
            Array.prototype.push.apply(arr, val.myFlatten()) //这里合并数组，或者concat
            //arr = [].concat(arr, val.myFlatten())
        }
        else {
            arr.push(val)
        }
    }
    return arr
}

Array.prototype.yourFlatten  = function() {
    let copy = [...this] //进行一层浅拷贝
    let arr = []
    while(copy.length) {
        let n = copy.shift()
        if (n instanceof Array) {
            Array.prototype.unshift.apply(copy, n)
        }
        else {
            arr.push(n)
        }
    }
    return arr
}

var arr = [1,[2,3], [4,[5,6]]]
console.log(arr.myFlatten())
console.log(arr.yourFlatten())