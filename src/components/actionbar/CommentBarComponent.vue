<template>
     <span>
            <a-icon type="message" style="margin-right: 5px" />
            {{item.commented_num ? item.commented_num: 0}}
          </span>
</template>

<script>
    export default {
        name: "CommentBarComponent",
        props: ['item'],
    }
</script>

<style scoped>

</style>