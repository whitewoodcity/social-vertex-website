"use strict";

import Vue from 'vue';
import NProgress from 'vue-nprogress'

const options = {
    latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
    router: true, // Show progressbar when navigating routes, default: true
    http: false // Show progressbar when doing Vue.http, default: true
};

Vue.use(NProgress, options)

const nprogress = new NProgress()

export default nprogress