<template>
  <div class="document">
    <iframe class="document-iframe" :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    let src = "https://vertxchina.github.io/vertx-translation-chinese/";
    let queryString = this.getQueryString();
    if (queryString) {
      src += "?q="+queryString;
    }
    return {
      src: src
    };
  },

  methods: {
    getQueryString() {
      let uri = window.location.href;
      let strings = uri.split("?");
      if (strings.length > 1){
        for (let i = 0; i < strings.length ; ++i){

          let pair = strings[i].split("=");
          if (pair[0] == "query"){
            return pair[1];
          }
        }
      }
      return null;
    }
  }
};
</script>

<style lang="less" scoped>
.document {
  width: 100%;
  height: 100%;
  min-height: 100%
}
.document-iframe {
  width: 100%;
  height: 100%;
  min-height: 100%
}
</style>