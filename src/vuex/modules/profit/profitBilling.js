
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
    //初始化store
    ["PROFITBILLING_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        enterpriseName: "",
        dataTime: utils.formatDate(new Date(), "yyyy-MM-dd"),
        agentNo: "",
        containChild: "TRUE",//TRUE
        settleStatus: "",//FALSE
      };
      state.sumData = {
        customerSum: 0,
        rebateSum: 0,
        subsidySum: 0
      },
        console.info("初始化商品管理数据完成");
    },
    //设置商品列表profitBilling
    ["PROFITBILLING_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["PROFITBILLING_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["PROFITBILLING_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //总计
    ["PROFITBILLING_SUM"](state, data) {
      state.sumData = data;
    },
  },
  actions: {
    getGood2222222({ commit, dispatch, getters, rootGetters, rootState, state }, goodsNo) {
      return state.list.find(item => item.goodsNo == goodsNo)
    },
    getBillprofitSum({ commit, dispatch, getters, rootGetters, rootState, state }) {
      return getBillprofitSum()({ ...state.searchQuery }).then(data => {
        if (data.code == "00") {
          commit("PROFITBILLING_SUM", data.data);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};
