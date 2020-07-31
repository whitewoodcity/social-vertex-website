<template>
    <div class="form-container">
        <div class="info-form">
            <div class="social-vertex">
                <span><h3>社交节点(Social Vertex)</h3></span>
            </div>
            <div>
                <lottie
                        z-index="100"
                        :options="animationOption"
                        :height="100"
                        :width="200">
                </lottie>
            </div>
            <a-form :form="regForm" @submit="doRegister">
                <a-form-item label="账户" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input
                            v-decorator="[
                              'account',
                              {rules: [{required:true,message:'用户名为必填'}]}]"/>
                </a-form-item>
                <a-form-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }]}]" type="password"/>
                </a-form-item>
                <a-form-item label="确认密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input v-decorator="['passwordConfirm',{rules: [{required:true,message:' '},{ validator:(rule, value, callback)=>{validatePsw(rule,value,callback)}}]}]" type="password"/>
                </a-form-item>
                <a-form-item label="昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                    <a-input v-decorator="['nickname',{rules: [{ required: true, message: '请输入昵称' }]}]"/>
                </a-form-item>
                <a-button type="primary" html-type="submit">注册</a-button>
            </a-form>
            <div class="to-reg-span"><h4><span>已有账户？请点击<a v-on:click="toLogin">此处</a>登录</span></h4></div>

        </div>
    </div>
</template>

<script>
    import LoginAnimationOption from '../../../assets/common/login-ripple-loading-animation'
    import md5 from 'js-md5'
    export default {
        data(){
            return {
                animationOption: {animationData:LoginAnimationOption},
                regForm: this.$form.createForm(this)
            }
        },
        methods:{
            toLogin:function () {
                this.$router.push('/login');
            },
            doRegister:function (e) {
                e.preventDefault();
                this.regForm.validateFields((err, values) => {
                    if (!err) {
                        // console.log('Received values of form: ', values);
                        //====== todo =============================================
                        this.$axios.put('/',{
                            "type":"user",
                            "subtype":"register",
                            "id": values.account,
                            "password":md5(values.password),
                            "password2":md5(values.passwordConfirm),
                            "nickname":values.nickname
                        }).then(response=>{
                            if (response.status == 200){
                                if(response.data.register){
                                    this.$message.success('注册成功');
                                    this.$router.push('/login');
                                }else{
                                    //this.$message.error(response.data.info);
                                    this.$notification['error']({
                                        message: '注册失败',
                                        description: response.data.info
                                    });
                                }

                            }else{
                                // this.$message.error(response.data);
                                this.$notification['error']({
                                    message: '注册失败',
                                    description: response.data
                                });
                            }
                        }).catch(error=>{
                            this.$message.error(error);
                        });
                    }
                });
            },
            validateAccount:function(rule,value,callback){
                if (!value || value === ''){
                    callback("请填写账户名");
                }else{
                    callback();
                }
            },

            validatePsw:function (rule,value,callback) {
                let password = this.regForm.getFieldValue('password');
                if (value === password){
                    callback();
                }else{
                    callback('确认密码与密码不一致')
                }

            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../common-css/form.css";
</style>