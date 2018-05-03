<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="授权码"></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { statusFilterQuery } from "@src/common/mixins";
import { mapState } from "vuex";
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
      searchQuery: state => state.empowerCheck.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "采购单号",
        type: "myp-text",
        defaultValue: this.searchQuery.receiptNo,
        cb: value => {
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            receiptNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          console.log(value);
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
      // this.searchConfig.push({
      //   title: "状态",
      //   type: "myp-radio-list",
      //   defaultValue: this.searchQuery.status || "ALL",
      //   options: [
      //     {
      //       label: "全部",
      //       value: "ALL"
      //     },
      //     {
      //       label: "待审核",
      //       value: "AUDITING"
      //     },
      //     {
      //       label: "审核通过",
      //       value: "SUCCESS"
      //     },
      //     {
      //       label: "拒绝",
      //       value: "REJECT"
      //     }
      //   ],
      //   cb: value => {
      //     if (value == "ALL") value = "";
      //     this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
      //       status: value
      //     });
      //   }
      // });
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
            ...this.statusFilterQuery('empowerCheckStatus')
          ],
        cb: value => {
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
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
            ...this.statusFilterQuery('empowerCheckReceiptType')
          ],
        cb: value => {
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            receiptType: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("QRCODERECIEPTAUDIT_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
