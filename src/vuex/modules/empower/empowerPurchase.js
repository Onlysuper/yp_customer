
// 授权码采购

import { patchPurchaseArantNum, postPurchaseArantNum } from "@src/apis";
import { Toast } from "mint-ui";
import utils from "@src/common/utils";
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
    ["QRCODERECIEPT_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        receiptNo: "",
        status: "",
        receiptType: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
      };
      console.info("授权码采购数据加载完成");
    },
    //设置商品列表
    ["QRCODERECIEPT_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["QRCODERECIEPT_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["QRCODERECIEPT_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //更新订单
    ["QRCODERECIEPT_UPDATA"](state, receiptCode) {
      state.list = state.list.map(item => {
        if (receiptCode.receiptNo == item.receiptNo) return receiptCode;
        else return item;
      })
    },

  },
  actions: {
    getEmpowerCodeInfo({ commit, dispatch, getters, rootGetters, rootState, state }, receiptNo) {
      return state.list.find(item => item.receiptNo == receiptNo);
    },

    //修改订单数量
    editEmpowerCodeInfo({ commit, dispatch, getters, rootGetters, rootState, state }, receiptCode) {
      return patchPurchaseArantNum()({
        receiptNo: receiptCode.receiptNo,
        qrcodeCount: receiptCode.qrcodeCount
      }).then(data => {
        if (data.code == "00") {
          Toast("修改成功");
          commit("QRCODERECIEPT_UPDATA", receiptCode);
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    //添加授权码
    addEmpowerCodeInfo({ commit, dispatch, getters, rootGetters, rootState, state }, receiptCode) {
      return postPurchaseArantNum()({
        ...receiptCode
      }).then(data => {
        if (data.code == "00") {
          Toast("提交成功");

          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
  }
};
