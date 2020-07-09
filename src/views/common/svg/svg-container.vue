<template>
    <div class="svg-container">
        <a-textarea :auto-size="{minRows: 5}" class="svg-editor" @change="svgOK($event)" placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"> ... </svg>'>
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
                if (!e.target.value)return
                let fullSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">'+e.target.value+'</svg>'
                if (e&&isSvg(fullSVG)){
                    this.svgContent = fullSVG
                    this.$emit("changeSVG",fullSVG)
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
        margin-top: 30px;
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