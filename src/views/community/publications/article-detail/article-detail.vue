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
                    <p>authored by <a v-on:click="toPersonalPage(article.id)">{{article.authorNickname == null ? article.id: article.authorNickname}}</a></p>
                </div>
            </div>
        </div>
        <!--正文-->
        <a-divider/>
        <div class="content-area">
            <mavon-editor :value="detail.content" defaultOpen="preview" :editable="false" :toolbarsFlag="false" :subfield="false"/>
        </div>
        <div class="btn-grp">
            <span><a-button icon="star" shape="circle" :type="computedType(detail.collected)" @click="starThisArticle(detail)"></a-button>{{detail.collect}}</span>
            <span><a-button icon="like" shape="circle" :type="computedType(detail.like)" @click="likeThisArticle(detail)"></a-button>{{detail.like}}</span>
            <span><a-button icon="dislike" shape="circle" :type="computedType(detail.dislike)" @click="dislikeThisArticle(detail)"></a-button>{{detail.dislike}}</span>
            <span><a-button icon="message" shape="circle"></a-button>12</span>
        </div>
        <!--评论区-->
<!--        <a-divider/>-->
        <div class="comment-area">
            <article-comment></article-comment>
        </div>
    </div>
</template>
<script>
    import ArticleComment from './article-comment-list/article-comment-list'
    export default {
        props:['selectedarticle'],
        components:{
            ArticleComment
        },
        data(){
            return {
                article: this.selectedarticle,
                detail:{}
            }
        },
        mounted() {
            // console.log(this.selectedarticle);
            this.$axios.put('/',{
                "type":"publication",
                "subtype":"retrieve",
                "dir": this.selectedarticle.dir
            }).then(response=>{
                if (response.status == 200){
                    if(response.data.publication){
                        this.detail = response.data;
                    }else{
                        this.$message.error(response.data.info);
                    }
                }else{
                    this.$message.error(response.data);
                }
            }).catch(error=>{
                this.$message.error(error.message);
            });
            //---------------------------------------
        },
        methods:{

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
            jumpToEditArticle(article){
                this.$store.commit("setEditArticleFlag",true);
                this.$store.commit("setEditArticle",article);
                this.$router.push("/community/pub-article");
            },

            starThisArticle(detail){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"collect",
                    "dir": detail.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.detail.collected === true){
                                //if already collected ,this means cancel collect
                                this.detail.collect = this.detail.collect - 1;
                            } else {
                                this.detail.collect = this.detail.collect + 1;
                            }
                            this.detail.collected = !this.detail.collected;
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

            likeThisArticle(detail){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"like",
                    "dir": detail.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.detail.liked === true){
                                //if already collected ,this means cancel collect
                                this.detail.like = this.detail.like - 1;
                            } else {
                                this.detail.like = this.detail.like + 1;
                            }
                            this.detail.liked = !this.detail.liked;
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

            dislikeThisArticle(detail){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"dislike",
                    "dir": detail.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.detail.disliked === true){
                                //if already collected ,this means cancel collect
                                this.detail.dislike = this.detail.dislike - 1;
                            } else {
                                this.detail.dislike = this.detail.dislike + 1;
                            }
                            this.detail.disliked = !this.detail.disliked;
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
            //type to render buttons
            computedType(flag){
                return flag ? 'primary' : 'default';
            }
        },
        computed:{
            owingToSelf(){
                let authorId = this.selectedarticle.id;
                let currLoginUserId = this.$store.state.loggedInUserInfo.id;
                return authorId == currLoginUserId;
            },
        }
    }
</script>
<style scoped>
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