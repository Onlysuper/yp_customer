<template>
  <!-- 埋点图表 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-chart @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-chart>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
import SearchForm from "@src/components/SearchForm";
import BuriedPointChart from "@src/components/BuriedPointChart";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/BuriedPointChart/chartPage";
import { todayDate, today_ } from "@src/common/dateSerialize";
import { postBurialPointCharts, getBurialPointTotal } from "@src/apis";
export default {
  name: "operator_log_chart",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-chart": BuriedPointChart // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      userType: "",
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate // 结束时间
    };
    return {
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        {
          corresattr: "userType",
          type: "select",
          label: "用户类型",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "0",
              label: "静默"
            },
            {
              value: "1",
              label: "普通"
            }
          ],
          cb: value => {
            this.searchCondition.userType = value;
          }
        },
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          type: "dateGroup",
          label: "选择时间",
          show: true, // 普通搜索显示
          options: [
            {
              corresattr: "createTimeStart",
              label: "开始时间",
              value: today_,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "createTimeEnd",
              lable: "结束时间",
              value: today_,
              cb: value => {
                this.searchCondition.createTimeEnd = value;
              }
            }
          ]
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: postBurialPointCharts // 初始化数据
        }
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
