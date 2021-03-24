# BFC（块级格式化上下文 block formatting context）

BFC会创建一个单独的布局容器，容器会脱离正常文档流，容器内的元素不会影响外界元素。BFC内有自己的排列规则

会创建BFC的操作

- float: left,right,auto
- postion: 除了relative,static以外的，包括absolute,fixed
- display:tabel-cell,inline-block,flex,grid
- overflow:hidden,scoll,auto 除了visible

BFC特性

- BFC内部的元素会产生外边距重叠
- BFC内部的元素不会影响到外部元素
- BFC内部浮动元素会撑起高度
- BFC的区域不会与float box重叠

用例：

1. 解决浮动使父元素坍塌的问题

给父元素创建BFC，使浮动元素撑起父元素

```
.father{
    overflow: hidden;
}
.child{
    width: 100px;
    heigh: 100px;
    float: left;
}
```

2. 两栏自适应布局

固定宽度的设置为BFC，另外一个设置为float

```
.fix{
    width: 100px;
    height: 100px;
    overflow: hidden;
}
.justify{
    heigh: 100px;
    float: left;
}
```

3. 防止外边距重叠

给父元素任一元素的父元素设置为bfs

```
.ele1 {
    width: 10px;
    heigh: 10px;
    margin-bottom: 10px;
}
.ele_father {
    overflow: hidden;
}
.ele2 {
    width: 10px;
    height: 10px;
    margin-top: 10px;
}
```