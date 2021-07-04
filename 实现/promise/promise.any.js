// Promise.any当有成功时立刻返回成功，否则返回所有失败的集合。这个集合是一个AggregaeError类

function any(pList) {
    let total = pList.length
    let count = 0
    let errList = new Array(total)
    return new Promise((resolve, reject) => {
        for (let i = 0; i < total; i ++) {
            pList[i].then(v => {
                resolve(v)
            }, e => {
                errList[i] = e
                count ++
                if (count === total) {
                    reject(new AggregateError(errList))
                }
            })
        }
    })
}