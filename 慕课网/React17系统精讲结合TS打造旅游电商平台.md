#### 问题

1. 如何启动一个React项目？

- npm install
- npm run start

2. 如何启动一个TypeScript版本的React项目？

- npm install
- npm run start

3. create-react-app

react的一个官方脚手架

4. npm和yarn的区别是什么

- 并行安装：无论npm还是Yarn在执行包的安装时，都会执行一系列任务。npm是按照队列执行每个package，也就是说必须要等到当前package安装完成之后，才能继续后面的安装。而Yarn是同步执行所有任务，提高了性能。
- 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。
- 安装版本统一：为了防止拉取到不同的版本，Yarn有一个锁定文件(lock file)记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn就会创建（或更新）yarn.lock这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm其实也有办法实现处处使用相同版本的packages，但需要开发者执行 npm shrinkwrap命令。这个命令将会生成一个锁定文件，在执行npm install的时候，该锁定文件会先被读取，和Yarn读取yarn.lock文件一个道理。npm和Yarn两者的不同之处在于，Yarn默认会生成这样的锁定文件，而npm要通过shrinkwrap命令生成npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages版本信息才会被记录和更新。
- 更简洁的输出：npm的输出信息比较冗长。在执行npm install<package>的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn简洁太多：默认情况下，结合了emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。
- 多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是npm要么是bower, 防止出现混乱不一致。
- 更好的语义化：yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比npm原本的install/uninstall要更清晰。

5. tsconfig.json有什么作用

配置规则

6. 如何配置typescript编译器

vscode安装typescript插件

7. npm和yarn

从package.json中安装项目依赖：

  ```javascript
  npm install
  yarn
  ```

向package.json添加/安装新的项目依赖：

  ```javascript
  npm install {库名} --sava
  yarn add {库名}
  ```

8. 删除依赖项目

  ```javascript
  npm uninstall package --sava
  yarn remove package
  ```

9. 升级某个依赖项目

  ```javascript
  npm update --sava
  yarn upgrade
  ```

10. 全局安装某项目依赖

 ```javascript
  npm install package -g
  yarn global add package
  ```