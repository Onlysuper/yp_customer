// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import store from './vuex';
import App from './App';

import mypDirective from './common/directives';
import mypFilter from './common/filters';
Vue.use(mypDirective);
Vue.use(mypFilter);

var vue = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})