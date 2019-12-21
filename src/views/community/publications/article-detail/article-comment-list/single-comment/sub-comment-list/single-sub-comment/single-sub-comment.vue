<template>
    <div class="single-sub-comment">
        <div class="sub-comment">
            <div class="name-span">
                <span>
                    <a> <nickname-span :userId="subComment.id"/></a> 回复 <a><nickname-span :userId="subComment.commented_user_id"/> :</a>
                </span>
            </div>
            <div class="comment-txt">
                <span>{{subComment.content}}</span>
            </div>
            <div class="action-btn-group">
                <span slot="actions">
                    <LikeBarComponent v-bind:item="subComment" />
                </span>
                <span slot="actions" class="action-btn">
                    <DisLikeBarComponent v-bind:item="subComment" />
                </span>
                <span class="reply-link">
                    <a v-on:click="switchShowInput">回复评论</a>
                </span>
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
    import NicknameSpan from '../../../../../../../common/nickname-span/nickname-span'
    import LikeBarComponent from "../../../../../../../../components/actionbar/LikeBarComponent";
    import DisLikeBarComponent from "../../../../../../../../components/actionbar/DisLikeBarComponent";
    export default {
        components:{
            DisLikeBarComponent,
            LikeBarComponent,
            NicknameSpan
        },
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
            async onSubmitComment(value){
                let txt = value;
                if (txt == null || txt.length === 0){
                    await this.$message.warn("请输入评论内容");
                    return;
                }
                if (txt.length > 300){
                    await this.$message.warn("输入内容过长，请不要超过300字哦～");
                    return;
                }
                await this.request.put('/',{
                    "type":"publication",
                    "subtype":"comment",
                    "content":txt,
                    "commented_user_id":this.subComment.id,
                    "dir": this.topComment.dir
                })
                await this.$message.info("评论成功");
                this.topCommentTxt = '';
                this.doHideInput();
                this.refreshParent();
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