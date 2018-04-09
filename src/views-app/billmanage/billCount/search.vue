<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="开票统计"></search-page>
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
        title: "包含关系",
        type: "myp-select",
        defaultValue: this.searchQuery.containChild,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            {
              name: "含下级",
              code: "TRUE"
            },
            {
              name: "不含下级",
              code: "FALSE"
            }
          ],
        cb: value => {
          this.$store.commit("BILLCOUNT_SEARCH_QUERY", {
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
