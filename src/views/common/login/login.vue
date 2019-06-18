<template>
    <div class="login-container">
        <div class="guiding-line"></div>
        <div class="bkg-img">
            <div class="login-form">
                <div class="social-vertex">
                    <span><h3>社交节点(Social Vertex)</h3></span>
                </div>
                <div>
                    <lottie
                            z-index="100"
                            :options="loginAnimationOption"
                            :height="100"
                            :width="200">
                    </lottie>
                </div>
                <a-form :form="loginForm" @submit="doLogin">
                    <a-form-item label="账户" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                        <a-input v-decorator="['account',{rules: [{ required: true, message: '请输入用户名' }]}]"/>
                    </a-form-item>
                    <a-form-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
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
                        axios.put('/',{
                            "type":"user",
                            "subtype":"login",
                            "id": values.account,
                            "password":pwdMd5,
                            "version":0.4
                        }).then(response=>{
                            if (response.status == 200){
                                if(response.data.login){
                                    this.$message.success('登录成功');
                                    let storageInfo = {
                                        id : values.account,
                                        password : pwdMd5,
                                        nickname : response.data.nickname,
                                        friends: response.data.friends,
                                        notifications: response.data.notifications
                                    };
                                    this.$store.commit('doLogin',storageInfo);
                                    this.$router.push('/community/articles');
                                }else{
                                    this.$message.error(response.data.info);
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
    .login-container {
        height: 92.5vh;
        background-color: #ffffff;
    }

    .bkg-img{
        height: 100%;
        background-image: url("../../../assets/common/background.png");
        background-size: 92.5vw;
        background-repeat: no-repeat;
    }

    .login-form{
        background-color: #dcdcdc;
        border: 4px solid #6f338b;
        border-radius: 20px;
        width: 500px;
        height: 600px;
        margin-top: 100px;
        /*float: left;*/
        /*margin-left: 60vw;*/
        float: right;
        margin-right: 5%;
        text-align: center;
    }
    .origin-form{
        width: 500px;
        float: left;
    }
    .social-vertex{
        margin-top: 50px;

    }
    .to-reg-span{
        margin-top: 20px;
    }
    .guiding-line{
        height: 5px;
        background-color: #6f338b;
    }

</style>