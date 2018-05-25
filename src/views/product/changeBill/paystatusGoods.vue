<template>
  <div>
    <el-form size="small" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="100px">
      <el-form-item class="full-width" label="微信费率" prop="wechatRate" :label-width="formLabelWidth">
        <el-select size="small" v-model="payStatusForm.wechatRate" placeholder="请选择">
          <el-option v-for="item in settleModeOption" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
        <!-- <el-input v-model="payStatusForm.wechatRate" auto-complete="off"></el-input> -->
      </el-form-item>
      <el-form-item class="full-width" label="支付宝费率" prop="alipayRate" :label-width="formLabelWidth">
        <el-select size="small" v-model="payStatusForm.alipayRate" placeholder="请选择">
          <el-option v-for="item in settleModeOption" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="full-width" label="开通即刷即到" prop="settleMode" :label-width="formLabelWidth">
        <el-select :disabled="true" size="small" v-model="payStatusForm.settleMode" placeholder="请选择">
          <el-option v-for="item in settleModeOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
        <!-- <el-switch v-model="payStatusForm.settleMode" active-value="T0" inactive-value="T1">
        </el-switch> -->
      </el-form-item>
      <el-form-item v-if="payStatusForm.settleMode=='T1'?false:true" class="full-width" label="D0手续费" prop="t0CashCostFixed" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.t0CashCostFixed" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback('paystatusInfo')">返回</el-button>
      <el-button :loading="saveLoading" type="primary" @click="editSave('payStatusForm')">下一步</el-button>
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
import { todayStr } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { completeConvergeProduct, getOneChangeBill } from "@src/apis";
import settleMode from "@src/data/settleMode.json";
import utils from "@src/common/utils";
export default {
  name: "changeBillPaystatusGoods",
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
      settleModeOption: settleMode,
      payStatusForm: {
        alipayRate: "",
        t0CashCostFixed: 0,
        settleMode: "T1", // 不开通
        wechatRate: "",
        alipayRate: "",
      },
      payStatusFormRules: {
        wechatRate: [
          { required: true, message: "请输入微信费率", trigger: "blur,change" }
        ],
        alipayRate: [
          { required: true, message: "请输入支付宝费率", trigger: "blur,change" }
        ],
        settleMode: [
          { required: true, message: "请选择结算方式", trigger: "blur,change" }
        ],
        t0CashCostFixed: [
          { required: true, message: "请输入TO手续费", trigger: "blur,change" }
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
            customerNo: this.rowData.customerNo,
            settleMode: payStatusForm.settleMode,
            wechatRate: payStatusForm.wechatRate,
            alipayRate: payStatusForm.alipayRate
          };
          if (payStatusForm.settleMode == "T0") {
            obj.t0CashCostFixed = parseFloat(payStatusForm.t0CashCostFixed);
            // 开通
          } else {
            obj.t0CashCostFixed = 0;
          }
          this.saveLoading = true;
          completeConvergeProduct()(obj).then(data => {
            if (data.code === "00") {
              // 下一步
              this.$emit("nextFn", "paystatusUpload");
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
            console.log(data);
          });
        }
      });
    },
    goback(path) {
      this.$emit("backFn", path);
    },
    // 回显
    getCustomerEcho() {
      getOneChangeBill()({
        billNo: this.rowData.billNo,
        customerNo: this.rowData.customerNo
      }).then(res => {
        if (res.code == "00") {
          let product = res.data.product;
          let alipayRateObj = {
            name: "",
            code: ""
          };
          let wechatRateObj = {
            name: "",
            code: ""
          };
          this.settleModeOption.forEach(item => {
            if (item.code == product.alipayRate) {
              alipayRateObj = item
            }
            if (item.code == product.wechatRate) {
              wechatRateObj = item
            }
          });
          this.payStatusForm.alipayRate = alipayRateObj.code;
          this.payStatusForm.wechatRate = wechatRateObj.code;
          // 目前以下面开通即刷即到 暂不开通
          // this.payStatusForm.settleMode = product.settleMode;
          // this.payStatusForm.t0CashCostFixed =
          //   product.t0CashCostFixed && product.t0CashCostFixed + "元";
        }
      });
    }
  },
  created() {
    this.getCustomerEcho();
  },
  computed: {},
  watch: {}
};
</script>

