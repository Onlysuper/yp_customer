<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="银行商户"></search-page>
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
      searchQuery: state => state.bankCustomer.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("BANKCUSTOMER_SEARCH_QUERY", { customerNo: value });
        }
      });
      this.searchConfig.push({
        title: "银行商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.bankCustomerNo,
        cb: value => {
          this.$store.commit("BANKCUSTOMER_SEARCH_QUERY", { bankCustomerNo: value });
        }
      });
      this.searchConfig.push({
        title: "通道",
        type: "myp-select",
        defaultValue: this.searchQuery.channelWay,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('channelWay')
          ],
        cb: value => {
          this.$store.commit("BANKCUSTOMER_SEARCH_QUERY", {
            channelWay: value
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
            ...this.statusFilterQuery('bankCustomerStatus')
          ],
        cb: value => {
          this.$store.commit("BANKCUSTOMER_SEARCH_QUERY", {
            status: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("BANKCUSTOMER_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
