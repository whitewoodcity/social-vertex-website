<template>
    <div class="single-thought">
        <a-row>
            <div class="thought-avatar">
                <a-avatar v-on:click="()=>{toPersonalPage(item)}">{{item.id[0]}}</a-avatar>
            </div>
            <div class="thought-nickname">
                <a v-on:click="()=>{toPersonalPage(item)}">{{item.authorNickname}}</a> 更新了状态
            </div>
        </a-row>
        <div class="thought-content">
                <h3><a v-on:click="()=>{showThoughtDetail(item)}">{{item.title}}</a></h3>
        </div>
        <ActionBarComponent v-bind:item="item"></ActionBarComponent>
        <a-modal v-model="detailVisible" :footer="null" width="75vw" :destroyOnClose="true">
            <article-detail v-bind:selectedarticle="selectedThought"/>
        </a-modal>
        <a-divider/>
    </div>
</template>
<script>
    import ARow from "ant-design-vue/es/grid/Row";
    import ActionBarComponent from "../../../../components/actionbar/ActionBarComponent";
    import ArticleDetail from "../article-detail/article-detail";

    export default {
        components: {ArticleDetail, ActionBarComponent, ARow},
        props:['item'],
        data(){
            return{
                detailVisible:false,
                selectedThought:{},
                commentsOfThought: this.item.comments
            }
        },
        methods:{
            computedType(flag){
                return flag ? 'filled':'outlined'
            },
            showThoughtDetail(thought){
                this.selectedThought = thought;
                this.detailVisible = true;
            },
                toPersonalPage(item){
                //todo : (personalIndexUser) get other userInfo by article item userid
                let userInfo = {
                    id: item.id,
                    nickname: item.authorNickname
                };
                //set the user Info
                this.$store.commit("setSelfIndex",false);//flag to false
                sessionStorage.setItem("personalIndexUser",JSON.stringify(userInfo));
                this.$router.push("/community/personal-page")
            }
        }
    }
</script>
<style scoped>
    .single-thought{

    }
    .thought-avatar{
        float: left;
    }
    .thought-nickname{
        float: left;
        margin-left: 5px;
        margin-top: 5px;
    }
    .icon-group span{
        margin-right: 15px;
    }
    .thought-content{
        margin-top: 10px;
    }
</style>