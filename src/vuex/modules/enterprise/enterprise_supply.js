
import { postAddEnterpriseSupply } from "@src/apis";
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
    //初始化store enterprise_supply
    ["ENTERPRISE_SUPPLY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
      };
    },
    //设置商品列表
    ["ENTERPRISE_SUPPLY_SET_LIST"](state, goods) {
      state.list = goods || [];
    },

    //设置搜索条件
    ["ENTERPRISE_SUPPLY_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["ENTERPRISE_SUPPLY_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //添加资质
    ["ENTERPRISE_SUPPLY_ADD"](state, item) {
      state.list.push(item);
    }
  },
  actions: {
    addEnterpriseSupply({ commit, dispatch, getters, rootGetters, rootState, state }, form) {
      return postAddEnterpriseSupply()(form).then(data => {
        if (data.code == "00") {
          Toast("添加成功");
          return true;
        } else {
          Toast(data.msg);
        }
      })
    }
  }
};
