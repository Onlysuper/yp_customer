<template>
  <!-- 开票统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @resetSome="resetSomeInputHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button size="small" @click="empoverCodeDialog" type="primary" icon="elresetSearchHandle-icon-upload">生成授权码</el-button>
          <el-button size="small" @click="addMaterielDialog" type="primary" icon="el-icon-upload">物料入库</el-button>
          <!-- <el-button size="small" @click="exportDialog" type="primary" icon="el-icon-upload">导出</el-button> -->
          <!-- <el-button size="small" @click="exportDialog" type="primary" icon="el-icon-upload">批量绑定</el-button> -->
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
     <!-- 生成授权码start -->
    <el-dialog center title="生成授权码" :visible.sync="empoverCodeFormVisible">
      <el-form size="small" :model="empoverCodeForm" ref="empoverCodeForm" :rules="empoverCodeRules">
        <el-form-item label="合伙人编号" prop="agentNo" :label-width="formLabelWidth">
          <el-input v-model="empoverCodeForm.agentNo" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="数量" prop="qrcodeCount" :label-width="formLabelWidth">
          <el-input v-model="empoverCodeForm.qrcodeCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务方式" prop="serviceMode" :label-width="formLabelWidth">
           <el-radio v-model="empoverCodeForm.serviceMode" label="HX">航信</el-radio>
           <el-radio v-model="empoverCodeForm.serviceMode" label="YP">易票</el-radio>
           <el-radio v-model="empoverCodeForm.serviceMode" label="HX_YP">航信_易票</el-radio>
        </el-form-item>
        <el-form-item label="支持类型" prop="supportTypes" :label-width="formLabelWidth">
          <el-checkbox-group 
          v-model="empoverCodeForm.supportTypes">
          <el-checkbox v-for="city in empoverCodeForm.supportTypesArr" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('empoverCodeForm')">重置</el-button>
        <el-button type="primary" @click="empoverCodeSave('empoverCodeForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 生成授权码end -->
     <!-- 物料入库start -->
    <el-dialog center title="物料入库" :visible.sync="addMaterielFormVisible">
      <el-form size="small" :model="addMaterielForm" ref="addMaterielForm" :rules="addMaterielRules">
        <el-form-item label="入库数量" prop="receiptCount" :label-width="formLabelWidth">
          <el-input v-model="addMaterielForm.receiptCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序列号前缀" prop="prefixNo" :label-width="formLabelWidth">
          <el-input v-model="addMaterielForm.prefixNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库方式" prop="migrateType" :label-width="formLabelWidth">
          <el-select v-model="addMaterielForm.migrateType" placeholder="请选择" @change="migrateChagen">
            <el-option v-for="item in selectOptions.addMaterielOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="visibleQrcodes" label="二维码编号" prop="qrcodes" :label-width="formLabelWidth">
          <el-input v-model="addMaterielForm.qrcodes" auto-complete="off" placeholder="多个二维码请用英文逗号分隔"></el-input>
        </el-form-item>
        <el-form-item v-if="visibleQrNums" label="号段" prop="" :label-width="formLabelWidth">
          <el-input-number v-model="addMaterielForm.qrcodeStart" controls-position="right" @change=""></el-input-number>
          <el-input-number v-model="addMaterielForm.qrcodeEnd" controls-position="right" @change=""></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addMaterielForm')">重置</el-button>
        <el-button type="primary" @click="addMaterielSave('addMaterielForm')">扫码枪入库</el-button>
        <el-button type="primary" @click="addSeanMaterielSave('addMaterielForm')">物资入库</el-button>
      </div>
    </el-dialog>
    <!-- 生成授权码end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.operation-box {
  .sumtext {
    font-size: 14px;
    padding-left: 10px;
    line-height: 32px;
    color: #606266;
  }
}
</style>
<script>
import qs from "qs";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import { getArantNumManages, postMakeEmpower,postMakeMateriel } from "@src/apis";

export default {
  name: "billCount",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      createTimeStart: yesterday, // 开始日期
      createTimeEnd: todayDate, // 结束日期
      batchNo: "", // 批次编号
      agentNo: "", // 合伙人编号
      containChild: "", // 下级
      customerNo: "", // 商户编号
      qrcode: "", // 序号
      authCode: "", // 授权码
      status: "", // 状态
      deviceType: "", // 设备类型
      materiel: "" // 是否有物料
    };
    return {
      deviceType:"AUTHCODE",
      formLabelWidth:"100px",
      empoverCodeFormVisible:false,// 生成授权吗弹出框
      addMaterielFormVisible:false, // 物料入库
      visibleQrcodes:false, // 入库方式
      visibleQrNums:true,
      empoverCodeForm:{
        serviceMode:"HX",
        supportTypes:["普票","专票"],
        supportTypesArr:["普票","专票","特殊"]
      },
      empoverCodeRules:{
         agentNo: [{ required: true, message: "请输入合伙人编号", trigger: "blur" }],
         qrcodeCount: [{ required: true, message: "批次数量不能为空", trigger: "blur" }],
      },
      addMaterielForm:{

      },
      addMaterielRules:{
         qrcodeStart: [{ required: true, message: "号段起始号码不能为空", trigger: "blur" }],
          qrcodeStart: [{ required: true, message: "号段起始号码不能为空", trigger: "blur" }],
          migrateType: [{ required: true, message: "请选择入库方式", trigger: "blur" }],
          receiptCount: [{ required: true, message: "请输入入库数量", trigger: "blur" }],
      },
      // formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      selectOptions:{
        addMaterielOptions:[
           {
            value: "ORDER",
            label: "号段入库"
          },
          {
            value: "OUT_ORDER",
            label: "序号入库"
          }
        ]
      },
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "batchNo",
          type: "text", // 表单类型
          label: "批次编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.batchNo = value;
          }
        },
        {
          type: "dateGroup2",
          label: "选择日期",
          limit: false, //日期联动
          limitnum: 7,
          show: true, // 普通搜索显示
          value: [yesterday, todayDate],
          option1: "createTimeStart",
          option2: "createTimeEnd",
          cb: (startTime, endTime) => {
            this.searchCondition.createTimeStart = startTime;
            this.searchCondition.createTimeEnd = endTime;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "customerNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerNo = value;
          }
        },
        {
          corresattr: "qrcode",
          type: "text", // 表单类型
          label: "序号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.qrcode = value;
          }
        },
        {
          corresattr: "authCode",
          type: "text", // 表单类型
          label: "授权码", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.authCode = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "BINDED",
              label: "已绑定"
            },
            {
              value: "TRUE",
              label: "未绑定"
            },
            {
              value: "FALSE",
              label: "无效"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "deviceType",
          type: "select",
          label: "设备类型",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "AUTHCODE",
              label: "授权码"
            },
            {
              value: "SCANCODEGUN",
              label: "扫码枪"
            }
          ],
          cb: value => {
            this.searchCondition.deviceType = value;
          }
        },
        {
          corresattr: "materiel",
          type: "select",
          label: "是否有物料",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "TRUE",
              label: "有物料"
            },
            {
              value: "FALSE",
              label: "无物料"
            }
          ],
          cb: value => {
            this.searchCondition.materiel = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getArantNumManages // 初始化数据api
        },
        havecheck: true, //是否显示输入框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "批次号",
            width: "120px",
            // sortable: true,
            word: "batchNo"
          },
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
          },
          {
            key: "商户编号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "序列号",
            width: "100px",
            word: "qrcode"
          },
          {
            key: "授权码",
            width: "100px",
            word: "authCode"
          },
          {
            key: "创建时间",
            width: "100px",
            word: "createTime"
          },
          {
            key: "设备类型",
            width: "100px",
            word: "deviceType",
            status: true,
            type: data => {
              if (data == "AUTHCODE") {
                return {
                  text: "授权码",
                  type: ""
                };
              } else if (data == "SCANCODEGUN") {
                return {
                  text: "扫码枪",
                  type: ""
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          },
          {
            key: "状态",
            width: "100px",
            word: "status",
            status: true,
            type: data => {
              if (data == "BINDED") {
                return {
                  text: "已绑定",
                  type: "success"
                };
              } else if (data == "TRUE") {
                return {
                  text: "未绑定",
                  type: "warning"
                };
              } else if (data == "FALSE") {
                return {
                  text: "无效",
                  type: "info"
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          },
          {
            key: "是否有物料",
            width: "100px",
            word: "materiel",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "有物料",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "无物料",
                  type: "warning"
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          },

          {
            key: "上级授权码",
            width: "130px",
            word: "parentCode"
          }
        ],
        operation: {
          width: "180px",
          options: [
            // 操作按钮
            {
              text: "预览",
             visibleFn: rowdata => {
                if(rowdata.deviceType=="AUTHCODE"){
                  return true
                }else{
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.detailsForm = rowdata;
                this.detailsFormVisible = true;
              }
            },
            {
              text: "编辑",
             visibleFn: rowdata => {
                if(rowdata.deviceType=="AUTHCODE"){
                  return true
                }else{
                  return false;
                }
              },
              color: "#e6a23c",
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              stateName: "status",
              opposite: true,
              text: "绑定",
              color: "#67c23a",
              visibleFn: rowdata => {
                if(rowdata.deviceType=="AUTHCODE"&&rowdata.status == 'TRUE'&&(rowdata.agentNo==this.userBussinessNo||this.userType=='admin')){
                  return true
                }else{
                  return false;
                }
              },
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              stateName: "status",
              opposite: false,
              visibleFn:rowdata=>{
                return true
              },
              text: "解绑",
              color: "#F56C6C",
              visibleFn: rowdata => {
                if(rowdata.deviceType=="AUTHCODE"&&rowdata.status == 'BINDED'&&(rowdata.agentNo==this.userBussinessNo||this.userType=='admin')){
                  return true
                }else{
                  return false;
                }
              },
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              text: "绑定子绑",
              color: "#909399",
              visibleFn: rowdata => {
                if(rowdata.deviceType=="AUTHCODE"&&rowdata.status == 'BINDED'&&rowdata.parentCode==null||rowdata.parentCode==''&&(rowdata.agentNo==this.userBussinessNo||this.userType=='admin')){
                  return true
                }else{
                  return false;
                }
              },
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            }
          ]
        }
      }
    };
  },

  methods: {
    // 授权码保存
    empoverCodeSave(formName){
      this.$refs[formName].validate(valid => {
          let addForm = this.addForm;
          if (valid) {

          
            let empoverCodeForm = this.empoverCodeForm;
            let supportTypes1=""
            let supportTypes2=""
            let supportTypes3=""
            empoverCodeForm.supportTypes.forEach((element,index) => {
              if(element=="普票"){
                supportTypes1=1
              }else if(element=="专票"){
                supportTypes2=2
              }else if(element=="特殊"){
                supportTypes3=4
              }
            });
            postMakeEmpower()({
              deviceType:this.deviceType,
              agentNo:empoverCodeForm.agentNo,
              qrcodeCount:empoverCodeForm.qrcodeCount,
              serviceMode:empoverCodeForm.serviceMode,
              "supportTypes[0]":supportTypes1,
              "supportTypes[1]":supportTypes2,
              "supportTypes[2]":supportTypes3
            }).then(data=>{
              if (data.code === "00") {
                this.$message({
                  message: "恭喜你，已成功生成授权码！",
                  type: "success",
                  center: true
                });
                this.empoverCodeFormVisible = false;
                this.resetForm("empoverCodeForm");
                this.reloadData();
              }else{
                this.$message({
                  message:  data.msg,
                  type: "warning",
                  center: true
                });
              }
            })
        }
     })
    },
    migrateChagen(event){
      if(event=="ORDER"){ // 号段入库
      this.visibleQrcodes = false;
      this.visibleQrNums=true;
      }else if(event=="OUT_ORDER"){ // 序号入库
      this.visibleQrcodes = true; 
      this.visibleQrNums=false;
      }
    },
    // 扫码枪入库保存
    addMaterielSave(formName){
      this.$refs[formName].validate(valid => {
        let addForm = this.addForm;
        if (valid) {
          postMakeMateriel()().then(data=>{
              if(data.code=='00'){
                this.$message({
                    message: "恭喜你，扫码枪入库成功！",
                    type: "success",
                    center: true
                  });
              }else{
                this.$message({
                    message:  data.msg,
                    type: "warning",
                    center: true
                  });
              }
            })
        }})
    },
    // 物资入库保存
    addSeanMaterielSave(){
        this.$refs[formName].validate(valid => {
        let addForm = this.addForm;
        if (valid) {

        }})
    },
    empoverCodeDialog(){
      // 生成授权码
      this.empoverCodeFormVisible= true
    },
    addMaterielDialog(){
      this.addMaterielFormVisible= true
    },
    empoverCode(){

    },
    exportDialog() {
      // 导出
      var searchForm = qs.stringify(this.searchCondition);
      getExportBillcountdays(searchForm)().then(data => {
        if (data.code == "00") {
          this.$notify.info({
            title: "消息",
            message: "导出任务已发送，请耐心等待通知"
          });
        }
      });
    }
  },
  computed:{
    userBussinessNo(){
      return this.$store.state.moduleLayour.userMessage.userBussinessNo;
    },
    userType(){
      return this.$store.state.moduleLayour.userMessage.userType;
    }
  }
};
</script>

