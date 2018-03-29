<template>
  <full-page-popup v-model="popupVisible" position="bottom" class="search-bank-branch-page" title="支行搜索">
    <!-- <div>
      <input type="text" placeholder="输入搜索内容" v-model="searchValue" />
    </div> -->
    <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input v-model="searchValue" type="search" placeholder="搜索" class="mint-searchbar-core"></div>
    </div>
    <div class="bank-list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="scroll-wrapper" v-infinite-scroll="loadMore" :infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
        <li class="item" @click="confirm(item)" v-for="(item,index) in filterBankList" :key="index">
          {{item.branchName}}
        </li>
      </ul>
      <!-- 加载loading -->
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
      </p>
      <p v-show="filterBankList.length > 0 && disabled" class="page-infinite-loading">没有更多记录了</p>
      <p v-show="filterBankList.length === 0 && disabled" class="page-infinite-loading">暂无信息</p>
    </div>
  </full-page-popup>
</template>

<style lang="scss">
@import "../../assets/scss/base.scss";
.search-bank-branch-page {
  width: 100%;
  height: 100%;
  background: #eee;
  .bank-list {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .item {
    line-height: 100*$rem;
    padding-left: 20*$rem;
    margin: 20*$rem 0;
    background: #fff;
  }
  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px; // margin-top: -50px;
    div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>

<script>
import { InfiniteScroll, Toast } from "mint-ui";
import FullPagePopup from "../FullPagePopup";
export default {
  components: { FullPagePopup },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    api: {
      type: Function,
      default: () => { }
    },
    queryKey: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      searchValue: "",
      popupVisible: false,
      bankList: [],
      filterBankList: [],
      loading: false,
      disabled: false,
      allLoaded: false,
      wrapperHeight: 0,
      query: {
        limit: 20, //		是	单页数量
        page: 1, //			是	页码
        bankCode: "", //		是	银行编号
        branchName: "", //	是	支行名称(模糊查询)
        district: "" //		是	区县编码
      }
    };
  },
  watch: {
    value(val) {
      this.popupVisible = val;
    },
    popupVisible(val) {
      this.$emit("input", val);
    },
    //监听关键字的变化
    queryKey(query) {
      this.query = Object.assign(this.query, query);
      this.resetLoadMore();
    },
    searchValue(val) {
      let newList = this.bankList.filter(item => new RegExp(val, 'i').test(item.branchName));
      this.filterBankList = newList
    }
  },
  methods: {
    resetLoadMore() {
      this.query.page = 1;
      this.disabled = false;
      this.bankList = [];
      this.filterBankList = [];
      this.searchValue = "";
      this.loadMore();
    },
    loadMore() {
      //如何已经加载到底 或者 正在加载 或者 没有打开 则不请求数据
      if (this.disabled || this.loading || !this.popupVisible) return;
      this.loading = true;
      setTimeout(() => {
        this.api()(this.query).then(data => {
          this.loading = false;
          if (data.code === "00") {
            this.bankList = this.bankList.concat(data.data);
            this.filterBankList = this.bankList.concat(data.data);
            this.query.page = this.query.page + 1;
            this.isAllLoad(data.data);
            //注：如果需要分页查询注释下面代码即可
            this.disabled = true;
          } else {
            Toast(data.msg);
          }
        });
      }, 500);
    },
    //检查分页数据是否请求到底
    isAllLoad(data) {
      if (data.length < this.query.limit) {
        this.disabled = true;
      }
    },
    confirm(item) {
      this.popupVisible = false;
      setTimeout(() => {
        this.bankList = [];
        this.filterBankList = []
      }, 1000);
      this.$emit("bankrsearchresult", item);
    },
    // searchResult() {
    //   // this.bankList.filter(item => new RegExp(this.searchValue, 'i').test(item.branchName))

    //   // return this.bankList.filter(value => new RegExp(this.value, 'i').test(searchValue));
    // }
  },
  created() {
    this.popupVisible = this.value;
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - 45;
  }
};
</script>

