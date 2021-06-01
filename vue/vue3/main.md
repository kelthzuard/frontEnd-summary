# vue3 composition 

## 让数据成为响应式

- reactive(obj)：让一个对象成为响应式对象
- ref(value):让一个值成为响应式值,使用.value访问
- toRef(obj):让一个对象内的键值分别响应式并传递出去，由此可以使用解构赋值。

```
const param = reactive({a: 1})
const a = ref(1)
const {a} = toRef({a: 1})
```

## composition api

可以将业务相关的代码封装到一块儿，实现逻辑封装  

- setup：setup阶段在组件创建之前执行，只会将props和context传入，context中只包含```attrs, slot, emit```
- 生命周期钩子函数将在对应的生命周期执行：```onBeforeMount```,```onMounted```,```onBeforeUpdate```,```onUpdated```,```onBeforeMount```
- 最后返回一个对象，里面的值会被所有该组件的其他视图和函数，data等共享。