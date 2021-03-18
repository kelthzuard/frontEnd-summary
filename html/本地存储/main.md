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

# webStorage

## localStorage

- localStorage会一直存储，直到手动删除
- localStorage不会被发往服务器，只会本地调用
- localStorage在所有同源窗口中共享，不在不同源的窗口中共享，出于安全的考虑。

```
window.localStorage.setItem('userName', 'kel');
console.log(window.localStorage.userName);
```

## sessionStorage

- sessionStorage当关闭浏览器标签页时丢失
- 不在不同的浏览器窗口中共享，即使是同一页面
- 不会被发往服务器，只会本地调用。

# indexedDB

- indexedDB是一个事务型数据库，可在web workers中使用，能存储结构化的数据，图片，音频，视频等。