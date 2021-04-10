# v-model

v-model实际上是一个语法糖

```
<input v-model="value"></input>
```
等价于
```
<input v-bind:value="value" @change="value = e.target.value">
```

- 使用v-bind绑定响应式数据value，通过劫持value的get，set。实现响应式value
- 使用绑定事件，设置value为最新值，再由value来通知订阅器，通知value进行改变。