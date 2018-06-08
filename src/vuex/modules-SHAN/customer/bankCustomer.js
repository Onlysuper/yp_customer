
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

    ["BANKCUSTOMER_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        bankCustomerNo: "",
        channelWay: "",
        status: "",
      };
      state.sumData = {
        scan: 0,
        billSuccess: 0,
        register: 0
      }
      console.info("初始化开票统计完成");
    },
    //设置商品列表
    ["BANKCUSTOMER_SEARCH_INIT_list"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["BANKCUSTOMER_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["BANKCUSTOMER_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //是否添加
    ["BANKCUSTOMER_ADD"](state, flag) {
      state.isAdd = flag;
    },
    //合计
    ["BANKCUSTOMER_SUM"](state, data) {
      state.sumData = data;
    },
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getBankCustomer({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.customerNo == itemId);
    }
  }
};
