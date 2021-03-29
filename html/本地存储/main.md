# cookies

- cookies始终在同源的http请求中携带。
- cookies只能存储4kb以下的内容。
- cookies会在设定的保持时间之后过期。

```
document.cookie = "test1=Hello";
document.cookie = "test2=World";

var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");

alert(myCookie);
```

## cookie 和 session的概念

session是存储在服务端中为了追踪用户状态的字段。常常用一个sessionID代表用户。
为了实现这种状态追踪，常常需要前端cookie每次发送请求携带cookie，cookie中存储用户的sessionid
如果用户禁用cookie，则要考虑在url参数带上?sessionid=xxx来实现状态追踪。

# webStorage

## localStorage

- localStorage会一直存储，直到手动删除
- localStorage不会被发往服务器，只会本地调用
- localStorage在所有同源窗口中共享，不在不同源的窗口中共享，出于安全的考虑。
- localStorage每个域维护一个5M的空间，不同域不共享。

```
window.localStorage.setItem('userName', 'kel');
console.log(window.localStorage.userName);
```

问题：当localStorage满了怎么办

方案：

- 线上建立一个存储页面并指定url
- 其他页面要进行存储时以iframe的形式加载
- 通过postMessage和iframe双向通信，iframe进行存储

```
// 存储页面 https://store.html
<script>
(function(document, window) {
    window.addEventListener('message', function(e) {
        if (e.source != window.parent) {return} //如果不是从iframe的界面传入的，则放弃
        var data = JSON.parse(e.data)
        if (data.type == 'get') {
            e.source.postMessage(JSON.stringify(window.localStorage.getItem(data.name))), '*')
        }
        else {
            window.localStorage.setItem(data.type, data.name)
        }
    })
})(document, window);
</script>
```
```
// 调用页面
<iframe id="store" width="0" height="0" src="https://store.html"></iframe>
<script>
var iframe = document.querySelector('#store')
iframe.contentWindow.postMessage(dat
a, '*')
</script>
```


## sessionStorage

- sessionStorage当关闭浏览器标签页时丢失
- 不在不同的浏览器窗口中共享，即使是同一页面
- 不会被发往服务器，只会本地调用。

# indexedDB

- indexedDB是一个事务型数据库，可在web workers中使用，能存储结构化的数据，图片，音频，视频等。