<template>
  <div class="community">
    <a-row type="flex" justify="center" class="community-content">
      <a-col :lg="0" :xl="3" class="purple-side-wrapper">
<!--        <div class="purple-side"></div>-->
      </a-col>
      <a-col :xl="18" :lg="24">
        <!-- community body -->

        <!-- real content -->
        <a-row class="real-content">
          <!-- left bar 显示子模块信息 -->
          <a-col :span="24">
            <div class="router-content">
                <div class="icon-group" >
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
<!--                  <div class="icon-item">-->
<!--                    <div class="icon">-->
<!--                      <a-button icon="search" @click="routeToPage('/publications')"/>-->
<!--                    </div>-->
<!--                    <span>去搜帖</span>-->
<!--                  </div>-->
                  <!--                <div class="icon-item">-->
                  <!--                  <div class="icon">-->
                  <!--                    <a-button icon="star" @click="routeToPage('/my-collect')"/>-->
                  <!--                  </div>-->
                  <!--                  <span>我的收藏</span>-->
                  <!--                </div>-->

                  <!--                <div class="icon-item">-->
                  <!--                  <div class="icon">-->
                  <!--                    <a-button icon="team" @click="routeToPage('/my-following')"/>-->
                  <!--                  </div>-->
                  <!--                  <span>关注的人</span>-->
                  <!--                </div>-->
                  <!--                <div class="icon-item">-->
                  <!--                  <div class="icon">-->
                  <!--                    <a-button icon="message" @click="routeToPage('/my-msg')"/>-->
                  <!--                  </div>-->
                  <!--                  <span>我的消息</span>-->
                  <!--                </div>-->

                  <!--                <div class="icon-item">-->
                  <!--                  <div class="icon">-->
                  <!--                    <a-button icon="coffee" @click="routeToPage('/service-center')"/>-->
                  <!--                  </div>-->
                  <!--                  <span>服务中心</span>-->
                  <!--                </div>-->
                </div>


              <router-view></router-view>
            </div>
          </a-col>

          <a-col :span="6" class="right-bar">
            <a-affix>

<!--              <br><br><br>-->
<!--              <div class="links-block">-->
<!--                <a-button type="primary" name="articles" @click="routeToPage('/publications')" block>去搜帖</a-button>-->
<!--                <a-button type="default" @click="routeToPage('/my-collect')" block>我的收藏</a-button>-->
<!--                <a-button @click="routeToPage('/my-following')" block>关注的人</a-button>-->
<!--                <a-button type="danger" @click="routeToPage('/my-msg')" block>我的消息</a-button>-->
<!--                <a-button @click="routeToPage('/service-center')" type="dashed" block>服务中心</a-button>-->
<!--              </div>-->
<!--              <div>-->
<!--                <a-divider />-->
<!--              </div>-->
            </a-affix>
          </a-col>

        </a-row>
      </a-col>
      <a-col :xl="3" :lg="0" class="purple-side-wrapper"></a-col>
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
  .community{
    /*padding-top: 1.5rem;*/
    /*padding-bottom: 1.5rem;*/
  }
  .community-content{
    height: auto;
  }

  @media only screen and (max-width: 1200px) {
        .community-content{
            margin: 0 30px 0 10px;
        }
  }

  .purple-side-wrapper{
    height: auto;
  }
  .purple-side{
    background-color: #6f338b;
    height: 100vh;
  }
  .icon-group{
    display: flex;
    float:right;
      margin-top: 5px;

    /*width: 100%;*/
    /*padding-top: 60px;*/

  }
  @media screen and (max-width: 576px){

      .icon-group{
          padding-left: 25px;
          width: 100%;
          float: left;
          margin-right: 0;

      }
  }

  .right-bar{
    /*background-color: #f0f2f5;*/
    background-color: #ffffff;
  }
  .icon-item{
    /*float: left;*/
    padding-left: 10px;

  }
  .icon{
    text-align: center;
  }
  .links-block{
    padding-right: 10px;
  }
  .real-content{
    /*background-color: #f0f2f5;*/
    background-color: #ffffff;
    min-height: 100vh;
  }
  .msg-title{
    text-align: center;
  }
  .router-content{
    height: auto;
    /*background-color: #f0f2f5;*/
    background-color: #ffffff;
  }


</style>
