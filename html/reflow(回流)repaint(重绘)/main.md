# 网页生成过程

![image](./img.png)

网页生成的步骤分为五步
1. HTML代码转换为DOM树,DOM树是通过DOM解析器将html文本转换为一颗从根节点到最末端节点的树。该树只包含html信息
2. CSS代码转换为CSSOM(CSS object Model)，即对应DOM树将css进行解析为一颗结构类似的树
3. 结合DOM树和CSSOM构造渲染树（包含每个节点的视觉信息）
4. 生成布局，即对渲染树的每个节点进行平面合成（计算位置宽高父子等）
5. 将布局绘制在屏幕上。

## 重排(reflow)和重绘（repaint）

当元素高宽等几何属性改变后，浏览器会重新构造渲染树（3，4），进行重排，重排后将布局绘制到屏幕上，完成重绘。

会引起重排的操作
- 添加或删除DOM元素
- 元素调整宽高
- 元素改变位置
- 获取布局信息(offsetTop,scrollTop等)
- 窗口调整位置

会引起重绘的操作
- 背景颜色，文字颜色改变。

## 减少重排的方案。

- 集中修改样式，替换class而不是一个个修改style
- 采用虚拟DOM，是元素脱离文档流，进行修改后再加入
1. 隐藏元素，应用修改，重新显示。
2. 使用文档片断（docuement fragment）在当前DOM之外构建一个子树，再把它拷贝回文档。
3. 将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素。或 先将元素从document中删除，完成修改后再把元素放回原来的位置
- 设置position为absolute或fix来脱离文档流。
- DOM的多个读写操作应该放在一起，浏览器会把其变为一个队列处理。
- 获取布局信息时进行缓存，不要重复获取

## createDocumentFragment

```
document.createDocumentFragment()
```

createDocumentFragment可以创造一个虚拟的文档碎片。该文档碎片存在于内存中，不会引起回流。
在向其添加多个子元素后，将文档碎片添加进DOM中，文档碎片的所有子元素会添加进中
文档碎片是一个虚拟的概念，并不是一个实际存在的节点，在添加后无法再取到。

```
var frag = document.createDocumentFragment()
for (let i = 0; i < 3; i ++) {
    var ele = document.createElement('p')
    ele.innerHTML = i
    frag.appendChild(ele)
}
document.querySelector('#father').appendChild(frag)
```

## 较为完整的流程

- 渲染进程将HTML内容转换为能够读懂的DOM树结构。
- 渲染引擎将CSS样式表转化为浏览器可以理解的styleSheets，计算出DOM节点的样式。
- 创建布局树，并计算元素的布局信息。
- 对布局树进行分层，并生成分层树。
- 为每个图层生成绘制列表，并将其提交到合成线程。
- 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
- 合成线程发送绘制图块命令DrawQuad给浏览器进程。
- 浏览器进程根据DrawQuad消息生成页面，并显示到显示器上
