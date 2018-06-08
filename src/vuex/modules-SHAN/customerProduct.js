
// 商户产品

import { getCustomerEchoProduct, getUserProductStatus, } from "@src/apis";
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
    ["CUSTOMER_PRODUCT_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        bussinessNo: "",
        customerName: "",
        qrcodeStatus: "",
        elecStatus: "",
        payStatus: ""
      };
      console.info("商户产品数据加载完成");
    },
    //设置商品列表
    ["CUSTOMER_PRODUCT_SET_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["CUSTOMER_PRODUCT_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["CUSTOMER_PRODUCT_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    }
  },
  actions: {
    //回显表单
    getCustomerProductOne({ commit, dispatch, getters, rootGetters, rootState, state }, bussinessNo) {
      return state.list.find(item => item.bussinessNo == bussinessNo);
    },
    getCustomerEchoProduct({ commit, dispatch, getters, rootGetters, rootState, state }, query) {
      return getCustomerEchoProduct()({ ...query }).then(data => {
        console.log(data);
        if (data.code == "00") {
          return data.data;
        } else {
          Toast(data.msg);
        }
      })
    },
    getUserProductStatus({ commit, dispatch, getters, rootGetters, rootState, state }, formList) {
      return getUserProductStatus()({
        ...formList
      }).then(res => {
        console.log(res);
        if (res.code == "00") {
          Toast("操作成功");
          return true;
        } else {
          Toast(res.msg);
          return false;
        }
      })
    }
  },


};
