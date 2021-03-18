# call

```
function.call(thisArg, arg1, arg2, ...);
```

1. call将立即调用函数function，并且将函数体内部的this指向thisArg
2. 如果不传入thisArg参数，将this绑定至全局，在严格模式下，this为undefined

例子：
1. 类继承
```
function Person(name) {
    this.name = name;
}
function Teacher(name, age) {
    Person.call(this, name);
    this.age = age;
}
```
2. 执行匿名函数
```
var arr = [
    { name: 'a' },
    { name: 'b' }
];
arr.forEach(obj => {
    (function() {
        console.log(this.name)
    }).call(obj);
});
```
3. 不传入thisArg参数
```
var data = 1;
function print() {
    console.log(this.data);
}
print.call();
```

4. 参数转换为数组
```
function list() {
    return Array.prototype.slice.call(arguments); // arguments是非箭头函数自带的局部变量，代表传入参数。是一个类数组对象，不是真正的数组。
}
```

# apply

```
function.apply(thisArg, [arg1, arg2, arg3,,,])
```

1. apply与call基本类似，只是传入一个数组参数而非一系列参数。

用法
1. 实现concat
```
var arr = [1,2,3]
var add = [5,6]
arr.push.apply(arr, add)
// 直接修改原数组，和concat一样，只是concat返回新数组。
```

2. 返回数组中的最值
```
var arr = [1,2,3,4];
var max = Math.max.apply(null, arr); // 等同于 Math.max(1,2,3,4)
```

# bind

```
function.bind(thisArg, arg1, arg2);
```

1. bind函数返回一个原函数的拷贝，并将thisArg绑定到函数的this
2. arg1如果不为空，将被预置到绑定函数的参数中。
3. bind和箭头函数不同是使用，是实现同一目标的不同方法。
4. bind第一次生效后后面都无法更改，bind只生效一次。

用法
1. 创建绑定函数
```
var obj = {
    val: 1,
    func: function() {
        console.log(this.val)
    }
}
var not_bound_func = obj.func; //此时的函数this指向window，所以执行输出undefined
var bounded_func = not_bound_func.bind(obj); //此时函数绑定this到obj，输出1
bounded_func();
```

2. 给函数加入内置默认参数
```
function add(arg1, arg2) {
    return arg1 + arg2;
}
var bounded_add = add.bind(null, 1); // 加上默认参数1
console.log(bounded_add(2,3)) // 只会接受第一个参数2，实际参数为（1，2），返回3
function list() {
    return Array.prototype.slice.apply(arguments);
}
var bounded_list = list.bind(null, 1); // 绑定默认参数1
console.log(bounded_list(2,3,4)) // 返回[1,2,3,4];
}
```

3. setTimeout中使用
setTimeout中this会指向window，使用bind重新指定this
```
function Person(name) {
    this.name = name;
}
Person.prototype.say = function() {
    console.log(this.name);
}
Person.prototype.repeat = function() {
    setTimeout(function () {
        this.say();
    }.bind(this), 100); // 注意绑定的位置，不是绑定在settimeout后面，而是回调函数后面。
}
var p = new Person('kel')
p.repeat()
```