# 闭包

MDN定义

```
一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。
```

准确的理解是函数创建并存在，就会和他的外层建立闭包，可以访问上层的私有变量。直到销毁。关键在于函数存不存在，存在就会有。

1. 闭包最粗浅的理解就是在函数里返回函数。
2. 因为内部函数可以访问外部函数的作用域，所以返回的函数始终持有外部作用域变量的引用，并且外部函数的作用域不会被垃圾处理机制释放。
3. 在执行外部函数后内部函数被创建，此时内部函数的作用域绑定完成，但此时的内部函数尚未执行，所以内部函数的变量值尚未确定。
4. 闭包函数作用域的变量的任何改变都会导致闭包函数的重新执行，因此不要在类内部使用任何闭包函数。

```
function ex() {
    var a = 1
    return function() {
        console.log(a);
    }
}
var e = ex()
e(); // 即使e的执行环境是全局，但作用域里依然有a，可以正常输出。
```
   
例子
- 实现类的私有方法
```
var counter = (function(){
    var val = 0;
    return {
        increment: function() {
            val += 1;
        },
        get: function() {
            return val;
        }
    }
})(); //匿名函数的标准写法

counter.increment();
console.log(counter.get()); //外部无法访问val变量，但是可以通过返回的闭包方法
```

- 类方法的错误示范
如果将类方法挂载在构造器上，类方法会成为闭包绑定构造器的作用域，因此任何类属性的改变都会重新加载类方法，且每个新的实例都会创建新的类函数。
```
var Person = function(name) {
    this.name = name;
    this.say = function() {
        return this.name
    }
}
```

- 典型错误：在循环中使用闭包。
```
function loop() {
    var a = [1,2,3];
    var b = [];
    for (var i = 0; i < a.length; i ++) {
        b[i] = function() {
            console.log(i);
        }
    }
    return b;
}
var r = loop()
r[0]();
r[1]();
r[2]();
```
输出
```
3
3
3
```
因为在绑定b的成员函数时仅仅是生成了函数却没有执行，所以此时的函数作用域绑定到了loop中。而i是用var声明的，由于变量提升i始终存在于闭包的作用域中。所以在循环
执行结束以后，i已经变成了3，所以最后调用时全部输出3
修改的方法就是在绑定时改变闭包的作用域
```
function loop2() {
    var a = [1,2,3];
    var b = [];
    for (var i = 0; i < a.length; i ++) {
        b[i] = (function(val) {
            return function() {
                console.log(val); //这样每一个函数的作用域绑定到了匿名函数上，而匿名函数在每一个循环中立即执行赋予了一个确定的val
            }
        })(i);
    }
    return b;
}
var r2 = loop2()
r2[0]();
r2[1]();
r2[2]();
```
输出0，1，2

- 循环中使用setTimeout
```
function loop3() {
    var a = [1,2,3];
    for (var i = 0; i < a.length; i ++) {
        setTimeout(() => {
            console.log(i)
        }, 0);
    }
}
loop3()
```
输出 3,3,3
原理和闭包是一样的，因为不是立即执行函数，作用域绑定在loop3中，在队列结束后执行，i已经全部变为3了
解决方案，匿名函数立即执行绑定作用域。
```
function loop4() {
    var a = [1,2,3];
    for (var i = 0; i < a.length; i ++) {
        (function(val) {
            setTimeout(() => {
                console.log(val);
            }, 0);
        })(i)
    }
}
loop4()
```
输出 0,1,2