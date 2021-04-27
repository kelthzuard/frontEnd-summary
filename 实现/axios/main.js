class Axios{
    constructor() {}
    get(url, params={}) {
        return new Promise((resolve, reject) => {
            let sendUrl = `${url}?`
            for (let key in params) {
                sendUrl = `${sendUrl}${key}=${params[key]}&&`
            }
            let xhr = new XMLHttpRequest()
            xhr.open('GET', sendUrl)
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 || xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
                else {
                    reject(xhr.response)
                }
            }
            xhr.ontimeout = function() {
                reject('timeout')
            }
            xhr.onabort = function() {
                reject('onabort')
            }
            xhr.send()
        })
    }
}

const a = new Axios()

a.get('https://www.baidu.com')
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})