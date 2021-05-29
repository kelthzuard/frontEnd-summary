# 缓存机制

缓存机制主要分为三个部分

- http缓存
- 浏览器缓存
- DNS缓存

## http缓存

http缓存主要分三部分

- memory cache
- disk cache
- service worker

### memory cache

memory cache指存放在内存中的缓存资源，几乎所有的请求资源都能进入内存缓存中，内存缓存很小，并且会在当前tab关闭后消失。
内存缓存的优先级高于disk cache，在浏览器从内存缓存中拿取资源的时候，会忽视max-age=0,no-cache的头部参数，即一段时间内相同的资源不会加载两次，
除非设置no-store为true。

### disk cache（http cache）

硬盘缓存又叫http缓存，指缓存在硬盘中内容，是持久化存储的。命中缓存时从硬盘读取资源。
硬盘缓存分两种

#### 强缓存

当浏览器的请求满足强缓存的条件时，浏览器在缓存数据库中寻找，直接返回资源。不会发出请求。
强缓存的条件有

- expire: Thu, 10 Nov 2017 08:45:11 GMT
http1.0的字段，表示缓存到期的绝对请求，可能由于时间不统一导致混乱。

- cache-control
  - max-age: 259000 (缓存保持的最大时间，相对时间，毫秒数)
  - no-cache:  false (不走缓存，和max-age=0效果一致)
  - public: true (所有服务器都可缓存，包括代理服务器CDN)
  - private: false (只有客户端才能缓存)
cache-control是http/1.1的字段，优先级高于expire

#### 协商缓存

当时间超过设定的max-age阶段时，会进行协商缓存阶段。如果命中协商缓存，服务器直接返回304表示加载缓存并不返回任何数据，否则返回200并携带请求数据。

协商缓存由两个字段定义

- 浏览器第一次请求时服务端返回一个last-modified字段代表上一次修改的时间
- 浏览器将last-modified的指写入头字段if-modified-since中
- 服务器检查该值是否和服务端文件的last-modified相同，相同则返回304，否则返回

该字段为http/1.0，存在问题为如果文件为服务器动态生成，则总是需要更新，无论文件到底有没有变化。

- 浏览器第一次请求时服务端生成一个文件的特殊标识符Etag（比如文件名的哈希值），并返回存储该Etag
- 浏览器将Etag写入头字段If-None-matched。
- 服务器检查该文件名是否和请求文件名相同，相同则返回304，否则返回200并携带请求数据。

应用场景

1. 对于不常变化的资源，设定max-age为一个较大的数保持缓存
2. 对于常常变化的资源，设定no-cache: true 或者 max-age:0 使其快速更新。

- 针对 HTML 文件：不开启缓存，把 HTML 放到自己的服务器上，而不是 CDN 服务上，同时关闭自己服务器上的缓存。自己的服务器只提供 HTML 文件和数据接口。
- 针对静态的 JavaScript、CSS、图片等文件：开启 CDN 和缓存，上传到 CDN 服务上去，同时给每个文件名带上由文件内容算出的 Hash 值， 例如上面的 app_a6976b6d.css 文件。 带上 Hash 值的原因是文件名会随着文件内容而变化，只要文件发生变化其对应的 URL 就会变化，它就会被重新下载，无论缓存时间有多长。

## 浏览器缓存

- cookie:手动设置过期时间，否则关闭tag时清除```document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";```
- localstorage：持久保存5M
- sessionstorage：tag关闭时清除。

## 针对html文件缓存

为了防止html文件被强缓存导致无法更新，可以在htmlmeta标签中添加cache-control禁止缓存
```
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
```