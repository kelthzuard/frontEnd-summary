var Person = function(name) {
    this.name = name;
}
var Teacher = function(name) {
    Person.call(this,name);
}
Teacher.prototype = new Person();
var t = new Teacher('kel')
console.log(t instanceof Teacher)
console.log(t instanceof Person)
console.log(t instanceof Object)

console.log([1,2,3] instanceof Array)
console.log('str' instanceof String)
console.log(new Date() instanceof Date)
console.log(new Function() instanceof Function)