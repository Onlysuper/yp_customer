
// 授权码审核
import { postEditEmpower } from "@src/apis";
import { Toast } from "mint-ui";
export default {
  state: {
    list: [],
    searchQuery: {

    }, //搜索条件
    isSearch: false,//是否搜索操作，便于刷新
  },
  getters: {
  },
  mutations: {
    //初始化store    
    ["QRCODE_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        status: "",
      };
      console.info("授权码审核数据加载完成");
    },
    //设置商品列表
    ["QRCODE_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["QRCODE_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["QRCODE_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    // 刷新数据
    ["QRCODE_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.receiptNo == item.receiptNo) return data;
        else return item;
      })
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getEmpowerManageUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.receiptNo == itemId);
    },
    editEmpowerManage({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      let supportTypes1 = "";
      let supportTypes2 = "";
      let supportTypes3 = "";
      thisForm.supportTypes.forEach((element, index) => {
        if (element == "1") {
          supportTypes1 = 1;
        } else if (element == "2") {
          supportTypes2 = 2;
        } else if (element == "4") {
          supportTypes3 = 4;
        }
      });
      return postEditEmpower()({
        qrcode: thisForm.qrcode,
        authCode: thisForm.authCode,
        agentNo: thisForm.agentNo,
        customerNo: thisForm.customerNo,
        extensionNum: thisForm.extensionNum,
        serviceMode: thisForm.serviceMode,
        "supportTypes[0]": supportTypes1,
        "supportTypes[1]": supportTypes2,
        "supportTypes[2]": supportTypes3
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          commit("QRCODE_UPDATA", thisForm);
          Toast("修改成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
  }
};
