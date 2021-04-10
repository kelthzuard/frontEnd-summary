# 虚拟dom基础

虚拟dom的好处在于解决以前前端性能问题。 
由于浏览器渲染的机制，在通过js改变节点的时候会重新绘制渲染树并进行绘制(回流，重排)。 
又由于浏览器不会等待，会异步的进行更新，所以多次的js操作和造成多次的回流和重排(现代的浏览器已经进行了一定的程度的优化)。 
所以虚拟dom将多次更改通过在内存中进行计算，并一次性渲染到真实dom节点上。减少了无谓的计算和回流，提高了效率。

虚拟dom一共分为以下三个步骤

- render：将实际dom用虚拟dom的方法实现，并渲染
- diff：计算虚拟dom更新的差异
- patch：将计算出来的diff更新到视图上

## render

首先定义虚拟dom节点Vnode的数据结构
由以下三个组成

- dom元素名称
- dom属性（class，key等）
- 子节点

```
function VNode(name, props, children) {
    this.name = name
    this.props = porps
    if (props.key) {
        this.key = props.key // 定义key，唯一标识符
    }
}
function createVNode(name, props, children) {
    return VNode(name, props, children)
}
createVNode("ul", {
    class: 'ulClass'
}, [
    createVNode("li", {
        id: 'node'
    },{})
])
```

render函数根据定义的虚拟dom，渲染成真实dom

```
function render(vnode) {
    var el = document.createElement(vnode.name)
    for (let key in vnode.props) {
        el.setAttribute(key, vnode.props[key])
    }
    for (let child of vnode.child) {
        var childNode
        if (child instanceof VNode) {
            childNode = render(child)
        }
        else {
            childNode = document.createTextNode(child)
        }
        el.appendChild(childNode)
    }
    return el
}
VNode.prototype.render = render
```

## diff算法

diff算法旨在计算出由一颗树转换成另一颗dom树的最小编辑距离。
这个算法由编辑距离算法派生而出，而树的最小编辑距离为O(N^3)，其中需要找到两颗树的所有可能子树，时间复杂度为O(N^2)，每一个子树的最小编辑距离求解为O(N)，最后为O(N^3)

优化的最小编辑距离算法只关心每一层上的结点是否能互相对应，所以可以优化为O(N)，使用patch记录每一个节点的改变。进行dfs

```
function diff(old, new, patch, index) {
    let newPatch = []
    if (typeof old == 'string' && typeof new == 'string' && new !== old) {
        newPatch.append({
            type: text, content: newNode // 标志着都是字符串，但字符串进行了替换
        })
    }
    else if (old.name == new.name) {
        let diffProp = findDiffProp(old, new)
        if (diffProp) {
            newPatch.append({
                type: props,  props: new.props //如果两个node的name相同，则先进行props的比较，如果不同则进行记录
            })
            diff(old.children, new.children, patch, ++index) //子节点递归diff
        }
    }
    else if (new !== null) {
        newPatch.append({
            type: replace, //如果name不一样，则直接删除旧节点，添加新节点。
            content: new
        })
    }
    patch[index] = newPatch
}
```

patch一共拥有以下类型

- 当new和old都是字符串且不相等时，进行字符串替换
- 当new和old的name相同时，比较porps，如果props不同，进行porps替换
- 当new和old的name不同时，直接删除old替换为new

## patch

对old树进行深度遍历，并且根据patch的值进行修改old树。


## 虚拟dom缺点

- 首次渲染dom的时候，会比直接插入慢，因为虚拟dom需要先进行一次计算再转换，并且在内存中维护一遍副本。
- 在进行大量的节点更新时候，虚拟dom是合适的，避免了多次的修改。但是在高频率单一的重复修改的情况下，虚拟dom可能反而会更慢。尤其是在dom节点较少的情况下。
- vue和react都采用了异步更新的机制，频繁多次更新时都会只更新最后一次。