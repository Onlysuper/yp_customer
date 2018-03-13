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
      customerSearchQuery: state => state.customerProduct.customerSearchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.customerSearchQuery.customerNo,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "企业税号",
        type: "myp-text",
        defaultValue: this.customerSearchQuery.taxNo,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            taxNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "企业名称",
        type: "myp-text",
        defaultValue: this.customerSearchQuery.enterpriseName,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            enterpriseName: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.customerSearchQuery.agentNo,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "包含关系",
        type: "myp-radio-list",
        defaultValue: this.customerSearchQuery.containChild || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "含下级",
            value: "TRUE"
          },
          {
            label: "不含下级",
            value: "FALSE"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "选择入网来源",
        type: "myp-radio-list",
        defaultValue: this.customerSearchQuery.customerFrom || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "插件",
            value: "PLUGIN"
          },
          {
            label: "扫码",
            value: "SCAN_CODE"
          },
          {
            label: "公众号",
            value: "OFFICAL_ACCOUNT"
          },
          {
            label: "静默",
            value: "SLIENT"
          },
          {
            label: "后台",
            value: "LOCAL"
          },
          {
            label: "第三方",
            value: "OPEN_API"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            customerFrom: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始时间",
        type: "myp-date",
        defaultValue: this.customerSearchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束时间",
        type: "myp-date",
        defaultValue: this.customerSearchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_CUSTOMER_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CUSTOMER_PRODUCT_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
