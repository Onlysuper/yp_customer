
import { } from "@src/apis";
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
    //初始化store customerManage
    ["CUSTOMER_MANAGE_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {};
      console.info("初始化商户管理数据完成");
    },
    //设置商品列表
    ["CUSTOMER_MANAGE_SET_LIST"](state, goods) {
      state.list = goods || [];
    },

    //设置搜索条件
    ["CUSTOMER_MANAGE_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["CUSTOMER_MANAGE_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    }
  },
  actions: {
  }
};
