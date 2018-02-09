<template>
  <div>
    <el-form size="small" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="100px">
      <el-form-item class="full-width" label="微信费率" prop="wechatRate" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.wechatRate" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="支付宝费率" prop="alipayRate" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.alipayRate" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="开通即刷即到" prop="settleMode" :label-width="formLabelWidth">
        <el-select size="small" v-model="payStatusForm.settleMode" placeholder="请选择">
          <el-option v-for="item in settleModeOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="full-width" label="D0手续费" prop="t0CashCostFixed" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.t0CashCostFixed" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback('paystatusFirst')">返回</el-button>
      <el-button type="primary" @click="editSave('payStatusForm')">下一步</el-button>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.dialog-footer {
  text-align: center;
}
</style>
<script>
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { completeConvergeProduct } from "@src/apis";

export default {
  name: "",
  components: {},
  mixins: [mixinsPc],
  props: {
    rowData: {
      type: Object
    }
  },
  data() {
    return {
      formLabelWidth: "110px",
      payStatusForm: {},
      payStatusFormRules: {
        wechatRate: [
          { required: true, message: "请输入微信费率", trigger: "blur" }
        ],
        alipayRate: [
          { required: true, message: "请输入支付宝费率", trigger: "blur" }
        ],
        settleMode: [
          { required: true, message: "请选择结算方式", trigger: "blur" }
        ],
        t0CashCostFixed: [
          { required: true, message: "请输入TO手续费", trigger: "blur" }
        ]
      }, // 编辑单个规则
      settleModeOptions: [
        {
          code: "T0",
          name: "开通"
        },
        {
          code: "T1",
          name: "不开通"
        }
      ]
    };
  },

  methods: {
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let payStatusForm = this.payStatusForm;

          let obj = {
            customerNo: this.rowData.bussinessNo,
            settleMode: payStatusForm.settleMode,
            t0CashCostFixed: payStatusForm.t0CashCostFixed,
            wechatRate: payStatusForm.wechatRate,
            alipayRate: payStatusForm.alipayRate
          };
          completeConvergeProduct()(obj).then(data => {
            if (data.code === "00") {
              // 下一步
              this.$emit("nextFn", "paystatusThird");
              // this.$message({
              //   message: "恭喜你，修改数据成功",
              //   type: "success",
              //   center: true
              // });
              // this.editFormVisible = false;
              // this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
          });
        }
      });
    },
    goback(path) {
      this.$emit("backFn", path);
    }
  },
  computed: {},
  watch: {}
};
</script>

