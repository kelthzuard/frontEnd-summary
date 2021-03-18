var obj = {
    val: 1,
    func: function() {
        console.log(this.val)
    }
}
var not_bound_func = obj.func;
var bounded_func = not_bound_func.bind(obj);
bounded_func();

function add(arg1, arg2) {
    return arg1 + arg2;
}
var bounded_add = add.bind(null, 1);
console.log(bounded_add(2,3))
function list() {
    return Array.prototype.slice.apply(arguments);
}
var bounded_list = list.bind(null, 1);
console.log(bounded_list(2,3,4))

function Person(name) {
    this.name = name;
}
Person.prototype.say = function() {
    console.log(this.name);
}
Person.prototype.repeat = function() {
    setTimeout(function () {
        this.say();
    }.bind(this), 100);
}
var p = new Person('kel')
p.repeat()