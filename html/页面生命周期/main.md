# 页面生命周期

## DOMContentloaded

浏览器完全加载了HTML，DOM树已经完全构建完毕，图片和css可能没有加载完毕。  
在加载资源的过程中js会阻塞渲染线程的执行。而使用defer和async会避免这种情况。  
这两者的区别在于defer加载完后才会触发DOMContentLoaded，而async不会有明确的限制。  
一般使用document来监听

```
document.addEventListener('DOMContentLoaded', handler)
```

## onload

当所有图片和css的加载完成后会触发onload。使用window监听

```
window.onload = function() {}
```

## onbeforeunload

当用户即将离开窗口或者关闭窗口时触发。  
可以用来保存一些数据到localStorage中。

```
window.onbefureunload = function() {}
```