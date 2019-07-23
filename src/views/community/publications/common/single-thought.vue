<template>
    <div class="single-thought">
        <a-avatar>{{item.id[0]}}</a-avatar>
        {{item.authorNickname}} 更新了状态<br/>
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
    export default {
        props:['item']
    }
</script>
<style scoped>
    .single-thought{

    }
    .icon-group span{
        margin-right: 15px;
    }
    .thought-content{
        margin-top: 10px;
    }
</style>