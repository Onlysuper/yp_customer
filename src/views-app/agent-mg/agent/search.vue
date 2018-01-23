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
      searchQuery: state => state.agent.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "手机号",
        type: "myp-text",
        defaultValue: this.searchQuery.phoneNo,
        cb: value => {
          this.$store.commit("AGENT_SET_SEARCH", { phoneNo: value });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("AGENT_SET_SEARCH", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "合伙人名称",
        type: "myp-text",
        defaultValue: this.searchQuery.agentName,
        cb: value => {
          this.$store.commit("AGENT_SET_SEARCH", {
            agentName: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("AGENT_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
