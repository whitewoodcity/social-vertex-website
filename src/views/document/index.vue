<template>
  <div class="document">
    <iframe class="document-iframe" :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "https://vertxchina.github.io/vertx-translation-chinese/"
    };
  }
};
</script>

<style lang="less" scoped>
.document {
  width: 100%;
  height: 100%;
}
.document-iframe {
  width: 100%;
  /*height: 100%;*/
  //fixed by liucx 此处iframe显示高度过小
  height: 720px;
}
</style>