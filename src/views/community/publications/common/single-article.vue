<template>
    <div class="single-article">
        <a-row class="brief-row">
            <a-col>
                <div class="article-avatar" v-on:click="()=>{toPersonalPage(item)}">
                    <a-avatar>{{item.id[0]}}</a-avatar>
                </div>
                <div class="article-nickname">
                    <a v-on:click="()=>{toPersonalPage(item)}">{{item.authorNickname}}</a> 发表了文章：
                </div>
            </a-col>
            <a-col>
                <div class="article-title">
                    <h3><a v-on:click="()=>{showArticleDetail(item)}">{{item.title}}</a></h3>
                </div>
            </a-col>
        </a-row>
        <br/>
        <div class="article-content">
            {{item.content}}
        </div>
        <br/>
        <div class="icon-group">
          <span>
            <a-icon type="star" style="margin-right: 5px" :theme="computedIconType(item.collected)" @click="starThisArticle(item)"/>
            {{item.collect ? item.collect: 0}}
          </span>
            <span>
            <a-icon type="like" style="margin-right: 5px" :theme="computedIconType(item.liked)" @click="likeThisArticle(item)"/>
            {{item.like ? item.like: 0}}
          </span>
            <span>
            <a-icon type="dislike" style="margin-right: 5px" :theme="computedIconType(item.disliked)" @click="dislikeThisArticle(item)"/>
            {{item.dislike ? item.dislike: 0}}
          </span>
            <span>
            <a-icon type="message" style="margin-right: 5px" />
            {{item.commented_num ? item.commented_num: 0}}
          </span>
        </div>
        <a-modal v-model="detailVisible" :footer="null" width="75vw" :destroyOnClose="true">
            <article-detail v-bind:selectedarticle="selectedArticle"/>
        </a-modal>
        <a-divider/>
    </div>
</template>
<script>
    import ArticleDetail from '../article-detail/article-detail'
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    export default {
        props:['item'],
        components:{
            ACol,
            ARow,
            ArticleDetail
        },
        data(){
            return{
                detailVisible:false,
                selectedArticle:{},
                commentsOfArticle: this.item.comments
            }
        },
        methods:{
            showArticleDetail(article){
                this.selectedArticle = article;
                this.detailVisible = true;
            },
            toPersonalPage(item){
                //todo : (personalIndexUser) get other userInfo by article item userid
                let userInfo = {
                    id: item.id,
                    nickname: item.authorNickname
                };
                //set the user Info
                this.$store.commit("setSelfIndex",false);//flag to false
                sessionStorage.setItem("personalIndexUser",JSON.stringify(userInfo));
                this.$router.push("/community/personal-page")
            },
            starThisArticle(detail){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"collect",
                    "dir": detail.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.item.collected === true){
                                //if already collected ,this means cancel collect
                                this.item.collect = this.item.collect - 1;
                            } else {
                                this.item.collect = this.item.collect + 1;
                            }
                            this.item.collected = !this.item.collected;
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
                            if (this.item.liked === true){
                                //if already collected ,this means cancel collect
                                this.item.like = this.item.like - 1;
                            } else {
                                this.item.like = this.item.like + 1;
                            }
                            this.item.liked = !this.item.liked;
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
                            if (this.item.disliked === true){
                                //if already collected ,this means cancel collect
                                this.item.dislike = this.item.dislike - 1;
                            } else {
                                this.item.dislike = this.item.dislike + 1;
                            }
                            this.item.disliked = !this.item.disliked;
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
            computedIconType(flag){
                return flag ? 'filled' : 'outlined';
            }
        }
    }

</script>
<style scoped>
    .brief-row{
        vertical-align: center;
    }
    .icon-group span{
        margin-right: 15px;
    }
    .article-avatar{
        float: left;
    }
    .article-nickname{
        float: left;
        margin-left: 5px;
        margin-top: 5px;
    }
    .article-title{
        margin-left: 100px;
        margin-top: 3px;
    }
    .article-content{
        height: 70px;
    }
</style>