<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-page>
</template>

<script>
import billOrder from "@src/data/billOrder.json";
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
      searchQuery: state => state.billStandard.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "入网时间开始",
        type: "myp-date",
        defaultValue: this.searchQuery.startNetTime,
        cb: value => {
          console.log(value);
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            startNetTime: value
          });
        }
      });
      this.searchConfig.push({
        title: "入网时间结束",
        type: "myp-date",
        defaultValue: this.searchQuery.endNetTime,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            endNetTime: value
          });
        }
      });
      this.searchConfig.push({
        title: "达标时间开始",
        type: "myp-date",
        defaultValue: this.searchQuery.standardTimeBegin,
        cb: value => {
          console.log(value);
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            standardTimeBegin: value
          });
        }
      });
      this.searchConfig.push({
        title: "达标时间结束",
        type: "myp-date",
        defaultValue: this.searchQuery.standardTimeEnd,
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            standardTimeEnd: value
          });
        }
      });

      // this.searchConfig.push({
      //   title: "包含关系",
      //   type: "myp-radio-list",
      //   defaultValue: this.searchQuery.containChild || "TRUE",
      //   options: [
      //     {
      //       label: "包含下级",
      //       value: "TRUE"
      //     },
      //     {
      //       label: "不包含下级",
      //       value: "FALSE"
      //     }
      //   ],
      //   cb: value => {
      //     if (value == "ALL") value = "";
      //     this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
      //       containChild: value
      //     });
      //   }
      // });
      this.searchConfig.push({
        title: "包含关系",
        type: "myp-select",
        defaultValue: this.searchQuery.containChild,
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
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "推送次数",
        type: "myp-select",
        defaultValue: this.searchQuery.billSuccess,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...billOrder
          ],
        cb: value => {
          console.log(value);
          let billSuccessBegin = "";
          let billSuccessEnd = "";
          if (value) {
            var billSuccessArr = value.split("-");
            if (billSuccessArr.length >= 2) {
              billSuccessBegin = billSuccessArr[0];
              billSuccessEnd = billSuccessArr[1];
            } else if (billSuccessArr.length >= 1) {
              billSuccessBegin = billSuccessArr[0];
            }
          }
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            billSuccessBegin: billSuccessBegin,
            billSuccessEnd: billSuccessEnd,
            billSuccess: value
          });
        }
      });
      // this.searchConfig.push({
      //   title: "达标情况",
      //   type: "myp-radio-list",
      //   defaultValue: this.searchQuery.standard || "ALL",
      //   options: [
      //     {
      //       label: "全部",
      //       value: "ALL"
      //     },
      //     {
      //       label: "已达标",
      //       value: "TRUE"
      //     },
      //     {
      //       label: "未达标",
      //       value: "FALSE"
      //     }
      //   ],
      //   cb: value => {
      //     if (value == "ALL") value = "";
      //     this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
      //       standard: value
      //     });
      //   }
      // });
      this.searchConfig.push({
        title: "达标情况",
        type: "myp-select",
        defaultValue: this.searchQuery.standard,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            {
              name: "已达标",
              code: "TRUE"
            },
            {
              name: "未达标",
              code: "FALSE"
            }
          ],
        cb: value => {
          this.$store.commit("BILLSTANDARD_SEARCH_QUERY", {
            standard: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("BILLSTANDARD_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
