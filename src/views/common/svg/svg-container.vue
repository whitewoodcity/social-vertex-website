<template>
    <div class="svg-container">
        <a-input-group style="width: 50%">
            <a-input style="display: block" disabled default-value="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 500 500&quot;&gt;"></a-input>
            <a-textarea :auto-size="{minRows: 5}" class="svg-editor" @change="svgOK($event)" placeholder='...'>
            </a-textarea>
            <a-input style="display: block" disabled default-value="</svg>"></a-input>
        </a-input-group>


        <div v-if="svgContent!=null" class="svg-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 500 500" v-html="svgContent"></svg>
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
                svgContent:null,
                svgOriginal:null
            }
        },
        methods:{
            svgOK(e){
                let fullSVG = e.target.value
                if (e&&e.target.value&&isSvg('<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 500 500">'+e.target.value+'</svg>')){
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
        width: 100%;
    }
    .svg-box{
        width: 50%;
        text-align: center;
    }
    .svg-box img{
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
