<template>
  <!-- 搜索 -->
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
      searchQuery: state => state.empowerTransfer.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "转移单号",
        type: "myp-text",
        defaultValue: this.searchQuery.migrateNo,
        cb: value => {
          this.$store.commit("QRCODEMIGRATE_SEARCH_QUERY", {
            migrateNo: value
          });
        }
      });

      // this.searchConfig.push({
      //   title: "转移类型",
      //   type: "myp-radio-list",
      //   defaultValue: this.searchQuery.migrateMode || "ALL",
      //   options: [
      // {
      //   label: "全部",
      //   value: "ALL"
      // },
      // {
      //   label: "转入",
      //   value: "INPUT"
      // },
      // {
      //   label: "转出",
      //   value: "OUTPUT"
      // }
      //   ],
      //   cb: value => {
      //     if (value == "ALL") value = "";
      //     this.$store.commit("QRCODEMIGRATE_SEARCH_QUERY", {
      //       migrateMode: value
      //     });
      //   }
      // });
      this.searchConfig.push({
        title: "转移类型",
        type: "myp-select",
        defaultValue: this.searchQuery.migrateMode,
        values:
          [
            {
              name: "全部",
              code: ""
            },
            {
              name: "转入",
              code: "INPUT"
            },
            {
              name: "转出",
              code: "OUTPUT"
            }
          ],
        cb: value => {
          this.$store.commit("QRCODEMIGRATE_SEARCH_QUERY", {
            migrateMode: value
          });
        }
      });
      this.searchConfig.push({
        title: "开始日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeStart,
        cb: value => {
          console.log(value);
          this.$store.commit("QRCODEMIGRATE_SEARCH_QUERY", {
            createTimeStart: value
          });
        }
      });
      this.searchConfig.push({
        title: "结束日期",
        type: "myp-date",
        defaultValue: this.searchQuery.createTimeEnd,
        cb: value => {
          this.$store.commit("QRCODEMIGRATE_SEARCH_QUERY", {
            createTimeEnd: value
          });
        }
      });
    });
  },
  methods: {
    // 点击查询按钮
    searchPanelResult() {
      this.$store.commit("QRCODEMIGRATE_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
