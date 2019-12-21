<template>
    <span>
            <a-icon type="like" :theme="computedThmeType(item.liked)" @click="likeTheContent"/>
                {{item.like ? item.like: 0}}
          </span>
</template>

<script>

    export default {
        name: "LikeBarComponent",
        props: ['item'],
        methods: {
            computedThmeType(flag) {
                return flag ? 'filled' : 'outlined'
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
            }
        }

    }
</script>

<style scoped>

</style>