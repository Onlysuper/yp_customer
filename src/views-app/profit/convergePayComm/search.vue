<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  mixins: [statusFilterQuery],
  components: { SearchPage },
  data() {
    return {
      searchVisible: true,
      searchConfig: []
    };
  },
  computed: {
    ...mapState({
      searchQuery: state => state.convergePayComm.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values: [
          {
            name: "全部",
            code: ""
          },
          ...this.statusFilterQuery('convergePayStatus')
        ],
        cb: value => {
          this.$store.commit("CONVERGE_PAY_COMM_SET_SEARCH", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "包含下级",
        type: "myp-select",
        defaultValue: this.searchQuery.hasChild,
        values: [
          {
            name: "全部",
            code: ""
          },
          ...this.statusFilterQuery('containChild')
        ],
        cb: value => {
          this.$store.commit("CONVERGE_PAY_COMM_SET_SEARCH", {
            hasChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("CONVERGE_PAY_COMM_SET_SEARCH", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人名称",
        type: "myp-text",
        defaultValue: this.searchQuery.enterpriseName,
        cb: value => {
          this.$store.commit("CONVERGE_PAY_COMM_SET_SEARCH", {
            enterpriseName: value
          });
        }
      });
      this.searchConfig.push({
        title: "日期",
        type: "myp-date",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          this.$store.commit("CONVERGE_PAY_COMM_SET_SEARCH", {
            endTime: value
          });
        }
      });

    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CONVERGE_PAY_COMM_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>
