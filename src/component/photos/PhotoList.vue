<template>
    <div>
            <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表区域-->
            <ul class="photo-list">
                <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li"> <!--可以通过配置 tag 属性生成别的标签-->
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <h1 class="info_title">{{ item.title }}</h1>
                        <div class="info_body">{{ item.zhaiyao }}</div>
                    </div>
                </router-link>
            </ul>

    </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";
import {Toast} from 'mint-ui';
export default {
    data() {
        return {
            cates: [], // 所有分类的列表数组
            list: [] // 图片列表的数组

        }
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    mounted(){
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },

    methods: {
        getAllCategory(){
            this.$http.get('api/getimgcategory').then( res =>{
                if(res.body.status === 0){
                    res.body.message.unshift({ title: "全部", id: 0 });
                    this.cates = res.body.message;
                } else {
                    Toast("获取图片失败！-2")
                }
            }).catch((e) =>{})
        },
        getPhotoListByCateId(cateId){
            //根据分类id获取图片列表
            this.$http.get('api/getimages/' + cateId).then( res =>{
                if(res.body.status === 0){
                    this.list = res.body.message;
                } else {
                    Toast("获取图片失败！-1")
                }
            }).catch((e) =>{})
        }
    },

}
</script>

<style lang="scss" scoped>
    *{
        touch-action: none;
    }
    .photo-list{
        list-style: none;
        margin: 0px;
        padding: 0px;
        padding-bottom: 0px;
        li{
            text-align: center;
            background-color: #cccccc;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img{ 
                width: 100%;
                vertical-align: middle ;
            }
            image[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                color: white;
                position: absolute;
                text-align: left;
                bottom: 0px;
                background-color: rgba(0,0,0,0.4);
                max-height: 84px;

                .info_title{
                    font-size: 14px;
                }
                .info_body{
                    font-size: 13px;
                    
                }
            }
        }
    }
</style>