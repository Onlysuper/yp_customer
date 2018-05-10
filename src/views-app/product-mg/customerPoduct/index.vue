<template>
  <full-page class="" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <view-radius class="item" v-for="(item,index) in list" :key="index">
        <input-wrapper>
          <mt-cell :title="item.customerName">
            <mt-button v-if="adminFilter('userProductStatus_config')" class="but" @click="stencilFn(item)" size="small">配置</mt-button>
          </mt-cell>
          <mt-cell title="快速开票" is-link @click.native="openQrcode(item)">
            <span>{{item.qrcodeStatus | statusFilter('handleProductOpenStatus')}}</span>
          </mt-cell>
          <mt-cell title="聚合支付" is-link @click.native="openPay(item)">
            <span>{{item.payStatus | statusFilter('handleProductOpenStatus')}}</span>
          </mt-cell>
          <mt-cell title="电子发票" is-link @click.native="openElec(item)">
            <span>{{item.elecStatus | statusFilter('handleProductOpenStatus')}}</span>
          </mt-cell>
        </input-wrapper>
      </view-radius>
    </myp-loadmore-api>
  </full-page>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { mapState, mapActions } from "vuex";
import { getCustomerOpenProducts } from "@src/apis";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomerOpenProducts,
      count: 0
    };
  },
  computed: {
    ...mapState({
      list: state => state.customerProduct.list,
      searchQuery: state => state.customerProduct.searchQuery,
      isSearch: state => state.customerProduct.isSearch
    })
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  created() {
    this.$store.commit("CUSTOMER_PRODUCT_INIT");
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  },
  methods: {
    watchDataList(watchDataList, count, pageNum) {
      this.count = count;
      this.$store.commit("CUSTOMER_PRODUCT_SET_LIST", watchDataList);
      this.$store.commit("CUSTOMER_PRODUCT_IS_SEARCH", false);
    },
    stencilFn(rowdata) {
      this.$router.push({
        path: "./stencil/" + rowdata.bussinessNo,
        query: { type: "STENCIL" }
      });
    },
    //点击快速开票
    openQrcode(customer) {
      this.$router.push({
        path: "./qrcodeDetail",
        query: { customerNo: customer.bussinessNo, type: 'Qrcode', qrcodeStatus: customer.qrcodeStatus, customerName: customer.customerName }
      });
      // this.$router.push({
      //   path: "./qrcodeUpload",
      //   query: { customerNo: customer.bussinessNo, type: 'Qrcode', qrcodeStatus: customer.qrcodeStatus, customerName: customer.customerName }
      // });
    },
    openPay(customer) {
      //判断开通状态
      switch (customer.payStatus) {
        //已开通
        case "TRUE":
          this.$router.push({
            path: "./detail/pay",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        // case "TRUE":
        //   this.$router.push({
        //     path: "./detail/pay",
        //     query: { customerNo: customer.bussinessNo }
        //   });
        //   break;
        //未开通
        case "INIT":
          this.$router.push({
            path: "./addPayInfo",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //审核失败
        case "REJECT":
          this.$router.push({
            path: "./addPayInfo",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //审核中
        case "CHECKING":
          this.$router.push({
            path: "./detail/pay",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //待提交
        case "WAITING_SUBMIT":
          this.$router.push({
            path: "./addPayInfo",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        default:
          this.Toast("未知状态");
      }
    },
    openElec(customer) {
      //判断开通状态
      switch (customer.elecStatus) {
        //已开通
        case "TRUE":
          this.$router.push({
            path: "./detail/elec",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //未开通
        case "INIT":
          this.$router.push({
            path: "./completeInvoice",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //审核失败
        case "REJECT":
          this.$router.push({
            path: "./completeInvoice",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //审核中
        case "CHECKING":
          this.$router.push({
            path: "./detail/elec",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        //待提交
        case "WAITING_SUBMIT":
          this.$router.push({
            path: "./completeInvoice",
            query: { customerNo: customer.bussinessNo }
          });
          break;
        default:
          this.Toast("未知状态");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.tip {
  line-height: 200px;
  text-align: center;
}
.item {
  margin: 30*$rem 0;
}
.but {
  background-color: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  &:after {
    background: none;
  }
}
</style>
