// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import store from './vuex';
import App from './App';
// plug start
import axios from 'axios'
Vue.prototype.$http = axios
// plug end
// import 'element-ui/lib/theme-chalk/index.css' // 默认的皮肤
import './assets/scss/theme-change.scss' // 更改皮肤
import ElementUI from 'element-ui'
Vue.use(ElementUI);

import mypDirective from './common/directives';
import mypFilter from './common/filters';
Vue.use(mypDirective);
Vue.use(mypFilter);

var vue = new Vue({
  el: '#app',
  store,
  created() {
    // 管理员信息与菜单列表数据初始化
    store.dispatch('UserMenulistFetch');
  },
  router,
  template: '<App/>',
  components: { App }
})