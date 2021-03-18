class Animal {
    constructor(name) {
        this.name = name;
    }//没有逗号
    static say(){
        console.log('animal');
    }
    eat(){
        console.log('eat');
    }
}
class Dog extends Animal{
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    pop(){
        super.eat();
        console.log('pop');
    }
}

d = new Dog('dog','white');

function Person(name) {
    this.name = name;
    Person.prototype.eat = function() {
        console.log('eat');
    }
}
function Man(name, age) {
    Person.call(this, name);
    console.log(this.name)
    this.age = age;
}
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;
let m = new Man('kel', 21);
console.log(m.name, m.age)
m.eat()