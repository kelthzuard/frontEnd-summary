# 大文件上传

## 普通文件上传

### 客户端

1. 通过拿到input.fileList[0]拿到file
2. 通过构造formData，把数据append进去。
3. 设置content-type为multipart/form-data，通过post发送

### 服务端

1. koa设置koa-body插件使用formidable处理文件上传

## 普通文件上传显示进度条并取消

1. 前端监听xhr.onprogress,xhr.upload.onprogress
2. 通过计算e.loaded / e.total得到已经上传的和总共的百分比
3. 如果需要取消，调用xhr.abort()取消请求

```
xhr.onprogress = updatedProcess
xhr.upload.onprogress  = updatedProcess

const updatedProcess = (e) => {
  if (e.lengthComputable) {
      const per = e.loaded / e.total
      setWidth(per*100+'%')
  }
}
```

## 大文件上传

### 客户端

1. 通过file.slice(start, start+chunksize)将大file文件分离为大小为chunksize的chunkList
2. 通过添加标志这个文件的token，和这个chunk序列的index，加上chunk一起，并发把所有chunk发送上去。
3. 在使用promise.all接受到所有chunk发送成功后，向服务器发送merge请求，并把该文件的token和chunk的数量带上，代表将该文件的chunk合并

### 服务端

1. 在每次post接受到chunk进行重命名为 filename-token-index
2. 在收到merge请求后，创建合并文件的writestream，并对每个chunk建立readStream，再进行pipe写入。

```
// 客户端
    const creatChunk = (file, chunksize) => {
        let chunkList = []
        let chunkTotal = 0
        let start = 0
        while(chunkTotal < file.size) {
            let end = start + chunksize
            end = end > file.size?file.size:end
            const blob = file.slice(start, end)
            start += chunksize
            chunkTotal = end
            chunkList.push(blob)
        }
        return chunkList
    }
```
```
// 服务端
router.post('/upload', async (ctx) => {
    const fileToken = ctx.request.body.token
    const fileIndex = ctx.request.body.index
    const file = ctx.request.files.file
    const nextPath = path.resolve(__dirname, './upload') + '/' +fileIndex + '-' + fileToken
    fs.renameSync(file.path, nextPath)
    ctx.body = nextPath
})

router.post('/merge', async (ctx) => {
    const {token, chunkTotal} = JSON.parse(ctx.request.body)
    console.log(chunkTotal)
    let finalFile = path.resolve(__dirname, './final') + '/file' + token
    let writeStream = fs.createWriteStream(finalFile)
    var chunkIndex = 0
    function merge(){
        var fname = path.resolve(__dirname, './upload') + '/' + chunkIndex + '-' + token
        var readStream = fs.createReadStream(fname, {end: false})
        readStream.pipe(writeStream)
        readStream.on("end", function() {
            fs.unlink(fname, function(e) {})
            if (chunkIndex < chunkTotal - 1) {
                chunkIndex ++
                console.log(chunkIndex)
                merge()
            }
        })
    }
    merge()
    ctx.body = 'ok'
})
```

## 端点续传

### 客户端

1. 客户端为文件创建内容hash值。这个过程在webWorker中进行，不阻塞主引擎，并且通过postMessage和主js线程通信。
2. 客户端将内容hash上传至服务端，服务端检查已经上传了的切片，返回仍需上传的切片
3. 客户端将剩余的切片进行上传

### 服务端

1. 服务端将内容hash和index作为文件的唯一标志。
2. 当客户端请求时返回缺省的chunk index