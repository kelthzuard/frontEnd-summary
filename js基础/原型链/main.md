# 原型链

![image](./img.png)

一共有三种原型链的成分在

1. prototype(显示原型):
prototype由函数所独有，由构造函数指向一个对象（原型对象）。这个对象包含了构造函数的实例对象可以找到公共方法和属性的地方。也就是说是一个宝库，构造函数把好东西拿到那里去，实例可以去取。
2. $__proto__$（隐式原型）:
$__proto__$是对象（包括函数）独有的，即从一个对象指向他的原型对象。所有的都来自于object.prototype.
3. constructor:
为prototype对象独有，实例可以继承其原型函数的constructor达到相同的效果。构造函数.prototype.constructor = 构造函数。所有的constructor最后都指向function。

常见应用

1. 构造函数实现继承：
子类的prototype指向父类的实例。
```
function Animal() {}
function Dog() {}
Dog.prototype = new Animal();
```
2. 使用instanceof判断类型，本质上是判断是否为某个构造函数的子类
```
if (arr instanceof Array) {} //true
```
3. 描述一个构造函数实例的生成过程。
1.生成对象实例。2.设置该对象的constructor到另一个对象。3.步骤一创建的对象作为this的上下文 4.返回this（如果返回对象则返回对象）
另一种说法：
1.创建一个this变量，该变量指向一个空对象，该对象继承原型。2.属性和方法被加入到this引用的对象中。3.返回this。
4. 实现链式调用。
在构造函数添加方法时返回this即可实现链式调用。
```
function Animal() {}
Animal.prototype.eat = function() {
    return this;
}
Animal.prototype.pop = function() {}
dog = new Animal();
dog.eat().pop();
```