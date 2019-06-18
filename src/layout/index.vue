<template>
  <div class="layout">
    <a-layout>
      <a-layout-header class="layout-header">
        <a-row align="bottom" justify="space-around" type="flex">
          <a-col :span="6">
            <router-link to="/">
              <div class="layout-header-logo">
                <img src="https://vertx.io/assets/logo-sm.png" alt height="50">
              </div>
            </router-link>
          </a-col>
          <a-col :span="10">
            <a-menu mode="horizontal">
              <a-menu-item>
                <router-link to="/publish">
                  <a-icon type="sound"/>发布
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/document">
                  <a-icon type="book"/>文档
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/community/articles">
                  <a-icon type="message"/>社区
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/awesome">
                  <a-icon type="like"/>Awesome-Vert.x
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <a href="https://start.vertx.io/">
                  <a-icon type="rocket"/>Starter
                </a>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="4">
            <a-button-group>
              <a-button icon="login" size="large" v-on:click="toLogin">登录</a-button>
              <a-button icon="thunderbolt" size="large" v-on:click="toRegister" type="primary">注册</a-button>
            </a-button-group>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view/>
      </a-layout-content>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
export default {
  methods:{
    toLogin: function () {
      // console.log(evt);
      this.$router.push('/login')
    },
    toRegister: function () {
      // console.log(evt);
      this.$router.push('/register')
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
}
.layout-header {
  background-color: #ffffff;
}
.layout-header-logo {
}
.layout-content {
  height: 92.5vh;
  min-height: 92.5vh;
}
</style>

