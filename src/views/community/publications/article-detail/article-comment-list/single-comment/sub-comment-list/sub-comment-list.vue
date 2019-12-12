<template>
    <div class="sub-comment-list">
        <div class="sub-comment">
            <div class="name-span">
                <span>
                    <a>一个dsb</a> 回复 <a>另一个dsb:</a>
                </span>
            </div>
            <div class="comment-txt">
                <span>阿哈哈哈我们都是木头人 不许说话不许动阿哈哈哈哈我们都是木头人 不许说话不话不许动阿哈哈哈哈我们都是木头人 不许说话不话不许动阿哈哈哈哈我们都是木头人 不许说话不话不许动阿哈哈哈哈我们都是木头人 不许说话不许动</span>
            </div>
            <div class="action-btn-group">
                <span slot="actions" class="action-btn" ><a-icon type="like" />:2141</span>
                <span slot="actions" class="action-btn"  ><a-icon type="dislike"/>: 3</span>
            </div>
        </div>
        <div class="sub-comment">
            <div class="name-span">
                <span>
                    <a>一个dsb</a> 回复 <a>另一个dsb:</a>
                </span>
            </div>
            <div class="comment-txt">
                <span>一个短的评论</span>
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
        padding-left: 4%;
        padding-right: 15%;

    }
    .name-span{
    }
    .comment-txt{

    }
    .action-btn-group{

    }
    .sub-comment{
        float: top;
    }
</style>