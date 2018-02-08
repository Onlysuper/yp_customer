<template>
  <div>
    <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="授权码"></search-page>
  </div>
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
      searchQuery: state => state.empowerManage.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "批次编号",
        type: "myp-text",
        defaultValue: this.searchQuery.batchNo,
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", { batchNo: value });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", { customerNo: value });
        }
      });
      this.searchConfig.push({
        title: "序号",
        type: "myp-text",
        defaultValue: this.searchQuery.qrcode,
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", { qrcode: value });
        }
      });
      this.searchConfig.push({
        title: "授权码",
        type: "myp-text",
        defaultValue: this.searchQuery.authCode,
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", { authCode: value });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          console.log(value);
          this.$store.commit("QRCODE_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
      this.searchConfig.push({
        title: "是否包含下级",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.containChild || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "包含下级",
            value: "TRUE"
          },
          {
            label: "不包含下级",
            value: "FALSE"
          }
        ],
        cb: value => {
          if (value == "ALL") {
            value = "";
          }
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "状态",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.status || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "待审核",
            value: "AUDITING"
          },
          {
            label: "审核通过",
            value: "SUCCESS"
          },
          {
            label: "拒绝",
            value: "REJECT"
          }
        ],
        cb: value => {
          if (value == "ALL") {
            value = "";
          }
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            status: value
          });
        }
      });
      this.searchConfig.push({
        title: "设备类型",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.receiptType || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "授权码",
            value: "AUTHCODE"
          },
          {
            label: "扫码枪",
            value: "SCANCODEGUN"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            receiptType: value
          });
        }
      });
      this.searchConfig.push({
        title: "是否有物料",
        type: "myp-radio-list",
        defaultValue: this.searchQuery.materiel || "ALL",
        options: [
          {
            label: "全部",
            value: "ALL"
          },
          {
            label: "有物料",
            value: "TRUE"
          },
          {
            label: "无物料",
            value: "FALSE"
          }
        ],
        cb: value => {
          if (value == "ALL") value = "";
          this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_QUERY", {
            materiel: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("QRCODE_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
