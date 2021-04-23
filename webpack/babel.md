# babel

## 流程

- 将原始代码进行词法分析，将源代码转换为token数组。token数组是一些语法片段组成的数组。每个token包含类别，值，位置信息等。
- 引用解析器将tokens转换为抽象语法树AST(abstract syntax tree),AST是一颗语法树。每一个节点都是有意义的语法单元。
- 调用traverser将AST进行深度遍历，对节点进行转换，增删查改。进行代码转换和压缩等
- 把AST转换成原始的js

## 运用的模块

- @babel-core:babel内核
  - 加载配置
  - 加载插件
  - 调用parser进行语法转换
  - 调用Traverser进行遍历AST并转换
  - 生成代码和source map
- @babel-parser：将tokens进行语法分析转换成AST树
- @babel-traverse：深度遍历AST树，利用访问者模式（只关系某种类型的节点并且以此调用插件）进行修改
- @babel-generator:将源代码转换成js，并支持source map

![image](./img.png)