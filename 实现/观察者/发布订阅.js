class myEventEmitter {
    constructor() {
        this.event = {}
    }
    subscribe(name, callback) {
        if (!this.event.hasOwnProperty(name)) {
            this.event[name] = []
        }
        this.event[name].push(callback)
    }
    emit(name, ...args) {
        this.event[name].forEach(callback => {
            callback(...args)
        })
    }
    unSubscrible(name, callback) {
        for (let i = 0; i < this.event[name]; i ++) {
            if (this.event[name][i] == callback) {
                this.event[name].splice(i, 1)
            }
        }
    }
    once(name, callback) {
        if (!this.event.hasOwnProperty(name)) {
            this.event[name] = []
        }
        this.event[name].push((...args) => {
            callback(...args)
            this.unSubscrible(name, callback)
        })
    }
}

var eve = new myEventEmitter()

eve.subscribe('eat', (person) => {
    console.log(`${person} is eating`)
})

eve.subscribe('eat', (person) => {
    console.log(`${person} is eating again`)
})

eve.emit('eat', 'kel')