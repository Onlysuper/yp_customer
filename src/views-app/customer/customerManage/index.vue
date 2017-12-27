<template>
  <div class="page">
    <full-page class="" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="searchVisible = true">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <!-- 导航组件 -->
      <slider-nav slot="header" v-model="routeMenuCode" :munes="munes"></slider-nav>

      <!-- 列表组件 -->
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList" :defaultLoadQuery="defaultLoadQuery">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
          <!-- 常用按钮 -->
          <div slot="btn" @click="edit(item)">编辑</div>
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.customerFrom | handleFrom}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="error">{{item.status | handleStatus}}</mt-badge>

          <myp-cell class="list-item _av" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="企业税号">{{item.taxNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="入网时间">{{item.createTime}}</myp-tr>
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
    <transfer ref="transfer"></transfer>
    <!-- 新增商户 编辑商户 -->
    <add ref="add"></add>

    <!-- 更多操作 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
    <!-- 搜索组件 -->
    <search-panel-popup v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-panel-popup>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import SearchPanelPopup from "@src/components-app/Search/SearchPanelPopup";
import MypPopupActions from "@src/components-app/MypPopupActions";
import detail from "./detail";
import transfer from "./transfer";
import add from "./add";
import { getCustomers } from "@src/apis";
import utils from "@src/common/utils";
export default {
  components: {
    SliderNav,
    SearchPanelPopup,
    MypPopupActions,
    detail,
    transfer,
    add
  },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomers,
      list: [],
      //默认查询条件
      defaultLoadQuery: {
        limit: 10,
        page: 1,
        createTimeStart: utils.formatDate(new Date(), "yyyy-MM-dd"),
        createTimeEnd: utils.formatDate(new Date(), "yyyy-MM-dd"),
        containChild: "TRUE"
      },
      searchVisible: false,
      searchQuery: {},
      searchConfig: [
        {
          title: "商户编号",
          type: "myp-text",
          cb: value => {
            this.searchQuery.customerNo = value;
          }
        },
        {
          title: "企业税号",
          type: "myp-text",
          cb: value => {
            this.searchQuery.taxNo = value;
          }
        },
        {
          title: "企业名称",
          type: "myp-text",
          cb: value => {
            this.searchQuery.enterpriseName = value;
          }
        },
        {
          title: "合伙人编号",
          type: "myp-text",
          cb: value => {
            this.searchQuery.agentNo = value;
          }
        },
        {
          title: "是否包含下级",
          type: "myp-radio-list",
          defaultValue: "TRUE",
          options: [
            {
              label: "含下级",
              value: "TRUE"
            },
            {
              label: "不含下级",
              value: "FALSE"
            }
          ],
          cb: value => {
            this.searchQuery.containChild = value;
          }
        },
        {
          title: "选择入网来源",
          type: "myp-radio-list",
          // defaultValue: "2",
          options: [
            {
              label: "插件",
              value: "PLUGIN"
            },
            {
              label: "扫码",
              value: "SCAN_CODE"
            },
            {
              label: "公众号",
              value: "OFFICAL_ACCOUNT"
            },
            {
              label: "静默",
              value: "SLIENT"
            },
            {
              label: "后台",
              value: "LOCAL"
            },
            {
              label: "第三方",
              value: "OPEN_API"
            }
          ],
          cb: value => {
            this.searchQuery.customerFrom = value;
          }
        },
        {
          title: "开始时间",
          type: "myp-date",
          defaultValue: new Date(),
          cb: value => {
            this.searchQuery.createTimeStart = value;
          }
        },
        {
          title: "结束时间",
          type: "myp-date",
          defaultValue: new Date(),
          cb: value => {
            this.searchQuery.createTimeEnd = value;
          }
        }
      ],
      sheetVisible: false,
      actions: [
        {
          name: "转移",
          method: this.transfer
        }
      ],
      popupActionsVisible: false,
      popupActions: [
        {
          name: "新增商户",
          icon: "icon-admin",
          method: this.add
        },
        {
          name: "测试按钮",
          icon: "icon-admin",
          method: this.add
        },
        {
          name: "测试按钮",
          icon: "icon-admin",
          method: this.add
        }
      ]
    };
  },
  activated() {
    this.$refs.FullPage.setScrollTop(
      this.$store.state.scrollTop[this.$route.name]
    );
    this.routeMenuCode = this.$route.name;
  },
  deactivated() {},
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  methods: {
    watchDataList(watchDataList) {
      this.list = watchDataList;
    },
    searchPanelResult() {
      this.$refs.MypLoadmoreApi.load(this.searchQuery);
    },
    edit(customer) {
      this.$refs.add.open(customer, "EDIT");
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
      this.sheetVisible = true;
      this._customer = customer;
    },
    transfer() {
      this.$refs.transfer.open(this._customer);
    },
    add() {
      this.$refs.add.open({}, "ADD");
    }
  },
  // beforeRouteEnter(to, from, next) {
  // next(vm => {
  //   console.log(vm);
  //   vm.$nextTick(() => {
  //     vm.$refs.FullPage.$refs.fullMain.scrollTop = localStorage.getItem(
  //       "scrollTop"
  //     );
  //   });
  // });
  // next();
  // },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("SAVE_SCROLLTOP", {
      name: this.$route.name,
      scrollTopVal: this.$refs.FullPage.getScrollTop()
    });
    next();
  }
};
</script>

<style>

</style>
