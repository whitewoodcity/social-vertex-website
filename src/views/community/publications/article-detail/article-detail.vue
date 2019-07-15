<template>
    <div class="articles-detail-container">
        <!-- 标题头 -->
        <div class="title-area">
            <div class="article-img">article-img-here</div>
            <div class="article-info">
                <div class="title-text">
                    {{article.title}}
                </div>
                <div class="author-avatar">
                    <a-avatar :src="article.avatar"/>
                </div>
                <div class="author-name">
                    <p>authored by {{article.authorNickname == null ? article.id: article.authorNickname}}</p>
                </div>
            </div>
        </div>
        <!--正文-->
        <a-divider/>
        <div class="content-area">
            <mavon-editor :value="detail.content" defaultOpen="preview" :editable="false" :toolbarsFlag="false" :subfield="false"/>
        </div>
        <!--评论区-->
        <a-divider/>
        <div class="comment-area">
            <!--评论区-->
            评论区
        </div>
    </div>
</template>
<script>
    export default {
        props:['selectedarticle'],
        data(){

            return {
                article: this.selectedarticle,
                detail:{}
            }
        },
        mounted() {
            // console.log(this.selectedarticle);
            this.$axios.put('/',{
                "type":"publication",
                "subtype":"retrieve",
                "dir": this.selectedarticle.dir
            }).then(response=>{
                if (response.status == 200){
                    if(response.data.publication){
                        this.detail = response.data;
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
</script>
<style scoped>
    .articles-detail-container{
    }
    .title-area{
        text-align: center;
    }
    .content-area{

    }
    .comment-area{
        text-align: center;
    }
    .title-text{
        float: left;
    }
    .author-avatar{
        float: right;
        margin-left: 10px;
        margin-right: 10px;
    }
    .author-name{
        text-align: center;
        horiz-align: center;
        float: right;
        margin-left: 20px;
    }

</style>