<template>
    <div class="personal-edit-container">
        <h1>编辑个人资料</h1>
        <a-form-item label="新头像" extra="">
            <a-upload
                    v-decorator="[
          'upload',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
                    name="avatar"
                    action="/upload"
                    list-type="picture"
            >
                <a-button> <a-icon type="upload" /> 选择新头像 </a-button>
            </a-upload>
        </a-form-item>
        <a-form class="edit-form">
            <a-form-item label="昵称">
                <a-input
                        v-decorator="['input',{initialValue:''}]"
                        @change="update('nickname',$event)"
                        class="input-size"></a-input>
            </a-form-item>
            <a-form-item label="用户名">
                <a-input
                        v-decorator="['input',{initialValue:info.username||''}]"
                        class="input-size" disabled="true"></a-input>
            </a-form-item>
        </a-form>

        <a-button @click="">修改</a-button>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: {}, //fill user data here when the request finished.
                updated: {},
            }
        },
        methods:{
            update(name,event){
                this.updated[name]=event.target.value;
                if (!event.target.value)delete this.update(name)
            },
            submit(){
                //TODO
            }
        }
    }
</script>
<style>
.edit-form{
    max-width: 300px;
    width: 100%;
}
</style>