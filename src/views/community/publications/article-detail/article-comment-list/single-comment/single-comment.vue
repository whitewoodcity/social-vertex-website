<template>
    <div class="sigle-top-comment">
        <div>
            <a-avatar :alt="comment.id" class="avatar-area">{{comment.id[0]}}</a-avatar>
            <span class="name-span"><a> <nickname-span :userId="comment.id"/> : </a></span>
        </div>
        <div class="comment-content">
            <span>{{comment.content}}</span>
        </div>
        <div>
            <span class="action-btn-group">
                <span slot="actions"><LikeBarComponent  v-bind:item = "comment"/></span>
                <span slot="actions" class="action-btn"> <DisLikeBarComponent v-bind:item = "comment"/></span>
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

        <div v-if="comment.commented_num > 0">
            <sub-comment-list :topComment="comment" :subCommentList="subCommentList"/>
        </div>
        <a-divider/>
    </div>
</template>
<script>
    import SubCommentList from './sub-comment-list/sub-comment-list';
    import AInputSearch from "ant-design-vue/es/input/Search";
    import NicknameSpan from '../../../../../common/nickname-span/nickname-span';
    import LikeBarComponent from "../../../../../../components/actionbar/LikeBarComponent";
    import DisLikeBarComponent from "../../../../../../components/actionbar/DisLikeBarComponent";
    /*
    this is a top level comment of an article
     */
    export default {

        props: ['comment'],
        components: {DisLikeBarComponent, LikeBarComponent, AInputSearch, SubCommentList, NicknameSpan},
        data() {
            return {
                showInput: false,

                subCommentList: [],
                topCommentTxt: ''
            }
        },
        methods: {
            async onSubmitComment(value) {
                let txt = value;
                if (txt == null || txt.length === 0) {
                   this.$message.warn("请输入评论内容");
                    return;
                }
                if (txt.length > 300) {
                    this.$message.warn("输入内容过长，请不要超过300字哦～");
                    return;
                }
                await this.request.put('/', {
                    "type": "publication",
                    "subtype": "comment",
                    "content": txt,
                    "dir": this.comment.dir
                })
                this.$message.info("评论成功");
                this.topCommentTxt = '';
                this.doHideInput();
                this.expandComments = true;
                this.refreshSubCommentsList();
            },
            switchShowInput() {
                if (this.showInput) {
                    this.doHideInput();
                } else {
                    this.doShowInput();
                }
            },
            doShowInput() {
                this.showInput = true;
            },
            doHideInput() {
                this.showInput = false;
            },

            async refreshSubCommentsList() {
                let responseData = await this.request.put('/', {
                    "type": "publication",
                    "subtype": "comment_list",
                    "dir": this.comment.dir
                })
                this.subCommentList = responseData.info;
            }
        }
    }
</script>
<style scoped>
    .sigle-top-comment {
        horiz-align: center;
    }

    .sub-comment-text {
        margin-left: 2%;
        margin-bottom: 5px;
    }

    .name-span {
        margin-top: 3px;
        margin-right: 10px;
    }

    .avatar-area {
        margin-right: 10px;
    }

    .add-reply-link {
        margin-top: 5px;
        margin-left: 20px;
    }

    .action-btn {
        margin-left: 25px;
    }

    .action-btn-group {
        margin-left: 3%;
    }

    .comment-content {
        padding-top: 5px;
        padding-left: 3%;
        padding-bottom: 5px;
        max-width: 90%;
    }

    .comment-txt-input {
    }

    .no-comment-span {
        margin-left: 3%;
    }
</style>