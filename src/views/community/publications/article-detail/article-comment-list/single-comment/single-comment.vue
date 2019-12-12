<template>
    <div class="sigle-top-comment">
        <div>
            <a-avatar :alt="comment.id" class="avatar-area">{{comment.id[0]}}</a-avatar>
            <span class="name-span">{{comment.id}} : </span>
        </div>
        <div class="comment-content">
            <span>{{comment.content}}</span>
        </div>
        <div>
            <span class="action-btn-group">
                <span slot="actions" class="action-btn" ><a-icon type="like" :theme="computedType(comment.liked)" @click="dislikeTheComment"/>: {{comment.like ? comment.like : 0}}</span>
                <span slot="actions" class="action-btn"  ><a-icon type="dislike" :theme="computedType(comment.disliked)" @click="likeTheComment"/>: {{comment.dislike ? comment.dislike : 0}}</span>
            </span>
            <span class="add-reply-link"><a @click="doShowInput">添加回复</a></span>
        </div>
        <br>
        <div class="sub-comment-text" v-if="showInput">
            <a-input-search placeholder="请添加回复" @search="onSubmitComment" v-on:blur="doHideInput" autofocus="true">
                <a-button slot="enterButton" type="primary">发送</a-button>
            </a-input-search>
        </div>
        <div class="expand-sub-comment-link">
            <a-button icon="message" size="small">展开回复</a-button>
        </div>
        <sub-comment-list/>
        <a-divider/>
    </div>
</template>
<script>
    import SubCommentList from './sub-comment-list/sub-comment-list'
    /*
    this is a top level comment of an article
     */
    export default {

        props:['comment'],
        components:{SubCommentList},
        data(){
          return {
              showInput:false
          }
        },
        methods:{
            computedType(flag){
                return flag ? 'filled':'outlined'
            },
            likeTheComment(){

            },
            dislikeTheComment(){

            },
            onSubmitComment(txt){
                //todo ---------
                txt.split();
            },
            doShowInput(){
                this.showInput = true;
            },
            doHideInput(){
                this.showInput = false;
            }
        }

    }
</script>
<style scoped>
    .sigle-top-comment{
        horiz-align: center;
    }
    .name-span{
        margin-top: 3px;
        margin-right: 10px;
    }
    .avatar-area{
        margin-right: 10px;
    }
    .add-reply-link{
        margin-top: 5px;
        margin-left: 20px;
    }
    .action-btn{
        margin-left: 25px;
    }
    .action-btn-group{
        margin-left: 1%;
    }
    .comment-content{
        padding-top: 5px;
        padding-left: 3%;
        padding-bottom: 5px;
        max-width: 90%;
    }
    .expand-sub-comment-link{
        margin-left: 2%;
        margin-bottom: 10px;
    }
</style>