<template>
  <div class="page">
    <full-page class="" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <!-- 导航组件 -->
      <slider-nav slot="header" v-model="routeMenuCode" :munes="munes"></slider-nav>

      <!-- 列表组件 -->
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
          <!-- 常用按钮 -->
          <div slot="btn" @click="toUrl('EDIT',item.customerNo)">编辑</div>
          <!-- 状态 -->
          <mt-badge slot="badge" v-if="item.customerFrom" class="g-min-badge" size="small" :color="filterColor(item.customerFrom,'customerFrom')">{{item.customerFrom | statusFilter("customerFrom")}}</mt-badge>
          <mt-badge slot="badge" v-if="item.status" class="g-min-badge" size="small" :color="filterColor(item.status,'handleStatus')">{{item.status | statusFilter('handleStatus')}}</mt-badge>

          <myp-cell class="list-item _av" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="企业税号">{{item.taxNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="入网时间">{{item.createTime}}</myp-tr>
              <myp-tr title="手机号码">{{item.phoneNo}}</myp-tr>
            </table>
            <!-- 更多操作 -->
            <div slot="right" @click="operation(item)">更多</div>
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <!-- 详情 -->
    <detail ref="detail"></detail>
    <!-- 商户转移 -->
    <!-- <transfer ref="transfer"></transfer> -->
    <!-- 新增商户 编辑商户 -->
    <!-- <add ref="add"></add> -->

    <!-- 更多操作 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import SliderNav from "@src/components-app/SliderNav";
import SearchPanelPopup from "@src/components-app/Search/SearchPanelPopup";
import MypPopupActions from "@src/components-app/MypPopupActions";
import detail from "./detail";
import { getCustomers, postCloseCustomer } from "@src/apis";
import utils from "@src/common/utils";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [scrollBehavior, filterColor],
  components: {
    SliderNav,
    SearchPanelPopup,
    MypPopupActions,
    detail
  },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomers,
      count: 0,
      sheetVisible: false,
      _customer: "",
      actions: [
        {
          name: "转移",
          method: this.transfer
        },
        {
          name: "关闭",
          method: this.closeSave
        }
      ],
      popupActionsVisible: false,
      popupActions: [
        {
          name: "新增商户",
          icon: "icon-admin",
          method: () => {
            this.toUrl("ADD");
          }
        }
      ]
    };
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  },
  created() {
    this.$store.commit("CUSTOMER_MANAGE_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.customerManage.list,
      isSearch: state => state.customerManage.isSearch,
      searchQuery: state => state.customerManage.searchQuery
    })
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  methods: {
    ...mapActions([]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("CUSTOMER_MANAGE_SET_LIST", watchDataList);
      this.$store.commit("CUSTOMER_MANAGE_IS_SEARCH", false);
    },
    toUrl(type, goodsNo) {
      this.$router.push({
        path: "./edit/" + goodsNo,
        query: { type: type }
      });
    },
    detail(customer) {
      this.$refs.detail.open(customer);
    },
    updata(customer) {
      this.list = this.list.map(item => {
        if (item.customerNo == customer.customerNo) return customer;
        else return item;
      });
    },
    operation(customer) {
      this.actions = [
        {
          name: "转移",
          method: this.transfer
        },
      ]
      if (customer.status == 'TRUE' && this.adminFilter('customer_updateByStatus')) {
        this.actions.push({
          name: "关闭",
          method: this.closeSave
        })
      }
      this.sheetVisible = true;
      this._customer = customer;
    },
    transfer() {
      this.$router.push({
        path: "./transfer",
        query: { customerNo: this._customer.customerNo }
      });
    },
    // 关闭商户
    closeSave() {
      this.MessageBox.confirm('确定要关闭该条用户信息吗?').then(action => {
        postCloseCustomer()({
          customerNo: this._customer.customerNo
        }).then(data => {
          if (data.code == "00") {
            let row = { ...this._customer };
            row.status = "FALSE";
            this.$store.commit("CUSTOMER_MANAGE_UPDATA", row);
            Toast("关闭成功");
          } else {
            Toast(data.msg);          }
        })
      });
    }
  }
};
</script>

<style>

</style>
