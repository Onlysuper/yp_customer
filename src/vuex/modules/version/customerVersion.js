import utils from "@src/common/utils";
// 商户版本
import { postCustomerVersion } from "@src/apis";
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
    ["CUSTOMERVERSIONPLUGIN_SEARCH_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.isReload = false;
      state.searchQuery = {
        customerNo: "",
        version: "",
        status: "TRUE",
        type: ""
      };
    },
    //设置商品列表
    ["CUSTOMERVERSIONPLUGIN_SEARCH_LIST"](state, datas) {
      state.list = datas || [];
    },
    //设置搜索条件
    ["CUSTOMERVERSIONPLUGIN_SEARCH_QUERY"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    // 刷新数据
    ["CUSTOMERVERSIONPLUGIN_UPDATA"](state, data) {
      state.list = state.list.map(item => {
        if (data.authCode == item.authCode) return data;
        else return item;
      })
    },
    //是否开始搜索
    ["CUSTOMERVERSIONPLUGIN_SEARCH"](state, flag) {
      state.isSearch = flag;
    }

  },
  actions: {
    // 新增或修改商户信息
    addCustomerVersionSave({ commit, dispatch, getters, rootGetters, rootState, state }, thisForm) {
      return postCustomerVersion()(this.form).then(data => {
        if (data.code == "00") {
          this.reloadData();
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.dialogVisible = false;
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
        this.saveLoading = false;
      });
    },
  }
};
