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
      searchQuery: state => state.changeBill.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("CHANGEBILL_QUERY_SET_SEARCH", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('changeBill')
          ],
        cb: value => {
          this.$store.commit("CHANGEBILL_QUERY_SET_SEARCH", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "代理商编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("CHANGEBILL_QUERY_SET_SEARCH", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "变更单号",
        type: "myp-text",
        defaultValue: this.searchQuery.billNo,
        cb: value => {
          this.$store.commit("CHANGEBILL_QUERY_SET_SEARCH", {
            billNo: value
          });
        }
      });

    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CHANGEBILL_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
