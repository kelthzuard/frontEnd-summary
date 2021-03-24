# 响应式布局

## pc端

- 使用版心布局，中间定宽居中，设置最小宽度。
- 使用媒体查询为不适配的位置进行微调。

```
@media screen and (max-width:960px) {

}
```

移动端文章参见：https://juejin.cn/post/6894590194956451854#heading-4

## 移动端

### viewport

因为屏幕的dpi很高，一个逻辑csspx需要代表很多内容。所以浏览器的可视化像素很小。不像其屏幕像素一样大。
默认的viewport中为layout viewport即一个较大的可视区域，为了正常显示pc上那些大网页。layout viewport的
值是大于正常网页的。
而我们一般使用的是ideal viewport：完美适配。不同的设备拥有自己不同的ideal viewpoint。
设置meta标签可以让可视宽度等于设备宽度。
```
<meta name="viewport" content="width=device-width, inital-scale=1">
```

### rem

rem等于根元素的font-size。所以可以通过js监听将根元素的font-size设置为宽度的十分之一。并且全部使用

- 宽度为百分比或flex
- 高度，间距为rem
- 字体一般是确定大小，用媒体查询进行调整。

的方式进行布局。监听页面resize并调整font-size

详细文章参加阿里淘宝的解决方案Flexible：https://github.com/amfe/article/issues/17

### vw

vw，vh代表当前视窗长度和高度的百分之一。
使用vw，vh布局即全部使用vw代替width，height，间距等进行布局。
这种布局方式不需要js，但问题在于会随着视窗距离无限扩大。可以结合rem
使用vw给根元素的font-size赋值，并且通过媒体查询限制根元素的字体大小，避免其无线扩散。同时限制body的大小。
其他布局方式和rem相同。
这种方式去掉了对js的依赖。

详细文章参见：https://juejin.cn/post/6844903494386712589

### 图片

给图片设置
```
max-width: 100%;即可
```
根据不同的dpi屏幕设置不同缩放比的图片。