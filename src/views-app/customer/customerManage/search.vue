<template>
  <search-page v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title=""></search-page>
</template>

<script>
import SearchPage from "@src/components-app/Search/SearchPage";
import { mapState } from "vuex";
import { statusFilterQuery } from "@src/common/mixins";
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
      searchQuery: state => state.customerManage.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "商户编号",
        type: "myp-text",
        defaultValue: this.searchQuery.customerNo,
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            customerNo: value
          });
        }
      });
      this.searchConfig.push({
        title: "企业税号",
        type: "myp-text",
        defaultValue: this.searchQuery.taxNo,
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", { taxNo: value });
        }
      });
      this.searchConfig.push({
        title: "企业名称",
        type: "myp-text",
        defaultValue: this.searchQuery.enterpriseName,
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            enterpriseName: value
          });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            agentNo: value
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
              name: "开启",
              code: "TRUE"
            },
            {
              name: "关闭",
              code: "FALSE"
            }
          ],
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            status: value
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
              code: ""
            },
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
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            containChild: value
          });
        }
      });
      this.searchConfig.push({
        title: "选择入网来源",
        type: "myp-select",
        defaultValue: this.searchQuery.customerFrom,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            ...this.statusFilterQuery('customerFrom')
          ],
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            customerFrom: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始时间",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束时间",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("CUSTOMER_MANAGE_SET_SEARCH", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("CUSTOMER_MANAGE_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
