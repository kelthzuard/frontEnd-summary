function getPro(n) {
    console.log(n)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n+1)
        }, 1000);
    })
}

function func(n) {
    console.log(n)
    return n + 1
}
function *asy(n) {
    n = yield getPro(n)
    n = yield getPro(n)
    n = yield func(n)
    n = yield getPro(n)
}

// 思路：
// async的原理是利用generator生成每一步的promise，再在这个promise的then里面调用下一步

function asyncToGenerator(geneFunc, arg) {
    let gene = geneFunc(arg) //拿到最初的generator实例
    return new Promise((resolve, reject) => { //async返回的是一个promise函数
        function step(type, arg) { // 这个方法代表await
            let r = gene[type](arg) // 拿到generator执行一步后的promise gen.next()
            if(!r.done) { //如果不是done就进行下一步，如果是done，就resolve，代表结束。
                if (r.value instanceof Promise) {
                    r.value.then(v => { // 这一步代表在当前promise成功后进行下一步
                        step('next', v)
                    })
                }
                else {
                    step('next', r.value)
                }
            }
            else {
                resolve(arg) //如果完成的话，返回上一次执行的结果。因为这个一次是undefined
            }
        }
        step('next', arg) //开始执行
        
    })
}

asyncToGenerator(asy, 0).then(v => {
    console.log(v)
})