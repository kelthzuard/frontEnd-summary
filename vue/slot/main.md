# slot

插槽定义了一套内容分发的api  
父组件可以通过插槽将指定的内容派发到子组件。  

## 匿名插槽

- 父组件将插槽内容写在子组件标签中
- 子组件定义slot标签内渲染。

```
// father
<child>
    <p>this is slot</p>
</child>
```
```
// child
<slot><slot>
```

## 具名插槽

- 父组件通过 ```<template v-slot:slotName>```定义向子组件派发的内容
- 子组件通过```<slot name="slotName">```接受固定的父组件派发的内容
- 父组件派发的内容可以为任意值，html或者表达式。
- 父组件中默认的作用域为父组件的作用域。

```
// todoList
<todo>
    <template v-slot:todoType>
        {{todoType}} // 处理的为父作用域的data
    </template>
</todo>
```
```
// todo
<slot name="todoType">
    default //没有插槽时的默认值。
</slot>
```

## 作用域插槽

为了让子组件的作用域变量可以在父组件slot中使用。可以通过作用域插槽进行传递。

- 子组件通过v-bind将子作用域的数据绑定 ```< slot name="todoType" v-bind:childData="data"></slot>```
- 父组件通过解构接受子作用域的数据```<template v-slot:todoType="{childData}"></template>```
- 父组件标签写法为```<template v-slot:"这里是具名"="{这里是子作用域的解构参数}"></template>```
- 子组件标签写法为```<slot name="这里是具名" :这里是传递参数的名字="子作用域的数据"></slot>```

```
// todoList
<todo>
    <template v-slot:todoType="{childData}">
        {{childData}} // 这里访问到子作用域传递的数据
    </template>
</todo>
```
```
<slot name="todoType" :childData="data"></slot> //这里子作用域把数据绑定传给父组件。
```

## 插槽的原理

1. 父组件首先解析，将插槽内容解析为一个具名函数，其参数为作用域插槽中传入的子组件参数
2. 子组件解析，将slot内容解析为占位符
3. 子组件渲染，按slot名字找到父组件的具名函数，将子组件的参数传入函数，得到返回的节点。插入子组件中。

```
父组件解析出来的子组件render函数
with(this) {    
    return _c('div', {},
        [_c('test', { 
            scopedSlots: _u([{                
                key: "default",                
                fn: function(slotProps) {                   
                    return [ "我是放在组件的 slot :"+slotProps ]
                }
            }])
        })],    
    1)
}
```
```
子组件解析出来的渲染函数
with(this) {    
    return _c('main', [        
        "我在子组件里面",
        _t("default", null, {            
            child: child
        })
    ], 2)
}
```
最后执行_t函数，通过名字default找到父组件的函数，将child传入，得到返回的html节点。