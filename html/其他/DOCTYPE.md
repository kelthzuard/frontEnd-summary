# !DOCTYPE html

浏览器有两种渲染模式

- 怪异模式：浏览器用自己的模式渲染，可能会产生不同的样式
- 标准模式：浏览器使用w3c的标准解析页面

在页面顶端声明```<!DOCTYPE html>```意思是以h5推荐的方式显式声明DTD（超文本标记语言）为html，让浏览器以w3c的标注执行。

区别

- 盒模型不同： 严格模式width=content,混杂模式width=(content+padding+border)
- 严格模式不能设置行内元素的宽高，混杂模式可以
- margin: 0 auto会在混杂模式失效