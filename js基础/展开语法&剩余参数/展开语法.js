console.log(...[1,2,3])
console.log(...'asd')

function add(x, y, z) {
    return x + y + z
}
console.log(add.apply(null, [1,2,3]))
console.log(add(...[1,2,3]))

var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [...arr1, ...arr2]
console.log(arr3)
arr1.push.apply(arr1, arr2);
console.log(arr1)
var arr4 = [...arr2];
arr2.pop()
console.log(arr4)

var obj1 = {
    a: 1,
    b: 2
}
var obj2 = {
    c: 3,
    d: 4
}
var obj3 = {...obj1, ...obj2}
console.log(obj3)
var obj4 = Object.assign(obj1, obj2);
console.log(obj4)