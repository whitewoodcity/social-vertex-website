<template>
    <div class="articles-comment-container">
        <a-comment>
            <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="like"/>: 3245</span>
            <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="dislike"/>: 6</span>
            <span slot="actions" v-on:click="showCommentTextArea">回复</span>
            <a slot="author">Han Solo</a>
            <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
            />
            <p slot="content">
                this is a content of a comment
            </p>
            <a-comment>
                <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="like"/>: 3245</span>
                <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="dislike"/>: 6</span>
                <span slot="actions">回复</span>
                <a slot="author">Han Solo</a>
                <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                />
                <p slot="content">
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            </a-comment>
        </a-comment>
        <a-comment>
            <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="like"/>: 3245</span>
            <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="dislike"/>: 6</span>
            <span slot="actions">回复</span>
            <a slot="author">Han Solo</a>
            <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
            />
            <p slot="content">
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
            </p>
        </a-comment>
        <a-comment>
            <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="like"/>: 3245</span>
            <span slot="actions" v-on:click="showCommentTextArea"><a-icon type="dislike"/>: 6</span>
            <span slot="actions">回复</span>
            <a slot="author">Han Solo</a>
            <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
            />
            <p slot="content">
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
            </p>
        </a-comment>

        <!-- ------------------------- -->
        <a-modal title="请写入评论:" v-model="msgSendingViewVisible" okText="确认" cancelText="取消">
            <a-textarea v-model="commentTxt"></a-textarea>
        </a-modal>
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