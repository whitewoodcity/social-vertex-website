## 简介

本项目为vert.x论坛的前端工程，基于vue-cli构建。

项目根目录为vertx-cn-blog，项目中有关进行开发工作的目录及文件，介绍如下：

- /src: 项目页面html js vue文件的存放目录
  - main.js: 项目入口文件
  - App.vue: 项目根元素(组件)
  - assets：静态资源(图片 样式存放位置) css img 的目录
  - router.js：项目路由配置文件目录
  - store.js：vuex配置目录，主要用于项目的全局状态配置
  - vue.config.js : vue项目配置文件
  - components: 项目子组件的存放位置(具体目录结构 根据实际需求自定)
  - views :与components目录作用相同 也可存放子页面/组件(具体待定，建议子页面的.vue文件)
  - index.js: 项目入口文件
- public/index.html :单页面应用的根结点

## 开发规范

### vue文件

正常情况下，我们只需要在components目录之下 创建我们自己的 vue组件(即 *.vue文件)。举个例子，来说明开发思路(单页面应用):
```vue
    <template>
      <div class="data-labeler">
        {{msg}}
        <br/>
        {{storeCount}}
        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
        <button type="button" class="btn btn-primary" v-on:click="addOne2Store">增加1</button>
        <button type="button" class="btn btn-primary" v-on:click="reduceFromStore">减少1</button>
      </div>
    </template>
    
    <script>
      import store from 'store'
      export default {
        name: 'DataLabeler',
        methods :{
          addOne2Store: function () {
            store.commit('add')
          },
          reduceFromStore: function () {
            store.commit('reduce')
          }
        },
        computed : {
          storeCount(){
            return store.state.count;
          }
        },
        data () {
          return {
            msg: 'I am DL'
          }
        }
      }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    
    </style>
```



其中 每一个.vue文件的内容大概分为3部分：

`<template/>`标签：主要用来定义组件的html样式，以及组件外观的显示
`<script/>`标签：用于管理.vue文件的依赖导入 以及 组件的导出，此处建议export的元素的name属性要与文件名称(除掉.vue后缀)相同，以规范我们的开发工作。 如果组件之间有依赖，则需要在父组件的 script标签中引入子组件，并注册到 父组件当中。

  例：
  ```vue
      //----  Parent.vue ---
      <template>
      	<div>
              <SubComponent/>    <!-- 注意此处,在渲染过程中，父组件通过这种方式，来使用子组件 -->
          </div>
      </template>
      <script>
      import SubComponent from '{sub-component-path}/SubComponent'  //<<<<<---- 此处导入子组件
          export default {
      		name: 'Parent',
              components:{
                  SubComponent  // <<<---- 注意此处 父组件的子组件在此处注册
              },
              methods:{
                  //......
              }
          }
      </script>
      <style scoped></style>
  ```

`<style/>`标签主要负责样式调整，这个标签里面写css脚本。如果标签内带有scoped属性，则将css样式的作用范围缩小到当前Component当中

### assets(静态文件)

用于存储静态文件 例如图片…. ，目录结构与components目录对应相同，即components路径下的组件所引用的静态资源 在assets中的路径相同。

### router(路由)

由于项目采用单页面应用，所以mvc模型完全由前端实现，即页面跳转 数据封装全部作为前端功能，因此必须把router功能以及规范作为独立模块进行维护。本项目中，router.js 文件做为该功能的维护者。

样例：

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ....blablabla

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
            path: '/common_frame',
            name: 'CommonFrame',
            component: CommonFrame,
            children: [
                {
                    path: 'choose_role',
                    component: ChooseRole
                },
                {
                    path: 'another_path',
                    component: AnotherPath
                }
            ]
        },
  ]
})
```


其中 存在嵌套关系的页面 采用父子方式的路由(格式如样例中routes的第三个元素CommonFrame),此种设计 需要结合`<router-view></router-view>`标签使用(nested-router)，具体用法参见此处。

### components/views

存放项目组件(子页面/组件)，组件目录结构根据实际需求 父子组件关系 业务关系等 自行进行整理，具体做法不作要求，但是结构必须清晰易懂 容易维护！！！

### 总结

关于具体的开发工作，程序员只需要在components目录当中 封装自己的 组件 ，将所有的文件都以.vue文件存储，每一个.vue文件就是一个component，不要进行dom操作！！！，一切业务以component组合 以及他们之间的数据传输的形式来实现。即(你只需要封装.vue文件，万物皆组件，万物皆component)。

### 线上部署方式(生产环境)

目前思路：使用webpack将前端工程打包成静态文件（html和js文件）, js中所有的http请求都强制要求以/api开头，目的在于提供给nginx做动态资源请求的转发标示。

开发过程中 需要在config/index.js文件中 加入proxyTable的配置，具体如下：

```js
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //todo 配置代理解决跨域
    proxyTable: {
        '/api':{
            target:'http://127.0.0.1:8081/',
            changeOrigin:true,
            pathRewrite:{
              '^/api':'/'
            }
        }
    },
      //..............
  }
}
```

这个配置的目的在于，在当前工程中 所有以 /api开头的请求 都会被转发到127.0.0.1:8081的url之下，并将/api替换为空字符串，决跨域问题。（注：这是vue-cli 2.x版本的做法），由于本项目构建时使用的是vue-cli3.x版本，所以没有生成工程目录结构于2.x版本有区别，即webpack相关配置都没有了,3.x版本取而代之需要在项目根目录下建立vue.config文件并在里面填写如下的配置内容(然鹅此配置还没有在本项目dev环境中证实有效，后续开发过程会更新此部分)：

```js
module.exports={
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:8081',
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  }
}
```



———————————————— 华丽的一条小分割线 ———————————————————

而在nginx当中 也需要配置一个这样的代理转发，因此 这就是强制要求开发过程中所有ajax请求都必须以/api开头的原因。

运行npm run build ，在项目根目录下会生成一个/dist 文件夹，这个文件夹包含着项目所有的静态文件。

将该文件夹放置到某一目录下 比如叫${rootDir}目录，然后修改nginx的配置文件 nginx.conf：

注：以下文件内容 除了 server当中的两个 location属性需要配置之外，其他都是默认配置,因此，注意两个location的配置

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       8090;
        server_name  localhost;

        location / {
                root /${rootDir}/dist;   # <<<<------ webpack打包之后 文件存放的位置
                index Index.html;     # <<<<------ dist目录下的index文件名称
	      }
        location /api/ {
                proxy_pass http://127.0.0.1:8081/;  # <<<<------ 请求转发地址
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
    include servers/*;
}
```


其中 第一个location对应/ 将静态资源的root目录指向到我们刚才创建的 ${rootDir}/dist目录，首页文件指向到Index.html（即dist当中的Index.html，注意大小写，此处webPack生成的首页文件首字母大写）。

随后配置请求代理转发，即第二个location属性 /api/，这个配置的目和前述proxyTable配置目的相同，即把所有js脚本当中以 /api开头的ajax请求 都会被转发到127.0.0.1:8081的url之下，其中proxy_pass属性即指向后端服务，这个属性 根据实际线上服务运行ip而配置。

随后启动后端服务，过程略。

随后运行nginx启动nginx服务，访问localhost:8090 则可以看到首页。



## 补充说明

`article` ` thought` ` questions`等实体通用数据结构如下(例子)

```js
{
  "type":"publication",
  "subtype":"article",//publication类型，枚举("article","thought","question"...)
  "title":"title",//题目(thought中只有title字段)
  "content":"content",//内容 帖子内容(thoutht中没有content)
  "answers":[
    {
      //todo
    },
    {}
  ],
  "titleImgLink":"link2img",
  "authorId":"$authorId",//作者用户id
  "authorNickname":"$authorNickName",//作者的昵称
  "starts":100,//收藏数量
  "likes":100,//顶
  "dislikes":100,//踩
  "comments":100//回复数量
}
```



## 优化

[user-info缓存优化](./user-info-cache.md)