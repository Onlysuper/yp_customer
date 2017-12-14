<template>
  <div class="admin-page">
    <el-breadcrumb class="page-tag" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="admin-main-box">
      <!-- search form start -->
      <search-form @changeform="callbackformHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions" ></search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group" >
          <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload">批量入网</el-button>
          <el-button size="small" type="primary" icon="el-icon-sort">批量转移</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-button-group>
      </div>
      <data-page :table-data ="tableData" v-on:childmanage="CustomerManageHandle"></data-page>
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
import { 
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
  } from 'element-china-area-data'
import { CustomerManage } from "@src/apis"
import SearchForm from "@src/components/SearchForm"
import DataPage from "@src/components/DataPage"

export default {
    name: 'customermanage',
    components: {
      'search-form': SearchForm, // 搜索组件
      'data-page': DataPage // 数据列表组件
    },
    data () {
      return {
        // 查询条件数据
        searchCondition: {
          customerNo: '', // 商户编号
          taxNo: '', // 企业税号
          enterpriseName: '',// 企业名称
          createTimeStart: '', // 开始时间
          createTimeEnd: '', // 结束时间
          agentNo: '', // 合伙人编号
          customerFrom: ''// 入网来源
        },
        // 顶部搜索表单信息
        searchOptions: [
          // 请注意 该数组里对象的idcall属性值与searchCondition里面的属性是一一对应的 不可少
          {
            idcall: 'customerNo',
            type: 'text',  // 表单类型
            label:'商户编号', // 输入框前面的文字
            show: true, // 普通搜索显示
            value:'', // 表单默认的内容
            cb: value => { // 表单输入之后回调函数
              this.searchCondition.customerNo = value;
            }
          },
          {
            idcall: 'taxNo',
            type: 'text',
            label:'企业税号',
            show: false, // 普通搜索显示
            value:'',
            cb: value => {
              this.searchCondition.taxNo = value;
            }
          },
          {
            idcall: 'enterpriseName',
            type: 'text',
            label:'企业名称',
            show: false, // 普通搜索显示
            value:'',
            cb: value => {
              this.searchCondition.enterpriseName = value;
            }
           },
          {
            type: 'dateGroup',
            label:'选择时间',
            show: false, // 普通搜索显示
            options:[
              {
                idcall: 'createTimeStart',
                label:'开始时间',
                value:'',
                cb: value => {
                  this.searchCondition.createTimeStart = value;
                }
              },
              {
                idcall: 'createTimeEnd',
                lable:'结束时间',
                value:'',
                cb: value => {
                  this.searchCondition.createTimeEnd = value;
                }
              }
            ]
          },
          {
            idcall: 'agentNo',
            type: 'text', 
            label:'合伙人编号',
            show: false, // 普通搜索显示
            value:'',
            cb: value => {
              this.searchCondition.agentNo = value;
            }
          },
          {
            idcall: 'customerFrom',
            type: 'select', 
            label:'入网来源',
            show: false, // 普通搜索显示
            value: '',
            options:[
                {
                  value:'插件',
                  label:'插件'
                },
                {
                  value:'扫码',
                  label:'扫码'
                },
                {
                  value:'公众号',
                  label:'公众号'
                },
                {
                  value:'静默',
                  label:'静默'
                },
                {
                  value:'后台',
                  label:'后台'
                },
                {
                  value:'第三方',
                  label:'第三方'
                }
            ],
            cb: value => {
              this.searchCondition.customerFrom = value;
            }
          }
        ],
        // 列表数据
        tableData:{
          tableData: [],// table列表数据
          dataCount: 0, //数据条数
          dataHeader: [ // table列信息 key=>表头标题，word=>表内容信息
            {
              key:'客户编号',
              word:'agentNo'
            },
            {
              key:'企业名称',
              word:'bussinessName'
            },
            {
              key:'企业税号',
              word:'taxNo'
            },
            {
              key:'联系人',
              word:'legalPerson'
            },
            {
              key:'合伙人编号',
              word:'agentNo'
            },
            {
              key:'来源',
              word:'taxNo'
            },
            {key:'入网时间',word:'createTime',width:'200'}
          ],
          states:[ // 状态列信息 key=>表头标题，word=>表内容信息
            {
              key:'状态',
              word:'status'
            },
          ],
          operation:[ // 操作按钮
            {text:'详情'},
            {text:'编辑'},
            {text:'转移'} 
          ]
        }
       
      }
    },
    
    methods: {
      // 普通搜索 具备隐藏
      visiblesomeHandle: function (){
        this.searchOptions.forEach(element => {
          // searchOptions数组里面的idcall 是索引
          if(!element.show){
            if(element.type=='dateGroup'){
              // 开始时间 到结束时间组合 特殊处理
              element.options.forEach(element =>{
                var idcall = element.idcall;
                element.value = ""
                this.searchCondition[idcall] = ""
              })
            }else{
              var idcall = element.idcall;
              element.value = ""
              this.searchCondition[idcall] = ""
            }
          }
        });
      },
      callbackformHandle: function(cb,data){
          // 表单双向绑定 得到输入的内容并返回到本页面
          cb(data)
      },
      seachstartHandle: function(){
        // 开始搜索
        this.CustomerManageHandle(1,10)
      },
      //列表数据获取
      CustomerManageHandle: function(page,limit){
        var self = this;
        var searchcon = this.searchCondition;
        CustomerManage()({
            page: page,
            limit: limit,
            customerNo: searchcon.customerNo, // 商户编号
            taxNo: searchcon.taxNo, // 企业税号
            enterpriseName: searchcon.enterpriseName,// 企业名称
            createTimeStart: searchcon.createTimeStart, // 开始时间
            createTimeEnd: searchcon.createTimeEnd, // 结束时间
            agentNo: searchcon.agentNo, // 合伙人编号
            customerFrom: searchcon.customerFrom// 入网来源
          }).then(function(data){
            if(data.code==="00"){
              // 数据获取成功
              self.tableData.tableData = data.data;
              self.tableData.dataCount = data.count;
            }
          })
      }
    },
    mounted () {
    }
}

</script>

