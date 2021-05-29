# buffer

buffer表示固定长度的字节序列  
buffer属于堆外内存，不属于v8的内存管理范畴。  
buffer在分配小于8kb时候，会将一个slab(预先分配好的固定大小的内存单元)的一部分指向他，标志起始和结束位置。  
在分配大于8kb的时候，会直接将一个slab分配给他。 

buffer支持将string和array的互相转换

```
const buf = Buffer.from('asd')
const s = buf.toString('utf-8')
```

```
const buf = Buffer.from([1,2,3,4])
const arr = Array.from(buf)
```

## buffer的基本操作

申请内存

```
const buf = Buffer.alloc(5)
const buf = Buffer.alloc(5, 'a', 'base64')
```

写入buffer

```
const buf = Buffer.alloc(5)
buf.write('abcd')
```

拼接  
拼合一个list中所有的buffer

```
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const buf = Buffer.concat([buf1, buf2, buf3])
```

```
const fs = require('fs')

const file = fs.createReadStream('./buffer.md')

var chunkList = []
file.on('data', function(chunk) {
    chunkList.push(chunk)
})

file.on('end', function() {
    chunkList = Buffer.concat(chunkList)
    console.log(chunkList)
})
```