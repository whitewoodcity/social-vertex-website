import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const USER_INFO_LOCAL_STORAGE_KEY ='loggedInUserInfo';
const USER_OF_PERSONAL_PAGE = 'userOfPersonalPage';
export default new Vuex.Store({
  state: {
    //从localStorage中获取用户信息 如果有 则处于登录状态
    loggedInUserInfo: localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY)) : null,
    //用于标记personalPage是否显示当前登录用户，true为当前登录用户 false表示查看其他人的主页
    personalFlag:!!localStorage.getItem(USER_OF_PERSONAL_PAGE)
  },

  getters:{
    loggedIn: (state) => {
      return state.loggedInUserInfo;
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
      localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
    },
    setToCurrLoginUser(state){
      state.personalFlag = true;
      localStorage.setItem(USER_OF_PERSONAL_PAGE,"true")
    },
    setToOtherUser(state){
      state.personalFlag = false;
      localStorage.setItem(USER_OF_PERSONAL_PAGE,null)
    }
  },

  actions: {

  }
})
