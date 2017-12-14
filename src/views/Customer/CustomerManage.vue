<template>
  <div class="admin-page">
    <el-breadcrumb class="page-tag" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="admin-main-box">
      <search-form :search-form="searchForm"></search-form>
      <div class="operation-box searcform" id="searcform">
        <el-button-group class="button-group" >
          <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload">批量入网</el-button>
          <el-button size="small" type="primary" icon="el-icon-sort">批量转移</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-button-group>
      </div>
      <data-page :table-data ="tableData" v-on:childmanage="CustomerManage"></data-page>
    </div>
 
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .el-main{
    position: relative;
    background: #eff2f5
  }
  .admin-page{
    position: relative;
    background: #eff2f5;
    padding: 20px;
    .operation-box{
      float: left;
      width: 100%;
      .button-group{
        margin-right: 10px;
      }
      .line{
        text-align: center
      }
    }
    .operation-group{
      padding: 5px 0;
      .line{
        text-align: center
      }
    }
    .tableHeader{
      background: #f0f0f0
    }
    .page-tag{
      margin-bottom: 10px;
    }
    .admin-main-box{
      padding: 10px;
      position: relative;
      height:100%;
      width: 100%;
      background: #fff
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
    .button-group{
      padding-bottom: 5px;
    }
  }
</style>
<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { CustomerManage } from "@src/apis"
import SearchForm from "@src/components/SearchForm"
import DataPage from "@src/components/DataPage"

export default {
    name: 'pc',
    components: {
      'search-form': SearchForm, // 搜索组件
      'data-page': DataPage // 数据列表组件
    },
    data () {
      return {
        searchTop: {
          dateBegin: '',
          dateEnd: ''
        },
        // 顶部表单搜索信息
        searchForm: {
          searchType:[
            {type: 'text', label:'商户编号',},
            {type: 'text', label:'企业税号'},
            {type: 'text', label:'企业名称'},
            {type: 'dateGroup', label:'选择时间',options:[
              {label:'开始时间'},
              {lable:'结束时间'}
            ]},
            {type: 'text', label:'合伙人编号'},
            {type: 'select', label:'入网来源',options:[
                {label:'插件'},
                {label:'后台'},
                {label:'公众号'},
                {label:'静默'},
                {label:'后台'},
                {label:'第三方'}
            ]}
          ]
        },
        // 数据列表数据
        tableData:{
          tableData: [],// table列表数据
          dataCount: 0, //数据条数
          dataHeader: [ // table列信息 key=表头，word=表内容信息
            {key:'客户编号',word:'agentNo'},
            {key:'企业名称',word:'bussinessName'},
            {key:'企业税号',word:'taxNo'},
            {key:'联系人',word:'legalPerson'},
            {key:'合伙人编号',word:'agentNo'},
            {key:'来源',word:'taxNo'},
            {key:'入网时间',word:'createTime',width:'200'}
          ],
          states:[ // 状态列信息 key=表头，word=表内容信息
            {key:'状态',word:'status'},
          ],
          operation:[ // 操作按钮
            {text:'详情'},
            {text:'编辑'},
            {text:'转移'} 
          ]
        }
       
      }
    },
    mounted () {
    },
    methods: {

      CustomerManage: function(page,limit){
        var self = this;
        CustomerManage()({
            page: page,
            limit: limit
          }).then(function(data){
            if(data.code==="00"){
              // 数据获取成功
              self.tableData.tableData = data.data;
              self.tableData.dataCount = data.count;
              console.log(self.tableData);
            }
          })
      }
    }
}

</script>

