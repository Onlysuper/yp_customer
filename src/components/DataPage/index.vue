<template>
    <div class="tablelist-box">
        <!-- DataTable 数据表格 start -->
        <el-table
            :max-height="tableHeight"
            header-row-class-name="tableHeader"
            :data="tableData.tableData"
            style="width: 100%"
            >
            <el-table-column
            fixed
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column
            v-for="(item,index) in tableData.dataHeader" :key="index"
            :prop="item.word"
            :label="item.key"
            :width="item.width">
            </el-table-column>

            <el-table-column
            v-for="(item,index) in tableData.states" :key="index"
            prop="tag"
            :label="item.key"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            width="150">
                <template slot-scope="scope">
                <el-tag
                :type="scope.row.status === 'TRUE' ? '开启' : '关闭'"
                close-transition>  {{scope.row.status ? "开启": "关闭"}}</el-tag>
            </template>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="150">
            
            <template slot-scope="scope" >
                <el-button v-for="(item,index) in tableData.operation" :key="index" type="text" size="small">{{item.text}}</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20,30]"
            :page-size="pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.dataCount"
            >
        </el-pagination>
  <!-- DataTable end -->
    </div>
</template>
<style lang="less">
</style>
<script>
import Vue from "vue";
export default {
    props:['tableData'],
    data () {
        return {
            tableHeight:0, // 表单的高度
            currentPage: 1, //当前页数
            pageCount: 10,//每页条数
        }
    },
    computed : {
        visibleinput () {
            return this.$store.state.dataTable.visibleinput
        }
    },
    mounted () {
         // 获取数据 交给父页面处理
        var self = this;
        this.$emit('childmanage',this.currentPage,this.pageCount)
        this.tableSizeHandle();
        window.onresize = function() {
           self.tableSizeHandle();
        };
    },
    methods : {
        // 表格大小
        tableSizeHandle () {
            var serchboxHeight = document.querySelector('.form-box').clientHeight;
            this.tableHeight = document.body.clientHeight-serchboxHeight-250;
        },
        handleSizeChange(val) {
        // 改变页数
            this.pageCount = val
            this.$emit('childmanage',this.currentPage,this.pageCount)
        },
        handleCurrentChange(val) {
        // 更改每页显示条数
            this.currentPage = val;
            this.$emit('childmanage',this.currentPage,this.pageCount)
        },
        formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      }
    },
    watch : {
        visibleinput (val) {
            // 监听高级搜索与普通搜索模式转变
            this.tableSizeHandle();
        }
    }
}
</script>