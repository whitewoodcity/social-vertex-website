<template>
  <div class="community">
    <a-row><div class="guiding-line"></div></a-row>
    <a-row>
      <a-col :span="3"><div class="purple-side"></div></a-col>
      <a-col :span="18">
        <!-- community body -->
        <a-row>
          <div class="search-bar">
            <a-col :span="5">
              <a-input-search class="search-input" placeholder="input search text" enterButton/>
            </a-col>
            <a-col :span="4">
              <a-dropdown>
                <a-button>选择搜索专题</a-button>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">专题1</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">专题2</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">专题3</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a-col>
            <a-col></a-col>
          </div>
        </a-row>

        <!-- real content -->
        <a-row :gutter="20">
          <!-- left bar -->
          <a-col :span="18">
            <div class="nav-bar">
              <a-tabs size="large" >
                <a-tab-pane tab="推荐" key="1"><recomondation/></a-tab-pane>
                <a-tab-pane tab="关注" key="2"><following/></a-tab-pane>
                <a-tab-pane tab="最热" key="3"><popular/></a-tab-pane>
              </a-tabs>
            </div>
          </a-col>
          <!-- right bar -->
          <a-col :span="6">
            <div class="icon-group">
              <div class="icon-item">
                <div class="icon">
                  <a-button icon="profile" />
                </div>
              <span>发帖子</span>
              </div>
              <div class="icon-item">
                <div class="icon">
                  <a-button icon="user" />
                </div>
                <span>个人主页</span>
              </div>
              <div class="icon-item">
                <div class="icon">
                  <a-button icon="message" />
                </div>
                <span>发状态</span>
              </div>
            </div>
            <br><br><br>
            <div class="links-block">
              <a-button type="primary" block>我的收藏</a-button>
              <a-button block>我的消息</a-button>
              <a-button block>关注的人</a-button>
              <a-button type="dashed" block>服务中心</a-button>
            </div>
            <div><a-divider /></div>
            <div class="subjects-blocks-group">
              <div class="subjects-blocks-group-label">
                <span>扩展版块</span>
              </div>
              <div class="subjects-blocks">
                <div class="block-icon-item">
                  <div class="icon">
                    <a-button icon="shopping" />
                  </div>
                  <span class="block-label">版块1</span>
                </div>
                <div class="block-icon-item">
                  <div class="icon">
                    <a-button icon="profile" />
                  </div>
                  <span class="block-label">版块2</span>
                </div>
                <div class="block-icon-item">
                  <div class="icon">
                    <a-button icon="profile" />
                  </div>
                  <span class="block-label">版块3</span>
                </div>
              </div>
              <br><br>
              <div class="subjects-blocks">
                <div class="block-icon-item">
                  <div class="icon">
                    <a-button icon="shopping" />
                  </div>
                  <span class="block-label">版块1</span>
                </div>
                <div class="block-icon-item">
                  <div class="icon">
                    <a-button icon="profile" />
                  </div>
                  <span class="block-label">版块2</span>
                </div>
                <div class="block-icon-item">
                  <div class="icon">
                    <a-button icon="profile" />
                  </div>
                  <span class="block-label">版块3</span>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="3"><div class="purple-side"></div></a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import Following from "./following/following";
import Popular from "./popular/popular";
import Recomondation from "./recomondation/recomondation";

export default {
  components: {ACol, ARow,Recomondation,Following,Popular},
  methods:{
    // placement:function (arg) {
    //   alert(arg);
    // }
  }
};
</script>

<style scoped>
  .guiding-line{
    height: 10px;
    width: 100%;
    background-color: #6f338b;
  }
  .purple-side{
    background-color: #6f338b;
    height: 100vh;
  }
  .search-bar{
    padding-top: 10px;
    padding-left: 10px;
  }
  .nav-bar{
    margin-top: 10px;
    margin-left: 10px;
  }
  .icon-group{
    width: 100%;
    padding-top: 10px;

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
  .subjects-blocks{
    margin-top: 20px;
    text-align: center;
  }
  .block-icon-item{
    float: left;
    padding-left: 13%;
  }
  .block-label{
    text-align: center;
  }
  .subjects-blocks-group{
  }
  .subjects-blocks-group-label{
    text-align: center;
    horiz-align: center;
  }
</style>
