# getter

```
get prop() {} // prop
get [expression]() {} // expression为变量
```

1. 可以给对象绑定getter，使得其可以非显式调用来获得内部值
2. 不能给存在该属性的对象添加getter
3. 在class中使用时，get会添加在实例的原型上，defineProperty会定义在实例上。

```
var obj = {
    val: 1,
    get getVal() {
        return this.val
    }
}
console.log(obj.getVal) // 输出1
Object.defineProperty(obj, "getVal2", {get: function() {return this.val+1}}); // 对于已经存在的对象可以用defineProperty进行添加。
console.log(obj.getVal2) // 输出2
var temp = 'getVal3'
var obj2 = {
    get [temp]() { // 变量使用[]添加。
        return 4
    }
}
console.log(obj2.getVal3)
```

实例：懒加载
- 如果有一个属性需要大量的计算获得其初始值，可以用getter实现在第一次需要使用时才加载，并且在以后设置为属性值无需加载。
```
var obj3 = {
    get important() {
        // 进行复杂的计算
        delete this.important; // 删除get
        return this.important = 1 // 设置为对象属性。
    }
}
console.log(obj3.important)
```

# setter 

```
set prop() {} // prop
set [expression]() {} // expression为变量
```

```
var obj = {
    val: 1,
    set add(x) {
        this.val += x;
    }
}
obj.add = 1;
console.log(obj.val);
```