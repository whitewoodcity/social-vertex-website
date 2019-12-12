<template>
    <div class="single-sub-comment">
        <div class="sub-comment">
            <div class="name-span">
                <span>
                    <a>{{subComment.id}}</a> 回复 <a>{{subComment.commented_user_id}}:</a>
                </span>
            </div>
            <div class="comment-txt">
                <span>{{subComment.content}}</span>
            </div>
            <div class="action-btn-group">
                <span slot="actions"><a-icon type="like" :theme="computedType(subComment.liked)" />:{{subComment.like ? subComment.like : 0}}</span>
                <span slot="actions" class="action-btn"><a-icon  type="dislike" :theme="computedType(subComment.disliked)"/>: {{subComment.dislike ? subComment.dislike : 0}}</span>
                <span class="reply-link"><a v-on:click="switchShowInput">回复评论</a></span>
            </div>
            <div class="comment-txt-input" v-if="showInput">
                <a-input-search placeholder="请添加回复" v-model="topCommentTxt" @search="onSubmitComment" :autoFocus=true>
                    <a-button slot="enterButton" type="primary">发送</a-button>
                </a-input-search>
            </div>
        </div>
    </div>
</template>
<script>
    /*
    this is a top level comment of an article
     */
    export default {
        props:["subComment","topComment"],
        methods:{
            refreshParent(){
                this.$parent.refreshSubCommentsList();
            },
            switchShowInput(){
                if (this.showInput) {
                    this.doHideInput();
                }else{
                    this.doShowInput();
                }
            },
            doShowInput(){
                this.showInput = true;
            },
            doHideInput(){
                this.showInput = false;
            },
            computedType(flag){
                return flag ? 'filled':'outlined'
            },
            onSubmitComment(value){
                let txt = value;
                if (txt == null || txt.length === 0){
                    this.$message.warn("请输入评论内容");
                    return;
                }
                if (txt.length > 300){
                    this.$message.warn("输入内容过长，请不要超过300字哦～");
                    return;
                }
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"comment",
                    "content":txt,
                    "dir": this.topComment.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            this.$message.info("评论成功");
                            this.topCommentTxt = '';
                            this.doHideInput();
                            this.refreshParent();
                        }else{
                            this.$message.error(response.data.info);
                        }
                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
            }
        },
        data(){
            return {
                showInput:false,
                topCommentTxt:''
            }
        }

    }
</script>
<style scoped>
    .single-sub-comment{
        padding-left: 4%;
        padding-right: 15%;

    }
    .name-span{
        margin-bottom: 5px;
    }
    .comment-txt{
        margin-left: 2%;
        margin-bottom: 5px;
    }
    .action-btn-group{
        margin-left: 2%;

    }
    .sub-comment{
        margin-bottom: 20px;
    }
    .reply-link{
        margin-left: 15px;
    }
    .action-btn{
        margin-left: 25px;
    }
    .comment-txt-input {
        margin-top: 5px;
    }
</style>