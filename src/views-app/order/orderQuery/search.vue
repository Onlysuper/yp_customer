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
      searchQuery: state => state.orderQuery.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "交易订单号",
        type: "myp-text",
        defaultValue: this.searchQuery.orderNo,
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            orderNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "代理商编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            agentNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.startTime,
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            startTime: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.endTime,
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            endTime: value
          });
        }
      });
      this.searchConfig.push({
        title: "包含关系",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.hasChild || "ALL",
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
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            hasChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "交易类型",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.payType || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "微信",
            value: "WECHAT"
          },
          {
            label: "支付宝",
            value: "ALIPAY"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            payType: value
          });
        }
      });
      this.searchConfig.push({
        title: "交易状态",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.status || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "订单初始化",
            value: "INIT"
          },
          {
            label: "待支付",
            value: "PAY_WAIT"
          },
          {
            label: "交易失败",
            value: "FAIL"
          },
          {
            label: "交易成功",
            value: "SUCCESS"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            status: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("ORDER_QUERY_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
