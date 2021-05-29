# nodejs event loop

![image](https://cdn.learnku.com/uploads/images/201912/27/20604/NclgxSvw3g.png!large)

1. node进入主线程执行。
2. node进入事件循环。
3. 进入timers阶段，如果有任何的setTimeout和setInterval到期，会立即执行
4. 进入idle，prepare，仅供系统调用
5. 进入Poll（轮询阶段）。
   1. 在轮询阶段如果有到期的异步队列，I/O，httpRequest。
   2. 一些线程阻塞的代码会在这里阻塞，比如fs.readfile
   3. 如果有到期的timers或者有setImmediate，则重新进入timers阶段
   4. 如果没有，则一直轮询等待。
6. check阶段。在该阶段执行setImmediate
7. 微任务在任何一个阶段开始之前检查并执行。

## process.nexttick

传入process.nexttick的回调函数会在该事件循环阶段后立即执行。  
使用process.nexttick可以让同步函数进行异步操作。  
使用的两个理由

1. 在事件循环之前下个阶段允许开发者处理错误，清理资源
2. 需要让回调函数在事件循环下个阶段之前执行。比如一些耗时的操作，在nexttick中对耗时操作得到的对象进行操作。

## setImmediate vs setTimeout(0)

1. 在主代码块中两者顺序不一定，取决于执行到times时处理机是否已经执行到setTimeout
2. 在poll阶段一定时setImediate先执行，因为下一步一定先执行check
