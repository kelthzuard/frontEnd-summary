1. 函数中的this

函数中的this取决于函数执行的上下文
- 在全局上下文时this在非严格模式下指向全局对象，在严格模式下为undefined
- 可以用call，apply，bind改变函数体的this指向，注意bind执行多次无效，只有第一次有效。
```
function func() {
    console.log(this == global); // true函数体内this指向全局
    return this;
}
console.log(func() == global) // true
var obj = {
    val: 1,
    method: function() {
        console.log(this.val)
    }
}
obj.method() // 调用对象为类方法，this指向obj
var b = obj.method;
b() // b指向obj.method的引用，b调用时确定this，执行上下文为全局。
```

2. 箭头函数
- 箭头函数的this在第一次生成时绑定上下文中的this，并且不会再改变。
```
var obj2 = {
    m: function() {
        return function() {
            return this; 
        }
    },
    n: function() {
        return (() => this)
    }
}
var f = obj2.m()
console.log(f() == global) // 输出true，因为执行环境上下文为全局
var f1 = obj2.n()
console.log(f1() == obj2) //输出true，为obj2，因为在执行obj2.m()时就生成了箭头函数，此时箭头函数的this绑定到obj2
var f3 = obj2.n;
console.log(f3()() == global) //输出true，因为这里只拿到了函数引用，真正生成箭头函数是最后执行的时候，所以this绑定上下文global.
```

3. 对象方法

- 通过对象调用对象方法一定会this绑定对象，无论这个方法是一开始就有还是后面添加的。
- 如果有多个对象链式调用，则this指向最近的对象内的值。
```
var obj3 = {
    a: 1,
    d: 2
}
obj3.b = {a: 2}
obj3.b.c = function() { //即使c没有在原始定义中，后面加上去也是相同的效果。
    console.log(this.a, this.d); //输出2，undefined
}
obj3.b.c() // c函数执行时会绑定this到最近的调用对象，即b
```

4. 原型链方法
- 如果一个方法在原型链上，则其this指向调用他的对象，无论这个对象有没有这个方法或者是从原型链中继承下来的方法。
```
function Father() {
    this.name = 'kel'
}
Father.prototype.say = function(){
    console.log(`im ${this.name}`)
}
function Son() {
    this.name = 'keke'
}
Son.prototype = Object.create(Father.prototype)
let s = new Son()
s.say() //输出im keke。say方法Son从原型链向上找到Father的方法，调用时this指向调用的对象Son。
```

5. setTimeout和setInterval内部回调函数this指向全局。

6. html事件处理回调函数中，回调函数的this指向触发事件的元素
```
function processClick(e) {
    console.log(this == e.target) // true
}
element.addEventlistener('click', processClick)
```