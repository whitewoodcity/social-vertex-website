import {message,notification} from "ant-design-vue";
import axios from "axios";
import Vue from "vue";
import store from "../store.js"
import router from "../router";

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
        if (store.getters.loggedIn){
            let userInfoJsonObj = store.state.loggedInUserInfo;
            let loggedIntimeStamp = userInfoJsonObj.loggedInTime;
            let currentTimeStamp = new Date().getTime();
            //登陆超时
            if ( !loggedIntimeStamp || tokenOverTime(loggedIntimeStamp,currentTimeStamp)){
                store.commit("doLogoff");
                router.push("/login");
                return Promise.reject(new Error("认证超时，请重新登陆"));
            }
            config.data.password = userInfoJsonObj.password;
            config.data.id = userInfoJsonObj.id;
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

let millsOf7Days = 7 * 24 * 60 * 60 * 1000;
// let millsOf7Days = 30 * 1000;
function tokenOverTime(previousTs,currentTs){
    //单位毫秒
    let period = currentTs - previousTs;
    return period > millsOf7Days;
}

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        const responseData = response.data;
        if (responseData.hasOwnProperty("publication")&&!responseData.publication){
            notification.error({
                message: '操作失败',
                description: response.data.info
            })
        }
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);






const request = {
    get: async function (url, data) {
            return await _axios.get(url, {params: data})
                .then((resolve) => resolve.data)
                .catch((error) => message.error("操作失败",error))

    },
    put: async function (url, data) {
        return await _axios.put(url, data)
            .then((resolve) => resolve.data)
            .catch((error) => message.error("操作失败",error))
    }
}

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
        request:{
            get() {
                return request;
            }
        }
    });
};
Vue.use(Plugin)
export {request}
export default _axios