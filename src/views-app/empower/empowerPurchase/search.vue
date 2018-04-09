<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="授权码"></search-page>
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
      searchQuery: state => state.empowerPurchase.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "采购单号",
        type: "myp-text",
        defaultValue: this.searchQuery.receiptNo,
        cb: value => {
          this.$store.commit("QRCODERECIEPT_SEARCH_QUERY", {
            receiptNo: value
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
            {
              name: "待审核",
              code: "AUDITING"
            },
            {
              name: "审核通过",
              code: "SUCCESS"
            },
            {
              name: "拒绝",
              code: "REJECT"
            }
          ],
        cb: value => {
          this.$store.commit("QRCODERECIEPT_SEARCH_QUERY", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "设备类型",
        type: "myp-select",
        defaultValue: this.searchQuery.receiptType,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            {
              name: "授权码",
              code: "AUTHCODE"
            },
            {
              name: "扫码枪",
              code: "SCANCODEGUN"
            }
          ],
        cb: value => {
          this.$store.commit("QRCODERECIEPT_SEARCH_QUERY", {
            receiptType: value
          });
        }
      });

      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("QRCODERECIEPT_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });

      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("QRCODERECIEPT_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("QRCODERECIEPT_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
