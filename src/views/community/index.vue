<template>
  <div class="community">
    <a-row><div class="guiding-line"></div></a-row>
    <a-row>
      <a-col :span="3"><div class="white-side"></div></a-col>
      <a-col :span="18">
        <!-- community body -->
        <a-row>
          <div class="search-bar">
            <a-col :span="5">
              <a-input-search class="search-input" placeholder="input search text" enterButton/>
            </a-col>
            <a-col :span="4">nother things</a-col>
          </div>
        </a-row>

        <!-- real content -->
        <a-row>
          <!-- left bar -->
          <a-col :span="18">
            <div class="nav-bar">
              <a-menu v-model="current" mode="horizontal">
                <a-menu-item key="mail">
                  <a-icon type="mail" />Navigation One
                </a-menu-item>
                <a-menu-item key="app" disabled>
                  <a-icon type="appstore" />Navigation Two
                </a-menu-item>
                <a-sub-menu>
                  <span slot="title" class="submenu-title-wrapper"><a-icon type="setting" />Navigation Three - Submenu</span>
                  <a-menu-item-group title="Item 1">
                    <a-menu-item key="setting:1">Option 1</a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-menu-item key="setting:4">Option 4</a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
                <a-menu-item key="alipay">
                  <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                </a-menu-item>
              </a-menu>
            </div>

            <div>滚动列表</div>

          </a-col>

          <!-- right bar -->
          <a-col :span="6">
            <div class="icon-group">
              <div class="icon-item">
                <div class="icon">
                  <a-icon type="profile" />
                </div>
              <span>action1</span>
              </div>
              <div class="icon-item">
                <div class="icon">
                  <a-icon type="user" />
                </div>
                <span>action1</span>
              </div>
              <div class="icon-item">
                <div class="icon">
                  <a-icon type="message" />
                </div>
                <span>action1</span>
              </div>
            </div>
            <br><br><br>
            <div>sadf</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="3"><div class="white-side"></div></a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: {ACol, ARow}
};
</script>

<style scoped>
  .guiding-line{
    height: 10px;
    width: 100%;
    background-color: #6f338b;
  }
  .white-side{
    background-color: #6f338b;
    height: 92.5vh;
  }
  .search-bar{
    padding-top: 10px;
    padding-left: 10px;
  }
  .nav-bar{
    margin-top: 10px;
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
</style>
