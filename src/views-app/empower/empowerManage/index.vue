<template>
  <!-- 授权码管理 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | empowerManageStatus}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.materiel | empowerManageMateriel}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.deviceType | empowerCheckReceiptType}}</mt-badge>
          <!-- 常用按钮 -->
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
              <myp-tr title="批次号">{{item.batchNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="序列号">{{item.qrcode}}</myp-tr>
              <myp-tr title="授权码">{{item.authCode}}</myp-tr>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="上级授权码">{{item.parentCode}}</myp-tr>
            </table>
            <!-- 更多操作 -->
            <div slot="right" @click="operation(item)">更多</div>
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <!-- 更多操作 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
  </div>
</template>
<script>
import SliderNav from "@src/components-app/SliderNav";
import { getArantNumManages } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumManages,
      count: 0,
      actions: [],
      sheetVisible: false
    };
  },
  created() {
    this.$store.commit("QRCODE_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.empowerManage.list,
      searchQuery: state => state.empowerManage.searchQuery,
      isSearch: state => state.empowerManage.isSearch
    }),
    adminOperationAll() {
      // 用户按钮权限
      return this.$store.state.moduleLayour.userMessage.all;
    }
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  methods: {
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("QRCODE_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODE_SEARCH", false);
    },

    // 操作按钮
    operation(rowdata) {
      this.sheetVisible = true;
      this.rowdata = rowdata;
      let arr_ = [];
      if (rowdata.deviceType == "AUTHCODE") {
        let showbut = {
          name: "预览",
          method: this.previewFn
        };
        let editbut = {
          name: "编辑",
          method: this.editFn
        };
        arr_ = arr_.map(item => item);
        arr_.push(showbut, editbut);
        this.actions = arr_;
        if (
          this.adminOperationAll.qrcode_bind == "TRUE" &&
          (rowdata.agentNo == this.adminOperationAll.userBussinessNo ||
            this.adminOperationAll.userType == "admin")
        ) {
          if (rowdata.status == "TRUE") {
            let bindbut = {
              name: "绑定",
              method: this.bindFn
            };
            arr_ = arr_.map(item => item);
            arr_.push(bindbut);
            this.actions = arr_;
          } else if (rowdata.status == "BINDED") {
            let unbindbut = {
              name: "解绑",
              method: this.unbindFn
            };
            arr_ = arr_.map(item => item);
            arr_.push(unbindbut);
          }
        }
      }
      if (
        (this.adminOperationAll.qrcode_bind_child == "TRUE" &&
          (rowdata.deviceType == "AUTHCODE" &&
            rowdata.status == "BINDED" &&
            rowdata.parentCode == null)) ||
        (rowdata.parentCode == "" &&
          (rowdata.agentNo == this.adminOperationAll.userBussinessNo ||
            this.adminOperationAll.userType == "admin"))
      ) {
        let childbindbut = {
          name: "绑定子码",
          method: this.childbindFn
        };
        arr_ = arr_.map(item => item);
        arr_.push(childbindbut);
      }
      this.actions = arr_;
    },
    toUrl(type, itemId) {
      if (type == "PREVIEW") {
        this.$router.push({
          path: "./preview/" + itemId,
          query: { type: type }
        });
      } else if (type == "EDIT") {
        this.$router.push({
          path: "./edit/" + itemId,
          query: { type: type }
        });
      }
    },
    previewFn() {
      // 预览
      this.toUrl("PREVIEW", this.rowdata.receiptNo);
    },
    editFn() {
      // 编辑
      this.toUrl("EDIT", this.rowdata.receiptNo);
    },
    bindFn() {
      // 绑定
      this.toUrl("BIND", this.rowdata.receiptNo);
    },
    unbindFn() {
      // 解绑
      this.toUrl("UNBIND", this.rowdata.receiptNo);
    },
    childbindFn() {
      // 绑定子码
      this.toUrl("BINDCHILD", this.rowdata.receiptNo);
    },
    activated() {
      this.routeMenuCode = this.$route.name;
    }
  }
};
</script>

<style>

</style>
