# 组件通信

- 子父通信：props，$emit，$children, $parent,ref
- 爷孙通信：provide/inject, $attrs/$listeners, event Bus, vuex
- 兄弟通信：event bus, vuex

## props

- 父组件通过props向子组件传值
- props只能单向传值，如果props在子组件中被修改，用计算属性computed去进行赋值
- 如果父组件传入的props会动态变化且子组件进行相应的处理，使用watch进行监听并做响应。

```
watch: {
    fatherValue: function(cur, old) {
        this.childValue = cur
    }
}
```

## this.$emit

子组件向父组件提交一个事件，并携带参数。父组件在子组件上监听这个事件。

```
// 子组件
this.$emit("emitFunc", "arguments")
```
```
//父组件
<child @emitFunc="handleEmitaFunc"></child>
```

## $children $parent

作为最原始的拿取子组件和父组件实例的方法。

- $children返回一个数组，包含所有子组件的实例
- $parent返回直接父组件的实例

```
this.$children[0].data_type = 1
this.$parent.data_type = 1
```

## 依赖注入 provide, inject

- 父组件可以通过provide提供一些值，并向所有子组件进行传递
- 子组件可以通过inject捕获父组件的值
- 依赖注入传递的值是非响应式的，不能动态修改，只作用于第一次。

```
// 父组件
provide: {
    dataName: data
}
```
```
// 子组件
inject: ["dataName"]
data () {
    return {
        DN: this.dataName //设置为初始值
    }
}
```

## ref

- 父组件通过ref拿到子组件实例，可以直接修改子组件值或调用方法

```
<child ref="child"></child>
this.$refs.child.val = 1
```

## event bus

- event bus作为一个独立的vue实例，可以串联起任何两个组件之间
- 发送方通过引入eventBus，通过eventBus emit事件
- 接受方同样引入eventBus，在初始状态通过eventBus进行监听并绑定函数

```
// eventBus
import Vue from "vue"
const eventBus = new Vue() //创建一个vue实例
export {eventBus}
```
```
// 发送者
import {eventBus} from "eventBus"
eventBus.$emit("caller")
```
```
// 接收者
import {eventBus} from "eventBus"
mounted() {
    eventBus.$on("caller", this.handleFunc)
}
```

## vuex

## localStorage sessionStorage

## $attrs $listeners

- $attrs可以接受属于父组件传入的props但没有被显示props声明的部分，可以通过 v-bind="$attrs"显示绑定向下一直传递到孙子组件等
- @listeners可以接受属于父组件监听的方法但没有被显示声明的函数，可以向下一直传递。
- 设置inheritAttrs为false，如果true的话父组件传入但未显示声明的props会被转化为html标签。

```
// 父组件
<child :name="kel" :age="1"></child>
```
```
// 子组件
<grandSon v-bind="$attrs"></grandSon>
props: [
    'name' //此时显式声明了name，所以此时$attrs为age:1
]
inheritAttrs: false
```
```
//孙子组件
props:[
    'age'
]
```