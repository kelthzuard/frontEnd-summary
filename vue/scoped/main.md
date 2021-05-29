# scoped

## vue scoped 原理

vueloader会把包含scoped的style中每一个类所在的元素加上一个独一无二的tag

```
<div class="main" data-v-ad00001></div>
```

并且会把对应的标签选择器加上对应的tag

```
.main[data-v-ad00001] {

}
```

这样就可以保证组件之间不会相互影响。

## scoped穿透

有些时候需要改变子组件中的样式，比如用element-ui，需要改变他的样式

1. 父组件一部分用scoped定义私有样式，一部分不用覆盖子组件样式
2. sass和less的样式穿透 ```>>>```, ```/deep/```