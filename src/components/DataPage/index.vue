<template>
  <!-- 表格与分页展示区域 -->
  <div class="tablelist-box">
    <!-- DataTable 数据表格 start -->
    <el-table :data="tableData" :max-height="tableHeight" v-loading="ifloading" empty-text="暂无数据" header-row-class-name="tableHeader" style="width: 100%" show-overflow-tooltip="true">
      <el-table-column v-if="tableDataInit.havecheck" fixed type="selection" width="40">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableDataInit.dataHeader" :key="index" :prop="item.word" :label="item.key" :width="item.width" :sortable="item.sortable">
        <template slot-scope="scope">
          <el-tag v-if="item.status&&item.type(scope.row[scope.column.property],scope.row).text?true:false" :type="item.type(scope.row[scope.column.property],scope.row).type?item.type(scope.row[scope.column.property],scope.row).type:''" close-transition> {{item.type(scope.row[scope.column.property],scope.row).text}}</el-tag>
          <el-popover v-else trigger="click" placement="top">
            <p>{{ scope.row[scope.column.property]}}</p>
            <div slot="reference" class="name-wrapper">
              <div class="inline-text">
                {{ scope.row[scope.column.property]}}
              </div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="tableDataInit.operation" fixed="right" label="操作" :width="tableDataInit.operation.width">
        <!-- <template slot-scope="scope">
          <el-button v-for="(item,index) in tableDataInit.operation.options" :key="index" size="small" type="text" v-if="scope.row[item.stateName]=='TRUE'?item.opposite?true:false:item.opposite?false:true" @click="operationHandle(scope.row,item.cb)" :style="item.color?'color:'+item.color:'color:#00c1df'">{{item.text}}</el-button>
        </template> -->
        <template slot-scope="scope">
          <el-button v-for="(item,index) in tableDataInit.operation.options" :ref="item.ref" :privilege-code="item.ref" :key="index" size="small" type="text" v-if="item.visibleFn?item.visibleFn(scope.row,item.visibleFn):true" @click="operationHandle(scope.row,item.cb)" :style="item.color?'color:'+item.color:'color:#00c1df'">
            {{item.text}}
          </el-button>
          <!-- <el-button v-for="(item,index) in tableDataInit.operation.options" 
          :key="index" size="small" type="text" 
          
           @click="operationHandle(scope.row,item.cb)" :style="item.color?'color:'+item.color:'color:#00c1df'">{{item.text}}
            {{item.visibleFn(scope.row,item.visibleFn)}}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="getPage" :page-sizes="[10, 20,30]" :page-size="getLimit" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
    </el-pagination>
    <!-- DataTable end -->
  </div>
</template>
<style lang="scss">
.tablelist-box {
  .tableHeader {
    background: #f0f0f0;
    th {
      padding: 4px 0;
    }
  }

  .el-table td {
    padding: 3px 0;
  }
  .el-popover p {
    padding: 0px !important;
    margin: 0;
  }
  .inline-text {
    display: inline-block;
    vertical-align: middle;
    max-width: 170px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
<script>
import $ from "jquery";
import qs from "qs";
import Vue from "vue";
export default {
  props: ["tableDataInit", "page", "limit", "search"],
  data() {
    return {
      dataSuccess: this.tableDataInit.dataSuccess, // 数据家在完成
      ifloading: false,
      tableData: [],
      tableHeight: 0, // 表单的高度
      getUrl: this.tableDataInit.getDataUrl.url, // 请求函数
      dataCount: 0,
      getPage: this.page, //当前页数
      getLimit: this.limit, //每页条数
      getSearch: this.search // 搜索条件
    };
  },

  methods: {
    visibleArrFn(rowdata, cb) {
      // 点击操作按钮
      this.$emit("operation", rowdata, cb);
    },
    summaryMethod(param) {
      console.log(param);
    },
    //列表数据获取
    postDataInit(page, limit, searchCondition) {
      console.log("开始查询了" + searchCondition + "--" + limit + "-" + page);
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
        }
        this.ifloading = false;
      });
    },
    // 表格大小
    tableSizeHandle() {
      // console.log(document.querySelector(".form-box").clientHeight);
      // console.log(document.querySelector(".form-box").clientHeight);

      if (document.querySelector(".form-box")) {
        var serchboxHeight = document.querySelector(".form-box").clientHeight;
        this.tableHeight = document.body.clientHeight - serchboxHeight - 300;
      } else {
        this.tableHeight = document.body.clientHeight - 300;
      }
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
    // 导出
    ExportExcel(path, param) {
      var exportUrl = "";
      if (param) {
        exportUrl =
          this.$store.state.Base.oaIp +
          path +
          "?" +
          qs.stringify(param) +
          "&" +
          qs.stringify(this.getSearch);
      } else {
        exportUrl =
          this.$store.state.Base.oaIp +
          path +
          "?" +
          qs.stringify(this.getSearch);
      }
      // var exportUrl =
      //   this.$store.state.Base.oaIp + path + "?" + qs.stringify(this.getSearch);
      window.location.href = exportUrl;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  watch: {
    visibleinput(val) {
      // 监听高级搜索与普通搜索模式转变
      this.tableSizeHandle();
    },
    getPage(value) {
      this.getPage = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getLimit(value) {
      this.getLimit = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getUrl(value) {
      this.getUrl = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getSearch() {
      this.getSearch = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    }
  },
  mounted() {
    // 初始化数据
    this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    this.tableSizeHandle();
    window.onresize = () => {
      this.tableSizeHandle();
    };
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
    }
  }
};
</script>