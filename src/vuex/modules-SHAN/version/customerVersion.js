import utils from "@src/common/utils";
// 商户版本
import { postCustomerVersion } from "@src/apis";
import { Toast } from "mint-ui";
export default {
  state: {
    list: [],
    searchQuery: {}, //搜索条件
    isSearch: false,//是否搜索操作，便于刷新
  },
  getters: {
  },
  mutations: {
    //初始化store    
    ["CUSTOMERVERSIONPLUGIN_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.isReload = false;
      state.searchQuery = {
        customerNo: "",
        version: "",
        status: "",
        type: ""
      };
    },
    //设置商品列表
    ["CUSTOMERVERSIONPLUGIN_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["CUSTOMERVERSIONPLUGIN_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    // 刷新数据
    ["CUSTOMERVERSIONPLUGIN_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.authCode == item.authCode) return data;
        else return item;
      })
    },
    //是否开始搜索
    ["CUSTOMERVERSIONPLUGIN_SEARCH"](state, flag) {
      state.isSearch = flag;
    }

  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getCustomerVersionUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.customerNo == itemId);
    },
    // 新增或修改商户信息
    addCustomerVersionSave({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return postCustomerVersion()(thisForm).then(data => {
        if (data.code == "00") {
          Toast("操作成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      });
    },
  }
};
