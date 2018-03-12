
// 授权码审核
import { postEditEmpower, postBindChildEmpower, postBindEmpower, postMakeEmpower, postMakeTorageEmpower } from "@src/apis";
import { Toast } from "mint-ui";
import utils from "@src/common/utils";
export default {
  state: {
    list: [],
    searchQuery: {

    }, //搜索条件
    isSearch: false,//是否搜索操作，便于刷新
    isReload: false
  },
  getters: {
  },
  mutations: {
    //初始化store    
    ["QRCODE_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        batchNo: "",
        agentNo: "",
        customerNo: "",
        qrcode: "",
        authCode: "",
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
        status: "",
        receiptType: "",
        materiel: "",
        containChild: "TRUE",

      };
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
      console.log(data);
      console.log(data.authCode);
      state.list = state.list.map(item => {
        if (data.authCode == item.authCode) return data;
        else return item;
      })
    },
    // 生成授权码
    ["QRCODE_IS_BUILD"](state, data) {
      state.list.push(data)
    },
    ["QRCODE_IS_RELOAD"](state, flag) {
      state.isReload = flag;
    },
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getEmpowerManageUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.authCode == itemId);
    },
    // 编辑
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
    // 绑定
    bindEmpowerManage({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return postBindEmpower()({
        qrcode: thisForm.qrcode,
        authCode: thisForm.authCode,
        agentNo: thisForm.agentNo,
        customerNo: thisForm.customerNo
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          let row = { ...thisForm };
          row.status = "BINDED";
          commit("QRCODE_UPDATA", row);
          Toast("绑定成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
        this.saveLoading = false;
      });
    },
    // 绑定子码
    bindChildEmpowerManage({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return postBindChildEmpower()({
        authCode: thisForm.authCode,
        qrcode: thisForm.qrcode,
        childQrcodes: thisForm.childQrcodes
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          commit("QRCODE_UPDATA", thisForm);
          Toast("绑定成功");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
        this.saveLoading = false;
      });
    },
    // 生成授权码
    buildEmpowerManage({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      let supportTypes1 = "";
      let supportTypes2 = "";
      let supportTypes3 = "";
      thisForm.supportTypes.forEach((element, index) => {
        if (element == "普票") {
          supportTypes1 = 1;
        } else if (element == "专票") {
          supportTypes2 = 2;
        } else if (element == "特殊") {
          supportTypes3 = 4;
        }
      });
      return postMakeEmpower()({
        deviceType: "AUTHCODE",
        agentNo: thisForm.agentNo,
        qrcodeCount: thisForm.qrcodeCount,
        serviceMode: thisForm.serviceMode,
        "supportTypes[0]": supportTypes1,
        "supportTypes[1]": supportTypes2,
        "supportTypes[2]": supportTypes3
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          commit("QRCODE_IS_RELOAD");
          Toast("生成授权码成功！");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      });
    },
    // 物料入库
    addTorageMaterielSave({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      console.log(thisForm);
      return postMakeTorageEmpower()({
        deviceType: thisForm.deviceType,
        receiptCount: thisForm.receiptCount,
        prefixNo: thisForm.prefixNo,
        migrateType: thisForm.migrateType,
        qrcodeStart: thisForm.qrcodeStart,
        qrcodeEnd: thisForm.qrcodeEnd,
        qrcodes: thisForm.qrcodes
      }).then(data => {
        if (data.code == "00") {
          //刷新数据
          commit("QRCODE_IS_RELOAD");
          Toast("物料入库成功！");
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      });
    },
  }
};
