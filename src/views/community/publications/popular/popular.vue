<template>
    <div class="article-list">
        <!-- 利用virtual scroller实现动态无限滚动 -->
        <a-list itemLayout="vertical" size="large" :dataSource="listData">
            <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template slot="actions">
                  <span>
                    <a-icon type="star-o" style="margin-right: 8px" />
                    {{item.stars ? item.stars: 0}}
                  </span>
                    <span>
                    <a-icon type="like-o" style="margin-right: 8px" />
                    {{item.likes ? item.likes: 0}}
                  </span>
                    <span>
                    <a-icon type="message" style="margin-right: 8px" />
                    {{item.comments ? item.comments: 0}}
                  </span>
                </template>
                <img slot="extra" width="272" alt="logo" src="{item.titleImgLink}" />
                <a-list-item-meta :description="item.authorNickname?item.authorNickname:item.id">
                    <a slot="title">{{item.title}}</a>
                    <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
                {{item.content}}
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
    const listData = [];
    export default {
        data () {
            return {
                listData,
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            }
        },
        mounted(){
            //------------------------------------------
            this.$axios.put('/',{
                "type":"publication",
                "subtype":"history"
            }).then(response=>{
                if (response.status == 200){
                    if(response.data.publication){
                        // on query success
                        let listData = this.listData;
                        let ariticleList = response.data.history;

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
    .article-list{
        margin-left: 30px;
    }
</style>