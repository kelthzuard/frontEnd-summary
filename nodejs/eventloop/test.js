const https = require('http')

https.request({
    hostname: 'www.baidu.com',
    port: 443,
    method: 'GET'
}, res => {
    console.log(res.statusCode)
})