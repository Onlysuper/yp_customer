<template>
  <div>
    <el-form size="small" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="100px">
      <el-form-item class="full-width" label="申请人身份证正面" prop="idcard" :label-width="formLabelWidth">
        <el-upload :data="idcardData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="idcardSuccess" :before-upload="idcardbeforeUpload">
          <img v-if="idcardUrl" :src="idcardUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width" label="申请人身份证反面" prop="alipayRate" :label-width="formLabelWidth">

      </el-form-item>
      <el-form-item class="full-width" label="营业执照" prop="settleMode" :label-width="formLabelWidth">

      </el-form-item>
      <el-form-item class="full-width" label="结算卡正面" prop="t0CashCostFixed" :label-width="formLabelWidth">

      </el-form-item>
      <el-form-item class="full-width" label="开户许可证" prop="t0CashCostFixed" :label-width="formLabelWidth">

      </el-form-item>
      <el-form-item class="full-width" label="门头照片" prop="t0CashCostFixed" :label-width="formLabelWidth">

      </el-form-item>
      <el-form-item class="full-width" label="店内照片" prop="t0CashCostFixed" :label-width="formLabelWidth">

      </el-form-item>
      <el-form-item class="full-width" label="收银台照片" prop="t0CashCostFixed" :label-width="formLabelWidth">

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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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
  data() {
    return {
      // 身份证正面
      idcardData: {
        imgType: "LEGAL_PERSON_ID_POSITIVE",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      idcardUrl: "",
      fileList: [],
      formLabelWidth: "150px",
      payStatusForm: {},
      payStatusFormRules: {
        idcard: [
          { required: true, message: "请上传身份证正面图片", trigger: "blur" }
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
    idcardSuccess(res, file) {
      this.idcardUrl = URL.createObjectURL(file.raw);
    },
    idcardbeforeUpload(file) {
      console.log(file);
      var reader = new FileReader();
      let self = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // base64编码
        console.log(self.idcardData);
        self.idcardData.imgString = this.result;
      };
      return this.checkUpload(file);
    },
    checkUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let payStatusForm = this.payStatusForm;

          let obj = {
            customerNo: this.customerProductRowdate.bussinessNo,
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
  computed: {
    customerProductRowdate() {
      return this.$store.state.customerProductPc.customerProductRowdate;
    }
  },
  watch: {}
};
</script>

