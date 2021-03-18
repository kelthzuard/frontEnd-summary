# Map

Map的特点
1. Map与object不同，键可以为任意数据类型：函数，对象等。而object的键只能为字符串类型，如果将一个对象作为object的key，会首先对这个对象调用toString()方法转换为字符串。
2. Map会记住插入时的键值对顺序，所以在循环时Map是有序的，而object是无序的。

api
```
let map = new Map() // 创建Map对象
let obj = {}
map.set(obj, 'object') // 使用set来插入键值对
map.get(obj) // 返回查找的键值对
map.has(obj) // 返回布尔值，是否存在该key
map.delete(obj) //删除指定键
map.clear() // 删除所有元素
map.size // 容量大小
map.keys() //生成一个迭代器，里面包含所有的key。可以用map.keys().next().value拿到第一个map的key
map.values() //同上
map.entries() //同上
[...map], Array.from(map) // map转换为数组
// 两种迭代方法
for (let [key, value] of map) {
    console.log(`${key} is ${value}`) // 注意object迭代是for (let key in object.keys())
}

map.forEach((value, key) => {
    console.log(`${key},${value}`) // map独有的迭代。注意这里是先value再key
})
```

# weakMap

因为js的垃圾回收机制，导致Map中会维持对对象的引用，导致垃圾回收机制无法进行回收。
WeakMap的键只能是对象(Object)，无法是js基本类型(null, undefined, number, string, Boolean, symbol)，并且维持对对象的弱引用(即对象没有被其他地方引用时，将会被回收)，这意味着垃圾回收机制可以有效的回收WeakMap中的对象。
因此WeakMap无法被遍历，也无法拿到所有key