import utils from "@src/common/utils";
// 埋点管理
import { getBurialPointTotal } from "@src/apis";
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
    ["OPERATORLOG_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.isReload = false;
      state.searchQuery = {
        customerNo: "", // 商户编号
        agentNo: "", // 合伙人编号
        version: "", // 版本号
        actionId: "", // 操作类型
        userId: "", // 授权码
        userType: "",//用户类型
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"), // 开始时间
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd") // 结束时间
      };
    },
    //设置商品列表
    ["OPERATORLOG_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["OPERATORLOG_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    // 刷新数据
    ["OPERATORLOG_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.authCode == item.authCode) return data;
        else return item;
      })
    },
    //是否开始搜索
    ["OPERATORLOG_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    // 合计
    ["OPERATORLOG_SUM"](state, data) {
      state.sumData = data;
    }
  },
  actions: {
    // 合计
    getBuriedPointSumAc({ commit, dispatch, getters, rootGetters, rootState, state }) {
      return getBurialPointTotal()({ ...state.searchQuery }).then(data => {
        commit("OPERATORLOG_SUM", data);
        return true;
      })
    }
  }
};
