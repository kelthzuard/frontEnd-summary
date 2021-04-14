# vue-router

## 基本使用

- 定义VueRouter类，并定义以下参数
  
```
const index = require('@/components/home')
var router = new VueRouter({
    mode: 'hash' //路由模式，可以为hash，history，和abstract
    routes: {
        {
            path: '/index:userid', //路由跳转的路径,动态路由匹配的参数
            name: index, //路由的名字，唯一，用于跳转,
            component: index //用来显示渲染的组件
            redirect: {name: 'home'} //用于跳转，
            props: { // props将路由参数传入渲染组件的props中。defualt代表path中的参数
                default: 1,
                useName: 'kel'
            }，
            meta: {
                requireAuth: true //路由元信息，记录额外的信息
            }
        }
    }
})
```

- 在需要渲染路由的地方使用```<router-view></router-view>```作为路由出口进行路由渲染

## 嵌套路由

- 在router-view中嵌套router-view可以进行嵌套路由，类似于父组件子组件
- 在路由设置中添加children添加嵌套路由
- 如果时同级多个路由，使用name属性进行命名渲染
- 在有多个router-view时，记得使用components复数作为属性。

```
// rv.vue
im father
<router-view name="up"></router-view>
<router-view name="down"></router-view>
```
```
{
  path: '/rv',
  name: 'rv',
  component: rv,
  children: [{
    path: 'child',
    name: 'child',
    components: {
      up: up,
      down: down
    }
  }]
}
```

## 路由模式

路由的模式原理如下

- 执行```this.$router.push```或者监听```window.addEvenListener('hashChange', cb)```
- ```HashHistory.push()```,将路由添加到当前路由记录中
- ```const route = this.match(location)```,通过match函数匹配到需要渲染的组件
- ```this.update(route)``` -> ```app._route = route``` 更新路由，app将_route通过双向绑定劫持，在app_route更新后，调用render函数
- render函数将当前组件渲染到出口```<router-view></router-view>```中
- 设置路由显示的地址是当前路由```window.location.hash = route.fullpath```

### hash模式

- hash模式是利用了window.location.hash
- hash模式的标志是在url后面加了一个#，后面的值可以取到。
- hash字符串不会影响url的发送，在url发送时会忽略hash字符串
- hash组字符串的改变不会引起页面导航或者重新加载，但是会在历史记录里进行添加。

### H5 history模式

history模式拥有如下api

- history.pushState()
- history.replaceState()
- history.go()
- history.forward()
- history.back()

history特性

- 调用方法不会引起加载url，但会改变地址栏url
- history变化后的url和真实url一摸一样，所以刷新的时候会引起浏览器请求对应的地址
- 后端需要做相应的配置，把找不到请求全部返回200，并重定向到首页
- 前端需要匹配所有的路由并给出覆盖全局的404

## 动态路由

可以在path中绑定变量实现动态路由

```
{
    path: '/index/:id'
}
```

所有/index/1,index/2都会被匹配，使用```this.$route.id```获取参数

***在由相同的动态路由跳转的时候，会原地复用，不会走生命周期。详情见响应路由变化***

## 路由跳转

- 使用```<router-link :to="{path: '/index', params: {}}"></router-link>```
- 使用router.push()会往路由记录里添加一个记录
- router.replace不会添加记录，会把当前记录进行替换
- router.go(),router.back(),router.forward()

params 和 query 的区别

- params必须使用name跳转，否则会忽略params，query都可以
- params传递router上进行定义后，不传会报错，例如```path: '/home/:id'```，并且会显示在url上，```/home/id```
- params的参数如果未定义但传递会被隐藏，query的参数是以url拼接的方式传递的```/url?name=kel&&age=1```并且会显示在url中。
- params传递的参数刷新会消失，query的不会
- 总的来说params是vuerouter自己实现的一种机制，query是利用原始query进行凭借跳转的一种机制。
- 使用this.$route.query和this.$route.params获取参数

```
routerJump() {
    this.$router.push({
        name: 'child',
        params: {
            userName: 'kel',
        }
    })
},
queryJump() {
    this.$router.push({
        path: '/rv/child',
        query: {
            name: 'kel',
            age: 1
        }
    })
}
```

## 钩子函数

- ***导航开始***
- 调用组件的```beforeRouteLeave```
- 调用全局```beforeEach```
- 调用复用组件的```beforeRouteUpdate```
- 调用路由配置的```beforeEnter```
- ***开始跳转***
- 调用组件的```beforeRouterEnter```
- 调用全局```beforeResolve```
- ***导航被确认***
- 调用全局```afterEach```
- DOM渲染
- 执行```beforeRouteEnter```中的回调函数

### 全局钩子

全局钩子定义在route实例上，在每个跳转都会触发

```
route.beforeEach((to, from, next) => {
  next()
})
```

### 路由配置钩子

路由配置钩子配置在具体的路由定义里面，对特定的路由生效
```
path: '/rv',
name: 'rv',
component: rv,
beforeEnter: (to, from, next) => {
  console.log('specifc router')
  next()
}
```

### 组件钩子

定义在组件中。注意```beforeRouteEnter```中无法拿到this，可以传入回调解决。

```
beforeRouteEnter(from, to, next) {
    next((vm) => {
        console.log(vm.id)
    })
}
```

## 响应路由变化

在路由组件被复用的时候，路由跳转不会触发生命周期。所以需要手动监听

- 用组件内的```beforeRouteUpdate(to, from, next)```
- 使用watch: $route(to, from)

## 懒加载

使用es6的module异步加载函数import(),通过返回一个promise实现按需加载

```
const asyncComp = () => require('@/components/')
```

## keepalive

可以在```<router-view></router-view>```上使用```keep-alive```在路由层面缓存组件  
为了控制哪些可以被缓存，可以用两种办法

- include, exclude

```
<keep-alive include="showpage">
    <router-view></router-view>
</keep-alive>

```

- 使用路由元信息meta

```
<keep-alive v-if="$route.meta.cache">
    <router-view> //需要缓存的组件
    </router-view>
<keep-alive>
<keep-alive v-if="!$route.meta.cache">
    <route-view> //不需要缓存的组件。
    </router-view>
</keepalive>
```

## this.$route 和 this.$router 的区别

- $route包含了路由信息，包含path,params,hash,query等
- $router是route实例，可以调用方法，钩子函数等。

## 钩子函数应用场景

1. 登录检查，在beforeEach中检查用户的cookie中是否有token，如果没有跳到登录页
2. 权限检查，在beforeEach中检查用户meta中的权限代码，赋予相应的访问权限。