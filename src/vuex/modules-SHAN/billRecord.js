
// 开票记录
import { postEditBillrecord } from "@src/apis";
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
    ["BILLRECORD_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        invoiceType: "",
        status: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd")
      };
      console.info("开票记录数据加载完成");
    },
    //设置商品列表
    ["BILLRECORD_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["BILLRECORD_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
      console.log(state.searchQuery);
    },
    //是否开始搜索
    ["BILLRECORD_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //更新
    ["BILLRECORD_UPDATA"](state, formData) {
      state.list = state.list.map(item => {
        if (formData.billRecordNo == item.billRecordNo) return formData;
        else return item;
      })
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.billRecordNo == itemId);
    },
    upBillRecord({ commit, dispatch, getters, rootGetters, rootState, state }, editForm) {
      return postEditBillrecord()({
        billRecordNo: editForm.billRecordNo,
        orderNo: editForm.orderNo,
        status: editForm.status,
        invoiceCode: editForm.invoiceCode,
        invoiceNo: editForm.invoiceNo,
        totalTax: editForm.totalTax,
        phoneNo: editForm.phoneNo,
        enterpriseName: editForm.phoneNo,
        taxNo: editForm.taxNo,
        enterpriseAddress: editForm.enterpriseAddress,
        bankName: editForm.bankName,
        bankAccountNo: editForm.bankAccountNo,
        companyPhone: editForm.companyPhone,
        bussinessName: editForm.bussinessName,
        billAmount: editForm.billAmount
      }).then(data => {
        if (data.code == "00") {
          commit("BILLRECORD_UPDATA", editForm);
          Toast("修改成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    }
  }
};
