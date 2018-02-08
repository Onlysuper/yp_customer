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
      searchQuery: state => state.enterpriseSupply.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "企业名称",
        type: "myp-text",
        defaultValue: this.searchQuery.name,
        cb: value => {
          this.$store.commit("ENTERPRISE_SUPPLY_SET_SEARCH", { name: value });
        }
      });
      this.searchConfig.push({
        title: "企业税号",
        type: "myp-text",
        defaultValue: this.searchQuery.tax,
        cb: value => {
          this.$store.commit("ENTERPRISE_SUPPLY_SET_SEARCH", {
            tax: value
          });
        }
      });
      this.searchConfig.push({
        title: "操作员",
        type: "myp-text",
        defaultValue: this.searchQuery.operator,
        cb: value => {
          this.$store.commit("ENTERPRISE_SUPPLY_SET_SEARCH", {
            operator: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("ENTERPRISE_SUPPLY_SET_SEARCH", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("ENTERPRISE_SUPPLY_SET_SEARCH", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("ENTERPRISE_SUPPLY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
