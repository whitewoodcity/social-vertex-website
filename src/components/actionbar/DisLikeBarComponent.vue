<template>
     <span>
            <a-icon type="dislike" style="margin-right: 5px" :theme="computedThmeType(item.disliked)"
                    @click="disLikeTheContent"/>
                {{item.dislike ? item.dislike: 0}}
     </span>
</template>

<script>
    export default {
        name: "DisLikeBarComponent",
        props: ['item'],
        methods: {
            computedThmeType(flag) {
                return flag ? 'filled' : 'outlined'
            },
            async disLikeTheContent() {
                this.request.put('/', {
                    "type": "publication",
                    "subtype": "dislike",
                    "dir": this.item.dir,
                })
                if (this.item.disliked === true) {
                    //if already collected ,this means cancel collect
                    this.item.dislike = this.item.dislike - 1;
                } else {
                    this.item.dislike = this.item.dislike + 1;
                }
                this.item.disliked = !this.item.disliked;
            }
        }
    }
</script>

<style scoped>

</style>