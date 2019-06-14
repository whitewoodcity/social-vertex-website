<template>
  <div class="index">
    <div class="index-banner">
      <a-row align="middle" justify="space-around" type="flex">
        <a-col :span="8">
          <div class="index-banner-content">
            <h2>Eclipse Vert.x</h2>
            <h5>是一个用于在JVM上构建响应式应用程序的工具包</h5>
            <a-button icon="download" size="large" type="primary" @click="onDownload">下载v3.7.1</a-button>
          </div>
        </a-col>
        <a-col :span="12">
          <lottie
            z-index="100"
            :options="indexBannerOptions"
            :height="200"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
          <div class="index-banner-inset">
            <a-icon type="sync" spin/>
            <h2>Reactive</h2>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="index-event">
      <a-row align="middle" justify="center" type="flex">
        <a-col :span="8">
          <h2>
            <a-icon type="alert"/>&nbsp;事件驱动
          </h2>
          <p>
            Eclipse Vert.x是事件驱动的。
            <br>这意味着您的应用程序可以使用少量内核线程处理大量并发。Vert.x可让您的应用程序以最少的硬件进行扩展。
          </p>
        </a-col>
        <a-col :span="6">
          <lottie
            z-index="100"
            :options="indexEventOptions"
            :height="360"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
        </a-col>
      </a-row>
    </div>
    <div class="index-non-blocking">
      <a-row align="middle" justify="center" type="flex">
        <a-col :span="6">
          <lottie
            z-index="100"
            :options="indexNonBlockingOptions"
            :height="360"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
        </a-col>
        <a-col :span="8">
          <h2>
            <a-icon type="thunderbolt" />非阻塞
          </h2>
          <p>
            Eclipse Vert.x是非阻塞的。
            <br>这意味着您的应用程序可以使用少量内核线程处理大量并发。Vert.x可让您的应用程序以最少的硬件进行扩展。
          </p>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import * as indexBannerData from "../assets/index-banner-animation.json";
import * as indexEventData from "../assets/index-event-animation.json";
import * as indexNonBlockingData from "../assets/index-non-blocking-animation.json";

export default {
  data() {
    return {
      indexBannerOptions: { animationData: indexBannerData.default },
      indexEventOptions: { animationData: indexEventData.default },
      indexNonBlockingOptions: { animationData: indexNonBlockingData.default },
      animationSpeed: 1,
      anim: {},
      downloadUrl: "https://vertx.io/download/"
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    onDownload() {
      window.location.href = this.downloadUrl;
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
.index-banner-inset h2 {
  font-size: 0.2em;
  color: #ffffff;
}
.index-event {
  color: @primary-color;
  font-size: 1.5em;
}
.index-event h2 {
  color: @primary-color;
  font-size: 1.5em;
}
.index-non-blocking {
  background-color: @primary-color;
  color: #ffffff;
  font-size: 1.5em;
}
.index-non-blocking h2 {
  color: #ffffff;
  font-size: 1.5em;
}
</style>