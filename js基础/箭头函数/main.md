# 箭头函数

## 没有this

箭头函数没有自己的this，在箭头函数被创建的时候会从他的作用域中向上寻找父级this，并绑定父级的this。

## 没有arguments

箭头函数的arguments是外围函数的arguments

## 不能通过new调用

JavaScript 函数有两个内部方法：[[Call]] 和 [[Construct]]。  
当通过 new 调用函数时，执行 [[Construct]] 方法，创建一个实例对象，然后再执行函数体，将 this 绑定到实例上。  
当直接调用的时候，执行 [[Call]] 方法，直接执行函数体。  
箭头函数并没有 [[Construct]] 方法，不能被用作构造函数，如果通过 new 的方式调用，会报错。  

## call，bind，allpy的第一个参数无效

没有this，也无法绑定this

## 没有原型(prototype), 没有super

不能通过new调用自然不会有原型和类的概念。