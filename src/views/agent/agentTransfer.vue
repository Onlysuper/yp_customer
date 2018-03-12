<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <div class="form-box">
        <el-form class="fieldset-box" :label-position="labelPosition" ref="transferForm" :model="transferForm" :rules="transferFormRules" label-width="150px">
          <fieldset>
            <legend>合伙人转移</legend>
            <el-form-item prop="transferAgentNo" label="转移合伙人编号">
              <el-input v-model="transferForm.transferAgentNo"></el-input>
            </el-form-item>
            <el-form-item prop="targetAgentNo" label="接受合伙人编号">
              <el-input v-model="transferForm.targetAgentNo"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="transferSave('transferForm')">确定转移</el-button>
              <el-button @click="resetForm('transferForm')">重置</el-button>
            </el-form-item>
          </fieldset>
        </el-form>
      </div>
      <!-- <div class=" division-line "></div> -->
      <div class="form-box ">
        <el-form class="fieldset-box" :label-position="labelPosition" ref="branchOfficeForm" :model="branchOfficeForm" :rules="branchOfficeFormRules" label-width="150px">
          <fieldset>
            <legend>一代升级为分公司</legend>
            <el-form-item prop="agentNo" label="一代合伙人编号 ">
              <el-input v-model="branchOfficeForm.agentNo"></el-input>
            </el-form-item>
            <el-form-item prop="targetAgentNo" label="接收合伙人编号 ">
              <el-input v-model="branchOfficeForm.targetAgentNo"></el-input>
            </el-form-item>
            <el-form-item center>
              <el-button type="primary" @click="branchOfficeSave('branchOfficeForm')">确定升级</el-button>
              <el-button @click="resetForm('branchOfficeForm')">重置</el-button>
            </el-form-item>
          </fieldset>
        </el-form>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.form-box {
  .fieldset-box {
    fieldset {
      border: 1px solid #eee;
      border-left: 0;
      border-right: 0;
      margin-top: 16px;
      padding: 8px;
      legend {
        font-size: 14px;
        .small {
          font-size: 12px;
          color: #67c23a;
        }
      }
    }
  }
  width: 500px;
  padding-left: 20px;
}
</style>
<script>
import { mixinsPc } from "@src/common/mixinsPc";
import { getPartnerTransfer, getTransferBranchoffice } from "@src/apis";
export default {
  name: "agent_transfer",
  components: {},
  mixins: [mixinsPc],
  data() {
    return {
      labelPosition: "left",
      transferForm: {},
      transferFormRules: {
        transferAgentNo: [
          { required: true, message: "请输入转移合伙人编号", trigger: "blur,change" }
        ],
        targetAgentNo: [
          { required: true, message: "请输入接受合伙人编号", trigger: "blur,change" }
        ]
      },
      branchOfficeForm: {},
      branchOfficeFormRules: {
        targetAgentNo: [
          { required: true, message: "请输入接收合伙人编号", trigger: "blur,change" }
        ],
        agentNo: [
          { required: true, message: "请输入一代合伙人编号", trigger: "blur,change" }
        ]
      }
    };
  },

  methods: {
    // 转移合伙人
    transferSave(formName) {
      // 新增内容保存
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          getPartnerTransfer()({
            transferAgentNo: thisForm.transferAgentNo,
            targetAgentNo: thisForm.targetAgentNo
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，已成功转移合伙人",
                type: "success",
                center: true
              });
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },
    // 升级分公司
    branchOfficeSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          getTransferBranchoffice()({
            agentNo: thisForm.agentNo,
            targetAgentNo: thisForm.targetAgentNo
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，操作成功！",
                type: "success",
                center: true
              });
            } else {
              console.log(data);
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    }
  }
};
</script>

