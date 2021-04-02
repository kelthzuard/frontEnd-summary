# 前端动画

## js控制

- 使用setInterval循环控制属性，一般设置timeout为16ms，为肉眼认为流程的最低帧率
- js控制的方式会产生大量的回流和重绘，严重影响性能

```
(function() {
    var margin = 0
    setInterval(function() {
        margin += 10
        document.querySelector('.box').style.marginLeft = margin + 'px'
    }, 16)
})()
```

## svg

## css transition

```
transition: property duration timing-function delay
```

常常搭配：
```
transform: translate3D(0,0,0)
transform: translateZ(0)
```
在移动端开启gpu加速。

## css transform

```
transform: translate(20px) rotate(20deg) scale(0.5)
```

注意transform不会改变文档流，不会影响节点的原位置，不会触发回流
所以尽量用transform代替高度，宽度，位置的变化
用opacity代替visibility，这个也不会触发回流。

##  css animation

- 使用keyframe定义动画
- 使用animation引入

```
animation: 3s ease reverse infinite AnimationName
duration
timing-function
delay
iteration-count
direction
name
```

```
@keyframes move{
    %0{},
    %25{}
}
@keyframes go{
    from{},
    to{
    }
}
```
```
@keyframes grow {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100%{
        transform: scale(2);
    }
}
.block{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    animation: 2s linear infinite grow;
    background-color: aqua;
}
```

## requestAnimationFrame

```
requestAnimationFrame(callback)
```
指定在下一次重绘前执行回调函数进行改变。
一般来说调用函数的次数和屏幕的刷新频率一致
回调函数会接受一个DOMHighResTimeStamp参数，表示执行回调函数的时刻。

```
(function() {
    var margin = 0
    var cur = 0
    var ele = document.querySelector('.square')
    console.log(ele)
    function move(time) {
        var priod = time - cur
        var diff = Math.min(10, 0.1*priod)
        margin += diff
        ele.style.transform = "translateX("+ margin +"px)"
        window.requestAnimationFrame(move)
    }
    requestAnimationFrame(move)
})()
```