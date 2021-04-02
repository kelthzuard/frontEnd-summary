# 插件

插件可以用来给Vue实例添加全局功能(注入)
```
import Vue from 'vue'
import plugin from 'plugin'
Vue.use(plugin, {options})
```

插件需要定义一个install函数，在这个函数中传入vue实例，并且将其注入vue实例中
```
plugin.install = function(Vue, options) {}
```

install注入的具体方式有如下几种。

## 添加Vue.prototype

```
import axios from 'axios'
Vue.prototype.$axios = axios
```

## 自定义指令

可以通过directive自定义指令,可以添加钩子函数bind, inject,update
传入三个参数

- el：绑定的元素，可以直接操作dom
- binding：
  - name：指令名
  - value：传入的值
- vnode：传入vue生成的虚拟节点

```
<div v-stick="200"></div>
Vue.directive('stick', {
    bind: function(el, binding, vnode) {
        el.style.position = fixed
        el.style.top = binding.
    }
})
```

## 混入mixin

一个混入实例可以包含一个组件的任何部分(生命周期，方法，data等)
混入实例会被混合进其他组件中。

- mixin添加的生命周期方法后，vue实例的生命周期会是一个数组，mixin新添加的生命周期会在前面。
- mixin添加的data，method等会被添加到实例中，且会被实例的同名属性，方法覆盖。

```
var mixin = {
    created() { 
        console.log('mixin created')
    },
    data() {
        return {
            init: 1
        }
    }
}
new Vue({
    mixin: [mixin]
})
```