<template>
    <div class="goods-list">
        <!--编程式导航-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id"
        @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>

        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            //data是往自己组件内部，挂载一些私有的数据
            goodslist: [],
            pageindex: 1
        }
    },
    created(){
        this.getDoodsList();
    },
    methods: {
        //获取商品列表
        getDoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then( res =>{
                if(res.body.status === 0){
                    this.goodslist = this.goodslist.concat(res.body.message);
                } else {
                    Toast("获取商品失败！")
                }
            }).catch((e) => {})
        },
        getMore(){
            this.pageindex++;
            this.getDoodsList();
        },
        getDetail(id){
            //使用js的形式进行路由导航
            //1.传递字符串
            // this.$router.push('/home/goodsinfo/' + id);
            //2.传递对象
            // this.$router.push({path: '/home/goodsinfo/' + id});
            //3.// 命名的路由
            this.$router.push({ name: "goodsinfo", params: { id } });
            //this.$route和this.$router的区别
            //其中，this.$route是【路由参数对象】，所有路由中的参数，params，query都属于它
            //其中，this.$router是一个【路由导航对象】，用它，可以方便使用js代码，实现路由前进、后退，跳转到新的url地址

        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 6px;
        justify-content: space-between; 

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow:  0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .goods-title{
                font-size: 14px;

            }
            .goods-info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .goods-price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 14px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .goods-sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }
</style>