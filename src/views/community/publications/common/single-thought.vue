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
            <a-icon type="like" style="margin-right: 5px" :theme="computedType(item.liked)" @click="likeTheThought"/>
                {{item.like ? item.like: 0}}
          </span>
            <span>
            <a-icon type="dislike" style="margin-right: 5px" :theme="computedType(item.disliked)" @click="disLikeTheThought"/>
                {{item.dislike ? item.dislike: 0}}
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
            computedType(flag){
                return flag ? 'filled':'outlined'
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
            },
            likeTheThought(){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"like",
                    "dir": this.item.dir,
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.item.liked === true){
                                //if already collected ,this means cancel collect
                                this.item.like = this.item.like - 1;
                            } else {
                                this.item.like = this.item.like + 1;
                            }
                            this.item.liked = !this.item.liked;
                        }else{
                            this.$notification['error']({
                                message: '操作失败',
                                description: response.data.info
                            });
                        }
                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
            },
            disLikeTheThought(){
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"dislike",
                    "dir": this.item.dir,
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            if (this.item.disliked === true){
                                //if already collected ,this means cancel collect
                                this.item.dislike = this.item.dislike - 1;
                            } else {
                                this.item.dislike = this.item.dislike + 1;
                            }
                            this.item.disliked = !this.item.disliked;
                        }else{
                            this.$notification['error']({
                                message: '操作失败',
                                description: response.data.info
                            });
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