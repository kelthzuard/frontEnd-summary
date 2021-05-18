# 其他问题

## 为什么react方法要bind this

因为JSX语法实际上是creatElement语法糖。react会把绑定在JSX的方法作为回调绑定在dom上。这样方法内部的this就变成window了。又因为react在严格模式下执行，this会被转换为undefined。