<template>
  <div class="single-article">
    <a-row class="brief-row">
      <a-col>
        <div class="article-avatar" v-on:click="()=>{toPersonalPage(item)}">
          <div v-if="item.svg">
<!--            <img :src="`data:image/svg+xml;utf8,${encodeURIComponent(item.svg)}`">-->
            <div v-html="item.svg"/>
          </div>
          <div v-else>
            <default-svg/>
          </div>
        </div>
        <div class="article-nickname">
          <a v-on:click="()=>{toPersonalPage(item)}">
            <nickname-span :userId="item.id"/>
          </a>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <div class="article-title">
          <h3><a v-on:click="()=>{showArticleDetail(item)}">{{item.title}}</a></h3>
        </div>
      </a-col>
    </a-row>
    <br/>
    <div class="article-content">
      {{item.content}}
    </div>
    <div>
      <span class="read-more-link"><a href="javascript:void(0)" @click="showArticleDetail(item)">查看更多</a></span>
    </div>
<!--        <div class="icon-group">-->
<!--          <ActionBarComponent v-bind:item="item"></ActionBarComponent>-->
<!--        </div>-->
        <a-modal v-model="detailVisible" :footer="null" width="75vw" :destroyOnClose="true">
          <article-detail v-bind:selectedarticle="selectedArticle"/>
        </a-modal>
    <a-divider/>
  </div>
</template>
<script>
    import ArticleDetail from '../article-detail/article-detail'
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    import NicknameSpan from "../../../common/nickname-span/nickname-span";
    import defaultSvg from '../../../../views/common/svg/default-svg'

    export default {
        props: ['item'],
        components: {
            ACol,
            ARow,
            ArticleDetail,
            NicknameSpan,
          defaultSvg
        },
        data() {
            return {
                detailVisible: false,
                selectedArticle: {},
                commentsOfArticle: this.item.comments
            }
        },
        mounted() {

        },
        methods: {
            showArticleDetail(article) {
                this.selectedArticle = article;
                this.detailVisible = true;
            },
            toPersonalPage(item) {
                //todo : (personalIndexUser) get other userInfo by article item userid
                let userInfo = {
                    id: item.id,
                    nickname: item.authorNickname
                };
                //set the user Info
                this.$store.commit("setSelfIndex", false);//flag to false
                sessionStorage.setItem("personalIndexUser", JSON.stringify(userInfo));
                this.$router.push("/community/personal-page")
            }
        }
    }



</script>
<style scoped>
  .brief-row {
    vertical-align: center;
  }

  .icon-group span {
    margin-right: 15px;
  }

  .article-avatar {
    position: relative;
    float: left;
    margin-top: 2px;
  }
  .article-avatar svg{
    max-width: 32px;

  }

  .article-nickname {
    float: left;
    margin-left: 5px;
    margin-top: 5px;
  }

  .article-title {
    margin-top: 10px;
    font-size: 200%;
  }

  .article-content {
    height: 70px;
    font-size: 18px;
  }

  .read-more-link {
    font-size: 16px;
    ont-family: "Roboto", sans-serif;
    font-weight: 300;
    line-height: 1.7;
    color: #3c3c3b;
  }

  span.read-more-link::after {
    content: "";
    width: 0;
    height: 0;
    display: inline-block;
    border-top: 0.38rem solid transparent;
    border-bottom: 0.38rem solid transparent;
    border-left: 0.45rem solid #782b90;
    margin-left: .5rem;
    margin-top: 4px;
    transition: all 100ms ease;
  }

</style>
