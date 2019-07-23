<template>
    <div class="article-list">
        <article-list v-bind:listData="listData"/>
        <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">loading more</a-button>
        </div>
    </div>
</template>
<script>
    import ArticleList from "../common/article-list"
    const listData = [];
    export default {
        components: {
            ArticleList
        },
        data(){
            return {
                listData:listData,
                loading: false,
                loadingMore: false,
                showLoadingMore: true,
                timePoint:null,
            }
        },
        beforeMount(){
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
                        let l = this.listData;
                        let ariticleList = response.data.history;
                        this.timePoint = response.data.time;
                        for (let i = 0; i < ariticleList.length; i++) {
                            let oneArticle = ariticleList[i];
                            l.push({
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
            }
        }
    }
</script>
<style scoped>
    .article-list{
        margin-left: 30px;
    }
</style>