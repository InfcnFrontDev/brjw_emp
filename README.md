# 能源管理平台
Simple React Webpack Babel Starter Kit

this is a [React](https://facebook.github.io/react/), [Webpack](http://webpack.github.io/) and [Babel](https://babeljs.io/) application.


### 运行

开始之前，检查系统是否安装 [nodejs](https://nodejs.org/en/) 。

* 安装依赖库:

```
npm install
```

* 运动开发模式，启动服务:

```
npm start
```

打开浏览器，访问 `http://localhost:3000/`

### 发布构建

```
npm run build
```

### 目录介绍

* [public]：Web应用程序的根目录，是最终要发布的目录。
    * [app]：系统外层框架的JS代码，使用的是ExtJS的MVC架构，官网有例子和文档。
    * [css]：css样式的存放目录，目录下所有theme-*.css文件是主题特有的样式。
    * [data]：存放是的默认主页中Echarts图的Json数据。
    * [images]：图片的存放目录。
    * [js]：js脚本的存放目录。app.js是首页框架的入口。config.js是系统一些参数的配置文件。
    * [pages]：内容页的存放目录。包括stage.html、table.html等。
    * [plugins]：第三方插件的存放目录，包括jquery、fabric等。
    * [scripts]：存放原系统中使用到js脚本。
    * [temp]：与原系统中temp目录一致。
    * index.html：首页。
    * login.html：登录页。
* [src]：中间内容页的源代码目录，最终会通过webpack编译打包发布到[/public/pages/]目录中。
        编码采用是react + webpack + babel 架构。
    * [common]：存放通用的工具类或方法。包括ajax接口请求、动态脚本加载、通用的工具方法等。
    * [components]：存放通用组件。
    * [pages]：所有内容页目录，目录每个子目录最终都会生成一个html页面和一个js脚本。
        * [stage]：会生成stage.html，对应原系统中Pages/StageWebPage.aspx页面。
            * index.jsx：页面的入口。
            * template.html：页面的html模板。
            * app.jsx：页面的根应用组件。
            * StageWebPage.jsx：页面的内容组件。
            * [...]
        * html：同上，略。
        * [word、excel、....]
* webpack.*.config.js：webpack编译打包的配置文件。
* 其他文件不重要，不介绍了。


### 对原Asp.net项目的修改

* 原系统只用到了两个接口，菜单接口（MenuService.ashx）和内容页接口（PageService.ashx）
* MenuService.ashx接口是原有的，做了一些修改，加了一种类型ExtTree。
* PageService.ashx接口是新加的，所有内容页都使用这一个接口，处理逻辑是：将LivePage对象转换成Json格式，并输出。
    转换过程中自己实现的Json解析，目前只是把用到的数据解析出来了，没有用到的暂时没有处理。
* 为了方便开发，暂时把登录权限给屏蔽掉了。

```
// 菜单接口
http://192.168.1.165/WebServices/MenuService.ashx
    ?statusCode=ExtTree&_dc=1483684190052&pid=0&node=0
    
// 内容页接口
http://192.168.1.165/WebServices/PageService.ashx
    ?pageid=9f36ee14-0b69-4d24-a363-f3c9498a24d7
    &linkid=4d4bdece-c0ab-4854-b4ec-0acb569d623a
    &title=烧成车间能效分析
    &debug=1
```

### 目前做了哪些工作

* 首页框架和换皮肤完成。
* 左侧菜单树完成。
* 登录页有了，功能还没有实现。
* 默认主页重新做了，图表可以自适应大小。
* stage.html：部分实现，图元基本上都可以初始化出来，单击跳转的动作实现了，数据集没有搞懂，还没有实现。
* html.html：简单实现了，还需要完善。
* table.html：做了一点还没有实现，内嵌页面遇到了一些问题。
* newmap.html：实现了初始化，还需要完善。
* heatmap.html：实现了初始化，还需要完善。
* word.htmli：还没有做。
* excel.html：还没有做。
* layout.htmli：还没有做。
* input.html：还没有做。
* slide.html：还没有做。
* slide.html：还没有做。
* energybalance.html：实现了初始化，还需要完善。


### 注意 

* 编辑[src]目录中的文件时，要开启开发模式，编辑完成会实时编译刷新，或者重新构建。
