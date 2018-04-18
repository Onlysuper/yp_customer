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
      searchQuery: state => state.customerVersion.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_QUERY", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "版本号",
        type: "myp-text",
        defaultValue: this.searchQuery.version,
        cb: value => {
          this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_QUERY", {
            version: value
          });
        }
      });
      this.searchConfig.push({
        title: "状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values: [
          {
            name: "全部",
            code: ""
          },
          ...this.statusFilterQuery('versionStatus')
        ],
        cb: value => {
          // if (value == "ALL") value = "";
          this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_QUERY", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "版本类型",
        type: "myp-select",
        defaultValue: this.searchQuery.type || "ALL",
        values: [
          {
            name: "全部",
            code: "ALL"
          },
          ...this.statusFilterQuery('typeCustomerVersion').filter(item => { return item['code'] != 'RELEASE' })
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_QUERY", {
            type: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
