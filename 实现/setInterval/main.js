// 核心是利用对象引用timer，来取消setTimeout，可以利用闭包特性构造全局变量。因为在第一次执行就返回。所以必须用引用来取消settimeout
function myInterval(fn, delay, ...args) {
    const timer = {cancle: null}
    var color = 0
    function func() {
        timer.cancle = setTimeout(() => {
            color = fn(color)
            func()
        }, delay);
    }
    func()
    return timer
}

function light(color) {
    var list = ['green', 'yellow', 'red']
    console.log(list[color])
    color = (color + 1) % 3
    return color
}

function myCount(fn, a, b, ...args) {
    const timer = {cancle: null}
    function func(delay) {
        fn.apply(this, args)
        timer.cancle = setTimeout(func, delay, delay+b)
    }
    func(a + b)
    return timer.cancle
}

// var count = myCount(() => {console.log('1')}, 0, 500)

var timer = myInterval(light, 100, 0)
//clearTimeout(inter)
setTimeout(() => {
    console.log('a')
    clearTimeout(timer.cancle)
}, 1000)

