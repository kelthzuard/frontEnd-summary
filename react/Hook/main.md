# react Hook

## 引入hook的目的

1. 在组件中复用状态非常困难。
在组件中复用数据可以用redux。但复用状态只能使用HOC或者render props。  
但两者相同的都会造成嵌套地狱，使得代码难以理解。急需一种方便的复用状态的方法。

2. 复杂组件难以理解
在一个组件中相互没有关系的业务代码经常一起写在componentDidUpdate中。导致理解困难和难以排除bug。

3. class不够好
class需要绑定this，并且编译出来的代码也很多，不完善。需要提供函数组件一个可以拥有自己状态的方法。

## hook的使用限制

### 只能在函数顶部调用hook？（hook的实现原理）

hook也是通过挂载在一个链表上进行顺序执行的，所以不能在任何判断逻辑中使用hook，这样会导致hook的顺序改变，导致错误的状态变更。

## useState

```
const [state, setState] = useState(initialValue)
```

注意setState每次会返回两个毫不相关的对象，如果想保留上次的对象，需要手动做合并。

```
setState({
    ...state,
    newState
})
```

## useEffect

```
const func = () => {
    useEffect(() => {
        doSomeFunc()
        return deleteFunc
    }, dep)
}
```

useEffect会在DOM完全渲染后执行，即ComponentDidMount和ComponentDidUpdate的时候执行。  
dep用来对比re-render的时候是否执行useEffect。注意这个对比是浅对比，并且需要传入全部依赖的参数。  
在componentWillUnmount阶段会执行useEffect的返回函数执行卸载。可以将清楚一些副作用的函数放在这里。  
useEffect可以用来模拟class的生命周期  

- ComponentDidMount:将dep设置为空数组，re-render时不再执行callback
- ComponentDidUpdate:设置dep控制是否更新
- ComponentWillUnmount:设置返回函数用来卸载。

## useContext

```
import Consumer from './father'
useContext(Consumer)
```

## useReducer

useReducer是一种泛化的useState，可以管理复杂的数据，类似于redux.  
通过传入reducer和初始值得到state和dispatch

```
const reducer = (state, action) => state
const initalValue = {id: 1}
const [state, dispatch] = useReducer(reducer, initalValue)
```

实现一个useReducer

```
function useReducer(reducer, initalValue) {
    const [state, setState] = useState(initalValue)
    const dispatch = useCallback((action) => {
        setState(prev => reducer(prev, action))
    }, [reducer])
    return useMemo(() => [state, dispatch], [state, dispatch])
}
```

## useCallback

当函数被传入时通过浅判断始终会返回false，所以需要用useCallback包裹函数，使其分析依赖deps，当其真正改变的时候才改变。

```
const func = useCallback(func, deps)
```

## React.memo() useMemo()

useMemo可以缓存传入的耗时计算，根据依赖判断是否需要重新计算  

```
const someValue = useMemo(() => {caculate(someState)} ,someState)
```

useCallback是useMemo的实现

```
useCallback(func, dep) == useMemo(() => func, dep)
```

React.memo 是提供给函数组件一个pureComponent的功能，会浅比较props，有差异才会渲染。

## useRef

useRef可以创建一个数据的引用，并且该引用始终保持不变。可以直接更改并且更改不会引起重新渲染。  
使用current属性来进行访问。

```
const ele = useRef(null)

console.log(ele.ref)

return(
    <input ref={ele} />
)
```

## useLayoutEffect

用法和useEffect一致，但会在渲染前执行。
