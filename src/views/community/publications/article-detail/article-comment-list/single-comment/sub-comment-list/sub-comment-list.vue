<template>
    <div class="sub-comment-list">
        <div>
            <span class="name-span">一个dsb 回复 另一个dsb: </span>
        </div>
        <div class="comment-content">
            <span>阿哈哈哈我们都是木头人 不许说话不许动</span>
        </div>
        <div>
            <span class="action-btn-group">
                <span slot="actions" class="action-btn"  ><a-icon type="dislike" :theme="computedType(comment.disliked)" @click="likeTheComment"/>: {{comment.dislike ? comment.dislike : 0}}</span>
                <span slot="actions" class="action-btn" ><a-icon type="like" :theme="computedType(comment.liked)" @click="dislikeTheComment"/>: {{comment.like ? comment.like : 0}}</span>
            </span>
            <span class="add-reply-link"><a @click="doShowInput">添加回复</a></span>
        </div>
        <br>
        <div class="sub-comment-text" v-if="showInput">
            <a-input-search placeholder="请添加回复" @search="onSubmitComment" v-on:blur="doHideInput" autofocus="autofocus">
                <a-button slot="enterButton" type="primary">发送</a-button>
            </a-input-search>
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

}
</style>