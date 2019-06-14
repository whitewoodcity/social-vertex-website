<template>
    <div class="register">
        <div class="container">
            <form action="/register" method="post">
                <table id="table1">
                    <tbody>
                    <tr><td colspan="2">社交节点（Social Vertex）</td> </tr>
                    <tr>
                        <td>
                            <label>账户：</label>
                        </td>
                        <td>
                            <input name="id" id="id"><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>密码：</label>
                        </td>
                        <td>
                            <input type="password" name="password" id="password"><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>重输密码：</label>
                        </td>
                        <td>
                            <input type="password" name="password2" id="password2"><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>昵称：</label>
                        </td>
                        <td>
                            <input name="nickname" id="nickname"><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">注册</button>
                        </td>
                        <td>
                            <button type="reset">取消</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            已有账户？请点击此处<a v-on:click="toLogin">返回</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            toLogin: function(){
                this.$router.push('/login')
            }
        }
    };
</script>

<style lang="less" scoped>
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
    }

    #table1 {
        border-collapse: separate;
        border-spacing: 15px;
    }
</style>