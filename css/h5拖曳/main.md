# 拖曳api

## 拖

- 将元素的draggable设置为true使其变成可拖拽的属性
- 监听dragstart事件，利用ev.dataTransfer.setData设置拖拽过程中需要传输的数据，数据类型为('text/html(数据类型)', e.target.outerHTML(数据))
- 利用ev.dataTransfer.dropEffect设置移动的类别，比如copy,move等

```
<div id="drag" class="fromDrag"  draggable="true"></div>
document.addEventListener('DOMContentLoaded', function() {
    var drag = document.querySelector('#drag')
    drag.addEventListener('dragstart', function(ev) {
        ev.dataTransfer.setData("text/html", ev.target.outerHTML);
        ev.dataTransfer.dropEffect = "move";
    })
})
```

## 放置

- 必须监听放置元素的```ondrop```和```ondragover```事件，并且在这些事件中preventDefault组织默认事件的发生
- 在ondrop中可以利用ev.dataTransfer.getData('text/html')拿到传输的数据，做一些其他操作，比如插入操作等。

```
<div class="toDrag" ondrop="handleDrop(event)" ondragover="handleDragOver(event)"></div>
function handleDragOver(ev) {
    ev.preventDefault()
}

function handleDrop(ev) {
    ev.preventDefault()
    var data = ev.dataTransfer.getData('text/html')
    ev.target.innerHTML = data
}
```

## 实现拖曳上传文件

数据会被保存在e.dataTransfer.files内

```
function handleDrop(e) {
  e.stopPropagation(); // Stops some browsers from redirecting.
  e.preventDefault();

  var files = e.dataTransfer.files;
  for (var i = 0, f; f = files[i]; i++) {
    // Read the File objects in this FileList.
  }
}
```