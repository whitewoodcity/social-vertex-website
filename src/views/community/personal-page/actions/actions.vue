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
    const listData = [];
    import ArticleList from "../../publications/common/article-list"
    export default {
        components:{
            ArticleList
        },
        props:["currUserInfo"],
        data(){
            return {
                listData:listData,
                loading: false,
                loadingMore: false,
                showLoadingMore: true,
                timePoint:null,
            }
        },
        beforeMount() {
            this.loading = false;
            this.listData = [];

            let userInfo = this.currUserInfo;
            let userId = userInfo.id;
            this.$axios.put('/',{
                "type":"publication",
                "subtype":"history",
                "from":userId
            }).then(response=>{
                if (response.status == 200){
                    if(response.data.publication){
                        // on query success
                        let listData = this.listData;
                        let ariticleList = response.data.history;
                        this.timePoint = response.data.time;
                        for (let i = 0; i < ariticleList.length; i++) {
                            listData.push(ariticleList[i])
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
        },
        methods:{
            onLoadMore () {
                this.loadingMore = true
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"history",
                    "from":this.currUserInfo.id,
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
                                listData.push(ariticleList[i]);
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
<style>

</style>