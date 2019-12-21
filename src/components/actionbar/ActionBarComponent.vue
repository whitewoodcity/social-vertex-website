<template>
    <div class="icon-group">
        <StarBarComponent v-bind:item="item"></StarBarComponent>
        <LikeBarComponent v-bind:item="item"></LikeBarComponent>
        <DisLikeBarComponent v-bind:item="item"></DisLikeBarComponent>
        <CommentBarComponent v-bind:item="item"></CommentBarComponent>
    </div>
</template>

<script>
    import LikeBarComponent from "./LikeBarComponent";
    import DisLikeBarComponent from "./DisLikeBarComponent";
    import StarBarComponent from "./StarBarComponent";
    import CommentBarComponent from "./CommentBarComponent";

    export default {
        components: {CommentBarComponent, StarBarComponent, DisLikeBarComponent, LikeBarComponent},
        props:['item'],
    }
</script>

<style scoped>
    .icon-group span{
        margin-right: 15px;
    }
</style>