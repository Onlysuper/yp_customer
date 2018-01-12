<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
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
      searchQuery: state => state.profitBilling.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("PROFITBILLING_SET_SEARCH", { customerNo: value });
        }
      });
      this.searchConfig.push({
        title: "企业名称",
        type: "myp-text",
        defaultValue: this.searchQuery.enterpriseName,
        cb: value => {
          this.$store.commit("PROFITBILLING_SET_SEARCH", {
            enterpriseName: value
          });
        }
      });
      this.searchConfig.push({
        title: "日期",
        type: "myp-date",
        defaultValue: this.searchQuery.dataTime,
        cb: value => {
          console.log(value);
          this.$store.commit("PROFITBILLING_SET_SEARCH", { dataTime: value });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("PROFITBILLING_SET_SEARCH", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "是否包含下级",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.containChild,
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
          this.$store.commit("PROFITBILLING_SET_SEARCH", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "结算",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.settleStatus,
        options: [
          {
            label: "已结算",
            value: "TRUE"
          },
          {
            label: "未结算",
            value: "FALSE"
          }
        ],
        cb: value => {
          this.$store.commit("PROFITBILLING_SET_SEARCH", {
            settleStatus: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("PROFITBILLING_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
