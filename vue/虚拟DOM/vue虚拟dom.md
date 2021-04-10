# vue虚拟dom

## VNode

Vue使用VNode作为虚拟节点类，包含tag，data，children
可以用render函数渲染一个VNode节点

```
render: function(createElement) {
    return createElement('div', {
        attrs: {
            id: 'main',
            class: 'main'
        }
    }, 'this is pure text')
}
```

## diff算法

Vue的diff算法分为以下三部分

- 如果old为空，则创建一个新节点
- 如果old和new的基本属性不相同，则删除old新建一个节点
- 如果old和new的基本属性相同，则对old和new进行patch

patch过程如下

- 如果old和new的文本属性不相同，则更新文本
- 如果old没有子节点而new有，清空old并添加子节点
- 如果new没有子节点而old有，则清空old
- 如果old和new都有子节点，则执行updateChildren

updateChildren是为了优化多个子节点顺序变动时，进行顺序交换，减少删除增加节点的次数。
过程如下：
设置oldStart，oldEnd，newStart，endStart指向old的首尾和new的首尾

1. 比较newStart和oldStart,oldEnd
2. 如果都不相同，将newStart元素添加到oldStart前面，newStart++
3. 如果same(newStart, oldStart)，则patch(newStart, oldStart)，newStart++, oldStart+=
4. 如果same(newStart, oldEnd)，则patch(newStart, oldEnd)，并将oldEnd元素添加到oldStart前面，newStart++，oldEnd--
5. 如果newStart > newEnd，说明new已经遍历完old还没有，old还有多余节点，删除oldStart后所有节点。
6. 如果oldStart > oldEnd，说明old已经遍历完new还没有，new还有需要新添加的节点，把剩余节点添加到oldEnd后面

以上流程针对没有指定key的情况，如果指定了key，流程如下

1. 针对old生成 keyToIndex的hashmap，把key绑定到index上
1. 比较newStart和oldStart,oldEnd
2. 通过keyToIndex找到old上对应key的元素，并把该元素移到oldStart，oldStart++
3. 如果都不相同，将newStart元素添加到oldStart前面，newStart++
4. 如果same(newStart, oldStart)，则patch(newStart, oldStart)，newStart++, oldStart++
5. 如果same(newStart, oldEnd)，则patch(newStart, oldEnd)，并将oldEnd元素添加到oldStart前面，newStart++，oldEnd--
6. 如果newStart > newEnd，说明new已经遍历完old还没有，old还有多余节点，删除oldStart后所有节点。
7. 如果oldStart > oldEnd，说明old已经遍历完new还没有，new还有需要新添加的节点，把剩余节点添加到oldEnd后面

通过以上算法可以看出，通过设置key可以加快updateChildren的过程，减少节点删除和增加的次数。

## 对于在列表循环中key的更准确的理解

在列表循环中在不带key的时候，a和b的key都是undefined，相当于相等。所以可以直接原地复用，即只修改节点的属性。  
在设index作为key的时候，跟不设是一样的，因为index前后没有改变，所以还是直接原地复用。
但当用唯一id做key的时候，列表元素之和其key匹配的新元素做原地复用，其他的都是删除重建，耗时可能还要高。
```
<ul v-for="item in itemList" :key="item.id">
    <li>{{item.name}}</li>
</ul>
for (let i = 0; i < 1000; i ++) {
    itemList.push({
        id: i, name: 1
    })
}
itemList = []
for (let i = 0; i < 1000; i ++) {
    itemList.push({
        id: i*i, name: 1
    })
}
```
像上述这个例子中指定了唯一id的key，但是在diff过程中存在大量的key无法匹配的情况，会导致很多节点重新删除再重建。  
对比于不使用key默认采用原地复用，会慢很多。  
  
所以总结来说有以下几点
1. 列表循环中key最重要的在于确保更新，确保key不同的组件能得到完全更新，避免原地复用可能带来的组件状态问题。
2. 加不加key没有确切的性能提升指标。大概来说，大量不同的节点渲染，加key慢，不加快。节点不变，但顺序变化大，加key快，不加慢。

## vue实例生成的过程

- new Vue()生成Vue实例
- init：数据劫持，初始化data
- $mount：开始挂载
- complie：将template编译成render函数
- render：编译出VNode虚拟DOM
- patch：进行挂载生成DOM