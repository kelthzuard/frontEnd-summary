# Set

Set的特点
1. 为有序不可重复的数组，其值可以为任意数据类型。
2. 插入为按序插入，如果重复插入不会引起顺序的变化。

api
```
let set = new Set([1,6])
set.add(7) // 在末尾追加7 -> [1,6,7]
set.add(6) // 6已经在set中，不会变化 -> [1,6,7]
set.delete(6) // [1,7]
set.has(6) // False
set.size // 容量2
for (let val of set) {
    console.log(`val:${val}`)
}
set.forEach(val => {
    console.log(`val:${val}`)
})
```

# WeakSet

- WeakSet的键只能为对象，不能为基本类型，且其维持键为弱引用，所以无法枚举。其余参考WeakMap.