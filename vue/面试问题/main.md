# vue面试问题

## 为什么data是函数而不是对象

因为如果是对象得话，复用vue组件就会导致对象间相互修改。而函数每次返回得是不同得对象。就不会有这个问题

```
var data = { name: 1 }
var funcData = function() {
    return {
        name: 1
    }
}
function Vue(data) {
    this.data = data //因为传递得是引用，会互相影响
    this.funcData = data //不会影响，每次返回得是不同得对象。
}
```

## v-if 和 v-show有什么区别

- v-if在创建虚拟dom阶段就会跳过
- v-show会创建虚拟dom并渲染，会手动设置diplay:none