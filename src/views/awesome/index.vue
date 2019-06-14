<template>
<!--  <div class="awesome">-->
<!--    <a-tabs size="large" >-->
<!--      <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>-->
<!--      <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>-->
<!--      <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>-->
<!--    </a-tabs>-->
<!--  </div>-->
  <div class="awesome">
    <a-row><div class="guiding-line"></div></a-row>

    <a-row>
      <a-col :span="3"><div class="purple-side"></div></a-col>
      <a-col :span="13">
          <div class="tabs-group">
            <a-tabs size="large" >
              <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
              <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
              <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
            </a-tabs>
          </div>
      </a-col>
      <a-col :span="5">
      </a-col>
      <a-col :span="3"><div class="purple-side"></div></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.awesome {
}
.guiding-line{
  height: 10px;
  width: 100%;
  background-color: #6f338b;
}
.purple-side{
  background-color: #6f338b;
  height: 92.5vh;
}
.blog-item-group{
  margin-left: 30px;
  margin-top: 30px;
  padding-right: 30px;
}
.tabs-group{
  padding-top: 10px;
  padding-left: 20px;
}
</style>