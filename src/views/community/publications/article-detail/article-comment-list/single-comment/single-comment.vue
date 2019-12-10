<template>
    <div class="sigle-top-comment">
        <a-comment>
            <span slot="actions" ><a-icon type="like" :theme="computedType(comment.liked)" @click="likeTheComment"/>: {{comment.like ? comment.like : 0}}</span>
            <span slot="actions" ><a-icon type="dislike" :theme="computedType(comment.disliked)" @click="dislikeTheComment"/>: {{comment.dislike ? comment.dislike : 0}}</span>
            <span slot="actions" >回复</span>
            <a slot="author">{{comment.id}}</a>
            <a-avatar slot="avatar" :alt="comment.id"/>
            <p slot="content">
                {{this.comment.content}}
            </p>
            <sub-comment-list/>
        </a-comment>
    </div>
</template>
<script>
    import SubCommentList from './sub-comment-list/sub-comment-list'
    /*
    this is a top level comment of an article
     */
    export default {
        props:['comment'],
        components:{SubCommentList},
        methods:{
            computedType(flag){
                return flag ? 'filled':'outlined'
            },
            likeTheComment(){

            },
            dislikeTheComment(){

            }
        }

    }
</script>
<style scoped>

</style>