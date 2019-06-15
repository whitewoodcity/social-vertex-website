<template>
    <div class="register-container">
        <div class="guiding-line"></div>
        <div class="bkg-img">
            <div class="reg-form">
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
                <a-form :form="form">
                    <a-form-item label="账户" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                        <a-input v-decorator="['note',{rules: [{ required: true, message: 'Please input your note!' }]}]"/>
                    </a-form-item>
                    <a-form-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                        <a-input v-decorator="['note',{rules: [{ required: true, message: 'Please input your note!' }]}]"/>
                    </a-form-item>
                    <a-form-item label="确认密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                        <a-input v-decorator="['note',{rules: [{ required: true, message: 'Please input your note!' }]}]"/>
                    </a-form-item>
                    <a-form-item label="昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                        <a-input v-decorator="['note',{rules: [{ required: true, message: 'Please input your note!' }]}]"/>
                    </a-form-item>
                    <a-button type="primary">注册</a-button>
                </a-form>
                <div class="to-reg-span"><h4><span>已有账户？请点击<a v-on:click="toLogin">此处</a>登录</span></h4></div>

            </div>
        </div>
    </div>
</template>

<script>
    import LoginAnimationOption from '../../../assets/common/login-ripple-loading-animation'
    export default {
        data(){
            return {
                loginAnimationOption: {animationData:LoginAnimationOption}
            }
        },
        methods:{
            toLogin:function () {
                this.$router.push('/login');
            }
        }
    };
</script>

<style lang="less" scoped>
    .register-container {
        height: 92.5vh;
        background-color: #ffffff;
    }

    .bkg-img{
        height: 100%;
        background-image: url("../../../assets/common/background.png");
        background-size: 1600px 904px;
        background-repeat: no-repeat;
    }

    .reg-form{
        background-color: #c0c0c0;
        border: 4px solid #6f338b;
        border-radius: 20px;
        width: 500px;
        height: 600px;
        float: right;
        margin-top: 100px;
        margin-right: 200px;
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