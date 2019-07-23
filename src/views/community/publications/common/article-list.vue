<template>
    <div class="article-list-container">
        <div v-for="item of listData0" v-bind:key="item.dir">
            <!-- thought -->
            <div v-if="item.subtype=='thought'">
                <single-thought v-bind:item="item"/>
            </div>

            <!-- question -->
            <div v-else-if="item.subtype=='question'">
                <single-question v-bind:item="item"/>
            </div>

            <!-- article -->
            <div v-else>
                <single-article v-bind:item="item"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SingleArticle from './single-article'
    import SingleQuestion from './single-question'
    import SingleThought from './single-thought'
    export default {
        props:["listData"],
        components:{
            SingleArticle, SingleQuestion,SingleThought
        },
        data () {
            return {
                listData0:this.listData
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