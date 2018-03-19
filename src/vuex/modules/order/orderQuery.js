
import { getBillprofitSum } from "@src/apis";
import { Toast } from "mint-ui";

import utils from "@src/common/utils";
export default {
  state: {
    list: [],
    //搜索条件
    searchQuery: {},
    //是否搜索操作，便于刷新
    isSearch: false,
    //合计
    sumData: {}
  },
  getters: {
  },
  mutations: {
    //初始化store orderQuery
    ["ORDER_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        startTime: utils.formatDate(new Date(), "yyyy-MM-dd"),
        endTime: utils.formatDate(new Date(), "yyyy-MM-dd"),
        orderNo: "",
        agentNo: "",
        customerNo: "",
        payType: "",
        status: "",
        hasChild: "TRUE",
      };
      state.sumData = {
        customerSum: 0,
        rebateSum: 0,
        subsidySum: 0
      }
    },
    //设置商品列表profitBilling
    ["ORDER_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["ORDER_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["ORDER_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getOrderQueryUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      console.log(itemId)
      return state.list.find(item => item.orderNo == itemId);
    },
  }
};
