<template>
  <div>
    <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-page>
  </div>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
export default {
  components: { SearchPage },
  data() {
    return {
      searchVisible: true,
      searchConfig: []
    };
  },
  computed: {
    ...mapState({
      searchQuery: state => state.billRecord.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", { customerNo: value });
        }
      });
      this.searchConfig.push({
        title: "授权码",
        type: "myp-text",
        defaultValue: this.searchQuery.authCode,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", { authCode: value });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          console.log(value);
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
      this.searchConfig.push({
        title: "开票类型",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.billType,
        options: [
          {
            label: "全部",
            value: ""
          },
          {
            label: "普票",
            value: "1"
          },
          {
            label: "专票",
            value: "2"
          },
          {
            label: "电票",
            value: "3"
          }
        ],
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            billType: value
          });
        }
      });
      this.searchConfig.push({
        title: "状态",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.status,
        options: [
          {
            label: "全部",
            value: ""
          },
          {
            label: "推送成功",
            value: "SUCCESS"
          },
          {
            label: "开票成功",
            value: "BILLING_SUCCESS"
          },
          {
            label: "开票中",
            value: "BILLING3"
          },
          {
            label: "待开票",
            value: "ORDER"
          },
          {
            label: "失败",
            value: "BILLING_FAIL"
          },
          {
            label: "查询失败",
            value: "QUERY_FAIL"
          }
        ],
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            status: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("BILLRECORD_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
