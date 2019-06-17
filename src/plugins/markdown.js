"use strict";

import Vue from 'vue';
import VueSimpleMarkdown from 'vue-simple-markdown'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
// code-block highlight
import 'highlight.js/styles/github-gist.css'

Vue.use(VueSimpleMarkdown)