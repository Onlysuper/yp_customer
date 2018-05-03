<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
import buriedPointActionId from "@src/data/buriedPointActionId.json"
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
      searchQuery: state => state.buriedPoint.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "新老版本",
        type: "myp-select",
        defaultValue: this.searchQuery.oldOrNew,
        values: [
          // {
          //   code: "",
          //   name: "全部"
          // },
          {
            code: "new",
            name: "新版本"
          },
          {
            code: "old",
            name: "老版本"
          }
        ],
        cb: value => {
          this.$store.commit("OPERATORLOG_NEW_OR_OLD", {
            oldOrNew: value
          });
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            oldOrNew: value
          });
        }
      });
      this.searchConfig.push({
        title: "版本号",
        type: "myp-text",
        defaultValue: this.searchQuery.version,
        cb: value => {
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            version: value
          });
        }
      });
      this.searchConfig.push({
        title: "用户类型",
        type: "myp-select",
        defaultValue: this.searchQuery.userType,
        values: [
          {
            code: "",
            name: "全部"
          },
          {
            code: "1",
            name: "静默"
          },
          {
            code: "0",
            name: "普通"
          }
        ],
        cb: value => {
          // if (value == "ALL") value = "";
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            userType: value
          });
        }
      });
      this.searchConfig.push({
        title: "操作类型",
        type: "myp-select",
        defaultValue: this.searchQuery.actionId,
        values: [
          {
            name: "全部",
            code: ""
          },
          ...buriedPointActionId
        ],
        cb: value => {
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            actionId: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("OPERATORLOG_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("OPERATORLOG_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
