<template>
  <div class="document">
    <iframe class="document-iframe" :src="src" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      src: "https://vertxchina.github.io/vertx-translation-chinese/"
    };
  }
});
</script>

<style lang="less" scoped>
.document {
  width: 100%;
  height: 100%;
}
.document-iframe {
  width: 100%;
  height: 100%;
}
</style>

