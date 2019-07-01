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
import Publications from './views/community/publications/publications'
import MyCollect from './views/community/my-collect/my-collect'
import MyFollowing from './views/community/my-following/my-following'
import MyMsg from './views/community/my-msg/my-msg'
import ServiceCenter from './views/community/service-center/service-center'
import PubArticle from './views/community/pub-article/pub-article'
import PersonalPage from './views/community/personal-page/personal-page'
import ExBlock1 from './views/community/external-blocks/ex-block1/ex-block1'
import ExBlock2 from './views/community/external-blocks/ex-block2/ex-block2'

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
      children: [
        {
          path: 'publications',
          component: Publications
        },{
          path: 'my-collect',
          component: MyCollect
        },{
          path: 'my-following',
          component: MyFollowing
        },{
          path: 'my-msg',
          component: MyMsg
        },{
          path: 'service-center',
          component: ServiceCenter
        },{
          path: 'personal-page',
          component: PersonalPage
        },{
          path: 'pub-article',
          component: PubArticle
        },{
          path: 'ex-block1',
          component: ExBlock1
        },{
          path: 'ex-block2',
          component: ExBlock2
        }
      ]
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