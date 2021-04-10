# vue双向绑定原理

vue通过发布者-订阅者原理，劫持data的属性值，通过订阅器向订阅者发送更新信息，订阅者收到更新信息后执行回调函数更新视图  
视图的更新比如input的双绑可以通过addEventListener实现。

双向绑定的组成部分一共有三个  

## Observer(监听器，发布者)

Observer的作用是为vm的data劫持get和set。  
Observer的作用生命周期是beforeCreate到created，在这里执行init函数，并执行Observer。  
Observer为每个data的键值对通过defineProperty劫持get和set，并且为每个键值对注册一个订阅器dep  

***注意在注册Observer的时候遇到对象会递归进行注册，相当于对每个成员都注册了Observer，但对于数组，不会全部监听数组元素，只会选择监听***   
***所以数组更新不支持新加入数组元素或者对于某个下标的修改，需要用this.$set(obj, key, value)来更新***

- get:在get阶段，Observer检测是否有全局target，即需要注册的订阅者，如果有，则把订阅者加入到该值的订阅器中
- set：在set阶段，Observer检测是否值改变，如果改变了，则通知订阅器更新。

## Dep(订阅器)

订阅器的作用是为每个Observer中的键值对维护一组订阅者，统一通知他们进行更新  
订阅器有两个方法

- addWatcher：当Observer中的get被调用并注册时，调用addWatcher把全局的target即需要注册的watcher注册到订阅器中
- notify：当Observer的set调用时，通知订阅器中的所有watcher更新

## Watcher()

在每个双向绑定创建时会创建对应的watcher，watcher用来追踪vue的data的变化，并且做出相应的响应来更新视图。  
watcher有两个方法  

- get：作为watcher的初始化函数，watcher将Dep的target指定为自身，表示自身需要绑定，然后显式调用Observer的get方法，将自己添加进Observer的订阅器中
- update：当订阅器调用Watcher的update函数时，Watcher执行回调函数更新视图。