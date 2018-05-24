<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  components: { SearchPage },
  mixins: [statusFilterQuery],
  data() {
    return {
      searchVisible: true,
      searchConfig: []
    };
  },
  computed: {
    ...mapState({
      searchQuery: state => state.customerSettle.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("CUSTOMERSETTLE_SEARCH_QUERY", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "商户名称",
        type: "myp-text",
        defaultValue: this.searchQuery.customerName,
        cb: value => {
          this.$store.commit("CUSTOMERSETTLE_SEARCH_QUERY", {
            customerName: value
          });
        }
      });
      this.searchConfig.push({
        title: "结算名称",
        type: "myp-text",
        defaultValue: this.searchQuery.settleName,
        cb: value => {
          this.$store.commit("CUSTOMERSETTLE_SEARCH_QUERY", {
            settleName: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始时间",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("CUSTOMERSETTLE_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束时间",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("CUSTOMERSETTLE_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
      this.searchConfig.push({
        title: "状态",
        type: "myp-select",
        defaultValue: this.searchQuery.outMoneyStatus,
        values: [
          {
            name: "全部",
            code: ""
          },
          ...this.statusFilterQuery('customerSettleOutMoneyStatus')
        ],
        cb: value => {
          this.$store.commit("CUSTOMERSETTLE_SEARCH_QUERY", {
            outMoneyStatus: value
          });
        }
      });

    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CUSTOMERSETTLE_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>
