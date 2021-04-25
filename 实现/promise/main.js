// 整体思路：
// 1： 初始状态pending，在resolve和reject的时候把state置为对应的状态，并且设置对应的成功value和失败reason
// 2： 执行传入的参数executor函数，传入resolve，reject
// 3： 定义then。then会返回一个promise，从而实现then的链式调用。该promise在合适的位置执行前一个then的回调函数，并且将结果resolve。从而实现能在
// 自己的then中拿到上一个then的回调函数的返回值。时刻记住then里传给回调函数的参数值来源于该promise的resolve的值
// 4： 该promise中如果是pending需要给callback数组添加注册函数，等resolve或者reject触发时再执行
// 5： 其他情况下如果是普通值拿到值以后resolve掉，如果是promise就执行递归执行promise.then，并把传入该then的回调函数的参数resolve掉


const PENDING = Symbol('pending')
const FULFILLED = Symbol('fufilled')
const REJECTED = Symbol('reject')
class myPromise{
    constructor(executor) {
        this.state = PENDING // 当前状态
        this.value = null // 
        this.reason = null
        this.callbacks = []
        let resolve = (value) => {
            this.state = FULFILLED
            this.value = value
            this.callbacks.forEach(fn => {
                fn()
            })
            // 如果callback数组不为空，立即执行，执行后立即执行回调函数并把回调函数的返回值在返回promise中resolve，从而调用返回promise的then
        }
        let reject = (reason) => {
            this.state = REJECTED
            this.reason = reason
            this.callbacks.forEach(fn => {
                fn()
            })
        }
        // 执行传入的函数
        try {
            executor(resolve, reject)
        }
        catch(error) {
            reject(error)
        }
    }
    then(onFullfiled, onRejected) {
        // 为了支持链式调用，需要返回一个promise。并且在这个promise中resolve回调函数的返回值。来实现链式then
        return new myPromise((nextResolve, nextReject) => {
            let result
            // 如果回调函数不是函数，创建一个返回参数的函数，来实现then不提供参数实现参数穿透的效果
            onFullfiled = typeof onFullfiled == 'function'?onFullfiled: v => v
            onRejected = typeof onRejected == 'function'?onRejected: err => { throw err }
            // 如果在pending状态，添加进回调数组
            if (this.state == PENDING) {
                this.callbacks.push(() => {
                    // 这里用setTimeout模拟事件机制的nextTick。因为then后面的操作是放在nexttick中的
                    setTimeout(() => {
                        try {
                            // 这里拿到回调函数的返回值
                            result = this.state == FULFILLED?onFullfiled(this.value):onRejected(this.reason)
                            this.handler(result, nextResolve, nextReject)
                        }
                        catch(err) { nextReject(err) }
                    }, 0);
                })
            }
            else {
                setTimeout(() => {
                    try {
                        result = this.state == FULFILLED?onFullfiled(this.value):onRejected(this.reason)
                        this.handler(result, nextResolve, nextReject)
                    }
                    catch (err) { nextReject(err) }
                }, 0);
            }
        })
    }
    handler(result, nextResolve, nextReject) {
        if (result instanceof myPromise) {
            // 如果回调函数返回promise，需要执行promise的then方法拿到返回的参数，直到返回的不是promise
            let t = result.then 
            t.call(result, v => {
                // 递归调用
                this.handler(v, nextResolve, nextReject)
            }, err => {
                nextReject(err)
            })
        }
        else { 
            // 如果不是promise，就直接resolve结果
            nextResolve(result)
        }
    }
}

new myPromise(function(resolve, reject) {
    setTimeout(() => {
        resolve(2)
    }, 1000)
}).then(v => {
    return new myPromise((resolve) => {
        console.log(v)
        setTimeout(() => {
            resolve(3)
        }, 1000)
    }).then((v) => {
        return new myPromise((resolve) => {
            console.log(v)
            setTimeout(() => {
                resolve(4)
            }, 1000)
        })
    })
}).then().then(v => {
    console.log(v)
})