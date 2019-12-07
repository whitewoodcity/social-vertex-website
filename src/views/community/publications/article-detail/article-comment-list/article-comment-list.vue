<template>
    <div class="articles-comment-container">
        <single-comment/>
        <single-comment/>
    </div>
</template>
<script>
    /*
    this is a top level comment of an article
     */
    import SingleComment from './single-comment/single-comment'
    //-----------------
    const comments = [
        {
            title: 'user1',
        },
        {
            title: 'user2',
        },
        {
            title: 'okou',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    //---------------------
    export default {
        components:{SingleComment},
        methods:{
            showCommentTextArea(){
                this.msgSendingViewVisible = true;
            }
        },
        data(){

            return {
                comments:comments,
                msgSendingViewVisible: false,
                commentTxt:"abcdefghijklmnopqrstuvwxyz"
            }
        },
    }
</script>
<style scoped>
    .articles-comment-container{
        padding-right: 20px;
    }
    span{
        margin-left: 20px;
    }
</style>