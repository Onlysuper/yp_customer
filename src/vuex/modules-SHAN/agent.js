
import { postEditAgentManage, postAddAgentManage, } from "@src/apis";
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
        level: ""
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
    //修改操作
    ["AGENT_UP_DATA"](state, newAgent) {
      state.list = state.list.map(item => {
        if (item.agentNo == newAgent.agentNo)
          return newAgent;
        else
          return item;
      })
    }
  },
  actions: {
    //查找合伙人信息
    findAgentInfo({ commit, dispatch, getters, rootGetters, rootState, state }, agentNo) {
      return state.list.find(item => item.agentNo == agentNo);
    },

    //添加合伙人
    addAgent({ commit, dispatch, getters, rootGetters, rootState, state }, agent) {
      return postAddAgentManage()(agent).then(data => {
        if (data.code == "00") {
          return true;
        } else {
          Toast(data.msg);
        }
      })
    },

    //编辑合伙人
    editAgent({ commit, dispatch, getters, rootGetters, rootState, state }, newAgent) {
      return postEditAgentManage()(newAgent).then(data => {
        if (data.code == "00") {
          Toast("修改成功");
          commit("AGENT_UP_DATA", newAgent);
          return true;
        } else {
          Toast(data.msg);
        }
      })
    },
  }
};
