
import { getBillcountSum } from "@src/apis";
import { Toast } from "mint-ui";
import utils from "@src/common/utils";
export default {
  state: {
    list: [],
    searchQuery: {}, //搜索条件
    sumData: {},
    isSearch: false,//是否搜索操作，便于刷新
  },
  getters: {
  },
  mutations: {
    //初始化store
    ["BILLCOUNT_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        agentNo: "",
        dataTimeBegin: utils.formatDate(new Date(Date.now() - 7 * (24 * 60 * 60 * 1000)), "yyyy-MM-dd"),
        dataTimeEnd: utils.formatDate(new Date(Date.now() - 1 * (24 * 60 * 60 * 1000)), "yyyy-MM-dd"),
        containChild: "TRUE",
      };
      state.sumData = {
        scan: 0,
        billSuccess: 0,
        register: 0
      }
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
    //合计
    ["BILLCOUNT_SUM"](state, data) {
      state.sumData = data;
    },
  },
  actions: {
    // 合计
    getBillcountSum({ commit, dispatch, getters, rootGetters, rootState, state }) {
      return getBillcountSum()({ ...state.searchQuery }).then(data => {
        if (data.code == "00") {
          commit("BILLCOUNT_SUM", data.data);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};
