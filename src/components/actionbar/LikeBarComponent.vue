<template>
   <span>
         <a-button v-if="button" icon="like" shape="circle" :type="computedButtonType(item.liked)"
                   @click="likeTheContent"></a-button>
        <a-icon v-else type="like" style="margin-right: 5px" :theme="computedThmeType(item.liked)"
                @click="likeTheContent"/>
    {{item.like ? item.like: 0}}
    </span>
</template>

<script>

    export default {
        name: "LikeBarComponent",
        props: {
            item: {},
            button: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            computedThmeType(flag) {
                return flag ? 'filled' : 'outlined'
            },
            computedButtonType(flag) {
                return flag ? 'primary' : 'default';
            },
            async likeTheContent() {
                await this.request.put("/", {
                    "type": "publication",
                    "subtype": "like",
                    "dir": this.item.dir,
                });
                if (this.item.liked === true) {
                    //if already collected ,this means cancel collect
                    this.item.like = this.item.like - 1;
                } else {
                    this.item.like = this.item.like + 1;
                }
                this.item.liked = !this.item.liked;
                if (this.item.disliked){
                    await this.request.put("/",{
                        "type": "publication",
                        "subtype": "dislike",
                        "dir": this.item.dir,
                    })
                    this.item.dislike = this.item.dislike - 1;
                    this.item.disliked = !this.item.disliked;
                }
            }
        }

    }
</script>

<style scoped>

</style>