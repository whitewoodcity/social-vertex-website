<template>
    <div class="svg-container">
        <a-textarea :auto-size="{minRows: 5}" style="height: 150px" @change="svgOK($event)">
        </a-textarea>
        <div v-if="svgContent!=null" class="svg-box">
            <span v-html="svgContent"></span>
        </div>
    </div>
</template>

<script>
    import isSvg from "is-svg";

    export default {
        name: "svg-container",
        data(){
            return {
                svgContent:null
            }
        },
        methods:{
            svgOK(e){
                if (e&&isSvg(e.target.value)){
                    this.svgContent = e.target.value
                    this.$emit("changeSVG",e.target.value)
                }else {
                    this.svgContent=null
                    this.$emit("changeSVG",null)
                }
            },

        }
    }
</script>

<style scoped>
    .svg-container{
        display: flex;
        max-width: 500px;

    }
    .svg-box svg{
        width: 128px!important;
        height: 128px!important;
    }
</style>