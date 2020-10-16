<template>
    <div class="photoinfo-container">
        <h3>{{photoInfo.title}}</h3>
        <p>
            <span>发表时间: {{ photoInfo.add_time | dateFormat }}</span>
            <span>点击: {{photoInfo.click}}</span>
        </p>
        <hr>
        <!--缩略图--> 
        <div class="thumbs">
            <img class="preview-img" v-for="(item,index) in list " :key="item.src" :src="item.src" height="100" @click="$perview.open(index,list)">
        </div>

        <!--图片内容-->
        <div class="content" v-html="photoInfo.content"></div>
        <!--评论子组件-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue';
import {Toast} from 'mint-ui';
export default {
    data() {
        return {    
            id: this.$route.params.id,  // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
            photoInfo: {},
            list: [] //缩略图的数组
        }
    },
    created(){
        this.getImgInfo();
        this.getThumImg();
    },
    methods: {
        getImgInfo(){
            this.$http.get('api/getimageInfo/'+ this.id)
            .then( res =>{
                if(res.body.status === 0){
                    this.photoInfo = res.body.message[0];
                } else {
                    Toast('获取图片信息失败！')
                }
            }).catch((e) =>{})
        },
        getThumImg(){
            //获取缩略图
            this.$http.get('api/getthumimages/' + this.id)
                .then(res =>{
                    if(res.body.status === 0){
                        //循环每个图片数据，补全图片的宽和高
                        res.body.message.forEach( item =>{
                            item.w = 600;
                            item.h = 400;
                        })
                        this.list = res.body.message;
                    } else {
                        Toast('获取图片信息失败！')
                    }
                }).catch((e) =>{

            })
        }
    },
    components: {
        'comment-box': comment
    }
}
</script>

<style lang="scss" scoped>
    .photoinfo-container{
        padding: 3px;
        h3{
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15 auto;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            line-height: 30px;
            font-size: 13px;
        }
        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>