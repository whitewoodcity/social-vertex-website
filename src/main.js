import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue'
import './plugins/lottie'
import nprogress from './plugins/nprogress'
import './plugins/axios'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  nprogress,
  render: h => h(App)
}).$mount('#app')