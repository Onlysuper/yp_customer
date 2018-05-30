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
      searchQuery: state => state.agent.searchQuery
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.searchConfig.push({
        title: "手机号",
        type: "myp-text",
        defaultValue: this.searchQuery.phoneNo,
        cb: value => {
          this.$store.commit("AGENT_SET_SEARCH", { phoneNo: value });
        }
      });
      this.searchConfig.push({
        title: "合伙人编号",
        type: "myp-text",
        defaultValue: this.searchQuery.agentNo,
        cb: value => {
          this.$store.commit("AGENT_SET_SEARCH", { agentNo: value });
        }
      });
      this.searchConfig.push({
        title: "合伙人名称",
        type: "myp-text",
        defaultValue: this.searchQuery.agentName,
        cb: value => {
          this.$store.commit("AGENT_SET_SEARCH", {
            agentName: value
          });
        }
      });
      if (this.$store.state.userInfoAndMenu.isAdmin) {
        // 只有运营显示
        this.searchConfig.push({
          title: "级别",
          type: "myp-select",
          defaultValue: this.searchQuery.level,
          values:
            [
              {
                code: "",
                name: "全部"
              },
              {
                code: "0",
                name: "分公司"
              },
              {
                code: "1",
                name: "一级合伙人"
              },
              {
                code: "2",
                name: "二级合伙人"
              },
              {
                code: "3",
                name: "三级合伙人"
              }
            ],
          cb: value => {
            this.$store.commit("AGENT_SET_SEARCH", {
              level: value
            });
          }
        });

      } else {
        // 非运营
        this.searchConfig.push({
          title: "级别",
          type: "myp-select",
          defaultValue: this.searchQuery.level,
          values:
            [
              {
                name: "全部",
                code: "ALL"
              },
              {
                name: "本级合伙人",
                code: "1"
              },
              {
                name: "下级合伙人",
                code: "2"
              }
            ],
          cb: value => {
            this.$store.commit("AGENT_SET_SEARCH", {
              level: value
            });
          }
        });
        // this.searchConfig.push({
        //   title: "级别",
        //   type: "myp-radio-list",
        //   defaultValue: this.searchQuery.level || "ALL",
        //   options: [
        //     {
        //       label: "全部",
        //       value: "ALL"
        //     },
        //     {
        //       label: "本级合伙人",
        //       value: "1"
        //     },
        //     {
        //       label: "下级合伙人",
        //       value: "2"
        //     }
        //   ],
        //   cb: value => {
        //     if (value == "ALL") value = "";
        //     this.$store.commit("AGENT_SET_SEARCH", {
        //       level: value
        //     });
        //   }
        // });
      }
    });
  },
  methods: {
    searchPanelResult() {
      this.$store.commit("AGENT_IS_SEARCH", true);
      this.$router.back();
    }
  }
};
</script>

<style>

</style>
