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
      searchQuery: state => state.email.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.bussinessNo,
        cb: value => {
          this.$store.commit("EMAIL_SET_SEARCH", {
            bussinessNo: value
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
            ...this.statusFilterQuery('emailStatus')
          ],
        cb: value => {
          this.$store.commit("EMAIL_SET_SEARCH", {
            status: value
          });
        }
      });
    });

  },
  methods: {
    searchPanelResult() {
      this.$store.commit("EMAIL_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>
</style>
