<template>
    <div class="article-list">
        <a-list itemLayout="vertical" size="large" :dataSource="listData">
            <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-spin v-if="loadingMore" />
                <a-button v-else @click="onLoadMore">loading more</a-button>
            </div>
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
            <ariticle-detail v-bind:selectedarticle="selectedArticle"/>
        </a-modal>
    </div>
</template>
<script>
    import AriticleDetail from '../article-detail/article-detail'
    const listData = [];
    export default {
        components:{
            AriticleDetail
        },
        data () {
            return {
                listData:listData,
                loading: false,
                loadingMore: false,
                showLoadingMore: true,
                timePoint:null,
                detailVisible:false,
                selectedArticle:{}
            }
        },
        mounted(){
            //------------------------------------------
            //listData置空以防止添加重复的articles
            this.loading = false;
            this.listData = [];
            this.$axios.put('/',{
                "type":"publication",
                "subtype":"history"
            }).then(response=>{
                if (response.status == 200){
                    if(response.data.publication){
                        // on query success
                        let listData = this.listData;
                        let ariticleList = response.data.history;
                        this.timePoint = response.data.time;
                        for (let i = 0; i < ariticleList.length; i++) {
                            let oneArticle = ariticleList[i];
                            listData.push({
                                title: oneArticle.title,
                                avatar: oneArticle.avatar,// todo
                                titleImgLink: oneArticle.titleImgLink,
                                content: oneArticle.content,
                                authorNickname:oneArticle.authorNickname,
                                dir:oneArticle.dir,
                                id:oneArticle.id
                            })
                        }
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
            },

            onLoadMore () {
                this.loadingMore = true
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"history",
                    "time":this.timePoint
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            // on query success
                            let listData = this.listData;
                            let ariticleList = response.data.history;
                            this.timePoint = response.data.time;
                            if (ariticleList.length == 0){
                                this.$message.info("没有更多了哟");
                            }
                            for (let i = 0; i < ariticleList.length; i++) {
                                let oneArticle = ariticleList[i];
                                listData.push({
                                    title: oneArticle.title,
                                    avatar: oneArticle.avatar,// todo
                                    titleImgLink: oneArticle.titleImgLink,
                                    content: oneArticle.content,
                                    authorNickname:oneArticle.authorNickname,
                                    id:oneArticle.id
                                })
                            }
                            this.loadingMore = false
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
        }
    }

</script>
<style scoped>
    .article-list{
        margin-left: 30px;
    }

</style>