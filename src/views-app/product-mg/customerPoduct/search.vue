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
      searchQuery: state => state.customerProduct.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.bussinessNo,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_SET_SEARCH", {
            bussinessNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "商户名称",
        type: "myp-text",
        defaultValue: this.searchQuery.customerName,
        cb: value => {
          this.$store.commit("CUSTOMER_PRODUCT_SET_SEARCH", {
            customerName: value
          });
        }
      });
      this.searchConfig.push({
        title: "快速开票",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.qrcodeStatus || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "已开通",
            value: "TRUE"
          },
          {
            label: "未开通",
            value: "INIT"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("CUSTOMER_PRODUCT_SET_SEARCH", {
            qrcodeStatus: value
          });
        }
      });
      this.searchConfig.push({
        title: "聚合支付",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.payStatus || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "已开通",
            value: "TRUE"
          },
          {
            label: "未开通",
            value: "INIT"
          },
          {
            label: "拒绝",
            value: "REJECT"
          },
          {
            label: "待审核",
            value: "CHECKING"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("CUSTOMER_PRODUCT_SET_SEARCH", {
            payStatus: value
          });
        }
      });
      this.searchConfig.push({
        title: "电子发票",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.elecStatus || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "已开通",
            value: "TRUE"
          },
          {
            label: "未开通",
            value: "INIT"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("CUSTOMER_PRODUCT_SET_SEARCH", {
            elecStatus: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CUSTOMER_PRODUCT_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
