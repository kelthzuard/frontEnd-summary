Promise.myRace = function(pArr) {
    return new Promise((resolve, reject) => {
        pArr.forEach(promise => {
            if (promise instanceof Promise) {
                promise.then(value => {
                    resolve(value)
                }, err => {
                    reject(err)
                })
            }
            else {
                resolve(promise())
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

Promise.myRace([() => 0, func(1), func(2), func(3)]).then(r => {
    console.log(r)
})