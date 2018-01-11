// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import routerApp from './router-app';
import store from './vuex';
import App from './App';
//websocket 监听
import { websocket } from "@src/common/websocket";
/**
 * 引入自定义指令 与 过滤器
 */
import mypDirective from './common/directives';
import mypFilter from './common/filters';

/* Using these kinds of IScroll class for different cases. */

Vue.use(mypDirective);
Vue.use(mypFilter);
// import 'element-ui/lib/theme-chalk/index.css' // 默认的皮肤
import './assets/scss/theme-change.scss' // 更改皮肤
/**
 * 引入element-ui所需组件
 */
import {
  Button as eleButton,
  Row as eleRow,
  Col as eleCol,
  ButtonGroup as eleButtonGroup,
  Container as eleContainer,
  Menu as eleMenu,
  Submenu as eleSubmenu,
  MenuItem as eleMenuItem,
  Header as eleHeader,
  Badge as eleBadge,
  Dropdown as eleDropdown,
  DropdownMenu as eleDropdownMenu,
  DropdownItem as eleDropdownItem,
  Dialog as eleDialog,
  Form as eleForm,
  FormItem as eleFormItem,
  Input as eleInput,
  InputNumber as eleInputNumber,
  DatePicker as eleDatePicker,
  Select as eleSelect,
  Option as eleOption,
  OptionGroup as eleOptionGroup,
  Table as eleTable,
  TableColumn as eleTableColumn,
  Pagination as elePagination,
  Popover as elePopover,
  Tag as eleTag,
  Footer as eleFooter,
  Upload as eleUpload,
  Tree as eleTree,
  Cascader as eleCascader,

  Notification as eleNotification,
  Switch as eleSwitch,
  Radio as eleRadio,
  RadioGroup as eleRadioGroup,
  Radio as eleRadioButton,

  Checkbox as eleCheckbox,
  CheckboxButton as eleCheckboxButton,
  CheckboxGroup as eleCheckboxGroup,

  MessageBox,
  Message,
  Loading
} from 'element-ui'

Vue.component(eleSwitch.name, eleSwitch)
Vue.component(eleRadio.name, eleRadio)
Vue.component(eleRadioGroup.name, eleRadioGroup)
Vue.component(eleRadioButton.name, eleRadioButton)

Vue.component(eleCheckbox.name, eleCheckbox)
Vue.component(eleCheckboxButton.name, eleCheckboxButton)
Vue.component(eleCheckboxGroup.name, eleCheckboxGroup)

Vue.component(eleButton.name, eleButton)
Vue.component(eleButtonGroup.name, eleButtonGroup)
Vue.component(eleContainer.name, eleContainer)
Vue.component(eleMenu.name, eleMenu)
Vue.component(eleSubmenu.name, eleSubmenu)
Vue.component(eleMenuItem.name, eleMenuItem)
Vue.component(eleHeader.name, eleHeader)
Vue.component(eleBadge.name, eleBadge)
Vue.component(eleDropdown.name, eleDropdown)
Vue.component(eleDropdownMenu.name, eleDropdownMenu)
Vue.component(eleDropdownItem.name, eleDropdownItem)
Vue.component(eleDialog.name, eleDialog)
Vue.component(eleForm.name, eleForm)
Vue.component(eleFormItem.name, eleFormItem)
Vue.component(eleInput.name, eleInput)
Vue.component(eleInputNumber.name, eleInputNumber)
Vue.component(eleDatePicker.name, eleDatePicker)
Vue.component(eleSelect.name, eleSelect)
Vue.component(eleOption.name, eleOption)
Vue.component(eleOptionGroup.name, eleOptionGroup)
Vue.component(eleTable.name, eleTable)
Vue.component(eleTableColumn.name, eleTableColumn)
Vue.component(elePagination.name, elePagination)
Vue.component(elePopover.name, elePopover)
Vue.component(eleTag.name, eleTag)
Vue.component(eleFooter.name, eleFooter)
Vue.component(eleRow.name, eleRow)
Vue.component(eleCol.name, eleCol)
Vue.component(eleUpload.name, eleUpload)
Vue.component(eleTree.name, eleTree)
Vue.component(eleCascader.name, eleCascader)

Vue.use(Loading.directive)
// Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = eleNotification
Vue.prototype.$message = Message





/**
 * 引入mint-ui所需组件
 */
import mintui from "mint-ui";
Vue.use(mintui);
import validator from "@src/common/validator";

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
 * 引入全局css
 */
import "@src/assets/icons/style.css";
if (isMobile) {
  require("@src/assets/css/reset.css");
  require("@src/assets/scss/index.scss");
} else {
  require("@src/assets/scss-pc/reset.scss");
}

/**
 *这里写 pc 与 移动端 的特殊处理
 */
if (isMobile) {
  //这段代码 暂时写在这里
  document.body.style.height = document.documentElement.clientHeight + "px";
  window.onresize = function () {
    document.body.style.height = document.documentElement.clientHeight + "px";
  }
  Vue.prototype.Toast = mintui.Toast;
  Vue.prototype.MessageBox = mintui.MessageBox;
  Vue.prototype.validator = validator;

} else {

}


var vue = new Vue({
  el: '#app',
  store,
  mixins: [websocket],
  created() {
    this.websocketFn();
    //管理员信息与菜单列表数据初始化
    store.dispatch('UserMenulistFetch');
    store.dispatch('UserGetFetch');
  },
  router: isMobile ? routerApp : router,
  template: '<App/>',
  components: { App }
})