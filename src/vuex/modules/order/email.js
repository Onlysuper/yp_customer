
import {
  getSumPayOrders,
  postAddEmailconfig,
  postEditEmailconfig
} from "@src/apis";
import { Toast } from "mint-ui";

import utils from "@src/common/utils";
export default {
  state: {
    list: [],
    //搜索条件
    searchQuery: {},
    //是否搜索操作，便于刷新
    isSearch: false
  },
  getters: {
  },
  mutations: {
    //初始化store orderQuery
    ["EMAIL_QUERY_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        customerNo: "",
        status: ""
      };
    },
    //设置商品列表profitBilling
    ["EMAIL_SET_LIST"](state, list) {
      state.list = list || [];
    },
    //设置搜索条件
    ["EMAIL_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["EMAIL_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    // 是否有更新
    ["EMAIL_IS_UPDATE"](state, flag) {
      state.isUpdate = flag;
    },
    ['EMAIL_ADD'](state, data) {
      state.list.push(data)
    },
    ['EMAIL_EDIT'](state, data) {
      state.list = state.list.map(item => {
        if (data.bussinessNo == item.bussinessNo) {
          return Object.assign(item, data);
        }
        else return item;
      })
      console.log(state.list);
    }
  },
  actions: {
    // 数据列表中获取当前编辑得数据
    getEmailUnit({ commit, dispatch, getters, rootGetters, rootState, state }, itemId) {
      return state.list.find(item => item.bussinessNo == itemId);
    },
    //新增
    postAddEmailconfig({ commit, dispatch, getters, rootGetters, rootState, state }, sendData) {
      return postAddEmailconfig()({ ...sendData }).then(data => {
        if (data.code == "00") {
          Toast("新增成功");
          commit("EMAIL_ADD", data);
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    //编辑
    postEditEmailconfig({ commit, dispatch, getters, rootGetters, rootState, state }, sendData) {
      return postEditEmailconfig()({ ...sendData }).then(data => {
        console.log(data);
        if (data.code == "00") {
          Toast("修改成功");
          commit("EMAIL_EDIT", { ...sendData });
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    }
  }
};
