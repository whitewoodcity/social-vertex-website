import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue'
import './plugins/lottie'
import './plugins/markdown'
import './plugins/axios'
import './plugins/v-modal'
import nprogress from './plugins/nprogress'
import Icon from './components/Icon'
import i18n from './plugins/i18n'

let requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icons', false, /\.svg$/);
requireAll(req);
Vue.use(Icon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  nprogress,
  i18n,
  render: h => h(App)
}).$mount('#app');