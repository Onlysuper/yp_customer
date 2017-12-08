<template>
  <div class="admin-page">
    <el-breadcrumb class="page-tag" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="admin-main-box">
      <!-- Form 表单编写 start -->
      <el-form class="form-box" :inline="true" ref="searchform" :model="searchform" size="mini">
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="searchform.phoneNo"></el-input>
        </el-form-item>
        <el-form-item label="合伙人编号">
          <el-input placeholder="合伙人编号" v-model="searchform.agentNo"></el-input>
        </el-form-item>
        <el-form-item label="合伙人名称">
          <el-input placeholder="合伙人名称" v-model="searchform.agentName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSeach">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- Form end -->
      <div class="operation-group">
        <el-button-group>
          <el-button size="small" type="primary" icon="el-icon-edit">新增</el-button>
        </el-button-group>
      </div>
      <!-- DataTable 数据表格 start -->
        <el-table
          :max-height="tableHeight"
          :data="tableData"
          header-row-class-name="tableHeader"
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
                type="text" @click="onEdit(scope.$index, scope.row)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  <!-- DataTable end -->
  <!-- pagination 分页 start -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[150, 200,300]"
        :page-size="pageCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount"
          >
        </el-pagination>
  <!-- pagination 分页 end -->
    </div>
  <!-- 合伙人信息编辑弹出框 start -->
  <el-dialog title="编辑" :visible.sync="visibleBox.dataEditVisible">
    <el-form ref="form" :model="editform" label-width="100px">
        <el-form-item label="合伙人名称">
          <el-input :disabled="true" v-model="editform.agentName"></el-input>
        </el-form-item>
        <el-form-item label="合伙人编号">
          <el-input :disabled="true" v-model="editform.agentNum"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input :disabled="true" v-model="editform.agentPhone"></el-input>
        </el-form-item>
        <el-form-item label="经营区域">
          <el-cascader
            size="large"
            :options="optionsArea"
            v-model="editform.agentArea"
            @change="handleChangeArea"
            value = 110000
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="回调地址">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="editform.agentAddress">
          </el-input>
          <p class="tip-text">回调地址是用来通知代理商一些有用信息的接口，无开发能力代理商可不填</p>
          </el-alert>
        </el-form-item>
        <el-button type="primary" @click="onEditSave">保存</el-button>
        <el-button @click="editCancle">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 合伙人信息编辑弹出框 end -->

  <!-- 新增合伙人 start -->
  <el-dialog title="新增" :visible.sync="visibleBox.addEditVisible">
    <el-form ref="form" :model="editform" label-width="180px">
        <el-form-item label="合伙人名称">
          <el-input v-model="editform.agentName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editform.agentPhone"></el-input>
        </el-form-item>
        <el-form-item label="经营区域">
          <el-cascader
            size="large"
            :options="optionsArea"
            v-model="editform.agentArea"
            @change="handleChangeArea"
            value = 110000
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="合伙人分润成本">
          <el-select v-model="frValue" clearable placeholder="请选择">
            <el-option
              v-for="item in frOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户默认交易费率">
          <el-select v-model="shValue" clearable placeholder="请选择">
            <el-option
              v-for="item in shOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户授权码默认可用天数">
          <el-select v-model="sqValue" clearable placeholder="请选择">
            <el-option
              v-for="item in sqOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户电票产品默认可用天数">
          <el-select v-model="dqValue" clearable placeholder="请选择">
            <el-option
              v-for="item in dqOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onEditSave">确认提价</el-button>
        <el-button @click="editCancle">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
  <!-- 新增合伙人 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .el-main{
    position: relative;
    background: #eff2f5
  }
  .admin-page{
    .operation-group{
      padding: 5px 0;
      // text-align: right;
    }
    .tableHeader{
      background: #f0f0f0
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
    } 
    .el-pagination{
      text-align: right;
      padding-top: 17px;
    }
    .tip-text{
      color: #67C23A;
    }
  }
</style>
<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import {AgentManage} from "@src/apis"
export default {
    name: 'pc',
    data () {
      return {
        frOptions: [{ // 合伙人分润成本
          value: '0.005',
          label: '比例0.005'
        }, {
          value: '0.006',
          label: '比例0.006'
        }, {
          value: '0.0055',
          label: '比例0.0055'
        }, {
          value: '0.004',
          label: '比例0.004'
        }],
        frValue: '',

        shOptions: [{ // 商户默认交易费率
          value: '0.007',
          label: '比例0.007'
        }, {
          value: '0.01',
          label: '比例0.01'
        }, {
          value: '2',
          label: '固定值2'
        }, {
          value: '0.05',
          label: '比例0.05 固定值2'
        },{
          value: '0.01',
          label: '比例0.01'
        }],
        shValue: '',

        sqOptions: [{ // 商户授权码默认可用天数
          value: '90',
          label: '90'
        }, {
          value: '365',
          label: '365'
        }],
        sqValue: '',

        dqOptions: [{ // 商户电票产品默认可用天数
          value: '90',
          label: '90'
        }, {
          value: '365',
          label: '365'
        }],
        dqValue: '',

        visibleBox :{
          dataEditVisible: false, //编辑窗口
          addEditVisible: true //新增窗口
        },
        tableHeight:'', // 表单的高度
        currentPage: 1, //当前页数
        pageCount: 100,//每页条数
        dataCount: 0, // 数据条数
        tableData: [], //表单数据
        optionsArea: regionDataPlus,
        editform: { // 合伙人信息编辑表单
          agentName: '',// 合伙人名称
          agentNum: '',// 合伙人编号
          agentPhone: '', //合伙人编号
          agentArea: ["150000", "150400", "150404"],
          agentAddress: ''
        },
        searchform: {
          agentName:'',
          phoneNo: '',
          agentNo: ''
        }
      }
    },
    mounted () {
      var self = this;
      this.tableHeight = document.body.clientHeight-300;
      this.tableDatafn(self.currentPage,self.pageCount);
    },
    methods: {
      tableDatafn: function(page,limit,agentName,agentNo,phoneNo){
        var self = this
        /* 加载合伙人管理数据 */
          AgentManage()({
            page: page,
            limit: self.pageCount,
            agentName: agentName,
            agentNo: agentNo,
            phoneNo:phoneNo
          }).then(function(data){
            if(data.code==="00"){
              // 数据获取成功
              self.tableData = data.data;
              self.dataCount = data.count;
            }
          })
      },
      handleChangeArea (value) {
        //编辑地区
        console.log(value)
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageCount = val
        this.tableDatafn(this.currentPage,this.pageCount);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.tableDatafn(this.currentPage,this.pageCount);
      },
      onSeach: function(){
        //数据搜索
        this.tableDatafn(
          this.currentPage,
          this.pageCount,
          this.searchform.agentName,
          this.searchform.agentNo,
          this.searchform.phoneNo
        );
      },
      onEdit (index,row){
        //编辑信息
        console.log(row.levelDetail)
        this.editform.agentName = row.agentName
        this.editform.agentNum = row.agentNo
        this.editform.agentPhone = row.phoneNo
        // this.editform.agentArea = row.levelDetail
        this.editform.agentAddress = row.redirectUrl
        this.visibleBox.dataEditVisible = true
      },
      editCancle(){
        //取消编辑
        this.visibleBox.dataEditVisible = false
      },
      onEditSave (){
        //保存编辑
        this.visibleBox.dataEditVisible = false
      }
    }
}
</script>


