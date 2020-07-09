<template>
  <div class="articles-view">
      <div class="search-bar">
          <a-input-search class="search-input" placeholder="搜索的内容" enterButton>
          </a-input-search>
      </div>
    <div class="nav-bar">
      <a-tabs size="large">
        <a-tab-pane tab="推荐" key="1">
          <recomondation/>
        </a-tab-pane>
        <a-tab-pane tab="关注" key="2">
          <following/>
        </a-tab-pane>
        <a-tab-pane tab="最热" key="3">
          <popular/>
        </a-tab-pane>
        <a-tab-pane tab="问答" key="4">
          <questions/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
    import Recomondation from './recomondation/recomondation'
    import Following from './following/following'
    import Popular from './popular/popular'
    import Questions from './questions/questions'

    export default {
        components: {Recomondation, Following, Popular, Questions},
        beforeMount() {
            let loggedIn = this.$store.getters.loggedIn;
            if (!loggedIn) {
                this.$router.push("/login");
            }
        }
    }
</script>
<style scoped>
  .articles-view {
    /*margin: 20px;*/
  }

  .search-input {
    padding-left: 5px;
    padding-right: 5px;
    max-width: 300px;
  }
  .search-bar{
    max-width: 100%;
    margin:10px
  }

    @media only screen and (max-width: 576px) {
        .search-bar{
            text-align: center;
        }
    }



</style>