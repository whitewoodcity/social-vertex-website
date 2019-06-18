import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const USER_INFO_LOCAL_STORAGE_KEY ='loggedInUserInfo';
export default new Vuex.Store({
  state: {
    //从localStorage中获取用户信息 如果有 则处于登录状态
    loggedInUserInfo: localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY)) : null
    // loggedInUserInfo: {username:"uname",info:"infoifnofifn"}
  },

  getters:{
    loggedIn: (state) => {
      return state.loggedInUserInfo != null;
    }
  },

  mutations: {
    //登录操作
    doLogin(state,userInfo){
      localStorage.setItem(USER_INFO_LOCAL_STORAGE_KEY,JSON.stringify(userInfo));
      state.loggedInUserInfo = userInfo;
    },

    //注销登录操作
    doLogoff(state){
      state.loggedInUserInfo = null;
      localStorage.setItem(USER_INFO_LOCAL_STORAGE_KEY,'');
    }
  },

  actions: {

  }
})
