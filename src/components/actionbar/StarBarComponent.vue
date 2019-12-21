<template>
     <span>
            <a-icon type="star" style="margin-right: 5px" :theme="computedThmeType(item.collected)" @click="starThisContent"/>
            {{item.collect ? item.collect: 0}}
          </span>
</template>

<script>
    export default {
        name: "StarBarComponent",
        props: ['item'],
        methods: {
            computedThmeType(flag) {
                return flag ? 'filled' : 'outlined'
            },

            async starThisContent(){
                this.request.put("/",{
                    "type":"publication",
                    "subtype":"collect",
                    "dir": this.item.dir
                })
                if (this.item.collected === true){
                    //if already collected ,this means cancel collect
                    this.item.collect = this.item.collect - 1;
                } else {
                    this.item.collect = this.item.collect + 1;
                }
                this.item.collected = !this.item.collected;
            }
        }
    }
</script>

<style scoped>

</style>