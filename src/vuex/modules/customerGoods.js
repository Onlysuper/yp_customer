
import { postAddCustomerGoods, postEditCustomerGoods } from "@src/apis";
import { Toast } from "mint-ui";
export default {
  state: {
    list: [],
    searchQuery: {}, //搜索条件
    isSearch: false,//是否搜索操作，便于刷新
    isAdd: false,//是否添加操作，便于刷新
  },
  getters: {
  },
  mutations: {
    ["SET_GOODS"](state, goods) {
      state.list = goods || [];
    },
    ["UPDATA_GOOD"](state, good) {
      state.list = state.list.map(item => {
        if (good.customerNo == item.customerNo) return good;
        else return item;
      })
    },
    ["ADD_GOOD"](state, good) {
      state.list.push(good)
    },
    ["SEARCH_GOOD"](state, searchObj) {
      state.searchQuery = Object.assign(state.searchQuery, searchObj)
    },
    ["IS_SEARCH_GOOD"](state, flag) {
      state.isSearch = flag;
    },
    ["IS_ADD_GOOD"](state, flag) {
      state.isAdd = flag;
    },
    ["INIT_GOODS_STORE"](state) {
      state.list = [];
      state.isSearch = false;
      state.isAdd = false;
      state.searchQuery = {};
      console.info("初始化商品管理数据完成");
    },
  },
  actions: {
    getGood({ commit, dispatch, getters, rootGetters, rootState, state }, customerNo) {
      return state.list.find(item => item.customerNo == customerNo)
    },
    updataGood({ commit, dispatch, getters, rootGetters, rootState, state }, good) {
      return postEditCustomerGoods()({
        unionNo: good.unionNo,
        goodsNo: good.goodsNo,
        customerNo: good.customerNo,
        goodsName: good.goodsName,
        model: good.model,
        unit: good.unit,
        unitPrice: good.unitPrice,
        taxRate: good.taxRate,
        enjoyDiscount: good.enjoyDiscount,
        discountType: good.discountType,
      }).then(data => {
        if (data.code == "00") {
          Toast("修改成功");
          commit("UPDATA_GOOD", good);
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    addGood({ commit, dispatch, getters, rootGetters, rootState, state }, good) {
      return postAddCustomerGoods()({
        unionNo: good.unionNo,
        goodsNo: good.goodsNo,
        customerNo: good.customerNo,
        goodsName: good.goodsName,
        model: good.model,
        unit: good.unit,
        unitPrice: good.unitPrice,
        taxRate: good.taxRate,
        enjoyDiscount: good.enjoyDiscount,
        discountType: good.discountType,
      }).then(data => {
        if (data.code == "00") {
          Toast("添加成功");
          commit("ADD_GOOD", good);
          return true;
        } else {
          Toast(data.msg);
          return false;
        }
      })
    },
    remove({ commit, dispatch, getters, rootGetters, rootState, state }, customerNo) {
      remove()({}).then(data => {
        if (data.code == "00") {
          Toast("删除成功");
        } else {
          Toast(data.msg);
        }
      })
    },
  }
};
