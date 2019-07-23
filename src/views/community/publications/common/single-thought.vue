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
            <h3>{{item.title}}</h3>
        </div>
        <div class="icon-group">
          <span>
            <a-icon type="star-o" style="margin-right: 5px" />
            {{item.stars ? item.stars: 0}}
          </span>
            <span>
            <a-icon type="like-o" style="margin-right: 5px" />
            {{item.likes ? item.likes: 0}}
          </span>
            <span>
            <a-icon type="dislike-o" style="margin-right: 5px" />
            {{item.dislikes ? item.dislikes: 0}}
          </span>
          <span>
            <a-icon type="message" style="margin-right: 5px" />
            {{item.comments ? item.comments: 0}}
          </span>
        </div>
        <a-divider/>
    </div>
</template>
<script>
    import ARow from "ant-design-vue/es/grid/Row";
    export default {
        components: {ARow},
        props:['item'],
        methods:{
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