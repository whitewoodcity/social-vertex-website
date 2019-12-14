<template>
  <div class="blog">
    <a-row><div class="guiding-line"></div></a-row>

    <a-row class="content-area-backgroud">
      <a-col :span="3"><div class="purple-side"></div></a-col>
      <a-col :span="13">
        <div class="blog-item-group">
          <blog-row/>
          <blog-row/>
          <blog-row/>
        </div>
      </a-col>
      <a-col :span="5">
        <div class="recent-posts">
          <div class="recent-posts-title"><h1>最新发布：</h1></div>
          <div class="recent-posts-item"><h3><a>VS Code Vert.x Starter Extension</a></h3></div>
          <div class="recent-posts-item"><h3><a>Eclipse Vert.x 3.7.1</a></h3></div>
          <div class="recent-posts-item"><h3><a>Eclipse Vert.x 3.7.0</a></h3></div>
          <div class="recent-posts-item"><h3><a>Eclipse Vert.x 3.6.3</a></h3></div>
          <div class="recent-posts-item"><h3><a>Eclipse Vert.x 3.6.2</a></h3></div>
          <br>
          <div class="recent-posts-item"><h3><a> « &nbsp;查看所有</a></h3></div>
          <a-divider></a-divider>
        </div>
        <div class="recent-posts">
          <div class="recent-posts-title"><h1>最新消息：</h1></div>
          <div class="recent-posts-item"><h3><a>okou老司机开车</a></h3></div>
          <div class="recent-posts-item"><h3><a>okou老司机又开车</a></h3></div>
          <div class="recent-posts-item"><h3><a>okou老司机双开车</a></h3></div>
          <div class="recent-posts-item"><h3><a>okou老司机叒开车</a></h3></div>
          <div class="recent-posts-item"><h3><a>okou老司机叕开车</a></h3></div>
          <br>
          <div class="recent-posts-item"><h3><a> « &nbsp;查看okou所有的车</a></h3></div>
          <a-divider></a-divider>
        </div>
      </a-col>
      <a-col :span="3">
        <div class="purple-side"></div>
      </a-col>
    </a-row>
    <a-row>
      <manual-footer></manual-footer>
    </a-row>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  import BlogRow from "./blog-row/blog-row";
  import ManualFooter from "../common/mannual-footer/mannual-footer";
  export default {
    components: {ACol, ARow,BlogRow,ManualFooter},
  };
</script>

<style scoped>
  .guiding-line{
    height: 10px;
    width: 100%;
    background-color: #6f338b;
  }
  .purple-side{
    /*background-color: #6f338b;*/
    background-image: linear-gradient(#6f338b, #9198e5);
    /*9198e5*/
    height: 100vh;
  }
  .recent-posts{
    margin-top: 30px;
  }
  .blog-item-group{
    height: 100%;
    margin-left: 30px;
    margin-top: 30px;
    padding-right: 30px;
  }
  .blog{

  }
  .content-area-backgroud{
    background-color: #f0f2f5;
  }

</style>
