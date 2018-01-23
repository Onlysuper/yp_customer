<template>
  <full-page class="page" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'goodsSearch'})">搜索</mt-button>
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="toUrl('ADD')">新增</mt-button> -->
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
        <!-- 常用按钮 -->
        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
            <myp-tr title="扫码次数">{{item.scan}}</myp-tr>
            <myp-tr title="推送次数">{{item.billSuccess}}</myp-tr>
            <myp-tr title="入网商户">{{item.register}}</myp-tr>
            <myp-tr title="活跃商户">{{item.active}}</myp-tr>
          </table>
          <!-- 更多操作 -->
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>

    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getBillcountagents } from "@src/apis";
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
      api: getBillcountagents,
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
      isAdd: state => state.customerGoods.isAdd
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
    watchDataList(watchDataList) {
      this.$store.commit("SET_GOODS", watchDataList);
      this.$store.commit("IS_SEARCH_GOOD", false);
      this.$store.commit("IS_RELOAD_GOOD", false);
    },
    toUrl(type, goodsNo) {
      this.$router.push({
        path: "./edit/" + goodsNo,
        query: { type: type }
      });
    },
    operation(customer) {
      this.sheetVisible = true;
      this._customer = customer;
      this.actions = [
        {
          name: this._customer.defaultType == "TRUE" ? "取消默认" : "设为默认",
          defaultType: this._customer.defaultType,
          method: this.setDefault
        },
        {
          name: "删除",
          method: this.remove
        }
      ];
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
