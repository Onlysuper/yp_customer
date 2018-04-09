<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import orderStatus from "@src/data/orderStatus.json";
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
    }),
    isAdmin() {
      var user = this.$store.state.userInfoAndMenu.userMessage.all;
      var isAdmin = (
        user.userType === "root" ||
        user.userType === "admin" ||
        user.userType === "operator"
      ); // 运营
      return isAdmin
    }
  },
  mounted() {
    //  ...orderStatus.map(item => {
    //           return { value: item.code, label: item.name }
    //         })
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
      if (this.isAdmin) {
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
      }
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

      // this.searchConfig.push({
      //   title: "包含关系",
      //   type: "myp-radio-list",
      //   defaultValue: this.searchQuery.hasChild || "ALL",
      //   options: [
      //     {
      //       label: "含下级",
      //       value: "TRUE"
      //     },
      //     {
      //       label: "不含下级",
      //       value: "FALSE"
      //     }
      //   ],
      //   cb: value => {
      //     if (value == "ALL") value = "";
      //     this.$store.commit("ORDER_QUERY_SET_SEARCH", {
      //       hasChild: value
      //     });
      //   }
      // });
      this.searchConfig.push({
        title: "包含关系",
        type: "myp-select",
        defaultValue: this.searchQuery.hasChild,
        values:
          [
            {
              name: "含下级",
              code: "TRUE"
            },
            {
              name: "不含下级",
              code: "FALSE"
            }
          ],
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            hasChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "交易类型",
        type: "myp-select",
        defaultValue: this.searchQuery.payType,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            {
              name: "微信",
              code: "WECHAT"
            },
            {
              name: "支付宝",
              code: "ALIPAY"
            }
          ],
        cb: value => {
          this.$store.commit("ORDER_QUERY_SET_SEARCH", {
            payType: value
          });
        }
      });
      this.searchConfig.push({
        title: "交易状态",
        type: "myp-select",
        defaultValue: this.searchQuery.status,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...orderStatus
          ],
        cb: value => {
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
