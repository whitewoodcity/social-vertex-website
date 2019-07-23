<template>
    <div class="article-list-container">
        <a-list itemLayout="vertical" size="large" :dataSource="listData0">
            <!-- ------------------- article list item ------------------------------ -->
            <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template slot="actions">
                  <span>
                    <a-icon type="star-o" style="margin-right: 8px" />
                    {{item.stars ? item.stars: 0}}
                  </span>
                    <span>
                    <a-icon type="like-o" style="margin-right: 8px" />
                    {{item.likes ? item.likes: 0}}
                  </span>
                    <span>
                    <a-icon type="dislike-o" style="margin-right: 8px" />
                    {{item.dislikes ? item.dislikes: 0}}
                  </span>
                  <span>
                    <a-icon type="message" style="margin-right: 8px" />
                    {{item.comments ? item.comments: 0}}
                  </span>
                </template>
                <img slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                <a-list-item-meta :description="item.authorNickname ? item.authorNickname:item.id">
                    <a slot="title" v-on:click="()=>{showArticleDetail(item)}">{{item.title}}</a>
                    <a-avatar slot="avatar" :src="item.avatar" v-on:click="toPersonalPage(item)"/>
                </a-list-item-meta>
                {{item.content}}
            </a-list-item>
            <!-- ---------------------------------------------------------------------------------------------------------- -->
        </a-list>
        <a-modal v-model="detailVisible" :footer="null" width="75vw" :destroyOnClose="true">
            <article-detail v-bind:selectedarticle="selectedArticle"/>
        </a-modal>
    </div>
</template>
<script>
    import ArticleDetail from '../article-detail/article-detail'
    export default {
        props:["listData"],
        components:{
            ArticleDetail
        },
        data () {
            return {
                listData0:this.listData,
                detailVisible:false,
                selectedArticle:{}
            }
        },

        methods:{
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
            showArticleDetail(article){
                this.selectedArticle = article;
                this.detailVisible = true;
            }
        }
    }
</script>
<style scoped>

</style>