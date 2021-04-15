const sleep_promise = function() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
}

sleep_promise().then(() => {
    console.log('1s has passed')
})

function* sleep_generator() {
    yield new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
}

sleep_generator().next().value.then(() => {
    console.log('1s has passed')
})

const sleep_settimout = function(cb) {
    setTimeout(cb, 1000)
}

sleep_settimout(() => {
    console.log('1s has passed')
})

const sleep_date = function(cb) {
    const now = +new Date
    while(new Date - now <= 1000) {}
    cb()
}

sleep_date(() => {
    console.log('1s has passed')
})