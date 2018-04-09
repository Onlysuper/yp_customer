
// 达标详情
import { } from "@src/apis";
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
    ["BILLSTANDARD_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        // this.searchCondition.billSuccessBegin = billSuccessArr[0];
        // this.searchCondition.billSuccessEnd = billSuccessArr[1];
        standard: "",
        billSuccess: "",
        billSuccessBegin: "",
        billSuccessEnd: "",
        startNetTime: utils.formatDate(new Date(), "yyyy-MM-dd"),
        endNetTime: utils.formatDate(new Date(), "yyyy-MM-dd"),
        standardTimeBegin: utils.formatDate(new Date(), "yyyy-MM-dd"),
        standardTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
        containChild: "TRUE",
      };
      console.info("达标详情数据加载完成");
    },
    //设置商品列表
    ["BILLSTANDARD_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["BILLSTANDARD_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["BILLSTANDARD_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //是否添加
    ["BILLSTANDARD_ADD"](state, flag) {
      state.isAdd = flag;
    },
  },
  actions: {
  }
};
