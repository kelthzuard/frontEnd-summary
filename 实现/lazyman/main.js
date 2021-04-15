// 设计一个lazyman类，能实现 lazyman.eat().sleep(1000).say().sleep().eat()

//使用date

function Lazyman() {}

Lazyman.prototype.eat = function() {
    console.log('im eating')
    return this
}

Lazyman.prototype.say = function() {
    console.log('say something')
    return this
}

Lazyman.prototype.sleep = function(time) {
    const now = +new Date()
    while(new Date() - now < time) {}
    return this
}

var lz = new Lazyman()
//lz.eat().sleep(1000).say().sleep(1000).eat()

// 使用队列

function Lazygirl() {
    this.queue = []
    setTimeout(() => {
        this.run()
    }, 0);
}

Lazygirl.prototype.eat = function() {
    const fn = () => {
        console.log('im eating')
        this.run()
    }
    this.queue.push(fn)
    console.log('eat')
    return this
}

Lazygirl.prototype.say = function() {
    const fn = () => {
        console.log('say somthing')
        this.run()
    }
    this.queue.push(fn)
    console.log('say')
    return this
}

Lazygirl.prototype.sleep = function(time) {
    const fn = () => {
        setTimeout(() => {
            console.log('im waiting')
            this.run()
        }, time);
    }
    this.queue.push(fn)
    console.log('sleep')
    return this
}

Lazygirl.prototype.run = function() {
    if(this.queue.length) {
        const fn = this.queue.shift()
        fn()
    }
}

var lr = new Lazygirl()
lr.eat().sleep(1000).say().sleep(1000).eat()