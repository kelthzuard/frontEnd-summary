# keep-alive

- keep-alive用来保存组件的状态，当组件应当被销毁时不会销毁，而是被缓存在内存中
- keep-alive监控下的组件在重新加载时不会重走生命周期。而是只会经过beforeactivate() avtivated()两个生命周期
- 初始化代码放在mounted()中，每次更新时需要操作的代码放在activated中
- 使用include设定包含哪些名字的组件可以缓存，exclude排除。

```
<keep-alive include="child">
    <child v-if="show"></child>
</keep-alive>
```
```
<div>
    im child {{cur}},
    activated: {{act}}
</div>
created() { //cur的值不会改变
    this.cur = +new Date()
},
activated() { //act的值每次重新渲染都会改变
    this.act = +new Date()
}
```

## 动态组件

```
<component :is="componentName"></component>
```

使用componentName动态代表组件的名字，实现动态替换。