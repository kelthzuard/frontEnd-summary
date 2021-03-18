# typeof

typeof对于五种基本类型返回对应的类型

- typeof 1 === 'number'
- typeof 'asd' === 'string'
- typeof u === 'undefined'
- typeof true === 'Boolean'
- typeof Symbol() === 'symbol'

对于基本数据类型null返回object

- typeof null === 'object'

对于函数类型返回function

- typeof function(){} === 'function'

对于剩余的类型全部返回object

- typeof [1,2,3] === 'object'
- typeof {} === 'object'
- typeof new Date() === 'object'
- typeof /regex/ === 'object'

对于三种包装类型都返回'object'

- typeof new Number(1) === 'object'
- typeof new String('abc') === 'object'
- typeof new Boolean(false) === 'object'

对于用new操作符生成的除了function全部返回object, 其余返回function.

- typeof new Person() === 'object'
- typeof new Function() === 'function'

# instanceof

```
obj instanceof constructor
```
判断实例obj是不是在构造函数constructor的原型链上。
```
var Person = function(name) {
    this.name = name;
}
var Teacher = function(name) {
    Person.call(this,name);
}
Teacher.prototype = new Person();
var t = new Teacher('kel')
console.log(t instanceof Teacher) // true
console.log(t instanceof Person) // true
console.log(t instanceof Object) // true
console.log(new Function() instanceof Function) // true
```

# 通用方法 Object.prototype.toString.call()

注意输出的后面object后面记得跟大写。

```
console.log(Object.prototype.toString.call([1,2,3]) == '[object Array]')
console.log(Object.prototype.toString.call(new Date) == '[object Date]')
console.log(Object.prototype.toString.call('asd') == '[object String]')
console.log(Object.prototype.toString.call({}) == '[object Object]')
console.log(Object.prototype.toString.call(1) == '[object Number]')
console.log(Object.prototype.toString.call(null) == '[object Null]')
console.log(Object.prototype.toString.call(undefined) == '[object Undefined]')
console.log(Object.prototype.toString.call(NaN) == '[object Number]')
```

# 判断NaN

- NaN和所有值对比都是不等，包括他自己
- 可以用isNaN来判断一个值是不是NaN

```
console.log(isNaN(NaN)) //true
console(NaN == NaN) // false
```