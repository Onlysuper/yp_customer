<template>

  <div class="tablelist-box">
    <!-- DataTable 数据表格 start -->
    <el-table :data="tableData" :max-height="tableHeight" v-loading="ifloading" empty-text="暂无数据" header-row-class-name="tableHeader" style="width: 100%" show-overflow-tooltip="true">
      <el-table-column fixed type="selection" width="40">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableDataInit.dataHeader" :key="index" :prop="item.word" :label="item.key" :width="item.width" :sortable="item.sortable">
        <template slot-scope="scope">
          <el-tag v-if="item.status" :type="item.type(scope.row[scope.column.property]).type" close-transition> {{item.type(scope.row[scope.column.property]).text}}</el-tag>
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

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-for="(item,index) in tableDataInit.operation" @click="operationHandle(scope.row,item.cb)" :key="index" type="text" size="small">{{item.text}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20,30]" :page-size="pageCount" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
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
import Vue from "vue";
export default {
  props: ["tableDataInit"],
  data() {
    return {
      ifloading: false,
      tableData: [],
      tableHeight: 0, // 表单的高度
      currentPage: 1, //当前页数
      pageCount: 10, //每页条数
      dataCount: 0
    };
  },
  computed: {
    getDataUrl() {
      // 获取父页面传递的get参数
      return this.tableDataInit.getDataUrl;
    },
    visibleinput() {
      return this.$store.state.dataTable.visibleinput;
    }
  },
  mounted() {
    // 初始化数据
    this.currentPage = this.getDataUrl.page;
    this.pageCount = this.getDataUrl.limit;
    this.postDataInit(
      this.currentPage,
      this.pageCount,
      this.getDataUrl.searchCondition
    );
    console.log(this.getDataUrl);
    this.tableSizeHandle();
    window.onresize = () => {
      this.tableSizeHandle();
    };
  },
  methods: {
    //列表数据获取
    postDataInit(page, limit, searchCondition) {
      this.ifloading = true;
      this.getDataUrl.url()({
        page: page,
        limit: limit,
        ...searchCondition
      }).then(data => {
        if (data.code === "00") {
          // 数据获取成功
          this.tableData = data.data;
          this.dataCount = data.count;
        }
        this.ifloading = false;
      });
    },
    // 表格大小
    tableSizeHandle() {
      var serchboxHeight = document.querySelector(".form-box").clientHeight;
      this.tableHeight = document.body.clientHeight - serchboxHeight - 175;
    },
    handleSizeChange(val) {
      // 改变页数
      this.pageCount = val;
      this.postDataInit(
        this.currentPage,
        this.pageCount,
        this.getDataUrl.searchCondition
      );
    },
    handleCurrentChange(val) {
      // 更改每页显示条数
      this.currentPage = val;
      this.postDataInit(
        this.currentPage,
        this.pageCount,
        this.getDataUrl.searchCondition
      );
    },
    formatter(row, column) {
      return row.address;
    },
    operationHandle(rowdata, cb) {
      // 点击操作按钮
      this.$emit("operation", rowdata, cb);
    }
  },
  watch: {
    visibleinput(val) {
      // 监听高级搜索与普通搜索模式转变
      this.tableSizeHandle();
    },
    // 检测父页面搜索数据变化
    getDataUrl(value) {
      var getDataUrl = value;
      this.postDataInit(
        getDataUrl.page,
        getDataUrl.limit,
        getDataUrl.searchCondition
      );
    }
  }
};
</script>