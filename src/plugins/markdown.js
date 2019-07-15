import Vue from 'vue';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueSimpleMarkdown from 'vue-simple-markdown'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
// index.vue code-block highlight
import 'highlight.js/styles/github-gist.css'

Vue.use(mavonEditor);
Vue.use(VueSimpleMarkdown);