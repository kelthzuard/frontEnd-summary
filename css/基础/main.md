# css基础

## css引入方式和区别

1. 链接方式

- css文件在第一次加载时引入，在切换html时只需加载html即可

```
<link rel='stylesheet' type='text/css' href='style.css'>
```

2. 导入方式

```
@import url(style.css)
```

### 两种方式区别

1. 链接方式属于xhtml范畴，除了css还可以引入其他。@import属于css范畴，只能引入css
2. 链接方式载入时和网页文件同时加载，导入方式在网页载入完成后才加载
3. 链接方式支持用js控制DOM修改样使，导入方式不支持。
4. import适合用于引入公共库，link适用于引用业务
5. import引用的会在link上方，同样优先级会被覆盖。

## 选择器优先级

- 内联样式：1000
- ID选择器：100
- 类(伪类)选择器：10
- 元素(伪元素)选择器：1

## 伪类伪元素

### 伪类

1. 指定位置
    - :first-child
    - :last-child
    - :nth-child
2. 用户行为
    - :hover
    - :active

nth-child:指子节点
element:nth-of-type:指该节点相同类型得兄弟节点。比如
p:nth-of-type(2n) 指p节点得偶数节点，其他非p节点不参与计数。

### 伪元素

- ::first-line
- ::before
- ::after

伪元素特点

- 视觉效果上添加元素,但实际上不存在于文档流
- 不利于调试,不利于SEO

可以用before，after来实现箭头。详见```/实现/纯css箭头```

## css盒模型

### display

- 行内元素inline:可以并排，不能设置宽度和高度。宽度和高度由里面的文字决定
  - span
  - strong
  - a
- 块级元素block:不能并排，可以设置宽度和高度，默认宽度100%父级
  - p
  - div
  - h
- 行内块级元素inline-block:可以并排，可以设置宽度和高度
  - img
  - select

### 正常盒模型

- margin,border,padding,content
- width的长度取决于content

### IE盒模型

- width的长度 = border + padding + content
- 使用```box-sizing = border-box```来切换为IE盒模型。

### 外边距折叠

```margin-top```和```margin-bottom```相邻会取较大的一个，不会取其和。

## position

- 设置postion为absolute，top:0,left:0,right:0,bottom:0,会继承父元素的宽高
- 相同情况下设置宽高，并margin: auto，会自动计算位置，等于垂直居中。

## 默认继承的样式

- visibility
- 所有文字相关的样式: font-size, color, font-weight, white-space, line-height, text-decoration

## z-index

z-index需要设置父级和当前位置的定位都不为postition:static,可以为其他position值或者flex等

## position

- static
- relative
- absolute(脱离文档流)
- fixed （脱离文档流）
- sticky

子元素为absolute和relative时，会相对第一个position不为static的父元素定位。  
如果父元素为relative或absolute或fixed进行了偏移时，子元素也会相对偏移后的位置定位。

stick当其在视口范围内时为relative，否则为fixed。如果其父元素不在视口范围内，则其消失

## top，left和translate区别

- top和left是相对于文档流定位，改变的是自身的真实位置
- translate真实位置不改变，改变的是视觉位置
- translate改变用的是合成层。没有回流和重绘

## unset, inital, inherit, all

- inital: 设置为css该属性预设的初始值
- inherit：继承父元素的该样式
- unset：该属性默认继承时设置为继承，否则为inital
- all：表明所有css属性，设置值只能为unset，inital盒inherit