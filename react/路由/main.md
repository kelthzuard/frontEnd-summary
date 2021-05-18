# react-router-dom

## 基本组件

- ```<BrowserRouter>```,```<HashRouter>```,根实例route，全局唯一一个
- ```<Switch>```精准匹配第一个匹配到的route，用来包含route
- ```<Route path="/path:id" components="">```, 路由匹配
- ```<Link path="" params="" state="">```路由跳转

## 路由传参

### params

显式传递，在地址栏显示。只能传字符串。刷新不消失  

```
this.props.match.params.id
const param = useParams()
<Link to={'/path:id'}>
```

### query

隐式传递，可以传对象，刷新消失。

```
<Link to={'/path'} query:{id:1}>
this.props.history.push({pathname: '/path', query: {id:1}})
this.props.location.query.id
```

### state

隐式传递，可以传对象，刷新不消失

```
<Link to={'/path'} state: {id:1}>
this.props.location.state.id
```