<template>
    <div class="my-msg-container">
        <div class="my-msg-title">
            <h1>我的消息</h1>
        </div>
        <div class="my-msg-list">
            <a-list itemLayout="horizontal" :dataSource="data">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta description="item.msg">
                        <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                        <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>
<script>
    const data = [
        {
            title: 'friend1',
            msg:"latest msg from friend1"
        },
        {
            title: 'friend2',
            msg:"latest msg from friend2"
        },
        {
            title: 'friend3',
            msg:"osajfoibo owiefjoi"
        },
        {
            title: 'friend4',
            msg:"foijwef"
        },
    ]
    export default {
        data () {
            return {
                data
            }
        },
    }
</script>
<style scoped>
.my-msg-container{
    margin-left: 30px;
    margin-top: 20px;
}
.my-msg-title{
    text-align: center;
}
</style>