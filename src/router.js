import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/index.vue'
import Index from './views/index.vue'
import Publish from './views/publish/index.vue'
import Document from './views/document/index.vue'
import Community from './views/community/index.vue'
import Awesome from './views/awesome/index.vue'
import Error from './views/common/error-pages/error'
import NotFound from './views/common/error-pages/not-found-404'
import Login from './views/common/login/login'
import Register from './views/common/register/register'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [{
      path: '/',
      name: 'Index',
      component: Index,
    }, {
      path: '/publish',
      name: 'Publish',
      component: Publish,
    }, {
      path: '/document',
      name: 'Document',
      component: Document,
    }, {
      path: '/community',
      name: 'Community',
      component: Community,
    }, {
      path: '/awesome',
      name: 'Awesome',
      component: Awesome,
    }, {
      path: '/error',
      name: 'Error',
      component: Error,
    },{
        path: '/not-found',
        name: 'NotFound',
        component: NotFound,
      },{
      path: '/login',
      name: 'Login',
      component: Login,
    },{
      path: '/register',
      name: 'Register',
      component: Register,
    }]
  }]
})