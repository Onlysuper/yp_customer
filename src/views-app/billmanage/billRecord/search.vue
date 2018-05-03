<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-page>
</template>

<script>
import invoiceType from "@src/data/invoiceType.json";
import { statusFilterQuery } from "@src/common/mixins";
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
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
      searchQuery: state => state.billRecord.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", { customerNo: value });
        }
      });
      this.searchConfig.push({
        title: "授权码",
        type: "myp-text",
        defaultValue: this.searchQuery.authCode,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", { authCode: value });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });

      this.searchConfig.push({
        title: "开票类型",
        type: "myp-select",
        defaultValue: this.searchQuery.invoiceType,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...invoiceType
          ],
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            invoiceType: value
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
            ...this.statusFilterQuery('payStatus')
          ],
        cb: value => {
          this.$store.commit("BILLRECORD_SEARCH_QUERY", {
            status: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("BILLRECORD_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
