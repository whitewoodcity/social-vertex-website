<template>
    <div class="articles-detail-container">
        <!-- 标题头 -->
        <div class="title-area">
<!--            <div class="article-img">-->
<!--                title img here-->
<!--            </div>-->
            <br/>
            <div class="article-info">
                <div class="title-text">
                    <p>{{article.title}}</p>
                </div>
                <div class="article-edit-link" v-if="owingToSelf">
                    <a v-on:click="()=>jumpToEditArticle(article)">编辑</a>
                </div>
                <div class="author-avatar">
                    <a-avatar :src="article.avatar"/>
                </div>
                <div class="author-name">
                    <p>authored by
                        <a v-on:click="toPersonalPage(article.id)">
                            <nickname-span :userId="article.id"/>
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <!--正文-->
        <a-divider/>

        <div class="content-area" v-if = "articleContentFlag">
            <mavon-editor :value="detail.content" defaultOpen="preview" :editable="false" :toolbarsFlag="false" :subfield="false"/>
        </div>
        <div class="btn-grp">
            <StarBarComponent v-bind:item="detail" v-bind:button="true"/>
            <LikeBarComponent v-bind:item="detail" v-bind:button="true" />
            <DisLikeBarComponent v-bind:item="detail" v-bind:button="true" />
        </div>
        <!--评论区-->
<!--        <a-divider/>-->
        <div class="comment-area">
            <div class="comment-textarea">
                <a-textarea placeholder="请输入你的评论" v-model="commentContent" :autosize="{ minRows: 3, maxRows: 3 }"/>
            </div>
            <div class="comment-commit-btn-area">
                <a-button type="primary" @click="submitComment">添加评论</a-button>
            </div>
            <article-comment-list :comments="computedComments"/>
        </div>
    </div>
</template>
<script>
    import ArticleCommentList from './article-comment-list/article-comment-list'
    import NicknameSpan from '../../../common/nickname-span/nickname-span'
    import StarBarComponent from "../../../../components/actionbar/StarBarComponent";
    import LikeBarComponent from "../../../../components/actionbar/LikeBarComponent";
    import DisLikeBarComponent from "../../../../components/actionbar/DisLikeBarComponent";
    // let comments = [];
    export default {
        props:{
            selectedarticle:{},
            articleContentFlag:{
                type:Boolean,
                default:true
            }
        },
        components:{
            DisLikeBarComponent,
            LikeBarComponent,
            StarBarComponent,
            ArticleCommentList,
            NicknameSpan
        },
        data(){
            return {
                commentContent:'',
                article: this.selectedarticle,
                detail:{},
                comments : []
            }
        },

        async mounted() {
            // ---- retrieve the detail of the article----
            let responseData = await this.request.put('/',{
                "type":"publication",
                "subtype":"retrieve",
                "dir": this.selectedarticle.dir
            })
            this.detail = responseData;
            //---------- retrieve the comment list of the article -----------------------------
           await this.refreshCommentList();

        },
        methods:{
            async submitComment(){
              let content = this.commentContent;
              let dir = this.selectedarticle.dir;
              await this.request.put('/',{
                    "type":"publication",
                    "subtype":"comment",
                    "dir": dir,
                    "content":content
                })
                this.$message.success("评论成功");
                this.commentContent = "";
                await this.refreshCommentList();
            },

            //刷新评论列表
            async refreshCommentList(){
                let responseData = await this.request.put('/',{
                    "type":"publication",
                    "subtype":"comment_list",
                    "dir": this.selectedarticle.dir
                })
                this.comments = responseData.info;
            },

            //跳转到个人主页
            toPersonalPage(){
                //todo : (personalIndexUser) get other userInfo by article item userid
                let userInfo = {
                    id: this.selectedarticle.id,
                    nickname: this.selectedarticle.authorNickname
                };
                //set the user Info
                this.$store.commit("setSelfIndex",false);//flag to false
                sessionStorage.setItem("personalIndexUser",JSON.stringify(userInfo));
                this.$router.push("/community/personal-page")
            },

            //跳转到编辑文章页面
            jumpToEditArticle(article){
                this.$store.commit("setEditArticleFlag",true);
                this.$store.commit("setEditArticle",article);
                this.$router.push("/community/pub-article");
            }

        },
        computed:{
            owingToSelf(){
                let authorId = this.selectedarticle.id;
                let currLoginUserId = this.$store.state.loggedInUserInfo.id;
                return authorId == currLoginUserId;
            },
            computedComments(){
                return this.comments;
            }
        }
    }
</script>
<style scoped>
    .comment-commit-btn-area{
        margin-top: 3px;
    }
    .comment-textarea{
        margin-top: 10px;
    }
    .articles-detail-container{
    }
    .title-area{
        text-align: center;
    }
    .content-area{

    }
    .comment-area{

    }
    .title-text{
        float: left;
    }
    .title-text p{
        font-size: 25px;
    }
    .author-avatar{
        float: right;
        margin-left: 10px;
        margin-right: 10px;
    }
    .author-name{
        text-align: center;
        horiz-align: center;
        float: right;
        margin-left: 20px;
        padding-top: 5px;
    }
    .author-name p{
        font-size: 17px;
    }
    .btn-grp{
        margin-top: 5px;
    }
    .btn-grp span{
        margin-right: 20px;
    }
    .btn-grp button{
        margin-right: 3px;
    }
    .article-edit-link{
        font-size: 20px;
        float: left;
        margin-top: 5px;
        margin-left: 20px;
    }
</style>