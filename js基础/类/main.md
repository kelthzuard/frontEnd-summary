# 类
网址[https://zhuanlan.zhihu.com/p/137056910]

原始js方式中的类采用构造函数模式
- 如果指定了return的值的话，如果return的是对象或者函数，构造函数生成的实例会将this指向返回值。如果return的是null，数值，字符串，undefined，则构造函数this仍将指向构造函数本身。
```
function Animal(name) {
    this.name = name;
    this.type = new Array('dog','cat'); //引用类型比如数组这里不能用prototype去给静态值，要不然多个实例共享一个会导致值更改错误。
    if (typeof Animal._initialized == 'undefined') { //这里判断是不是第一次创建类赋予方法，保证只有第一次创建公共方法。
        Animal.prototype.eat = function() {
            console.log('eat');
        }
    }
}
```
```
// 实现继承
function dog(name, age) {
    Animal.call(this, name); //这种方法可以继承类属性，但不能继承类方法。
    this.age = age; // 子类的新属性。
}
dog.prototype = Object.create(Animal.prototype); // 继承类方法
// object.create(proto) 会创建一个新的对象，该对象的__proto__指向传入参数proto。和new proto()相区别的是该方法不会执行构造函数中的一些初始代码.
dog.prototype.constructor = dog;
// 重新创建了dog的prototype后，会导致dog.prototype.constructor = Animal;所以需要手动指向
```
```
// 实现组合继承
fucntion Dog(name) {
    this.name = name;
}
function Pet(age) {
    this.age = age;
}
function wildDog(name,age,color) {
    Dog.call(this, name);
    Pet.call(this, age);
    this.color = color;
}
wildDog.prototype = Object.create(Dog.prototype);
Object.assign(wildDog.prototype, Object.create(Pet.prototype));
// Object.assign(target, ...source) 用于将source的键值对属性添加到target中，相当于合并对象。
wildDog.prototype.constructor = wildDog;
```

es6中引入了class作为类机制。
1. 使用constructor进行类属性的定义。
2. 使用functionName(){}的方式定义类方法。
3. 使用static functionName(){}定义静态方法。
4. 使用extends进行继承，子类constructor中必须使用super()，可以在类方法中用super调用父类方法。
```
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
        super().eat();
        console.log('pop');
    }
}
```

## es6继承和非es6继承的区别

- es6 继承的本质是调用父构造函数并修改父构造函数实例的this来得到子类。所以必须先super()
- 对于非es6继承。```Child.__proto__ == Function.prototype```
- 对于es6继承 ```Child.__proto__ = Father```

## 调用new时候发生的事情

- 创建一个新对象，并将新对象的__proto__指向构造函数的prototype
- 将构造函数的this指向新对象并执行构造函数，并执行构造函数
- 得到返回的结果，如果是object，返回object。否则返回对象。

## new.target

只能用在构造函数中，返回new命令作用的那个构造函数，如果不是通过new命令作用，则返回undefined

- 用在判断是不是new调用的构造函数，不是的化抛出错误
- 用在继承类的父类中，父类只能作为继承，不能作为直接实例化。