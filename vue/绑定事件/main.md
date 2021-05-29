# vue绑定事件

## DOM事件

会在转换成虚拟dom后存在子组件的_event 中，在转换成虚拟dom时通过addEventlistener进行绑定

## 自定义事件

自定义事件中事件仍然是属于子组件，不过通过_parentEvent将父组件的回调函数赋值在子组件的事件绑定中。