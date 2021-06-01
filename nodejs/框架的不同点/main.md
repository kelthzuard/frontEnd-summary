# express vs koa2

## 框架整体

- express封装了router，static，模板引擎的基本功能
- koa2没有进行封装，基本靠社区提供

## 事件的处理机制

- express使用的是回调函数，难以管理异步和错误捕获
- koa2使用的是async，原生底层支持，很好的处理异步

## 中间件机制

- express的中间件机制和koa2很类似，也是使用next进行链接，不同的是不是使用的promise而是回调函数，因此中间件中有异步会造成执行顺序混乱
- koa2在promise.resolve()中执行下一个中间件，保证串行执行

## 响应机制

- express在每个中间件中有req，res，在res.send()后响应结束
- koa封装了context，在所有中间件执行完毕后才会进行响应，所以可以多次设置ctx.body = "info"

## 常用插件

express

- body-parser:处理post请求中的data
- formidable：处理文件上传
- express-session：处理session
- mongoose：和mongodb合作

koa2

- koa-bodyparser：处理post请求，包括文件上传
- koa-router：处理路由
- koa-static：处理静态文件
- koa-session：处理session
- koa-jwt：处理token
- koa-logger：输出日志