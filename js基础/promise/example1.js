

function requestData(url) {
    return new Promise((resolve, reject) => {
        resolve(url)
    })
}
list = ['1','2','3'];
list.reduce((prev, cur) => {
    return prev.then((url) => {
        return requestData(cur+url);
    }).then((val) => {
        // do something with the response
        console.log(val);
        return val;
    })
}, Promise.resolve('init_url'));