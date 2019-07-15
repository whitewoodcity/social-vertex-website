<template>
    <div class="articles-comment-container">
        <a-list itemLayout="horizontal" :dataSource="comments">
            <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta description="this is the comment">
                    <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                    <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </a-list-item-meta>
                <span><a-button icon="like" shape="circle"></a-button>6</span>
                <span><a-button icon="dislike" shape="circle"></a-button>6</span>
                <span><a-button icon="message" shape="circle"></a-button>6</span>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
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
        data(){

            return {
                comments:comments
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