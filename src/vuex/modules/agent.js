
import { getBillprofitSum } from "@src/apis";
import { Toast } from "mint-ui";

import utils from "@src/common/utils";
export default {
  state: {
    list: [],
    //搜索条件
    searchQuery: {},
    //是否搜索操作，便于刷新
    isSearch: false,
  },
  getters: {
  },
  mutations: {
    //初始化store
    ["AGENT_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        phoneNo: "",
        agentName: "",
        agentNo: "",
      };
      console.info("初始化合伙人管理数据完成");
    },
    //设置商品列表
    ["AGENT_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["AGENT_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["AGENT_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
  },
  actions: {
    //查找合伙人信息
    findAgentInfo({ commit, dispatch, getters, rootGetters, rootState, state }, goodsNo) {
      return state.list.find(item => item.goodsNo == goodsNo);
    },

    //添加合伙人
    addAgent({ commit, dispatch, getters, rootGetters, rootState, state }) {

    },

    //编辑合伙人
    editAgent({ commit, dispatch, getters, rootGetters, rootState, state }) {

    },
  }
};
