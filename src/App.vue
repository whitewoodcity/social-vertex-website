<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <router-view/>
  </div>
</template>

<script>
import NprogressContainer from "vue-nprogress/src/NprogressContainer";

export default {
  components: {
    NprogressContainer
  }
};
</script>

<style lang="less">
@import "antd-variables";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nprogress .bar {
  background: @primary-color !important;
}
</style>
