<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <nprogress-container></nprogress-container>
      <router-view/>
      <a-back-top/>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";

export default {
  components: {
    NprogressContainer
  },
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>

<style lang="less">
@import "antd-variables";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nprogress .bar {
  background: @primary-color !important;
}
</style>
