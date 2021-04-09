# jgq
>内容组优秀游戏模板展示


加入游戏的流程：
在trunk的cocos_trunk_web分支加上这个游戏，然后截图一个封面图，然后把封面图放入cover目录下。
在vue项目中的configSample中加入对应的配置。

发布流程：
首先将代码push上去，push之前不用打包。
http://jenkins.100daishu.com/job/sample/ 去这个网址发布。没账号没权限找福浩（运维）要。
点击左侧 Build with Parameters按钮，选择master分支然后写上版本号，点击开始构建。