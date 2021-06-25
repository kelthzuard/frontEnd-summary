# BOM (browser object Model)浏览器对象模型

浏览器环境中一共有三个组成部分
- js(es)
- DOM：文档对象模型，提供js访问文档元素得能力
- BOM：浏览器对象模型，提供js和浏览器交互得能力

## window对象

- 扮演着全局变量得角色
- window.open(), window.close(), window.onload()

## location对象

重定向，导航等功能

location.href, location.hash, location.replace

## history

也是重定向功能，h5api

history.forward(), history.go(), history.back()

## navigator

获取浏览器相关得一些信息

navigator.userAgent :用户浏览器信息