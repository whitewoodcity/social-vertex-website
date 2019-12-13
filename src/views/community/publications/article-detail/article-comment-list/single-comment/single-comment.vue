<template>
    <div class="sigle-top-comment">
        <div>
            <a-avatar :alt="comment.id" class="avatar-area">{{comment.id[0]}}</a-avatar>
            <span class="name-span"><a>{{comment.id}} : </a></span>
        </div>
        <div class="comment-content">
            <span>{{comment.content}}</span>
        </div>
        <div>
            <span class="action-btn-group">
                <span slot="actions" ><a-icon type="like" :theme="computedType(comment.liked)" @click="dislikeTheComment"/>: {{comment.like ? comment.like : 0}}</span>
                <span slot="actions" class="action-btn"  ><a-icon type="dislike" :theme="computedType(comment.disliked)" @click="likeTheComment"/>: {{comment.dislike ? comment.dislike : 0}}</span>
            </span>
            <span class="add-reply-link"><a @click="switchShowInput">添加回复</a></span>
        </div>
        <br>
        <div class="sub-comment-text" v-if="showInput">
            <div class="comment-txt-input">
                <a-input-search placeholder="请添加回复" v-model="topCommentTxt" @search="onSubmitComment" :autoFocus=true>
                    <a-button slot="enterButton" type="primary">发送</a-button>
                </a-input-search>
            </div>
        </div>
        <div class="expand-sub-comment-link">
            <a-button icon="message" size="small" v-on:click="switchExpandStatus">{{expandComments ? '收起':'展开所有回复'}}</a-button>
        </div>
        <div v-if="expandComments">
            <sub-comment-list :topComment="comment" :subCommentList="subCommentList"/>
        </div>
        <a-divider/>
    </div>
</template>
<script>
    import SubCommentList from './sub-comment-list/sub-comment-list'
    import AInputSearch from "ant-design-vue/es/input/Search";
    /*
    this is a top level comment of an article
     */
    export default {

        props:['comment'],
        components:{AInputSearch, SubCommentList},
        data(){
          return {
              showInput:false,
              expandComments:false,
              subCommentList:[],
              topCommentTxt:''
          }
        },
        methods:{
            computedType(flag){
                return flag ? 'filled':'outlined'
            },
            likeTheComment(){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"like",
                    "dir": this.comment.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.comment.liked === true){
                                //if already collected ,this means cancel collect
                                this.comment.like = this.comment.like - 1;
                            } else {
                                this.comment.like = this.comment.like + 1;
                            }
                            this.comment.liked = !this.comment.liked;
                        }else{
                            this.$notification['error']({
                                message: '操作失败',
                                description: response.data.info
                            });
                        }

                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
            },
            dislikeTheComment(){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"dislike",
                    "dir": this.comment.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.comment.disliked === true){
                                //if already collected ,this means cancel collect
                                this.comment.dislike = this.comment.dislike - 1;
                            } else {
                                this.comment.dislike = this.comment.dislike + 1;
                            }
                            this.comment.disliked = !this.comment.disliked;
                        }else{
                            this.$notification['error']({
                                message: '操作失败',
                                description: response.data.info
                            });
                        }

                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });

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
                    "dir": this.comment.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            this.$message.info("评论成功");
                            this.topCommentTxt = '';
                            this.doHideInput();
                            this.expandComments = true;
                            this.refreshSubCommentsList();
                        }else{
                            this.$message.error(response.data.info);
                        }
                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
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

            refreshSubCommentsList(){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"comment_list",
                    "dir": this.comment.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            this.subCommentList = response.data.info;
                        }else{
                            this.$message.error(response.data.info);
                        }
                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
            },
            switchExpandStatus(){
                this.expandComments = !this.expandComments;
                if (this.expandComments) {
                    this.refreshSubCommentsList();
                }
            }
        }
    }
</script>
<style scoped>
    .sigle-top-comment{
        horiz-align: center;
    }
    .sub-comment-text{
        margin-left: 2%;
        margin-bottom: 5px;
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
        margin-left: 3%;
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
    .comment-txt-input{
    }
</style>