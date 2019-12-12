<template>
    <div class="sub-comment-list">
        <div class="sub-comment">
            <div class="name-span">
                <span>一个dsb 回复 另一个dsb:</span>
            </div>
            <div class="comment-txt">
                <span>阿哈哈哈我们都是木头人 不许说话不许动阿哈哈哈哈我们都是木头人 不许说话不话不许动阿哈哈哈哈我们都是木头人 不许说话不话不许动阿哈哈哈哈我们都是木头人 不许说话不话不许动阿哈哈哈哈我们都是木头人 不许说话不许动</span>
            </div>
            <div class="action-btn-group">
                <span slot="actions" class="action-btn" ><a-icon type="like" />:2141</span>
                <span slot="actions" class="action-btn"  ><a-icon type="dislike"/>: 3</span>
            </div>
        </div>

    </div>
</template>
<script>
    /*
    this is a top level comment of an article
     */
    export default {

    }
</script>
<style scoped>
    .sub-comment-list{
        padding-left: 6%;
        padding-right: 15%;

    }
    .name-span{
        float: left;
    }
    .comment-txt{
        float: left;
        max-width: 50%;
    }
    .action-btn-group{
        float: left;
    }
    .sub-comment{
        float: top;
    }
</style>