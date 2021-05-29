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