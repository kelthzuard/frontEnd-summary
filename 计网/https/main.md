# https原理

https不是一套单独的协议，而是http over tls(transport layer secure)。该协议在tcp之上，http之下  
```mac -> ip -> tcp -> tls -> http```

## client hello

- client向服务端发送握手信息包含
  - client生成的随机数
  - client支持的加密算法

## server hello

- server向client发送握手信息包含
  - server生成的随机数
  - server选择的加密算法
- server向client发送自己的证书链签名
  - 证书是由ca签发的能证明服务端身份的信息包含
    - server的公钥
    - server的公钥颁发机构的信息
    - server证书过期时间
  - 证书链签名从ca根证书逐级往下进行签名。client持有所有ca的公钥，内置在浏览器中。
  - 证书链签名由ca机构制作，将证书链和证书链的散列用ca的私钥进行加密。
- client用自己持有的ca公钥对证书链进行逐一解密并进行散列验证。最终在证书中拿到server的公钥

## 密钥交换

- client根据不同的密钥交换算法，计算出一个密钥pre-master。发送往服务器
- 服务器根据pre-master，和server，client分别生成的两个随机数。计算出最终的对称密钥main-master
- client根据相同的原理计算出相同的main-master

## finish

- 客户端发送一个信息代表切换成对称密钥加密的状态，并且用对称密钥加密一个finish消息发送给服务端
- 服务端发送同样的两个信息给客户端
- 客户端和服务端确信对方拥有同样的对称密钥，握手结束

## 怎么防范中间人攻击

中间人攻击指一个中间实体拦截发送方和接收方的所有请求并进行伪造。最难以防范的地方在于可以拦截server端发送的公钥并替换成自己的公钥。解决方法有

- ca：ca的公钥是通过线下内置的方法内置在硬件和浏览器中。是完全可以授信的第三方，用于保障公钥的安全
- 数字签名。数字签名指将明文和明文的散列一起用私钥加密。这样接收方可以验证明文的散列是否等于明文，用于确认明文是否有被篡改过。