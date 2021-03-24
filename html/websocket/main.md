# websocket

websocket是基于tcp协议的应用层协议，复用http的握手通道。

websocket流程如下

1. 客户端通过发送一个get的http协议来申请升级协议到websocket
```
GET / HTTP/1.1
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade //表示升级协议
Upgrade: websocket //表示升级协议为websocket
Sec-WebSocket-Version: 13 //升级的websocket版本
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw== //加密的key，用来提供基本的防护
```

2. 服务端返回相应协议升级

```
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
```
Sec-WebSocket-Accept通过Sec-WebSocket-Key计算出来
- 和一个hash值拼接
- 在hash一遍生成摘要

3. 加密

所有从客户端到服务端的数据都进行了加密操作。加密操作是一种掩码操作。
通过将数据荷载利用掩码键（客户端选出来的32位随机数）进行掩码操作。

4. 数据分片

报文头中使用```FIN```字段来指示该消息是否位整个消息的最后一个消息。
```FIN=1```表示是消息是最后一个消息。

5. 用心跳保持连接

对于长时间没有发送消息的连接。需要心跳来保持连接即
- 发送方发送```'ping'```
- 接收方发送```'pong'```

实际操作上发送方发送opcode为```0x9```,接收方发送opcode为```0xA```的数据帧来完成

## Sec-WebSocket-Key/Accept的作用

- 避免服务端收到非法的websocket连接（比如http客户端不小心请求连接websocket服务，此时服务端可以直接拒绝连接）
- 确保服务端理解websocket连接。因为ws握手阶段采用的是http协议，因此可能ws连接是被一个http服务器处理并返回的，此时客户端可以通过Sec-WebSocket-Key来确保服务端认识ws协议。
- 用浏览器里发起ajax请求，设置header时，Sec-WebSocket-Key以及其他相关的header是被禁止的。这样可以避免客户端发送ajax请求时，意外请求协议升级
- Sec-WebSocket-Key主要目的并不是确保数据的安全性，因为Sec-WebSocket-Key、Sec-WebSocket-Accept的转换计算公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况（非故意的）

## 数据掩码的作用

### 代理缓存污染攻击

#### 攻击阶段一

- 攻击者浏览器 向 邪恶服务器 发起WebSocket连接。根据前文，首先是一个协议升级请求。
- 协议升级请求 实际到达 代理服务器。
- 代理服务器 将协议升级请求转发到 邪恶服务器。
- 邪恶服务器 同意连接，代理服务器 将响应转发给 攻击者。

由于 upgrade 的实现上有缺陷，代理服务器 以为之前转发的是普通的HTTP消息。因此，当协议服务器 同意连接，代理服务器 以为本次会话已经结束。

#### 攻击阶段二

- 攻击者 在之前建立的连接上，通过WebSocket的接口向 邪恶服务器 发送数据，且数据是精心构造的HTTP格式的文本。其中包含了 正义资源 的地址，以及一个伪造的host（指向正义服务器）。（见后面报文）
- 请求到达 代理服务器 。虽然复用了之前的TCP连接，但 代理服务器 以为是新的HTTP请求。
- 代理服务器 向 邪恶服务器 请求 邪恶资源。
- 邪恶服务器 返回 邪恶资源。代理服务器 缓存住 邪恶资源（url是对的，但host是 正义服务器 的地址）。

#### 攻击阶段三

- 受害者 通过 代理服务器 访问 正义服务器 的 正义资源。
- 代理服务器 检查该资源的url、host，发现本地有一份缓存（伪造的）。
- 代理服务器 将 邪恶资源 返回给 受害者。

在有了掩码加密的方案以后，做出攻击的成本就很大，需要实现自己的websocket协议。

## websocket客户端代码

```
const wb = new WebSocket('ws://www.baidu.com')
wb.onopen = (e) => {
    console.log(wb.readyState)
}

wb.onmessage = (data) => {
    console.log(data)
}

wb.send(data)
```