import utils from "@src/common/utils";
// 商户版本
import { postStatusCustomerSettle } from "@src/apis";
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
    ["CUSTOMERSETTLE_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.isReload = false;
      state.searchQuery = {
        customerNo: "",
        settleStatus: "",
        outMoneyStatus: "",
        customerName: "",
        settleName: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
      };
    },
    //设置商品列表
    ["CUSTOMERSETTLE_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["CUSTOMERSETTLE_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    // 刷新数据
    ["CUSTOMERSETTLE_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.customerNo == item.customerNo) return data;
        else return item;
      })
    },
    //是否开始搜索
    ["CUSTOMERSETTLE_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //更新状态
    ["CUSTOMERSETTLE_UPDATE_STATUS"](state, data) {
      let customerNo = data.customerNo;
      let payTime = data.payTime;
      let newStatus = data.newStatus;
      state.list = state.list.map((item, index) => {
        if (customerNo == item.customerNo && payTime == item.payTime) {
          let newItem = { ...item };
          newItem.outMoneyStatus = newStatus;
          return newItem;
        } else {
          return item
        }
      })
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getCustomerSettle({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.customerNo == itemId);
    },
    // 同步状态
    updateCustomerSettle({ commit, dispatch, getters, rootGetters, rootState, state }, item) {
      return postStatusCustomerSettle()({
        customerNo: item.customerNo,
        payTime: item.payTime
      }).then(res => {
        if (res.code == "00") {
          let data = {...item};
          data.newStatus = res.data;
          commit("CUSTOMERSETTLE_UPDATE_STATUS", data);
          return true;
        } else {
          Toast(res.msg);
        }
      })
    }
  }
};
