
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
    //初始化store convergePayComm
    ["CONVERGE_PAY_COMM_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        status: "",
        dataTime: utils.formatDate(new Date(), "yyyy-MM-dd"),
        agentNo: "",
        enterpriseName: "",
        hasChild: "TRUE",
      };
      state.sumData = {
        customerSum: 0,
        rebateSum: 0,
        subsidySum: 0
      }
    },
    //设置商品列表profitBilling
    ["CONVERGE_PAY_COMM_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["CONVERGE_PAY_COMM_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["CONVERGE_PAY_COMM_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //总计
    ["CONVERGE_PAY_COMM_SUM"](state, data) {
      state.sumData = data;
    },
  },
  actions: {
    getConvergePayCommSum({ commit, dispatch, getters, rootGetters, rootState, state }) {
      return getBillprofitSum()({ ...state.searchQuery }).then(data => {
        if (data.code == "00") {
          commit("CONVERGE_PAY_COMM_SUM", data.data);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};
