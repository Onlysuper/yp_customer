import utils from "@src/common/utils";
// 商户版本
import { getAgentSettleSum, postUpdateSettles } from "@src/apis";
import { Toast } from "mint-ui";
export default {
  state: {
    list: [],
    searchQuery: {}, //搜索条件
    isSearch: false,//是否搜索操作，便于刷新
    sumData: {
      customerNumber: "",
      settlePrice: ""
    }
  },
  getters: {
  },
  mutations: {
    //初始化store    
    ["SETTLE_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.isReload = false;
      state.searchQuery = {
        agentNo: "",
        agentName: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
        status: ""
      };
    },
    //设置商品列表
    ["SETTLE_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["SETTLE_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    // 刷新数据
    ["SETTLE_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.orderNo == item.orderNo) return data;
        else return item;
      })
    },
    //是否开始搜索
    ["SETTLE_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //合计
    ["SETTLE_SUM"](state, data) {
      console.log(data);
      state.sumData = data;
    },

  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getAgentSettleUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.settleNo == itemId);
    },
    // 合计
    getAgentSettleSumAc({ commit, dispatch, getters, rootGetters, rootState, state }) {
      return getAgentSettleSum()({ ...state.searchQuery }).then(data => {
        if (data.code == "00") {
          commit("SETTLE_SUM", data.data);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    },

    postUpdateSettlesAc({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      postUpdateSettles()({
        ...thisForm
      }).then(data => {
        if (data.code == "00") {
          Toast("操作成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      });
    }

  }
};
