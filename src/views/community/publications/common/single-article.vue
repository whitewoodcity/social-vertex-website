<template>
    <div class="single-article">
        <a-row class="brief-row">
            <a-col>
                <div class="article-avatar" v-on:click="()=>{toPersonalPage(item)}">
                    <a-avatar>{{item.id[0]}}</a-avatar>
                </div>
                <div class="article-nickname">
                    <a v-on:click="()=>{toPersonalPage(item)}"><nickname-span :userId="item.id"/></a> 发表了文章：
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
            <ActionBarComponent v-bind:item="item"></ActionBarComponent>
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
    import NicknameSpan from "../../../common/nickname-span/nickname-span";
    import ActionBarComponent from "../../../../components/actionbar/ActionBarComponent";
    export default {
        props:['item'],
        components:{
            ActionBarComponent,
            ACol,
            ARow,
            ArticleDetail,
            NicknameSpan
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