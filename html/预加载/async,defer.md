# 异步加载js脚本

html中用```<script scr=""></script>```来加载属于同步加载，会阻塞后面html树的建立

## defer

```
<script defer src=""></script>
```

特性

- defer会按顺序加载，即使后面的先加载完也会等待前面的加载完后在执行
- defer的js加载完后才会触发DOMContentLoaded事件
- defer仅使用于外部脚本，如果src为空不会有效

用处：有前后依赖的脚本按顺序异步加载

## async

```
<script async src=""></script>
```

特性

- 多个async不会按顺序加载，谁先加载完谁执行
- async不会阻塞DOMContentLoaded方法

用处： 广告，侧边栏等及时加载的内容

## js动态加入script

原理和jsonp一样

```
let script = document.createElement('script')
script.src = url
document.body.appendChild(script)
```

在加入的时候立即执行，其他特性和async一样。除非显式指定async false。

页面生命周期

- DOMContentLoaded：DOM树构建完毕，可以拿到编辑节点，但图片等资源可能没有加载完全
- load：全部资源包含外部资源加载完毕
- beforeunload：用户正在离开
- unload：用户离开

用addEventListener 进行监听
```
document.addEventListener("DOMContentLoaded", function(e) {
    
})
```