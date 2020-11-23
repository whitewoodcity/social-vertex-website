<template>
    <div>
        <div class="form-container">
            <div class="info-form">
                <div class="social-vertex">
                    <span><h3>社交节点(Social Vertex)</h3></span>
                </div>
                <div class="lottie-circle">
                    <lottie
                            z-index="100"
                            :options="loginAnimationOption"
                            :height="100"
                            :width="200">
                    </lottie>
                </div>
                <a-form :form="loginForm" @submit="doLogin">
                    <a-form-item label="账户" :label-col="{ span: 3 }" :wrapper-col="{ span: 17 }">
                        <a-input v-decorator="['account',{rules: [{ required: true, message: '请输入用户名' }]}]"/>
                    </a-form-item>
                    <a-form-item label="密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 17 }">
                        <a-input v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }]}]" type="password"/>
                    </a-form-item>
                    <a-button type="primary" html-type="submit">登录</a-button>
                </a-form>
                <div class="to-reg-span"><span>还没有账户？请点击<a v-on:click="toReg()">此处</a></span></div>

                <div>
                    <h4><a href="https://github.com/whitewoodcity/social-vertex">社交节点开源代码（服务端）</a></h4>
                    <h4>
                        <a href="https://github.com/whitewoodcity/social-vertex-flutter/releases/download/0.4/app-release.apk">即时通信客户端（安卓）下载</a>
                        <a href="https://github.com/whitewoodcity/social-vertex-flutter">源代码（Flutter）</a>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginAnimationOption from '../../../assets/common/login-ripple-loading-animation'
    import md5 from 'js-md5'
    export default {
        data(){
            return {
                loginAnimationOption: {animationData:LoginAnimationOption},
                loginForm: this.$form.createForm(this)
            }
        },
        methods:{
            toReg:function () {
                this.$router.push('/register')
            },
            doLogin:function(e){
                e.preventDefault();
                // let _this = this;
                this.loginForm.validateFields((err, values) => {
                    if (!err) {
                        //console.log('Received values of form: ', values);
                        //======todo =============================================
                        let pwdMd5 = md5(values.password);
                        this.$axios.put('/',{
                            "type":"user",
                            "subtype":"login",
                            "id": values.account,
                            "password":pwdMd5,
                            // "version":0.4
                        }).then(response=>{
                            if (response.status == 200){
                                if(response.data.login){
                                    this.$message.success('登录成功');
                                    let storageInfo = {
                                        id : values.account,
                                        password : pwdMd5,
                                        nickname : response.data.nickname,
                                        friends: response.data.friends,
                                        notifications: response.data.notifications,
                                        loggedInTime: new Date().getTime()
                                    };
                                    this.$store.commit('doLogin',storageInfo);
                                    this.$router.push('/community/publications');
                                }else{
                                    // this.$message.error(response.data.info);
                                    this.$notification['error']({
                                        message: '登录失败,用户名或密码错误',
                                        description: response.data.info
                                    });
                                }

                            }else{
                                this.$message.error(response.data);
                            }
                        }).catch(error=>{
                            this.$message.error(error);
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../common-css/form.css";
</style>