// 思路：利用闭包特性把参数保存在一个数组中。在最后没有参数的调用（即最后哦一次调用中）执行函数
function cury(fn, ...args) {
    return function func() {
        if (arguments.length === 0) { // 如果没有参数是最后一次调用，执行函数
            return fn.apply(null, args)
        }
        else {
            args = [...args, ...arguments] // 由于闭包的特性导致一直可以访问到args，每次将参数进行合并。
            return func // 返回函数
        }
    }
}

function f(a, b, c) {
    return a + b + c
}

sum = cury(f)

console.log(sum(1)(2, 3)())