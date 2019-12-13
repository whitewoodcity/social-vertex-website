<template>
    <div class="sub-comment-list">
        <div class="expand-sub-comment-link">
            <a-button icon="message" size="small" v-on:click="switchExpandStatus">{{expandComments ? '收起':'展开所有回复'}}</a-button>
        </div>
        <div v-if="expandComments">
            <div v-for="item of subCommentList" v-bind:key="item.dir">
                <single-sub-comment :topComment="topComment" :subComment="item"/>
            </div>
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
                expandComments:false,
            }
        },
        methods:{
            refreshSubCommentsList(){
                this.$parent.refreshSubCommentsList();
            },
            switchExpandStatus(){
                this.expandComments = !this.expandComments;
                if (this.expandComments) {
                    this.refreshSubCommentsList();
                }
            }
        },
        computed:{
        }

    }
</script>
<style scoped>
    .sub-comment-list{
        margin-left: 2%;
    }
    .expand-sub-comment-link{
        margin-left: 2%;
        margin-bottom: 10px;
    }
</style>