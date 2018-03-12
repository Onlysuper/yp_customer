
// 授权码审核
import { putAdoptArantNumExamine, putRefuseArantNumExamine } from "@src/apis";
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
    ["QRCODERECIEPTAUDIT_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        receiptNo: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
        status: "",
        receiptType: ""
      };
      console.info("授权码审核数据加载完成");
    },
    //设置商品列表
    ["QRCODERECIEPTAUDIT_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["QRCODERECIEPTAUDIT_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["QRCODERECIEPTAUDIT_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    ["QRCODERECIEPTAUDIT_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.receiptNo == item.receiptNo) {
          console.log(data)
          return data;
        }
        else return item;
      })
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getEmpowerCheckUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => {
        return item.receiptNo == itemId
      });
    },
    // 审核通过
    adoptEmpowerCheck({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return putAdoptArantNumExamine()({
        receiptNo: thisForm.receiptNo,
        receiptType: thisForm.receiptType,
        agentNo: thisForm.agentNo,
        qrcodeCount: thisForm.qrcodeCount,
        price: thisForm.price,
        migrateType: thisForm.migrateType,
        qrcodeStart: thisForm.qrcodeStart,
        qrcodeEnd: thisForm.qrcodeEnd,
        qrcodes: thisForm.qrcodes
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          let row = { ...thisForm };
          row.status = "SUCCESS";
          commit("QRCODERECIEPTAUDIT_UPDATA", row);
          Toast("修改成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    // 拒绝通过
    refuseEmpowerCheck({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return putRefuseArantNumExamine()({
        agentNo: thisForm.agentNo,
        receiptNo: thisForm.receiptNo,
        receiptType: thisForm.receiptType,
        qrcodeCount: thisForm.qrcodeCount,
        price: thisForm.price,
        prefixNo: thisForm.prefixNo,
        migrateType: thisForm.migrateType,
        qrcodeStart: thisForm.qrcodeStart,
        qrcodeEnd: thisForm.qrcodeEnd,
        qrcodes: thisForm.qrcodes
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          let row = { ...thisForm };
          row.status = "REJECT";
          commit("QRCODERECIEPTAUDIT_UPDATA", row);
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
