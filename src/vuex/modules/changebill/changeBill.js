
import { getSumPayOrders } from "@src/apis";
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
    ["CHANGEBILL_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        status: "",
        agentNo: "",
        billNo: ""
      };
      state.sumData = {
        amountCount: 0,
        amountSum: 0,
      }
    },
    //设置商品列表profitBilling
    ["CHANGEBILL_QUERY_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["CHANGEBILL_QUERY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["CHANGEBILL_QUERY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //合计
    ["CHANGEBILL_SUM"](state, data) {
      state.sumData = data;
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getOrderQueryUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      console.log(itemId)
      return state.list.find(item => item.orderNo == itemId);
    },
    // 合计
    getOrderQuerySum({ commit, dispatch, getters, rootGetters, rootState, state }, good) {
      return getSumPayOrders()({ ...state.searchQuery }).then(data => {
        if (data.code == "00") {
          commit("ORDER_SUM", data.data);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};
