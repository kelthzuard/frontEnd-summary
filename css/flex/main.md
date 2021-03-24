# flex

父级属性

- diplay: flex
- flex-direction: row, column 默认row
- flex-wrap: wrap, nowrap 默认nowarp
- justify-content: flex-start, flex-end, center, space-between, space-around 默认flex-start
- align-item: flex-start, flex-end, center, baseline, stretch 默认stretch，撑满交叉轴的所有高度
- align-content: flex-start, flex-end, center, stretch, space-between, space-around 默认stretch占满整个交叉轴

子级属性

- flex: flex-grow, flex-shrink, flex-basis
  - flex-grow 放大比例，0不放大，1放大，默认0
  - flex-shrink：缩小比例：默认1
  - flex-basis:占项目百分比，默认auto原始，0不占，100%占满
  - flex：1或auto 即 1，1，auto默认放大
- order：排列顺序
- align-self：与align-items属性相同，允许子级属性拥有自己的交叉轴排列方式。