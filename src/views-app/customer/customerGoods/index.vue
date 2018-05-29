<template>
  <full-page class="page" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'goodsSearch'})">搜索</mt-button>
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button> -->
      <mt-button slot="right" :disabled="false" type="danger" @click="toUrl('ADD')">新增</mt-button>
    </mt-header>
    <!-- actions操作 -->
    <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.goodsName">

        <!-- 常用按钮 -->
        <div slot="btn" @click="toUrl('EDIT',item.goodsNo)">编辑</div>

        <!-- 状态 -->

        <mt-badge slot="badge" v-if="item.taxRate" class="g-min-badge" size="small" type="primary">{{item.taxRate | handleTaxRate}}</mt-badge>
        <mt-badge slot="badge" v-if="item.discountType" class="g-min-badge" size="small" type="primary">{{item.discountType | handleDiscountType}}</mt-badge>
        <mt-badge slot="badge" v-if="item.enjoyDiscount" class="g-min-badge" size="small" type="primary">{{item.enjoyDiscount | handleEnjoyDiscount}}</mt-badge>
        <!-- <mt-badge v-if="item.defaultType == 'TRUE'" slot="badge" class="g-min-badge" size="small" type="error">{{item.defaultType | statusFilter('handleDefaultType')}}</mt-badge> -->
        <mt-badge v-if="item.defaultType == 'TRUE'" slot="badge" class="g-min-badge" size="small" type="error" :color="filterColor(item.defaultType,'handleDefaultType')">{{item.defaultType | statusFilter('handleDefaultType')}}</mt-badge>
<!-- <mt-badge slot="badge" v-if="item.status" class="g-min-badge" size="small" :color="filterColor(item.status,'handleStatus')">{{item.status | statusFilter('handleStatus')}}</mt-badge> -->
        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
            <myp-tr title="商品编号">{{item.goodsNo}}</myp-tr>
            <myp-tr title="商品单价">{{item.unitPrice || "--"}}/{{item.unit || "--"}}</myp-tr>
            <myp-tr title="规格型号">{{item.model}}</myp-tr>
          </table>
          <!-- 更多操作 -->
          <div slot="right" @click="operation(item)">更多</div>
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>

    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getCustomerGoods } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import MypPopupActions from "@src/components-app/MypPopupActions";

export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions },
  data() {
    return {
      popupActionsVisible: false,
      popupActions: [
        {
          name: "新增",
          icon: "icon-admin",
          method: () => {
            this.toUrl('ADD')
          }
        }
      ],
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomerGoods,
      count: 0,
      sheetVisible: false,
      actions: []
    };
  },
  created() {
    this.$store.commit("INIT_GOODS_STORE");
  },
  computed: {
    ...mapState({
      list: state => state.customerGoods.list,
      searchQuery: state => state.customerGoods.searchQuery,
      isSearch: state => state.customerGoods.isSearch,
      isAdd: state => state.customerGoods.isAdd,
      sumData: state => state.customerGoods.sumData
    })
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    },
    isAdd(flag) {
      flag && this.$refs.MypLoadmoreApi.load();
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  methods: {
    ...mapActions(["deleteGood", "setDefaultGood", "cancelDefaultGood"]),
    watchDataList(watchDataList, count, pageNum) {
      this.count = count;
      this.$store.commit("SET_GOODS", watchDataList);
      this.$store.commit("IS_SEARCH_GOOD", false);
      this.$store.commit("IS_RELOAD_GOOD", false);
    },
    toUrl(type, goodsNo) {
      if (type == "ADD") {
        this.$router.push({
          path: "./add",
          query: { type: type }
        });
      } else if (type == "EDIT") {
        this.$router.push({
          path: "./edit/" + goodsNo,
          query: { type: type }
        });
      }
    },
    operation(customer) {
      this.sheetVisible = true;
      this._customer = customer;
      this.actions = [

        {
          name: "删除",
          method: this.remove
        }
      ];
      if (!customer.unitPrice) {
        this.actions.push(
          {
            name: this._customer.defaultType == "TRUE" ? "取消默认" : "设为默认",
            defaultType: this._customer.defaultType,
            method: this.setDefault
          }
        )
      }
    },
    remove() {
      this.MessageBox.confirm("确定删除吗?").then(action => {
        if (confirm) this.deleteGood(this._customer);
      });
    },
    setDefault(obj) {
      this.MessageBox.confirm("确定当前操作吗?").then(action => {
        if (confirm) {
          //defaultType = TRUE(执行取消默认) FALSE(执行设置默认)
          if (obj.defaultType == "TRUE") {
            this.cancelDefaultGood(this._customer);
          } else {
            this.setDefaultGood(this._customer);
          }
        }
      });
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>
</style>
