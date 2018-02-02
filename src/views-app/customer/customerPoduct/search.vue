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
      this.searchConfig.push({
        title: "商品编号",
        type: "myp-text",
        defaultValue: this.searchQuery.goodsNo,
        cb: value => {
          this.$store.commit("SEARCH_GOOD", { goodsNo: value });
        }
      });
      this.searchConfig.push({
        title: "商品名称",
        type: "myp-text",
        defaultValue: this.searchQuery.goodsName,
        cb: value => {
          this.$store.commit("SEARCH_GOOD", { goodsName: value });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("IS_SEARCH_GOOD", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
