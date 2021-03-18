# 浮点数精度问题

- js中只存在一种number类型即双精度浮点数(double)

## 原理

浮点数转二进制流程

- 浮点数乘以二，将整数位加入。
- 对乘以二后的小数位重复操作直到小数位为0。

由于这种机制，导致0.1转二进制为0.000110011......0011...... (0011无限循环)

IEEE 754标准规定浮点数可以表示为
![image](./img.png)

所以0.1转为双精度浮点数后为0.00011001100110011001100110011001100110011001100110011010

## 会遇到的坑

- 0.1 + 0.2 = 0.300000004 == 0.3(false)
- (1.335).toFixed(2) => (1.334999999).toFixed(2) = 1.33
- parseInt(0.58*100, 10) = 57

推荐的解决方案
- 用处理数学的类库，比如mathjs等

相关api
### toFixed()

```
Number.prototype.toFixed(digital) // digital代表小数点后面保留的位数
```

- toFixed会四舍五入，不足的位数保留0
- toFixed返回的是字符串，这点在做加法时要留意。

### toPrecision()

```
Number.prototype.toPrecision(digital) // digital代表保留的有效数字的个数。
```

- toPrecision保留的是有效数字的个数。
- 四舍五入和返回字符串与toFixed相同。

### valueOf()

- valueOf()返回指定对象的原始值，属于实例方法
- 在需要执行比较，相加的时候，会调用valueOf返回该实例的原始类型。

可以重新定义valueOf()函数来改变其转换为初始类型的值。

```
console.log(1 + {}) //输出1[object Object],
```
```
console.log(1 + {
    valueOf() {
        return 2
    }
}) // 输出3
```
```
var a = {}
a.valueOf = function() {
    return 2;
}
console.log(a+1) //输出3
```