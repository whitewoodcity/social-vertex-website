"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: process.env.VUE_APP_AXIOS_BAESE,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // console.log("config.data",config.data);
    //登录之后的每一次请求都要带着password 和 id
    let pswd = config.data.password;
    let identity = config.data.id;
    if (!pswd || !identity){
      let loggedInUserInfo = localStorage.loggedInUserInfo;
      if (loggedInUserInfo){
        let userInfoJsonObj = JSON.parse(loggedInUserInfo);
        config.data.password = userInfoJsonObj.password;
        config.data.id = userInfoJsonObj.id;
      }
    }
    //设置调用版本
    // console.log('version',process.env.VUE_APP_SERVICE_VERSION);
    config.data.version = process.env.VUE_APP_SERVICE_VERSION;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
