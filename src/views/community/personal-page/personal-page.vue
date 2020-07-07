<template>
    <div class="personal-center-container">
        <div class="personal-title">
            <h1>{{currUserInfo.nickname}}的个人主页</h1>
        </div>
        <a-divider></a-divider>
        <div class="personal-info">
            <div class="line-unit">
                <div class="avatar-bar">
                    <a-avatar shape="square" :size="150" icon="user" />
                </div>
            </div>
            <div class="line-unit">
                <div><h2>{{currUserInfo.nickname}}</h2></div>
                <br>
                <!-- todo 展示个性签名 -->
                <div><h4>这个人很懒，没有留下状态</h4></div>
                <br>
                <div v-if="selfFlag"><a v-on:click="jumpToPersonalEdit">编辑个人资料</a></div>
            </div>

            <div class="personal-brief line-unit">详细资料:</div>

        </div>

<!--        <a-row>-->
<!--            <a-col :md="6" :sm="12">-->

<!--            </a-col>-->
<!--            <a-col :md="6" :sm="12">-->

<!--            </a-col>-->
<!--            <a-col :md="12" :sm="24">-->
<!--            </a-col>-->
<!--        </a-row>-->
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
            this.addUserBriefToCache(userInfoToShow.id);
            return {
                selfFlag:flag,
                currUserInfo:userInfoToShow
            }
        },
        methods:{
            jumpToPersonalEdit(){
                this.$router.push("/community/personal-edit");
            },
            addUserBriefToCache(uid){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"user_brief",
                    "uid": uid
                }).then(response=>{
                    if (response.status === 200){
                        if(response.data.publication){
                            //set values in this page
                            let ub = response.data.info;
                            this.uid = ub.id;
                            this.nickname = ub.nickname;
                            this.avatar = ub.avatar;

                            //set cache to localStorage and vuex
                            ub.cachedTime = new Date().getTime();
                            this.$store.commit("addUserBriefToCache",ub)

                        }else{
                            this.$message.error(response.data.info);
                        }
                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
            }
        }

    }
</script>
<style>
.personal-center-container{
    margin-top: 20px;
    margin-left: 30px;

}
.personal-title{
    text-align: left;
}

@media only screen and (max-width: 576px) {
    .personal-title{
        text-align: center;
    }
}
.personal-brief{
    padding-right: 20px;
}

.line-unit{
    padding: 15px;
}
.personal-info{
    display: flex;
    flex-wrap: wrap;
}
</style>