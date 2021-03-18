// 实现的核心点就是以下几点

// - 构造src => ```url?param=val&callback=callbackName```
// - 创造一个script标签 ```const node = document.createElement('script')```
// - body里插入script标签 ```document.appendChild(node)```
// - 用回调函数接受数据并处理。

const JSONP = ({url, param, callback}) => {
    const generateSrc = () => {
        let src = `${url}?`;
        for (let key in param) {
            src += `${key}=${url[key]}&`
        }
        src += `callback=${callback}`
        return src
    }
    return new Promise((resolve, reject) => {
        const script_node = document.createElement('script')
        script_node.src = generateSrc()
        document.body.appendChild(script_node)

        window[callback] = (data) => {
            resolve(data)
            document.body.removeChild(script_node)
        }
    })
}
JSONP({
    url: 'www.baidu.com',
    param: {
        name: 'kel',
        age: '1'
    },
    callback: 'getData'
})
.then((data) => {
    console.log(JSON.parse(data))
})