var Observer = require('./Observer.js')
var Watcher = require('./Watcher.js')

function Vm(data) {
    this.data = new Observer(data)
}

var vm = new Vm({
    name: 'kel',
    age: '24'
})

var watchKel = new Watcher(vm, 'name', function(val) {
    console.log('name was updated to ' + val)
})

vm.data.name = 'tom'
