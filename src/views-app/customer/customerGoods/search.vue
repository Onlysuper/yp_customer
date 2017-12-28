<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-page>
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
      searchQuery: state => state.customerGoods.searchQuery
      // isSearch: state => state.customerGoods.isSearch
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("SEARCH_GOOD", { customerNo: value });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("IS_SEARCH_GOOD", true);
      this.$router.back({
        path: this.$route.query["redirect"]
      });
    }
  }
};
</script>

<style>

</style>
