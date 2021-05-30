# 登录验证的方式

## cookie && session

- 用户发送用户名密码到服务端（这里可以不用被加密，tls满足需求）
- 服务端验证用户名密码，并生成一个session。一个session由一个sessionId和一个记录过期时间，用户信息的数据组成。
- session信息可以记录在内存中，也可以持久化记录在redis和或数据库中
- 服务端将sessionId记录在cookie中返回，或者直接返回
- 前端可以将sessionId放置在localstorage或者cookie中
- 在每次提交请求时将sessionId放在cookie或者header中
- 服务端在收到sessionId后可以进行过期验证

缺点

- 服务端存储了大量session信息，维持状态，可能造成服务器压力
- 如果在cookie中存放sessionId，可能会造成csrf攻击
- 集群无法共享session信息
- 移动端没有cookie就不能用

## token && JWT(JSON Web Token)

jwt是一种约定的指明用户通行凭证的数据格式，由以下组成

- header
  - 指明签名算法，和类型，固定为JWT，用base64转换为字符串
- payload
  - 指明要携带的数据，如用户名，过期时间等，用base64转换为字符串
- signature
  - 将前两部分拼接并加上服务端密钥，并用指定加密算法加密后的签名

流程

- 用户发送用户名密码到服务端
- 服务端验证，并生成一个JWT返回
- 客户端在localstorage中存储JWT
- 客户端在每次请求中，在头部中带上 ```Authorization: Bearer <token>```
- 服务端验证签名是否正确，如果正确则通过

优点

- 服务端无状态，只需要验证，不需要做额外存储
- 防止csrf攻击

## auth 2.0

- 用户访问客户端，客户端将用户导向认证服务器。
- 用户选择是否给予客户端授权。
- 假设用户给予授权，认证服务器将用户导向客户端事先指定的"重定向URI"（redirection URI），同时附上一个授权码。
- 客户端收到授权码，附上早先的"重定向URI"，向认证服务器申请令牌。这一步是在客户端的 后台服务器 上完成的，对用户不可见。
- 认证服务器核对了授权码和重定向URI，确认无误后，向客户端发送访问令牌（access token）和更新令牌（refresh token）。

https://juejin.cn/post/6844903833882066958
