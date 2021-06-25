# webpack

## 为什么需要webpack，webpack能做什么

随着前端发展，各种工具需要编译才能使用，webpack简化各个过程，将各种开发模块转换为能直接使用的js，html，css代码。  
webpack的功能包括：

- 代码转换：将vue，ts，es6等编译成js，将scss等编译成css
- 代码分割：将公共代码或库代码，或者异步代码单独分离出来。实现首屏加载的时间压缩。
- 文件优化：代码混淆和压缩，图片等资源压缩或者转译成base64等
- 模块合并：将散落在各处的模块文件合并为一个js文件，从而大大节省网络资源，降低服务器压力。
- 热更新：在开发过程中能及时进行更新，优化开发效率。

## webpack的构建流程

1. 初始化参数：读取webpack的配置文件，将webpack配置文件和shell的配置参数合并，作为项目的配置文件。
2. 开始编译：根据参数初始化全局唯一complier对象，加载全部配置的插件。（插件类似于watcher，complier为observer，初始化watcher把自己注册进complier的生命周期中）
3. 确定入口：根据配置中的```entry```确定入口文件。
4. 编译文件：从入口文件调用loader对模块进行翻译，在找到模块依赖的模块递归进行翻译，直到全部依赖模块翻译完成。
5. 完成编译：在第四步调用loader进行编译完成后，得到了所有模块的翻译内容和他们之间的依赖关系。
6. 输出资源：根据入口和模块的依赖关系，组装成一个个包含多个模块的chunk。再把每个chunk转换成一个单独的文件到输出列表
7. 输出完成：再确定好输出内容后，根据配置确定输出的路劲和文件名，把文件写入系统。

在此过程中，complier会在特定的生命周期向插件进行广播，插件可以在监听到生命周期后进行操作改变输出。

## loader和plugin区别

- loader是一个纯粹的函数，在函数中收到的文件进行转换再输出。loader再module中配置，通过test匹配需要修改的模块，调用loader中定义的loader进行处理
- plugin是一个tapable实例，会监听webpack的生命周期并调用api进行修改，plugin是一个数组，存储引入的插件的实例。

## 常用loader

- 把es6转换成es5: ```babel-loader```
- 处理一系列的css ```sass-loader```将scss转换成css -> ```css-loader```加载css，支持模块化导入等 -> ```style-loader```把css代码注入到css中，利用DOM操作去加载css
- 处理图片  ```image-loader```加载并压缩图片 -> ```url-loader```设置一个最大文件大小，低于该大小的会转化为base64编码进行嵌入 -> ```file-loader```将图片和其他资源文件作为```url```的形式进行引入。
- ```ts-loader```引入typesript
- ```vue-loader```引入vue后缀文件
- ```eslint-loader```引入eslint
- ```source-map-loader```引入额外的sourcemap进行调试

## 常用plugin

- ```DefinePlugin```用来定义```process.env```区分开发环境和生产环境
- ```HtmlWebpackPlugin```用来自动生成html文件
- ```mini-css-extract-plugin```用来提取css到单独的文件中
- ```splitchunksplugin```用来分离公共代码，mainfest代码和公共库的代码
- ```uglifyjs-webpack-plugin```：代码混淆已经压缩
- ```webpack-parallel-uglify-plugin```:并行化的uglify，更快。

## 优化用户体验

1. 使用```uglifyjs-webpack-plugin```进行代码压缩
2. 设置```publicPath```放置到CDN上进行CDN加速
3. 提取公共代码  
在导出js，css文件的时候，可以设置文件指纹，分为三种
    - hash：和整个项目的构建相关，项目改变就改变
    - chunkHash：和webpack打包的chunk有关，不同的入口生成不同的chunkhash
    - contentHash：文件内容改变才改变  

一般设置js为chunkHash，设置css为contentHash。设置图片等为hash  
为了实现最大缓存效率，即不改变的css和静态资源文件缓存周期较长，容易改变的js文件缓存周期最长。公共库文件等缓存较长。需要如下操作  
- 分离runtime将mainfest作为单独的chunk进行分离。runtime是webpack构建时的完整链接，其保留了所有细节作为mainfest。分离mainfest后文件更改contentHash就不会更新。
- 分离vendor，将公共部分代码或者公共库代码比如element-ui这种作为vendor进行分离。防止多个模块对一个大的公共模块进行重复加载
4. tree shaking：tree shaking可以删除模块中没有使用的方法，利用的原理是es6模块化的特性。es6模块应用可以在编译阶段就确定引用，可以使用静态分析。所以tree shaking必须是纯es6模块化代码。并且代码必须无副作用，无副作用的意思就是引入时不会对任何全局变量，外部环境进行修改。纯函数式

## 优化打包速度

1. 使用```webpack-bundle-analyzer```分析webpack打包后更模块的体积。
2. 使用高版本的nodejs和webpack
3. 缩小打包作用域的范围
   1. loader中exclude，include只搜索实际代码的部分(src)
   2. resolve.modules直接指定第三方库，减少寻找范围
   3. resolve.extensions指定没有使用后缀时寻找文件后缀的范围，尽量长度短。
4. 分离代码：使用```splitChunkPlugin```插件分离公共代码和库代码
5. 使用externals排除大的包，比如vue,element-ui，使用cdn进行引入不进行打包。 
6. 使用```webpack-parallel-uglify-plugin```并行执行代码压缩
7. 使用tree shaking去除无用代码
8. 开启缓存,使用```Dllplugin```进行动态链接(缓存)

## 热更新原理

热更新一共需要者几个模块

- webpack:负责编译代码
- webpack-dev-middleware:负责构建内存文件,监听文件
- HotMofuleReplacement runtime负责注入到客户端并更新代码

流程

- 启动dev-server，webpack开始构建，向entry文件注入热更新代码
- webpack-dev-middleware负责监听文件内容并把文件导入到内存中，如果文件更新通知webpack进行编译
- wenpack编译完成发出done事件通知server
- server通过websocket通知client更新文件的hash
- client收到后向server发送请求当前需要更新的文件的mainfest
- client收到后对比当前module，通过jsonp再次发送请求的js文件
- runtime更新文件，完成更新。

### runtime mainfest

- runtime: 在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。它包含：在模块交互时，连接模块所需的加载和解析逻辑。简单理解就是所有代码
- mainfest：就是webpack会把你的代码结构拆成很多小块，mainfest保留着各个模块的关联关系和要点，runtime能根据mainfest快速找到关联关系。

![image](./img.jpg)

## 编写loader

## 编写plugin