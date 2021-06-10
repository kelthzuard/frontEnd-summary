# package.json

每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）.

- name: 名字
- version： 版本
- repository：发布在哪里
- scripts：定义可运行的命令
- dependencies：定义线上需要依赖的包，使用npm install --save xxx
- devDependencies:定义只在开发时依赖的包，在线上不需要。在npm publish时不会被安装，使用npm install --save-dev xxx
- main:入口位置，默认为index.js

## package-lock.json

在进行npm install或手动修改package.json的内容后，会自动生成一个package-lock.json,这个文件记录了当前项目包的准确信息。  
当一个团队进行合作时都会默认从package-lock.json中安装，能保证所有人能得到同样的构建结果。  
如果要更新package-lock.json，可以用npm install xxxx@1.2的方式进行更新。