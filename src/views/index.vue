<template>
  <div class="index">
    <div class="index-banner">
      <a-row align="middle" justify="space-around" type="flex">
        <a-col :span="8">
          <div class="index-banner-content">
            <h2>Eclipse Vert.x</h2>
            <h5>是一个用于在JVM上构建响应式应用程序的工具包</h5>
            <a-button
              icon="download"
              size="large"
              type="primary"
              @click=" window.location.href = e"
            >下载v3.7.1</a-button>
          </div>
        </a-col>
        <a-col :span="12">
          <lottie
            z-index="100"
            :options="defaultOptions"
            :height="200"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
          <div class="index-banner-inset">
            <a-icon type="sync" spin/>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import * as animationData from "../assets/index-banner-animation.json";
export default {
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: {},
      downloadUrl: "https://vertx.io/download/"
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    }
  }
};
</script>


<style lang="less" scoped>
@import "../antd-variables";

.index {
}
.index-banner {
  width: 100%;
  height: 93vh;
  background: url("../assets/index-banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.index-banner-content {
  margin-top: 38vh;
  // height: 93vh;
  // display: table-cell;
  // text-align: center;
  // vertical-align: middle;
}
.index-banner-content h2 {
  font-size: 5em;
  color: @primary-color;
}
.index-banner-content h5 {
  font-size: 3em;
  color: @primary-color;
}
.index-banner-inset {
  font-size: 22em;
  text-align: center;
  color: #ffffff;
}
</style>