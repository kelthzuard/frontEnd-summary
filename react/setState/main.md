# useState

!['image](img.png)

setState是异步的，批量更新的。  

更新流程如下

1. react首先调用batchedUpdate操作，将isBatchingUpdates设置为true
2. 接着将state更新加入更新队列中，将对应的组件保存在dirtyComponents中。在此过程中对一个state进行多次更新只会导致这个更新队列对应的更新。
3. 在函数执行完以后，事物的close方法会把isBatchingUpdates设置为false，并且遍历队列进行更新。


- 在setTimeout中调用setState会导致同步更新，因为在这种情况下setTimeout手动跳过了事物的更新机制，在这时isBatchingUpdates是false，会直接进行更新。
- 为了拿到更新后的值可以在setState中传入函数。

```
setState(prev => prev + 1)
```