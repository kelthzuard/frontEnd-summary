// 思路：all返回一个promise，对于每一个数组中的promise，调用其then拿到返回结果后，添加到数组中。如果全部完成，调用返回promise 的resolve

Promise.myAll = function(pArr) {
    const n = pArr.length
    let count = 0
    let result = new Array(n)
    return new Promise((resolve, reject) => {
        pArr.forEach((promise, index) => {
            if (promise instanceof Promise) {
                promise.then(value => {
                    result[index] = value
                    count ++
                    if (count === n) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            }
            else {
                result[index] = promise()
                count ++
                if (count === n) {
                    resolve(result)
                }
            }
        })
    })

}

function func(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n)
        }, n*1000)
    })
}

Promise.myAll([() => 0 ,func(3), func(1), func(2)]).then(v => {
    console.log(v)
})