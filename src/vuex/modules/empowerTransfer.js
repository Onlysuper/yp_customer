import utils from "@src/common/utils";
// 授权码转移
import { postMigrateNumTransfer } from "@src/apis";
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
    ["QRCODEMIGRATE_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.isReload = false;
      state.searchQuery = {
        migrateNo: "",
        migrateMode: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
      };
      console.info("授权码审核数据加载完成");
    },
    //设置商品列表
    ["QRCODEMIGRATE_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["QRCODEMIGRATE_SEARCH_QUERY"](state, searchObj) {
      console.log(searchObj);
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    // 刷新数据
    ["QRCODEMIGRATE_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.authCode == item.authCode) return data;
        else return item;
      })
    },
    //是否开始搜索
    ["QRCODEMIGRATE_SEARCH"](state, flag) {
      state.isSearch = flag;
    }

  },
  actions: {
    // 授权码分配
    allotEmpowerSave({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return postMigrateNumTransfer()({
        deviceType: thisForm.deviceType,
        migrateCount: thisForm.migrateCount,
        prefixNo: thisForm.prefixNo,
        migrateType: thisForm.migrateType,
        migrateMode: "DOWNWARD_MIGRATE",
        qrcodeStart: thisForm.qrcodeStart,
        qrcodeEnd: thisForm.qrcodeEnd,
        qrcodes: thisForm.qrcodes,
        agentNo: thisForm.agentNo
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          Toast("授权码分配成功！");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      });
    },
    // 授权码上缴
    paidEmpowerSave({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      console.log(thisForm);
      return postMigrateNumTransfer()({
        deviceType: thisForm.deviceType,
        migrateCount: thisForm.migrateCount,
        prefixNo: thisForm.prefixNo,
        migrateType: thisForm.migrateType,
        migrateMode: "UPWARD_MIGRATE",
        qrcodeStart: thisForm.qrcodeStart,
        qrcodeEnd: thisForm.qrcodeEnd,
        qrcodes: thisForm.qrcodes
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          Toast("授权码上缴成功！");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      });
    }
  }
};
