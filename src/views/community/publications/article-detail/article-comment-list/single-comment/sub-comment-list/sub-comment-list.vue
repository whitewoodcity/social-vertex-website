<template>
    <div>
        <a-comment>
            <span slot="actions" ><a-icon type="like"/>: 3245</span>
            <span slot="actions" ><a-icon type="dislike"/>: 6</span>
            <span slot="actions" >回复</span>
            <a slot="author">Han Solo</a>
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo"/>
            <p slot="content">
                this is a content of a comment
            </p>
        </a-comment>
    </div>
</template>
<script>
    /*
    this is a top level comment of an article
     */
    export default {

    }
</script>
<style scoped>

</style>