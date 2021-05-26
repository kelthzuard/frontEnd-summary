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