# less

## 变量

less中使用@来申明变量。多个申明的变量以最后一个为准,有内部作用域，以最内部的为准

```
@width: 200px;
.head {
    width: @width
}
```

## 嵌套

```
.head {
    .headChild{

    }
}
```

## 混入

```
.less-mixin(@width:100px,@height:100px, @color:red) {
    width: @width;
    height: @height;
    color: @red;
    float: left;
}
.div1 {
    .less-mixin(200px, 200px, yellow)
}
.div2 {
    .less-mixin()
}
```

## 继承

继承和混入很像，但是不同的是不能传参，会继承目标的所有样式，并且拥有相同继承的会合并样式，压缩代码量。

```
.less-mixin {
    color: red;
}
.div1 {
    &:extend(.less-mixin)
}
.div2 {
    $:extend(.less-mixin)
}
```

编译后

```
.div1, div2 {
    color: red;
}
```

## 计算,函数

less语法支持计算，相当于calc

```
@width: 100px;
@height: @width + 10px;
```

提供了很多内置函数

- ceil
- floor
- isnumber
- iscolor