import VueRouter from 'vue-router';
//创建路由对象

import HomeContainer from './component/tabbar/HomeContainer.vue';
import SearchContainer from './component/tabbar/SearchContainer.vue';
import MemberContainer from './component/tabbar/MemberContainer.vue';
import ShopcarContainer from './component/tabbar/ShopcarContainer.vue';
import NewsList from './component/news/NewsList.vue'
import NewsInfo from './component/news/NewsInfo.vue';
import PhotoList from './component/photos/photolist.vue'
import PhotoInfo from './component/photos/photoinfo.vue'
//导入路由模块


var router = new VueRouter({
    routes:[
        { path: '/' , redirect: '/home'},
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer},
        { path: '/search', component: SearchContainer},
        { path: '/shopcar', component: ShopcarContainer},
        { path: '/home/newslist', component: NewsList},
        { path: '/home/newsinfo/:id', component: NewsInfo},
        { path: '/home/photolist', component: PhotoList},
        { path: '/home/photoinfo/:id', component: PhotoInfo}
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

export default router