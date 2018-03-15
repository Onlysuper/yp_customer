<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
import versionTypeJson from "@src/data/versionType"
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
      searchQuery: state => state.settle.searchQuery
    }),
    isAdmin() {
      var user = this.$store.state.userInfoAndMenu.userMessage.all;
      var isAdmin = (
        user.userType === "root" ||
        user.userType === "admin" ||
        user.userType === "operator"
      ); // 运营
      return isAdmin
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isAdmin) { // 运营
        this.searchConfig.push({
          title: "代理商编号",
          type: "myp-text",
          defaultValue: this.searchQuery.agentNo,
          cb: value => {
            this.$store.commit("SETTLE_SEARCH_QUERY", {
              agentNo: value
            });
          }
        });
        this.searchConfig.push({
          title: "代理商名称",
          type: "myp-text",
          defaultValue: this.searchQuery.agentName,
          cb: value => {
            this.$store.commit("SETTLE_SEARCH_QUERY", {
              agentName: value
            });
          }
        });
      }

      this.searchConfig.push({
        title: "打款状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values: [
          {
            name: "全部",
            code: ""
          },
          {
            name: "已确认",
            code: "TRUE"
          },
          {
            name: "待确认",
            code: "FALSE"
          },
          {
            name: "已结算",
            code: "SUCCESS"
          }
        ],
        cb: value => {
          this.$store.commit("SETTLE_SEARCH_QUERY", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始时间",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("SETTLE_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束时间",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("SETTLE_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("SETTLE_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
