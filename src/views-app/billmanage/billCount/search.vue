<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-page>
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
      // isSearch: state => state.billCount.isSearch
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("SEARCH_GOOD", { agentNo: value });
        }
      });
      //  dataTimeBegin: eightday, // 开始日期
      // dataTimeEnd: yesterday, // 结束日期
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.dataTimeBegin,
        cb: value => {
          console.log(value);
          this.$store.commit("PROFITBILLING_SET_SEARCH", {
            dataTimeBegin: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.dataTimeEnd,
        cb: value => {
          this.$store.commit("PROFITBILLING_SET_SEARCH", {
            dataTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("IS_SEARCH_GOOD", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
