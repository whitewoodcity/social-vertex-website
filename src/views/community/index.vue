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
        <a-row :gutter="20" class="real-content">
          <!-- left bar 显示子模块信息 -->
          <a-col :span="18">
            <div class="router-content">
              <router-view></router-view>
            </div>
          </a-col>

          <!-- right bar -->
          <a-col :span="6" class="right-bar">
            <a-affix>
              <div class="icon-group">
                <div class="icon-item">
                  <div class="icon">
                    <a-button icon="profile" @click="()=>{toPubArticle();}"/>
                  </div>
                <span>发帖子</span>
                </div>
                <div class="icon-item">
                  <div class="icon">
                    <a-button icon="user" @click="routeToMyPage('/personal-page')"/>
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
                <a-button @click="routeToPage('/my-following')" block>关注的人</a-button>
                <a-button type="danger" @click="routeToPage('/my-msg')" block>我的消息</a-button>
                <a-button @click="routeToPage('/service-center')" type="dashed" block>服务中心</a-button>
              </div>
              <div><a-divider /></div>
            </a-affix>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="3" class="purple-side-wrapper"></a-col>
    </a-row>
    <div>
      <a-modal title="发状态" v-model="msgSendingViewVisible" @ok="confirmThought" okText="确认" cancelText="取消">
        <div class="msg-title">
          <p>说出你的想法</p>
        </div>
        <a-textarea v-model="thought"></a-textarea>
      </a-modal>
<!--      <a-button @click="confirm">Confirm</a-button>-->
    </div>
    <a-row>
      <manual-footer></manual-footer>
    </a-row>
  </div>


</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import ManualFooter from "../common/mannual-footer/mannual-footer"

export default {
  data(){
    return {
      msgSendingViewVisible: false,
      thought:""
    }
  },
  components: {ACol, ARow,ManualFooter},
  methods:{
    toPubArticle: function(){
      this.setNoneEdit();
      this.routeToPage('/pub-article');
      this.$router.go(0);//刷新一下
    },
    setNoneEdit:function(){
      this.$store.commit("setEditArticleFlag",false);
      this.$store.commit("setEditArticle",null);
    },
    routeToMyPage: function (subUrl) {
      this.$store.commit("setSelfIndex",true);
      this.$router.push('/community'+subUrl);
      this.$router.go(0);
    },
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
        "authorId":this.$store.state.loggedInUserInfo.id,
        "authorNickname":this.$store.state.loggedInUserInfo.nickname,
        "title":thought
      }).then(response=>{
        if (response.status == 200){
          if(response.data.publication){
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
    /*background-color: #f0f2f5;*/
    background-color: #6f338b;
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
  .right-bar{
    background-color: #f0f2f5;
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
  .real-content{
    background-color: #f0f2f5;
    min-height: 100vh;
  }
  .msg-title{
    text-align: center;
  }
  .router-content{
    height: auto;
    background-color: #f0f2f5;
  }


</style>
