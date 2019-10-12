import Vue from 'vue';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import VueSimpleMarkdown from 'vue-simple-markdown'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// import 'vue-simple-markdown/dist/vue-simple-markdown.css'
// index.vue code-block highlight
import 'highlight.js/styles/github-gist.css'
import VueShowdown from 'vue-showdown'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import 'markdown-it-highlight/dist/index.css'
import MarkdownItVue from 'markdown-it-vue'

Vue.use(mavonEditor);
// Vue.use(VueSimpleMarkdown);
Vue.use(VueShowdown);
Vue.use(MarkdownItVue);