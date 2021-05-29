# stream

流是基于buffer封装的高级处理流式数据的接口  
流的原理是创建一块由highWaterMark控制大小的缓冲区，read流不停的向其中防止buffer，直到缓冲区满，write流在将其取出进行写入。  
流分为四个类型

- writeable
  - http请求中req，res
  - fs的写入流
  - tcp socket
  - 子进程stdin
- readable
  - http请求中的req，res
  - fs的读取流
  - tcp socket
  - 子进程stdout
- duplex可读可写的流
- transform读写过程中可以修改转换数据的流

- read流的事件
  - close
  - data
  - end
- write流的事件
  - close
  - pipe
  - error

## pipe

```readable.pipe(writeable)```  

pipe函数可以将read流接入到write流中，自动写入，并且可以链式调用。

```
const fs = require('fs')

const write = fs.createWriteStream('./generate.md')

const read = fs.createReadStream('./buffer.md')

read.pipe(write)

read.on('end', function() {
    console.log('done')
})
```