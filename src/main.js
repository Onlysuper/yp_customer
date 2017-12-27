// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import routerApp from './router-app';
import store from './vuex';
import App from './App';
/**
 * 引入自定义指令 与 过滤器
 */
import mypDirective from './common/directives';
import mypFilter from './common/filters';
Vue.use(mypDirective);
Vue.use(mypFilter);

// plug start
import axios from 'axios'
Vue.prototype.$http = axios
// plug end
// import 'element-ui/lib/theme-chalk/index.css' // 默认的皮肤
import './assets/scss/theme-change.scss' // 更改皮肤
import ElementUI from 'element-ui'
Vue.use(ElementUI);

/**
 * 引入mint-ui所需组件
 */
import {
  Switch,
  Field,
  Swipe,
  SwipeItem,
  Button,
  Radio,
  Actionsheet,
  Picker,
  Cell,
  Search,
  Checklist,
  Navbar,
  Tabbar,
  TabContainer,
  TabContainerItem,
  TabItem,
  Spinner,
  Header,
  Popup,
  DatetimePicker,
  IndexList,
  IndexSection,
  Loadmore,
  Badge
} from 'mint-ui';
Vue.component(Switch.name, Switch);
Vue.component(Field.name, Field);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Radio.name, Radio);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Picker.name, Picker);
Vue.component(Cell.name, Cell);
Vue.component(Search.name, Search);
Vue.component(Checklist.name, Checklist);
Vue.component(Navbar.name, Navbar);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Spinner.name, Spinner);
Vue.component(TabContainer.name, TabContainer);
Vue.component(Header.name, Header);
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Badge.name, Badge);

/**
 * 全局注册移动端自定义组件
 */
import FullPage from "@src/components-app/FullPage";
Vue.component(FullPage.name, FullPage);
import FullPagePopup from "@src/components-app/FullPagePopup";
Vue.component(FullPagePopup.name, FullPagePopup);
import MypCell from "@src/components-app/MypCell";
Vue.component(MypCell.name, MypCell);
import MypCellPannel from "@src/components-app/MypCellPannel";
Vue.component(MypCellPannel.name, MypCellPannel);
import MypLoadmoreApi from "@src/components-app/MypLoadmoreApi";
Vue.component(MypLoadmoreApi.name, MypLoadmoreApi);
import InputWrapper from "@src/components-app/InputWrapper";
Vue.component(InputWrapper.name, InputWrapper);
import ViewRadius from "@src/components-app/ViewRadius";
Vue.component(ViewRadius.name, ViewRadius);
import MypTr from "@src/components-app/MypTr";
Vue.component(MypTr.name, MypTr);


/**
 * 全局注册PC端自定义组件
 */
//........
//........
//........
//........
//........

/**
 * 引入全局css
 */
import "@src/assets/icons/style.css";
if (isMobile) {
  require("@src/assets/css/reset.css");
  require("@src/assets/scss/index.scss");
} else {
  //如果需要，这里引入PC端css reset
}

/**
 *这里写 pc 与 移动端 的特殊处理
 */
import { Toast, MessageBox } from "mint-ui";
import validator from "@src/common/validator";
if (isMobile) {
  //这段代码 暂时写在这里
  document.body.style.height = document.documentElement.clientHeight + "px";
  window.onresize = function () {
    document.body.style.height = document.documentElement.clientHeight + "px";
  }
  Vue.prototype.Toast = Toast;
  Vue.prototype.MessageBox = MessageBox;
  Vue.prototype.validator = validator;

} else {

}

var vue = new Vue({
  el: '#app',
  store,
  created() {
    // 管理员信息与菜单列表数据初始化
    store.dispatch('UserMenulistFetch');
  },
  router: isMobile ? routerApp : router,
  template: '<App/>',
  components: { App }
})