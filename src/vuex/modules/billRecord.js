
// 开票记录
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
    ["BILLRECORD_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {};
      console.info("开票记录数据加载完成");
    },
    //设置商品列表
    ["BILLRECORD_SEARCH_INIT_list"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["BILLRECORD_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["BILLRECORD_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //是否添加
    ["BILLRECORD_ADD"](state, flag) {
      state.isAdd = flag;
    },
  },
  actions: {
  }
};
