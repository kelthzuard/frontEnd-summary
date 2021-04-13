# vuex

## 安装

- 通过vue实例将vuex注入
- 定义vuex并加入到new Vue中
```
// vuex/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {}
const mutations = {}
export default new Vuex.store({
    state,
    mutations
})
```
```
// main.js
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

## state

- vuex中的状态存储的直接位置。只能通过mutation修改。
- 组件中通过this.$store.state访问
- 组件中一般通过计算属性拿到并使用

```
export default new Vuex.store({
    state: {
        name: 'kel'
    }
})
```
```
computed: {
    getName() {
        return this.$store.state.name
    }
}
```

## getters

- 封装了从state拿去的状态的值。相当于computed的功能。
- 如果getters是返回值，则会缓存值直到state改变
- 如果getters返回函数，则会每次调用都计算一次

```
const getters = {
    getOldMan: (state) => {
        return state.ages.filter(val => val > 60) //返回值，保存缓存
    },
    getAgeMan: (state) => (age) {

        return state.ages.filter(val => val > age) //返回函数，随时计算
    }
}
```
```
computed: {
    oldman() {
        return this.$store.getters.getOldMan
    },
    ageman() {
        return this.$store.getters.getAgeMan(this.age) //作为函数调用
    }
}
```

## mutations

- mutations是改变state的唯一手段
- mutations一定是同步方法
- 通过commit来调用mutations
- 通过将参数封装成对象(payload)的方式传参
- 使用常量形式的命名方式

```
const CHANGENAME = 'changeName'
const mutations = {
    [CHANGENAME](state, payload) {
        state.name = payload.name
    }
}
```
```
this.$store.emit({
    type: 'changeName',
    name: 'kel'
})
```

## actions

- actions是异步执行的
- actions必须以commit的方式改变参数
- actions传入的参数为store的实例，可以进行解构成state,commit等
- 用store.dispatch()来触发actions

```
const actions = {
    laterDo({commit, state}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit(someMutations)
            })
        })
    },
    async asLaterDo({commit, state}) {
        await somAyncFunc()
        await commit(someMutations)
    }
}
```
```
methods: {
    do() {
        this.$store.dispatch('laterDo')
        .then(() => {
            this.$store.commit(someMutations)
        })
    },
    async d() {
        await this.$store.dispatch('asLaterDo')
    }
}
```

## vuex的应用场景

1. 需要保存关闭组件的状态的场景，如输入框保存状态
2. 需要多个地方响应一个数据变动的地方，比如夜间模式，日间模式。
3. 基于异步响应状态，如一个用户状态影响了很多组件，然后把异步内容全都放到action中，其他内容依赖action