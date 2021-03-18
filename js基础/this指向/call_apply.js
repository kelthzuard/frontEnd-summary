var arr = [
    { name: 'a' },
    { name: 'b' }
];
arr.forEach(obj => {
    (function() {
        console.log(this.name)
    }).call(obj)
});

var data = 1;
function print() {
    console.log(this.data);
}
print.call();

function list() {
    return Array.prototype.slice.call(arguments);
}
var a = list(1,2,3);
console.log(a)

var arr = [1,2,3];
var add = [4,5];
arr.push.apply(arr, add);
console.log(arr);
console.log(Math.max.apply(null,arr));