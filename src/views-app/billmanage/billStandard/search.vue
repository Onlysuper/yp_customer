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
      searchQuery: state => state.billStandard.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.standardTimeBegin,
        cb: value => {
          console.log(value);
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            standardTimeBegin: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.standardTimeEnd,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            standardTimeEnd: value
          });
        }
      });
      this.searchConfig.push({
        title: "包含关系",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.containChild || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "包含下级",
            value: "TRUE"
          },
          {
            label: "不包含下级",
            value: "FALSE"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "推送次数",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.billSuccess || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "5次以下",
            value: "0-5"
          },
          {
            label: "5-50次",
            value: "5-50"
          },
          {
            label: "50-100次",
            value: "50-100"
          },
          {
            label: "100次",
            value: "100"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            billSuccess: value
          });
        }
      });
      this.searchConfig.push({
        title: "达标情况",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.standard || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "已达标",
            value: "TRUE"
          },
          {
            label: "未达标",
            value: "FALSE"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            standard: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("BILLSTANDARD_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
