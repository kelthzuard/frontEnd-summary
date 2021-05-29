const fs = require('fs')

const write = fs.createWriteStream('./generate.md')

const read = fs.createReadStream('./buffer.md')

read.pipe(write)

read.on('end', function() {
    console.log('done')
})