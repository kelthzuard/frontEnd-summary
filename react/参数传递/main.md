# 参数传递

## props

父组件将值和回调函数通过props传递给子组件，子组件通过回调修改值。

## context

- 父组件通过定义```export const {Provider, Consumer} = React.createContext(initalValue)```创造context
- 通过```<Provider value={someValue}>```包裹渲染部分将context传递给下面的组件
- 子组件宣称要消费可以通过
```
import Consumer from './father'
render() {
    return (
        <Consumer>
            (somValue) => {
                <div> {someValue} </div>
            }
        </Consumer>
    )
}
```

## ref

父组件拿到子组件的ref调用函数

## 发布订阅模式的事件总线

react-redux和react-router-dom都是通过context的方式。  
react-redux外层包裹的Provider将store传递给子组件。  
子组件的connect实际上一个高阶函数，包裹了Consumer，将store拿到，再进行相应的操作。  