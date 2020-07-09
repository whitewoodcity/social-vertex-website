<template>
    <div class="svg-container">
        <a-textarea :auto-size="{minRows: 5}" class="svg-editor" @change="svgOK($event)" placeholder="<svg ... />">
        </a-textarea>
        <div v-if="svgContent!=null" class="svg-box">
            <span v-html="svgContent"></span>
        </div>
        <div v-else class="no-content">
            没有预览
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

    }
    .svg-editor{
        min-height: 150px;
        width: 50%;
    }
    .svg-box{
        width: 50%;
        text-align: center;
    }
    .svg-box svg{
        width: 128px!important;
        height: 128px!important;
    }
    .no-content{
        width: 50%;
        color: lightgray;
        font-size: 50px;
        text-align: center;
    }
</style>