// 实现计时器，xms内没有resolve自动renject

Promise.prototype.setTimeout = function(timeout) {
    return new Promise ((resolve, reject) => {
        this.then(v => {
            resolve(v)
        })
        setTimeout(() => {
            reject('timeout')
        }, timeout)
    })
}

const request = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 5000)
    })
}

request().setTimeout(1000)
.then(v => {
    console.log(v)
})
.catch(e => {
    console.log(e)
})