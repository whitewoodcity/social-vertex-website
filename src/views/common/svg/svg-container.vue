<template>
    <div class="svg-container">
        <a-input-group style="width: 50%">
            <a-input style="display: block" disabled default-value="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 500 500&quot;&gt;"></a-input>
            <a-textarea :auto-size="{minRows: 5}" class="svg-editor" @change="svgOK($event)" placeholder='...'>
            </a-textarea>
            <a-input style="display: block" disabled default-value="</svg>"></a-input>
        </a-input-group>

        <div class="svg-box" style="background: #eeeeee;display: flex; align-items: center;box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;">
            <div v-if="svgContent!=null" style="background: #dddddd;display: inline-block;text-align: center;margin: auto;">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 500 500" v-html="svgContent"></svg>
            </div>
            <div v-else style="text-align: center;width:100%">
                没有预览
            </div>
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
                let svg = e.target.value
                if (e&&e.target.value&&isSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">'+svg+'</svg>')){
                    this.svgContent = svg
                    this.$emit("changeSVG",svg)
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
</style>
