<template>
    <div class="publication-container">
        <div class="pub-page-title"><h1>写文章</h1></div>
        <div class="upload-dragger-area">
            <a-upload-dragger name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
                <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">点击或拖拽图片到此处</p>
                <p class="ant-upload-hint">上传标题图</p>
            </a-upload-dragger>
        </div>
        <div class="title-input">
            <a-input placeholder="请输入标题"/>
        </div>
        <a-divider></a-divider>
        <div>
            <!-- bidirectional data binding（双向数据绑定） -->
           <quill-editor style="height:50vh" v-model="content" ref="myQuillEditor" :options="editorOption">
            </quill-editor>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                content: '<h2>请输入内容</h2>',
                editorOption: {
                // some quill options
                }
            }
        },
        methods: {
            onEditorBlur(quill) {
                // console.log('editor blur!', quill)
            },

            onEditorFocus(quill) {
                // console.log('editor focus!', quill)
            },

            onEditorReady(quill) {
                // console.log('editor ready!', quill)
            },

            onEditorChange({ quill, html, text }) {
                // console.log('editor change!', quill, html, text)
                this.content = html
            },

            handleChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
            console.log('this is current quill instance object', this.editor)
        }
    }
</script>
<style>
.publication-container{
    margin-top:20px;
    margin-left: 30px;
}
.pub-page-title{
    padding-left: 45%;
}
.upload-dragger-area{
    margin-bottom: 20px;
}
.title-input{

}
</style>