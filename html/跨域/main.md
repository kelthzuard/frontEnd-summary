# 跨域

- 同源策略由**域名，端口，协议**三者组成，任一一个不相同都处于不同的域中。
- 访问处于不同的域上的资源会被浏览器拦截。、

不允许跨域的请求

- cookie, localStorage, indexDB等本地存储
- DOM节点
- AJAX请求

允许跨域

- 图片视频
- script

## JSONP

- JSONP利用了script可以跨域的性质，设置script的来源为目标域，并且绑定回调函数，返回一个执行回调函数并携带数据的命令。
- JSONP的实现看 /实现/JSONP

实现的核心点就是以下几点

- 构造src => ```url?param=val&callback=callbackName```
- 创造一个script标签 ```const node = document.createElement('script')```
- body里插入script标签 ```document.appendChild(node)```
- 用回调函数接受数据并处理。

JSONP的缺点

- 只能使用get请求
- 无法捕获异常
- 其返回的js内容受后台控制，存在安全问题。

## CORS

- CORS提供一个额外的http头来告诉浏览器其被允许获得不同源的返回资源

CORS请求分两类

- 简单请求（不会触发预检请求）
  - GET,POST,HEAD
  - content-type只能为
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain
- 复杂请求（会触发预检请求）

- 当发送请求时，浏览器判断是不是复杂请求，如果是
- 向服务器发送一个```OPTIONS```的预检请求，内容包含
  - Access-Control-Request-Method: 这个字段表明了请求的方法
  - Access-Control-Request-Headers: 这个字段表明了这个请求的 Headers
  - Origin: 这个字段表明了请求发出的域
- 服务器在收到后返回如下字段
  - Access-Control-Allow-Origin: 能够被允许发出这个请求的域名，也可以使用*来表明允许所有域名；
  - Access-Control-Allow-Methods: 用逗号分隔的被允许的请求方法的列表；
  - Access-Control-Allow-Headers: 用逗号分隔的被允许的请求头部字段的列表；
  - Access-Control-Max-Age: 这个预检请求能被缓存的最长时间，在缓存时间内，同一个请求不会再次发出预检请求。
- 如果是简单请求，发送时会直接携带一个```origin```的头部字段
  - 因为对于跨域请求，浏览器自动不会携带cookie，所以需要手动开启
  - ```XHR.withCredentials = true```

## nginx

- 本地设立一个服务器反向代理到非同源服务器


## document.domin

- 在二级域名相同的情况下，设置为document.domin为其一级域名，则可实现跨域，还可以访问dom资源等
```
a.test.com
b.test.com
document.domin = 'test.com'
```

## websocket