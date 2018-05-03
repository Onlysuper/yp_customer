<template>
  <!-- 搜索 -->
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="授权码"></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { statusFilterQuery } from "@src/common/mixins";
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
        title: "序列号",
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
        title: "包含关系",
        type: "myp-select",
        defaultValue: this.searchQuery.containChild,
        values:
          [
            {
              name: "全部",
              code: "ALL"
            },
            ...this.statusFilterQuery('containChild')
          ],
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", {
            containChild: value
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
            ...this.statusFilterQuery('empowerBindStatus')
          ],
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", {
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
            // empowerCheckReceiptType
          ],
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", {
            receiptType: value
          });
        }
      });
      this.searchConfig.push({
        title: "是否有物料",
        type: "myp-select",
        defaultValue: this.searchQuery.materiel,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('empowerManageMateriel')
          ],
        cb: value => {
          this.$store.commit("QRCODE_SEARCH_QUERY", {
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
