
import { postAddCustomer, postEditCustomer, transferCustomer } from "@src/apis";
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
    //初始化store customerManage
    ["CUSTOMER_MANAGE_INIT"](state) {
      state.list = [];
      state.isSearch = false;
      state.searchQuery = {
        status: "",
        //商户编号
        customerNo: "",
        //企业税号
        taxNo: "",
        //企业名称
        enterpriseName: "",
        //合伙人编号
        agentNo: "",
        //是否包含下级
        containChild: "TRUE",
        //入网来源
        customerFrom: "",
        //开始时间
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        //结束时间
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
      };
      console.info("初始化商户管理数据完成");
    },
    //设置商品列表
    ["CUSTOMER_MANAGE_SET_LIST"](state, goods) {
      state.list = goods || [];
    },

    //设置搜索条件
    ["CUSTOMER_MANAGE_SET_SEARCH"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    //是否开始搜索
    ["CUSTOMER_MANAGE_IS_SEARCH"](state, flag) {
      state.isSearch = flag;
    },
    //添加商户
    ["CUSTOMER_MANAGE_ADD"](state, customer) {
      state.list.push(customer)
    },
    //更新商户
    ["CUSTOMER_MANAGE_UPDATA"](state, customer) {
      state.list = state.list.map(item => {
        if (customer.customerNo == item.customerNo) return customer;
        else return item;
      })
    },
  },
  actions: {

    getCustomer({ commit, dispatch, getters, rootGetters, rootState, state }, customerNo) {
      return state.list.find(item => item.customerNo == customerNo)
    },
    //商户新增
    addCustomer({ commit, dispatch, getters, rootGetters, rootState, state }, customer) {
      return postAddCustomer()({
        ...customer
      }).then(data => {
        if (data.code == "00") {
          Toast("添加成功");

          commit("CUSTOMER_MANAGE_ADD", customer);
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    //商户更新
    updataCustomer({ commit, dispatch, getters, rootGetters, rootState, state }, customer) {
      return postEditCustomer()({
        ...customer
      }).then(data => {
        if (data.code == "00") {
          Toast("修改成功");

          commit("CUSTOMER_MANAGE_UPDATA", customer);
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    //商户转移
    transferCustomer({ commit, dispatch, getters, rootGetters, rootState, state }, customer) {
      return transferCustomer()({
        ...customer
      }).then(data => {
        if (data.code == "00") {
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
