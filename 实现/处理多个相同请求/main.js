function sendRequest(times) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(times)
        }, times*1000);
    })
}

let times = 0

function checkValidate(value, curTimes) {
    let isval = times === curTimes
    return {
        isval,
        value
    }
}

function orderRequest(tiems) {
    times ++
    const t = times
    sendRequest(tiems)
    .then(v => {
        return checkValidate(v, t)
    })
    .then(({value, isval}) => {
        if (isval) {
            console.log(value)
        }
    })
}

orderRequest(5)
orderRequest(2)
orderRequest(1)