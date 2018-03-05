<template>
  <!-- 表格与分页展示区域 -->
  <div class="tablelist-box">
    <!-- DataTable 数据表格 start -->
    <!-- <el-table border :fit="true" :stripe="true" :data="tableData" class="__scrollStyle__" :height="tableHeight" v-loading="ifloading" empty-text="暂无数据" header-row-class-name="tableHeader" show-overflow-tooltip="true"> -->

    <div class="table-outbox">
      <el-table ref="tableList" border :fit="true" :stripe="true" :data="tableData" class="__scrollStyle__" height="100%" width="100%" v-loading="ifloading" empty-text="暂无数据" header-row-class-name="tableHeader" show-overflow-tooltip="true">
        <el-table-column v-if="tableDataInit.havecheck" fixed type="selection" width="40">
        </el-table-column>

        <el-table-column v-for="(item,index) in tableDataInit.dataHeader" :key="index" :prop="item.word" :label="item.key" v-if="item.hidden?false:true" :width="item.width" :sortable="item.sortable">
          <!-- <el-table-column v-for="(item,index) in tableDataInit.dataHeader" :key="index" :prop="item.word" :label="item.key" :width="item.width" :sortable="item.sortable"> -->
          <template slot-scope="scope" v-if="item.visibleFn?item.visibleFn(scope.row):true">
            <el-tag v-if="item.status&&item.type(scope.row[scope.column.property],scope.row).text&&scope.row[scope.column.property]!='null'?true:false" :type="item.type(scope.row[scope.column.property],scope.row).type?item.type(scope.row[scope.column.property],scope.row).type:''" close-transition> {{scope.row[scope.column.property]!='null'?item.type(scope.row[scope.column.property],scope.row).text:""}}</el-tag>
            <el-popover v-else trigger="click" placement="top">
              <p>{{ item.type?item.type(scope.row[scope.column.property],scope.row).text:scope.row[scope.column.property]}}</p>
              <div slot="reference" class="name-wrapper">
                <div class="inline-text">
                  {{ item.type&&scope.row[scope.column.property]!='null'?item.type(scope.row[scope.column.property],scope.row).text:scope.row[scope.column.property]}}
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column v-if="tableDataInit.operation" fixed="right" label="操作" :width="tableDataInit.operation.width">
          <template slot-scope="scope">
            <el-button v-for="(item,index) in tableDataInit.operation.options" :ref="item.ref" :privilege-code="item.ref" :key="index" size="small" type="text" v-if="item.visibleFn?item.visibleFn(scope.row,item.visibleFn):true" :disabled="item.disabledFn?item.disabledFn(scope.row,item.disabledFn):false" @click="operationHandle(scope.row,item.cb)" :style="item.color?'color:'+item.color:'color:#00c1df'">
              {{item.text}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="getPage" :page-sizes="[10, 20,30]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
    </el-pagination>
    <!-- DataTable end -->
  </div>
</template>
<style lang="scss">
.tablelist-box {
  .table-outbox {
    flex: 1;
    overflow: auto;
    .el-table {
      position: relative;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
      height: 100%;
      background-color: #fff;
      font-size: 14px;
      color: #606266;
    }
    &::after {
      content: "";
      display: flex;
    }
  }
  .el-pagination {
    flex-shrink: 0;
    text-align: right;
    flex: 1;
    max-height: 30px;
    height: 30px;
  }
  .scroll-view {
    /* -- Attention: This line is extremely important in chrome 55+! -- */
    touch-action: none;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 55px;
    bottom: 0;
    left: 0;
  }
  .el-table__fixed-right-patch {
    background: #f0f0f0;
  }

  .tableHeader {
    background: #f0f0f0;
    th {
      background: none;
      padding: 2px 0;
      color: #000;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .el-table {
    color: #000;
    // color: rgba(0, 0, 0, 0.65);
    td {
      padding: 7px 0;
    }
    .cell {
      line-height: 30px;
    }
  }
  .el-popover p {
    padding: 0px !important;
    margin: 0;
  }
  .inline-text {
    position: relative;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    height: 30px;
  }
}
// .tablelist-box .el-table {
//   height: 100%;
// }
.tablelist-box .tableHeader th {
  position: relative;
}
.tablelist-box .el-table td {
  position: relative;
}
@media only screen and (min-device-height: 600px) {
  .tablelist-box .tableHeader th {
    padding: 2px 0;
  }
  .tablelist-box .el-table td {
    padding: 3px 0 !important;
  }
}
@media only screen and (min-device-height: 700px) {
  .tablelist-box .tableHeader th {
    padding: 3px 0;
  }
  .tablelist-box .el-table td {
    padding: 4px 0 !important;
  }
}
@media only screen and (min-device-height: 768px) {
  .tablelist-box .tableHeader th {
    padding: 3px 0;
  }
  .tablelist-box .el-table td {
    padding: 4px 0 !important;
  }
}
@media only screen and (min-device-height: 820px) {
  .tablelist-box .tableHeader th {
    padding: 5px 0;
  }
  .tablelist-box .el-table td {
    padding: 7px 0 !important;
  }
}
@media only screen and (min-device-height: 900px) {
  .tablelist-box .tableHeader th {
    padding: 6px 0;
  }
  .tablelist-box .el-table td {
    padding: 8px 0 !important;
  }
}
@media only screen and (min-device-height: 1000px) {
  .tablelist-box .tableHeader th {
    padding: 7px 0;
  }
  .tablelist-box .el-table td {
    padding: 10px 0 !important;
  }
}
@media only screen and (min-device-height: 1200px) {
  .tablelist-box .tableHeader th {
    padding: 10px 0;
  }
  .tablelist-box .el-table td {
    padding: 12px 0 !important;
  }
}
.__scrollStyle__ .el-table__body-wrapper::-webkit-scrollbar {
  width: 0.8rem;
  background-color: #f5f5f5;
}
.__scrollStyle__ .el-table__body-wrapper::-webkit-scrollbar:horizontal {
  height: 0.8rem;
  background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/
.__scrollStyle__ .el-table__body-wrapper::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 0.2rem;
  background-color: #f5f5f5;
}
/*定义滑块，内阴影及圆角*/
.__scrollStyle__ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 0.2rem;
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #989797;
}
</style>
<script>
import $ from "jquery";
import qs from "qs";
import Vue from "vue";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
export default {
  props: ["tableDataInit", "page", "limit", "search"],
  mixins: [mixinDataTable],
  data() {
    return {
      // iscrollOptions: {
      //   scrollbars: true,
      //   mouseWheel: true,
      //   useTransform: true, //CSS转化
      //   useTransition: true //CSS过渡
      // },
      dataSuccess: this.tableDataInit.dataSuccess, // 数据家在完成
      ifloading: false,
      tableData: [],
      tableHeight: 0, // 表单的高度
      getUrl: this.tableDataInit.getDataUrl.url, // 请求函数
      dataCount: 0,
      getSearch: this.search,
      getPage: this.page,
      getLimit: this.limit // 搜索条件
    };
  },

  methods: {
    visibleArrFn(rowdata, cb) {
      // 点击操作按钮
      this.$emit("operation", rowdata, cb);
    },
    summaryMethod(param) {
      // console.log(param);
    },
    //假刷新
    unrealReload() {
      let arr_ = this.tableData;
      // console.log(arr_);
      this.tableData = [];
      this.$nextTick(() => {
        this.tableData = arr_;
      });
    },
    //列表数据获取
    postDataInit(page, limit, searchCondition) {
      this.ifloading = true;
      this.getUrl()({
        page: page,
        limit: limit,
        ...searchCondition
      }).then(data => {
        if (data.code === "00") {
          // 数据获取成功
          this.tableData = data.data;
          this.dataCount = data.count;
          if (this.dataSuccess != "" && this.dataSuccess != null) {
            this.$emit("operation", data, this.dataSuccess);
          }
          this.ifloading = false;
        } else {
          // alert(1);
          this.$message({
            message: data.msg,
            type: "warning",
            duration: 1500,
            showClose: true
          });
        }
        this.ifloading = false;
      });
    },
    handleSizeChange(val) {
      // 改变页数
      this.$emit("pagelimit", val);
    },
    // 更改页数
    handleCurrentChange(val) {
      this.$emit("pagecount", val);
    },
    handleLoad() {
      // 操作按钮加载完毕
      console.log("加载完毕");
    },
    formatter(row, column) {
      return row.address;
    },
    operationHandle(rowdata, cb) {
      // 点击操作按钮
      this.$emit("operation", rowdata, cb);
    },
    doLayout() {
      console.log(this.$refs.tableList);
      this.$refs.tableList.doLayout();
    },
    // 导出
    ExportExcel(path, param, haveparam) {
      var exportUrl = "";
      if (param == "download") {
        exportUrl = this.$store.state.Base.oaIp + path;
      } else {
        if (haveparam) {
          // 带除了搜索条件外额外的参数
          exportUrl =
            this.$store.state.Base.oaIp +
            path +
            "?" +
            qs.stringify(this.getSearch) +
            "&" +
            qs.stringify(param);
        } else {
          exportUrl =
            this.$store.state.Base.oaIp +
            path +
            "?" +
            qs.stringify(this.getSearch);
        }
      }
      // var exportUrl =
      //   this.$store.state.Base.oaIp + path + "?" + qs.stringify(this.getSearch);
      window.location.href = exportUrl;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },

  mounted() {
    // this.doLayout();
    this.$emit("databoxSize");
    // 初始化数据
    this.postDataInit(this.getPage, this.getLimit, this.getSearch);
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.moduleLayour.userMessage.all;
    },
    getDataUrl() {
      // 获取父页面传递的get参数
      return this.tableDataInit.getDataUrl;
    },
    summary() {
      //是否显示合计
      return true;
    },
    havecheck() {
      // 是否显示选择框
      return this.tableDataInit.havecheck ? this.tableDataInit.havecheck : true;
    },
    visibleinput() {
      return this.$store.state.topSearch.visibleinput;
    },
    fullScreen() {
      return this.$store.state.fullScreen.isFullscreen;
    }
  },
  watch: {
    visibleinput(val) {
      this.doLayout();
      // 监听高级搜索与普通搜索模式转变
    },
    getPage(value) {
      this.getPage = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    limit(value) {
      this.getLimit = value;
      console.log(this.getLimit);
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getUrl(value) {
      this.getUrl = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getSearch() {
      this.getSearch = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    fullScreen(value) {
      // 全屏切换
    },

    $route(to, from) {}
  }
};
</script>
