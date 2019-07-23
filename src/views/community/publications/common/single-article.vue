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
            <a-icon type="star-o" style="margin-right: 5px" />
            {{item.stars ? item.stars: 0}}
          </span>
            <span>
            <a-icon type="like-o" style="margin-right: 5px" />
            {{item.likes ? item.likes: 0}}
          </span>
            <span>
            <a-icon type="dislike-o" style="margin-right: 5px" />
            {{item.dislikes ? item.dislikes: 0}}
          </span>
            <span>
            <a-icon type="message" style="margin-right: 5px" />
            {{item.comments ? item.comments: 0}}
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
                selectedArticle:{}
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