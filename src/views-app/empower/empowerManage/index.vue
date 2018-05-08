<template>
  <!-- 授权码管理 -->
  <div class="page empower-page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
      </mt-header>

      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 常用按钮 -->
          <div slot="btn" @click="edit(item)">编辑</div>
          <!-- 状态 -->
          <mt-badge v-if="item.status=='TRUE'" slot="badge" class="g-min-badge" size="small" type="warning">{{item.status | statusFilter('empowerBindStatus')}}</mt-badge>
          <mt-badge v-if="item.status=='BINDED'" slot="badge" class="g-min-badge" size="small" type="success">{{item.status | statusFilter('empowerBindStatus')}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.materiel | statusFilter('empowerManageMateriel')}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.deviceType | statusFilter('empowerCheckReceiptType')}}</mt-badge>
          <!-- 常用按钮 -->
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
              <myp-tr title="批次号">{{item.batchNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="商户编号">
                <span class="link-text" @click="customerDedaile(item.customerNo)">{{item.customerNo}}</span>
              </myp-tr>
              <myp-tr title="序列号">{{item.qrcode}}</myp-tr>
              <myp-tr title="授权码">{{item.authCode}}</myp-tr>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="上级授权码">{{item.parentCode}}</myp-tr>
            </table>
            <!-- 更多操作 -->
            <div v-if="moreVisible(item)" slot="right" @click="operation(item)">更多</div>
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <!-- 更多操作 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import SliderNav from "@src/components-app/SliderNav";
import { getArantNumManages, postUnBindEmpower, getCustomers } from "@src/apis";
import MypPopupActions from "@src/components-app/MypPopupActions";
import { mapState, mapActions } from "vuex";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import detail from "./detail";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, detail },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumManages,
      count: 0,
      actions: [],
      sheetVisible: false,
      popupActionsVisible: false,
      popupActions: [
        {
          name: "生成授权码",
          icon: "icon-admin",
          method: () => {
            this.toUrl("BUILD");
          }
        },
        {
          name: "物料入库",
          icon: "icon-admin",
          method: () => {
            this.toUrl("ADDMATERIEL");
          }
        }
      ]
    };
  },
  created() {
    this.$store.commit("QRCODE_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.empowerManage.list,
      searchQuery: state => state.empowerManage.searchQuery,
      isSearch: state => state.empowerManage.isSearch,
      isReload: state => state.empowerManage.isReload
    }),
    adminOperationAll() {
      // 用户按钮权限
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    },
    isReload(flag) {
      this.$store.commit("QRCODE_SEARCH_INIT");
      this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  methods: {
    // 点击商户编号
    customerDedaile(customerNo) {
      if (customerNo) {
        getCustomers()({
          page: 1,
          limit: 10,
          customerNo: customerNo,
          taxNo: "",
          enterpriseName: "",
          createTimeStart: "",
          createTimeEnd: "",
          agentNo: "",
          customerFrom: "",
          containChild: ''
        }).then((res) => {
          if (res.code == '00') {
            let detailsForm = { ...res.data[0] };
            this.$refs.detail.open(detailsForm);
          }
        })
      }
    },
    test() {
      this.$refs.MypLoadmoreApi.load(this.searchQuery);
    },
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("QRCODE_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODE_SEARCH", false);
      this.$store.commit("QRCODE_IS_RELOAD", false);
    },
    moreVisible(rowdata) {
      if (rowdata.deviceType == "AUTHCODE") {
        if (
          this.adminOperationAll.qrcode_bind == "TRUE" &&
          (rowdata.agentNo == this.adminOperationAll.userBussinessNo ||
            this.adminOperationAll.userType == "admin")
        ) {
          if (rowdata.status == "TRUE" || rowdata.status == "BINDED") {
            return true;
          }
        }
      } else if (
        (this.adminOperationAll.qrcode_bind_child == "TRUE" &&
          (rowdata.deviceType == "AUTHCODE" &&
            rowdata.status == "BINDED" &&
            rowdata.parentCode == null)) ||
        (rowdata.parentCode == "" &&
          (rowdata.agentNo == this.adminOperationAll.userBussinessNo ||
            this.adminOperationAll.userType == "admin"))
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 操作按钮
    operation(rowdata) {
      this.rowdata = rowdata;
      let arr_ = [];
      if (rowdata.deviceType == "AUTHCODE") {
        // let showbut = {
        //   name: "预览",
        //   method: this.previewFn
        // };
        arr_ = arr_.map(item => item);
        // arr_.push(showbut);
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
      // console.log()
      if (this.actions.length > 0) {
        this.sheetVisible = true;
      }
    },
    toUrl(type, itemId, rowdata) {
      if (type == "EDIT") {
        this.$router.push({
          path: "./edit/" + itemId,
          query: { type: type }
        });
      } else if (type == "BIND") {
        this.$router.push({
          path: "./bind/" + itemId,
          query: { type: type }
        });
      } else if (type == "BINDCHILD") {
        this.$router.push({
          path: "./bindchild/" + itemId,
          query: { type: type }
        });
      } else if (type == "BUILD") {
        this.$router.push({
          path: "./build",
          query: { type: type }
        });
      } else if (type == "ADDMATERIEL") {
        this.$router.push({
          path: "./addMateriel",
          query: { type: type }
        });
      }
    },
    edit(rowdata) {
      this.toUrl("EDIT", rowdata.authCode, rowdata);
    },
    bindFn() {
      // 绑定
      this.toUrl("BIND", this.rowdata.authCode, this.rowdata);
    },
    unbindFn() {
      // 解绑
      postUnBindEmpower()(this.rowdata).then(data => {
        if (data.code == "00") {
          let row = { ...this.rowdata };
          row.status = "TRUE";
          this.$store.commit("QRCODE_UNBINDCHILD_UPDATA", row);
          Toast("解绑成功");
        } else {
          Toast(data.msg);
        }
      });
    },
    childbindFn() {
      // 绑定子码
      this.toUrl("BINDCHILD", this.rowdata.authCode, this.rowdata);
    },

    previewFn() {
      // 预览
      this.toUrl("PREVIEW", this.rowdata.authCode);
    },
    activated() {
      this.routeMenuCode = this.$route.name;
    }
  }
};
</script>

<style lang="scss">
.link-text {
  color: rgb(54, 133, 253);
}
</style>
