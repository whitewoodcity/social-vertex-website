<template>
    <div class="sub-comment-list">
        <div v-if="subCommentList.length > 0">
            <div  v-for="item of subCommentList" v-bind:key="item.dir">
                <single-sub-comment :topComment="topComment" :subComment="item"/>
            </div>
        </div>
        <div v-else>
            暂无评论,快来参加讨论吧！
        </div>
    </div>
</template>
<script>
    /*
    this is a top level comment of an article
     */
    import SingleSubComment from './single-sub-comment/single-sub-comment'
    export default {
        components:{SingleSubComment},
        props:["subCommentList","topComment"],
        data(){
            return {

            }
        },
        methods:{
            refreshSubCommentsList(){
                this.$parent.refreshSubCommentsList();
            }
        }

    }
</script>
<style scoped>
    .sub-comment-list{
        margin-left: 2%;
    }
</style>