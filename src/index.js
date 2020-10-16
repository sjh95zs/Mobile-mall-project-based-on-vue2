// 这里main.js是程序的入口

//1.导入jQuery

// import $ from 'jquery'
// import './css/index.css'

// 注意: webpack,默认只能打包处理js类型的文件，无法处理其他非js类型的文件
//如果要处理非js类型的文件，需要手动安装一些合适 的第三方loader加载器
//1.如果想要打包处理css文件，需要安装npm i style-loader css-loader -D
//2.打开webpack.config.js 这个配置文件，在里面新增一个配置节点，叫做module，他是一个对象，在这个module对象身上，
//有个rules属性，这个rules属性是个数组，在这个数组中，存放了所有第三方文件的配置和处理规则

// $(function(){
//     $('li:odd').css('backgroundColor','white')
//     $('li:even').css('backgroundColor',function(){
//         return '#' + 'D97634'
//     })
// }) 

//使用webpack-dev-server 这个工具，来实现自动打包编译功能

//1.运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖

//2.安装完毕后，这个工具的用法和webpack命令的用法完全一样

//3.由于，我们是在项目中，本地安装的webpack-dev-server，所以，无法把它当做脚本命令，在powershell终端中直接运行

//4.注意:webpack-dev-server这个工具，如果要正常运行，要求在本地项目中，必须安装webpack，而且版本必须对应，不能一高一低

//5.webpack-dev-server帮我们打包生成的bundle.js文件，并没有存放到实际的物理磁盘上，而是直接托管到了电脑内存中，所以我们在项目根目录中，找不到这个打包好的bundle.js

//6.我们可以认为，webpack-dev-server把打包好的文件，以一种虚拟的形式，托管到了咱们项目的根目录中，虽然我们看不到它，但是，可以认为，和dist src node_modules 平级，有一个看不见的文件，叫做bundle.js


//入口文件

// import Vue from 'vue';

//导入路由的包

// import VueRouter from 'vue-router';

//安装路由

// Vue.use(VueRouter);

//导入mint-ui

// import MintUI from 'mint-ui';

//注册mintui

// Vue.use(MintUI);

//导入自己的router.js 路由模块

// import router from './router.js';

//导入App根组件

// import app from './App.vue';

// var vm = new Vue({
//     el: '#app',
//     render: c => c(app),
//     router //路由挂载到VM实例上
// })


import Vue from 'vue';

import app from './App.vue';

import VueRouter from 'vue-router';

import router from './router.js';

import VueResource from 'vue-resource';

import moment from 'moment';

import VuePreview from 'vue-preview';

// import {Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui';

import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';

import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
Vue.use(MintUi);
Vue.use(VuePreview);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH-mm-ss"){
    return moment(dataStr).format(pattern);
})

Vue.http.options.root = 'http://api.cms.liulongbin.top/'
// Vue.http.options.root = 'http://www.escook.cn:3000/';
// Vue.http.options.root = 'http://ww1.studyit.io/';
Vue.http.options.emulateJSON = true; //全局设置post表单数据格式

new Vue({
    el: '#app',
    render: c => c(app),
    router
});