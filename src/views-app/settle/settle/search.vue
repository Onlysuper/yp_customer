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
      searchQuery: state => state.settle.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.userInfoAndMenu.isOperate) { // 运营
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
          ...this.statusFilterQuery('settleStatus')
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
