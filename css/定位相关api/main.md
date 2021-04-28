# 尺寸和定位相关的api

## offsetTop, offsetLeft, offsetRight, offsetBottom

返回该元素相当于offsetParent的距离，offsetParent是最近的一个position不为static的父元素

## scrollTop

返回该元素滚动的距离，如果不能滚动返回0.可以使用window.scrollY返回窗口滚动的距离

## window.innerHeight window.innerWidth

视口的尺寸

## element.getBoundingClientRect()

- top,left,right,bottom 代表距离视口的距离
- width，height：元素的尺寸，包括滚动隐藏的部分。

