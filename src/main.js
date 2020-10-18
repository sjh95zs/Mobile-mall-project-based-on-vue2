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

import Vuex from 'vuex';

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
Vue.use(Vuex);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH-mm-ss"){
    return moment(dataStr).format(pattern);
})

Vue.http.options.root = 'http://api.cms.liulongbin.top/'
// Vue.http.options.root = 'http://www.escook.cn:3000/';
// Vue.http.options.root = 'http://ww1.studyit.io/';
Vue.http.options.emulateJSON = true; //全局设置post表单数据格式


// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: { // this.$store.state.***
      car: car // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象， 咱们可以暂时将这个商品对象，设计成这个样子   
      // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
      addToCar(state, goodsinfo) {
        // 点击加入购物车，把商品信息，保存到 store 中的 car 上
        // 分析：
        // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
        // 2. 如果没有，则直接把 商品数据，push 到 car 中即可
  
        // 假设 在购物车中，没有找到对应的商品
        var flag = false
  
        state.car.some(item => {
          if (item.id == goodsinfo.id) {
            item.count += parseInt(goodsinfo.count)
            flag = true
            return true
          }
        })
  
        // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
        if (!flag) {
          state.car.push(goodsinfo)
        }
  
        // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      updateGoodsInfo(state, goodsinfo) {
        // 修改购物车中商品的数量值
        // 分析： 
        state.car.some(item => {
          if (item.id == goodsinfo.id) {
            item.count = parseInt(goodsinfo.count)
            return true
          }
        })
        // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      removeFormCar(state, id) {
        // 根据Id，从store 中的购物车中删除对应的那条商品数据
        state.car.some((item, i) => {
          if (item.id == id) {
            state.car.splice(i, 1)
            return true;
          }
        })
        // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      updateGoodsSelected(state, info) {
        state.car.some(item => {
          if (item.id == info.id) {
            item.selected = info.selected
          }
        })
        // 把最新的 所有购物车商品的状态保存到 store 中去
        localStorage.setItem('car', JSON.stringify(state.car))
      }
    },
    getters: { // this.$store.getters.***
      // 相当于 计算属性，也相当于 filters
      getAllCount(state) {
        var c = 0;
        state.car.forEach(item => {
          c += item.count
        })
        return c
      },
      getGoodsCount(state) {
        var o = {}
        state.car.forEach(item => {
          o[item.id] = item.count
        })
        return o
      },
      getGoodsSelected(state) {
        var o = {}
        state.car.forEach(item => {
          o[item.id] = item.selected
        })
        return o
      },
      getGoodsCountAndAmount(state) {
        var o = {
          count: 0, // 勾选的数量
          amount: 0 // 勾选的总价
        }
        state.car.forEach(item => {
          if (item.selected) {
            o.count += item.count
            o.amount += item.price * item.count
          }
        })
        return o
      }
    }
  })

new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
});