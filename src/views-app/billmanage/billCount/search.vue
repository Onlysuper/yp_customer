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
      searchQuery: state => state.billCount.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("BILLCOUNT_SEARCH_QUERY", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "是否有下级",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.containChild || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
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
          if (value == "ALL") value = "";
          this.$store.commit("PROFITBILLING_SET_SEARCH", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.dataTimeBegin,
        cb: value => {
          this.$store.commit("BILLCOUNT_SEARCH_QUERY", {
            dataTimeBegin: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.dataTimeEnd,
        cb: value => {
          this.$store.commit("BILLCOUNT_SEARCH_QUERY", {
            dataTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("BILLCOUNT_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
