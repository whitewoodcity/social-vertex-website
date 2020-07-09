<template>
    <div class="article-list-container">
        <div v-for="item of listData0" v-bind:key="item.dir">
            <!-- thought -->
            <div v-if="item.subtype==='thought'">
                <single-thought v-bind:item="item"/>
            </div>

            <!-- todo question -->
            <div v-else-if="item.subtype==='question'">
                <single-question v-bind:item="item"/>
            </div>
            <!-- article -->
            <div v-else>
                <single-article v-bind:item="item"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SingleArticle from './single-article'
    import SingleQuestion from './single-question'
    import SingleThought from './single-thought'
    export default {
        props:["listData"],
        components:{
            SingleArticle, SingleQuestion,SingleThought
        },
        data () {
            return {
                listData0:this.listData
            }
        }
    }
</script>
<style scoped>

</style>