<template>
  <div class="layout">
    <a-layout>
      <a-layout-header class="layout-header">
        <a-row align="bottom" justify="space-around" type="flex">
          <a-col :span="6">
            <router-link to="/">
              <div class="layout-header-logo">
                <img src="https://vertx.io/assets/logo-sm.png" alt height="58">
              </div>
            </router-link>
          </a-col>
          <a-col :span="8">
            <a-menu mode="horizontal">
              <a-menu-item>
                <router-link to="/">
                  <a-icon type="info"/>主页
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/about">
                  <a-icon type="flag"/>关于
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/awesome">文档</router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/awesome">Awesome-Vert.x</router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="4">
            <a-button-group>
              <a-button icon="login" size="large">登录</a-button>
              <a-button icon="thunderbolt" size="large" type="primary">注册</a-button>
            </a-button-group>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <router-view/>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layout {
}
.layout-header {
  background-color: #ffffff;
}
.layout-header-logo {
}
</style>

