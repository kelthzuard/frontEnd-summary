function add(x, ...args) {
    return x + args.reduce((sum, cur) => {
        return sum + cur;
    }, 0);
}
console.log(add(1,2,3));

function test() {
    var a1 = Array.prototype.slice.call(arguments);
    var a2 = [].slice.call(arguments)
    var a3 = Array.from(arguments)
    console.log(a1, a2, a3)
}
test(1,2,3)

var t2 = (...args) => {
    console.log(args)
}

t2(1,2,3)