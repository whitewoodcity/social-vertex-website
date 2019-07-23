<template>
    <div class="personal-center-container">
        <div class="personal-center-title">
            <h1>{{currUserInfo.nickname}}的个人主页</h1>
        </div>
        <a-divider></a-divider>
        <a-row>
            <a-col :span="6">
                <div class="avatar-bar">
                    <a-avatar shape="square" :size="150" icon="user" />
                </div>
            </a-col>
            <a-col :span="6">
                <div><h2>{{currUserInfo.nickname}}</h2></div>
                <br>
                <div><h4>请输入你的个性签名</h4></div>
                <br>
                <div v-if="selfFlag"><a v-on:click="jumpToPersonalEdit">编辑个人资料</a></div>
            </a-col>
            <a-col :span="12">
                <div class="personal-brief">详细资料</div>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col>
                <a-tabs defaultActiveKey="1">
                    <a-tab-pane tab="动态" key="1"><actions v-bind:currUserInfo="currUserInfo"></actions></a-tab-pane>
                    <a-tab-pane tab="文章" key="2"><personal-articles  v-bind:currUserInfo="currUserInfo"></personal-articles></a-tab-pane>
                    <a-tab-pane tab="评论" key="3"><comments v-bind:currUserInfo="currUserInfo"></comments></a-tab-pane>
                    <a-tab-pane tab="提问" key="4"><questions v-bind:currUserInfo="currUserInfo"></questions></a-tab-pane>
                </a-tabs>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import ACol from "ant-design-vue/es/grid/Col";
    import ARow from "ant-design-vue/es/grid/Row";
    import actions from "./actions/actions";
    import personalArticles from "./personal-articles/personal-articles";
    import comments from "./comments/comments";
    import questions from "./questions/questions";

    export default {
        components: {ARow, ACol,actions,personalArticles,comments,questions},
        data(){
            let userInfoToShow = {};
            let flag = this.$store.state.selfIndex;
            if (flag) {
                userInfoToShow = this.$store.state.loggedInUserInfo
            }else{
                let item = JSON.parse(sessionStorage.getItem("personalIndexUser"));
                userInfoToShow = item;
            }
            return {
                selfFlag:flag,
                currUserInfo:userInfoToShow
            }
        },
        methods:{
            jumpToPersonalEdit(){
                this.$router.push("/community/personal-edit");
            }
        }

    }
</script>
<style>
.personal-center-container{
    margin-top: 20px;
    margin-left: 30px;

}
.personal-center-title{
    text-align: center;
}
.personal-brief{
    width: 100%;
    padding-right: 20px;
}
</style>