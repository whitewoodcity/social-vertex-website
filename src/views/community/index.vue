<template>
  <div class="community">
    <a-row><div class="guiding-line"></div></a-row>
    <a-row class="community-content">
      <a-col :span="3" class="purple-side-wrapper">
        <div class="purple-side"></div>
      </a-col>
      <a-col :span="18">
        <!-- community body -->

        <!-- real content -->
        <a-row :gutter="20">
          <!-- left bar 显示子模块信息 -->
          <a-col :span="18">
            <div class="router-content">
              <router-view></router-view>
            </div>
          </a-col>

          <!-- right bar -->
          <a-col :span="6">
            <div class="icon-group">
              <div class="icon-item">
                <div class="icon">
                  <a-button icon="profile" @click="routeToPage('/pub-article')"/>
                </div>
              <span>发帖子</span>
              </div>
              <div class="icon-item">
                <div class="icon">
                  <a-button icon="user" @click="routeToPage('/personal-page')"/>
                </div>
                <span>个人主页</span>
              </div>
              <div class="icon-item">
                <div class="icon">
                  <a-button icon="message" @click="showMsgSendingView"/>
                </div>
                <span>发状态</span>
              </div>
            </div>
            <br><br><br>
            <div class="links-block">
              <a-button type="primary" name="articles" @click="routeToPage('/publications')" block>去搜帖</a-button>
              <a-button type="default" @click="routeToPage('/my-collect')" block>我的收藏</a-button>
              <a-button type="danger" @click="routeToPage('/my-msg')" block>我的消息</a-button>
              <a-button @click="routeToPage('/my-following')" block>关注的人</a-button>
              <a-button @click="routeToPage('/service-center')" type="dashed" block>服务中心</a-button>
            </div>
            <div><a-divider /></div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="3" class="purple-side-wrapper"><div class="purple-side"></div></a-col>
    </a-row>
    <div>
      <a-modal title="发状态" v-model="msgSendingViewVisible" @ok="confirmThought" okText="确认" cancelText="取消">
        <div class="msg-title">
          <p>说出你的想法</p>
        </div>
        <a-textarea v-model="thought"></a-textarea>
      </a-modal>
      <br />
      <br />
<!--      <a-button @click="confirm">Confirm</a-button>-->
    </div>
  </div>


</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";

export default {
  data(){
    return {
      msgSendingViewVisible: false,
      thought:""
    }
  },
  components: {ACol, ARow},
  methods:{

    routeToPage: function (subUrl) {
      this.$router.push('/community'+subUrl);
    },

    showMsgSendingView:function () {
      //点击发状态 显示msg框
      this.msgSendingViewVisible = true;

    },
    hideMsgSendingView() {
      this.msgSendingViewVisible = false;
    },
    confirmThought() {
      //确认发送
      let thought = this.thought;
      if (!thought|| thought == ''){
        this.$message.error("请说出你的想法！");
        return;
      }
      this.$axios.put('/',{
        "type":"publication",
        "subtype":"thought",
        "thought":thought
      }).then(response=>{
        if (response.status == 200){
          if(response.data.thought){
            this.$message.success('发表成功');
            this.hideMsgSendingView();
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
  }
};
</script>

<style scoped>
  .community-content{
    /*f0f2f5*/
    background-color: #f0f2f5;
    height: auto;
  }
  .guiding-line{
    height: 10px;
    width: 100%;
    background-color: #6f338b;
  }
  .purple-side-wrapper{
    height: auto;
  }
  .purple-side{
    background-color: #6f338b;
    height: 100vh;
  }
  .icon-group{
    width: 100%;
    padding-top: 60px;

  }
  .icon-item{
    float: left;
    padding-left: 12%;
  }
  .icon{
    text-align: center;
  }
  .links-block{
    padding-right: 10px;
  }

  .msg-title{
    text-align: center;
  }
  .router-content{
    height: auto;
  }

</style>
