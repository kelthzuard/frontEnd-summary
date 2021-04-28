# 懒加载

懒加载涉及以下几个方面

## 懒加载占位图选择，如果防抖

对于每种尺寸的图片，设置一个固定的小图作为占位图。  
对于在实际显示的位置，通过一个container把图片包裹住。并且将图片设置为自动占满。  
外层container通过设置padding-bottom设置为长宽比例固定自适应。  
这样对于每一种比例的图片，无论他的实际尺寸多少，都可以通过定义好的占位图进行占位。并且不会有抖动。

## 实现思路

1. 原生方法
   1. 通过data-src设置图片路径，src设置占位图路径
   2. window监听scroll，并节流
   3. 每次触发函数拿到所有```src[data-src]```的节点，并且通过```getBoundingClientRect()```拿到距离视窗的高度。如果小于```window.innerHeight```，将src替换为data-src，删除data-src属性
   4. 如果拿不到节点，说明结束，删除事件监听。
2. 通过IntersectionObserver监听元素是否进入视窗内。
3. vue directive实现懒加载指令。bind方法通过传入参数绑定，insert方法进行scroll监听绑定。详情见lazyLoad.js