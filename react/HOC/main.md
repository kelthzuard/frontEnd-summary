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
            {this.props.children({userID: 1})}
        )
    }
}
<AddProps>
    {(userID) => {
        <Child {...userID} />
    }}
</AddProps>
```