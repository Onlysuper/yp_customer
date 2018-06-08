
// 日开票详情
import { } from "@src/apis";
import { eightdayStr, yesterdayStr } from "@src/common/dateSerialize";
import { Toast } from "mint-ui";
import utils from "@src/common/utils";
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
    ["BILLDAY_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        dataTimeBegin: utils.formatDate(new Date(), "yyyy-MM-dd"),
        dataTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
        containChild: "TRUE",
      };
      console.info("日开票记录数据加载完成");
    },
    //设置商品列表
    ["BILLDAY_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["BILLDAY_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["BILLDAY_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //是否添加
    ["BILLDAY_ADD"](state, flag) {
      state.isAdd = flag;
    },
  },
  actions: {
  }
};
