
// 授权码采购

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
    //初始化store    
    ["QRCODERECIEPT_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        receiptNo: "",
        status: "",
        receiptType: "AUTHCODE",
        createTimeStart: "",
        createTimeEnd: "",
      };
      console.info("授权码采购数据加载完成");
    },
    //设置商品列表
    ["QRCODERECIEPT_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["QRCODERECIEPT_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["QRCODERECIEPT_SEARCH"](state, flag) {
      state.isSearch = flag;
    }
  },
  actions: {
  }
};
