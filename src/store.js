import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const USER_INFO_LOCAL_STORAGE_KEY ='loggedInUserInfo';
const PERSON_INDEX_USER_SESSION_STORAGE_KEY = "personalIndexFlag";
const EDIT_ARTICLE_FLAG = "editArticleFlag";
const EDIT_ARTICLE = "editArticle";
const USER_CACHE = "userCache";
export default new Vuex.Store({
  state: {
    //从localStorage中获取用户信息 如果有 则处于登录状态
    loggedInUserInfo: localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY)) : null,
    //用于标记personalPage显示的用户
    selfIndex:sessionStorage.getItem(PERSON_INDEX_USER_SESSION_STORAGE_KEY) == null ? false : sessionStorage.getItem(PERSON_INDEX_USER_SESSION_STORAGE_KEY) === "true",
    //用于标记是否为编辑状态的帖子
    editArticleFlag: sessionStorage.getItem(EDIT_ARTICLE_FLAG) == null ? false : sessionStorage.getItem(EDIT_ARTICLE_FLAG) === "true",
    editArticle: sessionStorage.getItem(EDIT_ARTICLE) ? JSON.parse(sessionStorage.getItem(EDIT_ARTICLE)) : null,
    userCache : localStorage.getItem(USER_CACHE) ? JSON.parse(localStorage.getItem(USER_CACHE)) : {}
  },

  getters:{
    loggedIn: (state) => {
      return state.loggedInUserInfo;
    },
    userBriefById : (state) => (id) => {
      return state.userCache[id];
    }
  },

  mutations: {
    addUserBriefToCache(state, userBrief){
      let cacheJsonStr = localStorage.getItem(USER_CACHE);
      if (!cacheJsonStr) {
        //add user brief info to local-storage and vuex-store
        let ub = {}; ub[userBrief.id] = userBrief;
        localStorage.setItem(USER_CACHE,JSON.stringify(ub));
      }else {
        let cachedObj = JSON.parse(cacheJsonStr);
        cachedObj[userBrief.id] = userBrief;
        localStorage.setItem(USER_CACHE,JSON.stringify(cachedObj));
      }
      state.userCache[userBrief.id] = userBrief;
    },
    //登录操作
    doLogin(state,userInfo){
      localStorage.setItem(USER_INFO_LOCAL_STORAGE_KEY,JSON.stringify(userInfo));
      state.loggedInUserInfo = userInfo;
    },

    //注销登录操作
    doLogoff(state){
      state.loggedInUserInfo = null;
      localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
    },
    setSelfIndex(state,flag){
      sessionStorage.setItem(PERSON_INDEX_USER_SESSION_STORAGE_KEY,""+flag);
      state.selfIndex = flag;
    },
    setEditArticleFlag(state,flag){
      sessionStorage.setItem(EDIT_ARTICLE_FLAG,""+flag);
      state.editArticleFlag = flag;
    },
    setEditArticle(state,article){
      if (article){
        sessionStorage.setItem(EDIT_ARTICLE,JSON.stringify(article));
        state.editArticle = article;
      } else{
        sessionStorage.removeItem(EDIT_ARTICLE);
        state.editArticle = null;
      }
    }
  },

  actions: {

  }
})
