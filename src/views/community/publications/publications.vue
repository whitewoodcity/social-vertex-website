<template>
  <div class="articles-view">
    <a-row>
      <div class="search-bar">
        <a-input-group compact>
          <a-input-search class="search-input" placeholder="搜索的内容" enterButton>
<!--            <a-select default-value="article" slot="addonBefore">-->
<!--              <a-select-option value="article">文章</a-select-option>-->
<!--              <a-select-option value="aq">问答</a-select-option>-->
<!--            </a-select>-->
          </a-input-search>
        </a-input-group>
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
    /*margin: 20px;*/
  }

  .search-input {
    padding-left: 5px;
    padding-right: 5px;
    max-width: 300px;
  }
  .search-bar{
    float: left;
    max-width: 100%;
    margin:10px
  }



</style>