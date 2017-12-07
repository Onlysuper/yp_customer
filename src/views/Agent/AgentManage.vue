<template>
  <div class="admin-page">
    <el-breadcrumb class="page-tag" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="admin-main-box">
      <!-- Form start -->
      <el-form class="form-box" :inline="true" ref="form" :model="form" size="mini">
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="合伙人编号">
          <el-input placeholder="合伙人编号" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="合伙人名称">
          <el-input placeholder="合伙人名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSeach">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- Form end -->
      
      <!-- DataTable start -->
        <el-table
          :max-height="tableHeight"
          :data="tableData"
          style="width: 100%"
          >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="agentNo"
            label="合伙人编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="agentName"
            label="合伙人名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="phoneNo"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="accessKey"
            label="accessKey"
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="150"
            :filters="[{ text: '开启', value: 'TRUE' }, { text: '关闭', value: 'FALSE' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 'TRUE' ? '开启' : '关闭'"
                close-transition>
                {{scope.row.status ? "开启": "关闭"}}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                type="text">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  <!-- DataTable end -->
  
  <!-- pagination start -->
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
  <!-- pagination end -->
      </div>
  
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .el-main{
    position: relative;
  }
  .admin-page{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    background: #eff2f5;
  }
  .page-tag{
    margin-bottom: 10px;
  }
  .admin-main-box{
    overflow: hidden;
    background: #fff;
    padding: 15px;
  }
  .form-box{
    margin-top: 10px;
    // padding: 15px;
  }
  .table-box{
    // padding: 0 15px;
  }
  .admin-page{
    .el-pagination{
      text-align: right;
      padding-top: 17px;
    }
  }
</style>
<script>
import {AgentManage} from "@src/apis"
export default {
    name: 'pc',
    data () {
      return {
        menuList: '', // 菜单数据
        isrouter: true,// 开启路由
        isCollapse: false,// 菜单收起
        tableHeight:'', // 表单的高度
        tableData: [],
        form: {
          name: '',
          region: ''
        }
      }
    },
    mounted () {
      this.tableHeight = document.body.clientHeight-300;
      this.tableDatafn();
    },
    methods: {
     tableDatafn: function(){
       var self = this
       /* 合伙人管理数据 */
        AgentManage()({page: 1,limit: 10}).then(function(data){
          if(data.code==="00"){
            //数据加载成功
            self.tableData = data.data;
          }
        })
     },
     filterTag(value, row) {
        return row.tag === value;
      },
     deleteRow(index, rows) {
      rows.splice(index, 1);
     },
     onSeach: function(){
       alert('查询')
     }
    }
}
</script>


