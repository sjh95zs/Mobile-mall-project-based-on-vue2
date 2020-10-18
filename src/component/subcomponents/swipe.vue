<template>
    <div>
        <mt-swipe :auto="4000">
            <!--将来谁用轮播图，谁传递list-->
            <!--此时，lunbotulist应该是父组件向子组件传值来设置-->
            <mt-swipe-item v-for="item in swipeList" :key="item.url">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ["swipeList","isfull"]
}
</script>

<style lang="scss" scpoed>
    .mint-swipe{
        height: 200px;
    }
    .mint-swipe-item{
        text-align: center;
        img{
            // width: 100%;
            height: 100%;
        }
    }
    .full{
        width: 100%;
    }
</style>