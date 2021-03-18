# 事件对象

- 事件在触发时传回回调函数的参数event
- event.target:事件触发的元素
- event.currentTarget:事件绑定的元素

# 冒泡与捕获

- 使用element.addEventListener('event_type', callback, use_bolb)的第三个参数决定是否捕获，false为冒泡，true为捕获
- 当同时有冒泡和捕获的时候，他们注册的顺序决定了先冒泡还是先捕获。

## 捕获

- 捕获是网景公司提出的。
- 捕获从最外层元素开始，检查是否有绑定目前事件的，如果有，则执行。进入下一层元素，循环检查。
- document -> body -> div -> p

## 冒泡

- 冒泡是IE提出的。
- 冒泡从触发的元素开始，检查是否有绑定目前事件的，如果有，则执行。进入他的父级元素循环检查。

不冒泡的事件：
- blur
- focus
- mouseenter
- mouseleave
- load
- unload
- resize

## 阻止默认事件

- e.preventDefault()

## 阻止冒泡

- e.stopPropagation()

# 事件委托

当有大量的子节点需要绑定事件时，可以将其绑定到父节点，由父节点统一控制。
```
<body>
    <ul class="father">
        <li>no</li>
        <li>no</li>
        <li>no</li>
        <li>no</li>
        <li>no</li>
        <li>no</li>
        <li>no</li>
        <li>no</li>
    </ul>
<script>
    var father = document.querySelector('.father');
    father.addEventListener('click', function(e) {
        e.target.innerText = 'yes';
    }, false);
</script>
```