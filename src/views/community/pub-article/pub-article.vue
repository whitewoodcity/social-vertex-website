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
            <a-input v-model="title" placeholder="请输入标题"/>
        </div>
        <a-divider></a-divider>
        <div class="commit-button-area">
            <a-button type="primary" v-on:click="doPubArticle" block>提交</a-button>
        </div>
        <div class="article-content">
            <mavon-editor v-model="content"></mavon-editor>
            <div>
                <svg-container @changeSVG="changeSVG"></svg-container>

            </div>

        </div>
        <div>

        </div>
    </div>
</template>
<script>
    import SvgContainer from "../../common/svg/svg-container";
    export default {
        components: {SvgContainer},
        data () {
            return {
                content: "",
                title: "",
                //标题图片存储地址
                titleImgLink:"",
                dir : null,
                svgContent:null,
            }
        },
        beforeMount(){
            let editFlag = this.$store.state.editArticleFlag;
            if (editFlag){
                //如果处于编辑状态则渲染出帖子内容和题目
                let editedArticle = this.$store.state.editArticle;
                this.$axios.put('/',{
                    "type":"publication",
                    "subtype":"retrieve",
                    "dir": editedArticle.dir
                }).then(response=>{
                    if (response.status == 200){
                        if(response.data.publication){
                            this.content = response.data.content;
                            this.title = response.data.title;
                            this.dir = response.data.dir;
                        }else{
                            this.$message.error(response.data.info);
                        }
                    }else{
                        this.$message.error(response.data);
                    }
                }).catch(error=>{
                    this.$message.error(error.message);
                });
            }else {
                this.title = "";
                this.content = "";
            }
        },
        computed:{
            computedContent(){
                return this.content;
            }
        },
        beforeDestroy(){
            //设置编辑状态
            this.$store.commit("setEditArticleFlag",false);
            this.$store.commit("setEditArticle",null);
        },
        methods: {
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
            },
            doPubArticle(){
                let title = this.title;
                let content = this.content;
                // console.log(title,content);
                if (this.checkPubContent()) {
                    this.$notification['error']({
                        message:"请输入标题和内容",
                        description:"标题和内容不能为空"
                    });
                    return;
                }
                if (this.$store.state.editArticleFlag) {
                    //todo如果是编辑帖子
                    // alert("article edit has not been implemented yet hahaha");
                    this.$axios.put('/',{
                        "type":"publication",
                        "subtype":"update",
                        "title":title,
                        "content":content,
                        "titleImgLink":'',//todo
                        "authorId":this.$store.state.loggedInUserInfo.id,
                        "authorNickname":this.$store.state.loggedInUserInfo.nickname,
                        "dir":this.$store.state.editArticle.dir,
                        "svg":this.svgContent
                    }).then(response=>{
                        if (response.status === 200){
                            if(response.data.publication){
                                this.$message.success('更新成功');
                                this.$router.push('/community/publications');
                            }else{
                                this.$notification['error']({
                                    message: '更新失败',
                                    description: response.data.info
                                });
                            }

                        }else{
                            this.$message.error(response.data);
                        }
                    }).catch(error=>{
                        this.$message.error(error.message);
                    });
                }else{
                    //如果是新建帖子
                    this.$axios.put('/',{
                        "type":"publication",
                        "subtype":"article",
                        "title":title,
                        "content":content,
                        "titleImgLink":'',//todo
                        "authorId":this.$store.state.loggedInUserInfo.id,
                        "authorNickname":this.$store.state.loggedInUserInfo.nickname,
                        "svg":this.svgContent
                    }).then(response=>{
                        if (response.status === 200){
                            if(response.data.publication){
                                this.$message.success('发表成功');
                                this.$router.push('/community/publications');
                            }else{
                                this.$notification['error']({
                                    message: '发表失败',
                                    description: response.data.info
                                });
                            }

                        }else{
                            this.$message.error(response.data);
                        }
                    }).catch(error=>{
                        this.$message.error(error.message);
                    });
                }
            },
            checkPubContent(){
                let title = this.title;
                let content = this.content;
                return !title || !content || title === '' || content === '';
            },
            changeSVG(content){
                // eslint-disable-next-line no-console
                console.log(content)
                this.svgContent=content
            }

        }

    }
</script>
<style>
.publication-container{
    height: auto;
}
.pub-page-title{
    text-align: center;
}
.upload-dragger-area{
    margin-bottom: 20px;
}
.title-input{

}
.commit-button-area{

}


</style>