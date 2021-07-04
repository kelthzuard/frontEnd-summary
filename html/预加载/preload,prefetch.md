# preload, prefetch

## preload

preload指明浏览器提前加载这些资源。  
这些资源会进入缓存中，如果可以进入memory cache则进入，如果容量满了则进入浏览器缓存中disk cache。  
如果加载的是js文件，不会加载完成后运行，而是会等到需要时再运行。

```
<link rel="preload" href="xx.css" as="style">
```

使用rel指明需要preload，用as指明文档的类型

### 应用

- 字体文件需要在cssom构建完成并作用到了页面元素才会记载，所以会产生字体闪烁的问题。用preload强制提前加载字体文件就不会出现这个问题。
- 懒加载等地方使用在window.onload后使用preload进行接下来要展示的元素的加载。

## prefetch

prefetch指明这个资源在接下来很可能要用的到资源。  
浏览器会在空闲的时候去加载资源，优先级比较低，不保证能加载。加载后同样会进缓存

```
<link rel="prefetch" href="xx.css" as="style">
```

### 应用

- 对于首屏上的可访问内容，可以用prefetch进行预加载。