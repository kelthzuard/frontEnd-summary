# react 性能优化

## pureComponent 和 React.memo(functionComponent)

都是比较props有无变化决定是否继续渲染。

## pureComponent原理

pureComponent用浅比较对比state和Props是否相等，如果相等则不进行update

步骤

- 使用Object.is对比两个值（object.is基本和===一致，会对比对象的地址，和===不同的是不会将+0,-0视为相等。）
- 遍历对象的所有属性，并且使用Object.is对比两个属性值是否相等。即浅比较，只比较一次。