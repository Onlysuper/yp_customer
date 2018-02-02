
// 商户产品

import { postEditBillrecord } from "@src/apis";
import { Toast } from "mint-ui";
export default {
  state: {
    list: [],
    searchQuery: {}, //搜索条件
    isSearch: false,//是否搜索操作，便于刷新
    customerSearchQuery: {},
  },
  getters: {
  },
  mutations: {
    //初始化store
    ["CUSTOMER_PRODUCT_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {};
      state.customerSearchQuery = {};
      console.info("商户产品数据加载完成");
    },
    //设置商品列表
    ["CUSTOMER_PRODUCT_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["CUSTOMER_PRODUCT_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //设置商户搜索条件
    ["CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY"](state, searchObj) {
      state.customerSearchQuery = Object.assign(state.customerSearchQuery, searchObj)
    },
    //是否开始搜索
    ["CUSTOMER_PRODUCT_SEARCH"](state, flag) {
      state.isSearch = flag;
    }
  },
  actions: {
    upBillRecordsss({ commit, dispatch, getters, rootGetters, rootState, state }, editForm) {

    }
  }
};
