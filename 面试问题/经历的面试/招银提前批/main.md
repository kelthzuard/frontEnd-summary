# 招银提前批一面

1. js数据类型
2. async，defer区别
3. 判断数据类型方法
4. null instanceof Object
5. typeof NaN === 'number'
6. 
```
async function func1() {
    console.log('1s')
    await func2()
    console.log('1e')
}

async function func2() {
    console.log('2')
}

func1()

输出1s, 2, 1e
```

6. 手写apply
7. 手写map
8.  css实现单行文本溢出隐藏
9.  页面性能优化方案
10. 怎么监控页面性能优化结果
11. vue key的作用
12. vue双绑的原理
13. vue array长度变化是否能监测到。