# HOC

## 高阶组件

高阶组件用来复用逻辑，传入参数和一个组件，返回一个包裹后的组件。  
HOC不会修改传入的组件，相反是包装在一个容器组件中，HOC是纯函数，每次会产生一个新的组件实例。相同的也会造成回调地狱。  
优先考虑组合，再考虑继承

### 组合

组合的方式相当于产生一个新的实例，返回一个产生一些状态修改应用到子组件上。会经历两个组件的生命周期。

```
const addProps = function HOC(params) {
    return (Unwrapped) => {
        return class wrapped extends Component{
            ComponentDidMount() {
                // do something
            },
            render() {
                return (
                    <Unwrapped {...params} {...this.props} />
                )
            }
        }  
    }
}
```

### 继承

继承会继承与传入的组件，并且调用super.render()进行渲染。继承只是组件的一个生命周期，不会产生两个实例，但是会影响到原组件的功能，不推荐。 

```
const addProps = function HOC(params) {
    return (Unwrapped) => {
        return class wrapped extends Unwrapped{
            return super.render()
        }
    }
}
```

## render props

render props是指将一个函数传入一个复用封装逻辑的组件，并在该组件内部调用该函数，从而可以自定义想要渲染的东西。


```
class AddProps extends Component{
    render () {
        return (
            {this.props.render({userID: 1})}
        )
    }
}
<AddProps render={(userId) => {
    <Component {...userId} {...this.props} />
}}>
</AddProps>
```

## HOC作用

- 强化props
  - 混入props
  - 抽离state控制更新
- 控制渲染：条件渲染
- 监听事件，劫持声明周期

## HOC实例

### withRoute

withRoute给没有出现在route中的组件提供路由属性，让其可以拿到this.props.history, this.props.location

实现原理：用provider，consumer拿到route实例，并通过props的方式传到包装组件中。

### connect

connect同样通过provider，consumer拿到store实例，将state和dispatch传给mapStatetoprops和mapDispatchtoProps，再通过HOC将参数传入子组件。

## 使用HOC的注意事项

### 继承静态属性

通过HOC构造的组件无法继承原组件的静态方法，需要手动进行事件赋值或者使用第三方库

### 传递ref

ref无法通过props进行传递，因为不是简单的js对象，而是会做深层的处理。如果直接进行传递，则会指向最内层而不是包装组件。

需要通过fowardRef将ref进行传递

## 优缺点

- Hoc
  - 优点
    - 逻辑复用
    - 不影响内部组件逻辑
  - 缺点
    - 不好控制props的传递，props名字确定
    - 多层嵌套不好排查props来源
    - 同名props会覆盖
- renderProps
  - 优点：灵活控制props传递方式
  - 缺点：
    - 无法在return外访问数据，即无法灵活的更改生命周期等。