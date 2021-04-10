console.log('start')
setTimeout(() => {
    console.log('timeout1')
    setTimeout(() => {
        console.log('timeout3')
    })
    Promise.resolve().then(() => {
        console.log('promise1')
    })
}, 0)

setTimeout(() => {
    console.log('timeout2')
    setTimeout(() => {
        console.log('timeout4')
    })
    Promise.resolve().then(() => {
        console.log('promise2')
    })
})
console.log('end')