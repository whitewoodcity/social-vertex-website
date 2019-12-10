<template>
    <div class="articles-comment-container">
        <div v-if="comments && comments.length > 0">
            <a-divider/>
            <div v-for="item of comments" v-bind:key="item.dir">
                <single-comment :comment="item"/>
            </div>
        </div>
        <div class="empty-comment-list" v-else>
            <a-divider/>
            暂无评论,快来占一楼
        </div>
    </div>
</template>
<script>
    /*
    this is a top level comment of an article
     */
    import SingleComment from './single-comment/single-comment'
    //-----------------

    //---------------------
    export default {
        components:{SingleComment},
        props:['comments'],
        data(){
            return {}
        },
        methods:{
        },

    }
</script>
<style scoped>
    .empty-comment-list{
        margin-top: 5px;
        text-align: center;
        font-size: 25px;
    }
    .articles-comment-container{
        padding-right: 20px;
    }
    span{
        margin-left: 20px;
    }
</style>