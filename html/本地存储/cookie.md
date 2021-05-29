# cookie

cookie是服务器发送到浏览器并保存的一小块数据，不超过4kb  
cookie通常由 key=value ;key=value ;构成
```
document.cookie = `name=kel; expires=${new Date(Date.now() + 10*1000).toGMTString()}`
```

## expires/max-age

指定cookie的过期时间，如果不指定的话即为会话cookie，页面关闭就过期。

- expires：指定一个过期时间
- max-age：指定cookie存续的时间

两个都设置的情况下max-age优先级高。

## domain，path

指定cookie生效的域。

- domain：指定cookie生效的主域，对子域也生效
- path：指定cookie生效的子域，对主域不生效

## secure， httponly， sameSite

指定cookie安全性

- secure：只接受通过https发送的cookie
- httponly：只能由后端修改cookie，通过document.cookie修改的无效，可以防范xss读取cookie
- sameSite：不接受跨域cookie
  - None：可以跨域发送
  - strict：禁止跨站发送