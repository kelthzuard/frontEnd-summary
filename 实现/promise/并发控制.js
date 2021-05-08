class Control{
    constructor(pList, limit) {
        this.pList = pList
        this.limit = limit
        this.total = this.pList.length // 用来记录应该完成多少，因为可以添加，所以不确定
        this.finished = 0 // 用来记录完成了多少，用来确定结束时间
        this.process = 0 // 用来记录当前应该存储的数组位置
        this.curP = 0 // 用来记录现在在并发的promise
        this.res = []
        return new Promise((resolve, reject) => {
            this.init(resolve)
        })
    }
    init(resolve) {
        for (let i = 0; i < this.limit; i ++) {
            this.run(resolve) // 先开启limit个并发执行
        }
    }
    run(resolve) {
        if (this.curP > this.limit) return //超过并发返回 
        if (this.finished === this.total) { // 完成数等于总数，结束
            resolve(this.res)
            return
        }
        if (this.pList.length === 0) return // 全部执行但并为返回，跳出
        let p = this.pList.shift()
        let pIndex = this.process
        this.process ++
        this.curP ++
        p()
        .then(res => {
            this.res[pIndex] = res
        })
        .catch(e => {
            this.res[pIndex] = e
        })
        .finally(() => {
            this.curP -- 
            this.finished ++
            this.run(resolve)
        })
    }
    add(p) {
        this.pList.push(p)
        this.total ++
    }
}

function timeout(delay) {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`this promise ${delay} has finished`)
                resolve(delay)
            }, delay)
        })
    }
}

var plist = [timeout(5000), timeout(100), timeout(600), timeout(200), timeout(1000)]
new Control(plist, 2)
.then(r => {
    console.log(r)
})