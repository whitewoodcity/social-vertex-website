<template>
  <div class="layout">
<!--    <a-layout>-->
<!--      <a-layout-header class="layout-header">-->
<!--        &lt;!&ndash; ======================================= &ndash;&gt;-->
<!--        <div class="layout-header-logo">-->
<!--          <router-link to="/">-->
<!--            <img src="../assets/image/logo.png" alt height="50">-->
<!--          </router-link>-->
<!--        </div>-->
<!--        <div class="layout-header-menubar">-->
<!--          <a-menu mode="horizontal">-->
<!--            <a-menu-item>-->
<!--              <router-link to="/document">-->
<!--                <a-icon type="book"/>文档-->
<!--              </router-link>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item>-->
<!--              <router-link to="/community/publications">-->
<!--                <a-icon type="message"/>社区-->
<!--              </router-link>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item>-->
<!--              <a href="https://start.vertx.io/" target="_blank">-->
<!--                <a-icon type="rocket"/>Starter-->
<!--              </a>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item>-->
<!--              <a href="https://reactiverse.io/es4x/zh/" target="_blank">-->
<!--                <a-icon type="deployment-unit"/>ES4X-->
<!--              </a>-->
<!--            </a-menu-item>-->
<!--          </a-menu>-->
<!--        </div>-->
<!--        <div class="user-status-bar">-->
<!--          <div class="logged-in-bar" v-if="loggedIn">-->
<!--              <span>-->
<!--                您好 &nbsp;{{nickname}}-->
<!--                <a v-on:click="doLogoff">注销</a>-->
<!--              </span>-->
<!--          </div>-->
<!--          <div class="non-logged-in-bar" v-else>-->
<!--            <a-button-group>-->
<!--              <a-button icon="login" size="large" v-on:click="toLogin">登录</a-button>-->
<!--              <a-button icon="thunderbolt" size="large" v-on:click="toRegister" type="primary">注册</a-button>-->
<!--            </a-button-group>-->
<!--          </div>-->
<!--        </div>-->
<!--      </a-layout-header>-->
<!--      <a-layout-content class="layout-content">-->
<!--        <router-view/>-->
<!--      </a-layout-content>-->
<!--    </a-layout>-->
      <!-- =========================== -->
      <div class="frame">
          <div class="head">
              <div class="head-box clear">
                  <div class="logo" v-on:click="toIndexPage"></div>
                  <div class="change-box">
                      <div class="change-list">
                          <a class="a1" v-on:click="toDocPage">文档</a>
                          <a class="a1" v-on:click="toCommunityPage">用户社区</a>
                          <a class="a1" href="https://start.vertx.io/" target="_blank">Starter</a>
                          <a class="a1" href="https://reactiverse.io/es4x/zh/" target="_blank">ES4X</a>
                          <div class="a-box clear">
<!--                              <a class="a2 act" href="">V1.0</a>-->
                              <a class="a3" href="https://search.bilibili.com/all?keyword=vert.x" target="_blank"></a>
                              <a class="a4" href="https://stackoverflow.com/questions/tagged/vert.x" target="_blank"></a>
                              <a class="a5" href="https://gitter.im/eclipse-vertx/vertx-users" target="_blank"></a>
                              <span class="user-status-bar">
                                  <span v-if="loggedIn">
                                      Hello {{nickname}}
                                      <a v-on:click="doLogoff">注销</a>
                                  </span>
                                  <span v-else>
                                      <a-button-group>
                                          <a-button size="small" v-on:click="toLogin">登陆</a-button>
                                          <a-button size="small" v-on:click="toRegister">注册</a-button>
                                      </a-button-group>
                                  </span>
                              </span>
                          </div>
                      </div>
                      <div class="change-btn">
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                  </div>
              </div>
          </div>

<!--          <div class="box1">box 1</div>-->
          <div class="router-view-area">
              <router-view/>
          </div>

          <div class="footer">
              <div class="box-box">
                  <div>
                      <p><img src="./img/footer-img5.png" style="width: 26px;"/>网络文化经营许可证 粤网文（2018）2226-798号 </p>
                      <p><img src="./img/footer-img6.png" style="width: 23px;"/>增值电信业务经营许可证 闽B2-20190550</p>
                  </div>
                  <h2>粤ICP备17072384号-2 Copyright 2017-{{new Date().getFullYear()}} 白木城 All Rights Reserved</h2>
              </div>
          </div>
      </div>
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
    },
      toIndexPage() {
        this.$router.push("/");
      },
      toDocPage(){
        this.$router.push("/document");
      },
      toCommunityPage(){
        this.$router.push("/community/publications");
      }
  }
};
</script>

<style lang="less" scoped>
    @import "./css/index.css";
    @import "./css/public.css";
</style>

