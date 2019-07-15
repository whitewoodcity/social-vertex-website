<template>
    <div class="articles-detail-container">
        <!-- 标题头 -->
        <div class="title-area">
            <div class="article-img">article-img-here</div>
            <div class="article-info">
                <div class="title-text">
                    {{article.title}}
                </div>
                <div class="author-name">
                    <p>authored by {{article.authorNickname == null ? article.id: article.authorNickname}}</p>
                </div>
                <div class="author-avatar">
                    <a-avatar/>
                </div>
            </div>
        </div>
        <!--正文-->
        <a-divider/>
        <div class="content-area">
            {{article.content}}
        </div>
        <!--评论区-->
        <div class="comment-area">
            <!--评论区-->
        </div>
    </div>
</template>
<script>
    export default {
        props:['selectedarticle'],
        data(){
            return {
                article: this.selectedarticle
            }
        }
    }
</script>
<style scoped>
    .articles-detail-container{
        text-align: center;
    }
    .title-area{
        text-align: center;
    }
    .content-area{
        text-align: center;
    }
    .comment-area{
        text-align: center;
    }
    .title-text{
        float: left;
    }
    .author-name{
        float: left;
    }
    .author-avatar{
        float: left;
    }
</style>