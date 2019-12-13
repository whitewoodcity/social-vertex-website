<template>
  <div class="layout">
    <a-layout>
      <a-layout-header class="layout-header">
        <!-- ======================================= -->
        <div class="layout-header-logo">
          <router-link to="/">
            <img src="../assets/image/logo.png" alt height="50">
          </router-link>
        </div>
        <div class="layout-header-menubar">
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
              <router-link to="/community/publications">
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
            <a-menu-item>
              <a href="https://reactiverse.io/es4x/zh/">
                <a-icon type="deployment-unit"/>ES4X
              </a>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="user-status-bar">
          <div class="logged-in-bar" v-if="loggedIn">
              <span>
                您好 &nbsp;{{nickname}}
                <a v-on:click="doLogoff">注销</a>
              </span>
          </div>
          <div class="non-logged-in-bar" v-else>
            <a-button-group>
              <a-button icon="login" size="large" v-on:click="toLogin">登录</a-button>
              <a-button icon="thunderbolt" size="large" v-on:click="toRegister" type="primary">注册</a-button>
            </a-button-group>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    },
    nickname: function() {
      let nickname = this.$store.state.loggedInUserInfo.nickname;
      let displayName;
      if (nickname && nickname.length > 10) {
        displayName = nickname.substr(0, 7) + "...";
      } else {
        displayName = nickname;
      }
      return displayName;
    }
  },

  methods: {
    toLogin: function() {
      this.$router.push("/login");
    },
    toRegister: function() {
      // console.log(evt);
      this.$router.push("/register");
    },
    doLogoff() {
      this.$store.commit("doLogoff");
      this.$router.push("/login");
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
  float: left;
  margin-left: 50px;
  height: 50px;
  width: 183.33px;
}
.layout-content {
  height: 92.5vh;
  min-height: 92.5vh;
}
  .layout-header-menubar{
    height: 50px;
    margin-left: 50px;
    margin-top: 17px;
    float: left;
  }
  .user-status-bar{
    float: left;
    margin-left: 10vw;
    padding-top: 7px;
  }

</style>

