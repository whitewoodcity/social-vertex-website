<template>
  <div class="articles-view">
    <a-row>
      <div class="search-bar">
        <a-input-search class="search-input" placeholder="搜索的内容" enterButton/>
        <a-dropdown >
          <a-button>选择搜索专题</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a>文章</a>
            </a-menu-item>
            <a-menu-item>
              <a>问答</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-row>
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
    padding: 20px;
  }

  .search-input {
    padding-left: 5px;
    padding-right: 5px;
    width: 300px;
  }
</style>