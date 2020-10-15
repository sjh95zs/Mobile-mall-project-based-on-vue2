<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120"></textarea>
        <mt-button size="large" type="primary">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>
        </div>
        <mt-button size="large" type="danger" plain>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0px;
    }
    .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}

    
</style>