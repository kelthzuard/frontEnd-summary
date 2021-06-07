# 其他问题

## 监测性能的工具

chrome devtool -> performance
https://segmentfault.com/a/1190000011516068?utm_source=sf-similar-article

## require加载的顺序

- 是核心模块加载核心模块
- 有缓存加载缓存
- 如果是目录会尝试加载目录中的index
- 如果是目录和文件会查找指定的目录文件
- 如果不是目录会从父级node_module中寻找，找不到再到父级的父级的node_module中找，直到到顶层文件系统
- 再找不到会到全局变量NODE_PATH中寻找。

## head标签有什么

- title
- script
- link
- meta:描述网页原信息
  - name: 'keyword' content="" 描述网页关键字
  - name: 'description' content="" 描述网页
  - name: 'viewpoint' content="width=device-width, inital-scale=1"
- base:指明所有url的相对url

## 内存泄漏

- 没有使用的全局变量
- 被遗忘的setInterval
- 被遗忘的事件监听器
- 被遗忘的map，set
- 未释放的闭包

监测方法：在devtools  memory一栏take snapshot分析。

## git rebase 和 git merge

- git merge：将分支合并到当前分支上，创建一个merge请求，保留各个分至的所有提交
- git rebase：找到当前分至和合并分至的最近父节点，将合并分至的所有commit插入到父节点头部。

优点：

- 不会产生网状结构，不会有额外merge请求，提交一直保持一条直线

缺点

- 在公共分支上进行rebase会导致提交历史改变，然后所有人在该条历史上工作的人都会产生冲突。

## 进程和线程通信

进程

- 管道
- 共享内存
- 信号量
- 消息队列
- socket

线程

- 共享内存

## 引入图片的方式

1. img
2. background-img
3. picture
```
<picture>
  <source srcset="/imgBig.png" media="(min-width: 600px)">
  <img src="imgSmall">
</picture>
```
4. svg
```
<svg>
  <image href="">
</svg>
```

## 为什么var可以重复声明，其他不可以

在编译器执行构造活动变量时，遇到已经声明过的var会直接进行赋值。
而遇到let，const会造成临时性死区，报错。