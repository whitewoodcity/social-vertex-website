<template>
    <span>{{nickname ? nickname : uid}}</span>
</template>
<script>
    export default {
        props:["userId"],
        data(){
            return {
                uid: this.userId,
                nickname: "",
                avatar:""
            };
        },
        beforeMount(){
            let userCache = this.$store.state.userCache;
            let userBrief = userCache[this.userId];
            if (!userBrief){
                //if do not exists in cache, request user's data from server
                this.addUserBriefToCache(this.userId);
            } else {
                //if already exists in cache, check the cached-time
                if (this.cacheOutOfTime(userBrief)) {
                    this.addUserBriefToCache(this.userId);
                } else {
                    this.uid = userBrief.id;
                    this.nickname = userBrief.nickname;
                    this.avatar = userBrief.avatar;
                }
            }
        },
        methods:{
            cacheOutOfTime(userBrief){
                let MILLS_OF_7_DAYS = 7 * 24 * 60 * 60 * 1000;
                let cachedTime = userBrief.cachedTime;
                let currentTimeStamp = new Date().getTime();
                return !cachedTime || (currentTimeStamp - cachedTime) >= MILLS_OF_7_DAYS
            },
            addUserBriefToCache(uid){
                //todo ---
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"user_biref",
                    "ub_id": uid
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            //set values in this page
                            let ub = response.data;
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
        },
        computed:{

        }
    }
</script>
<style scoped>

</style>