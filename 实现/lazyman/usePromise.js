class Lazyman {
    constructor() {
        this.cur = Promise.resolve()
    }
    sleep(timeout) {
        this.cur = this.cur.then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, timeout)
            })
        })
        return this
    }
    eat() {
        this.cur = this.cur.then(() => {
            return new Promise((resolve, reject) => {
                console.log('eat')
                resolve()
            })
        })
        return this
    }
}

const l = new Lazyman()

l.eat().sleep(1000).eat().sleep(4000).eat()