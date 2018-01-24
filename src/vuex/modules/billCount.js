
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
    ["BILLCOUNT_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {};
      console.info("初始化开票统计完成");
    },
    //设置商品列表
    ["BILLCOUNT_SEARCH_INIT_list"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["BILLCOUNT_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["BILLCOUNT_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //是否添加
    ["BILLCOUNT_ADD"](state, flag) {
      state.isAdd = flag;
    },
  },
  actions: {
  }
};
