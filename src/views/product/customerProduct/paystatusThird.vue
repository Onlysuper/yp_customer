<template>
  <div>
    <el-form size="small" label-position="left" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="100px">
      <el-row>
        <!-- {{rowData}}  -->
        {{idcardData}}
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item class="full-width" label="申请人身份证正面" prop="idcard" :label-width="formLabelWidth">
              <el-upload :data="idcardData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="idcardSuccess" :before-upload="idcardbeforeUpload">
                <img v-if="idcardUrl" :src="idcardUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item class="full-width" label="申请人身份证反面" prop="idcardBack" :label-width="formLabelWidth">
              <el-upload :data="idcardBackData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="idcardBackSuccess" :before-upload="idcardBackbeforeUpload">
                <img v-if="idcardBackUrl" :src="idcardBackUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-form-item class="full-width" label="营业执照" prop="business" :label-width="formLabelWidth">
        <el-upload :data="businessData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="businessSuccess" :before-upload="businessbeforeUpload">
          <img v-if="businessUrl" :src="businessUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width" label="结算卡正面" prop="settle" :label-width="formLabelWidth">
        <el-upload :data="settleData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="settleSuccess" :before-upload="settlebeforeUpload">
          <img v-if="settleUrl" :src="settleUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width" label="开户许可证" prop="account" :label-width="formLabelWidth">
        <el-upload :data="accountData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="accountSuccess" :before-upload="accountbeforeUpload">
          <img v-if="accountUrl" :src="accountUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width" label="门头照片" prop="place" :label-width="formLabelWidth">
        <el-upload :data="placeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="placeSuccess" :before-upload="placebeforeUpload">
          <img v-if="placeUrl" :src="placeUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width" label="店内照片" prop="store" :label-width="formLabelWidth">
        <el-upload :data="storeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="storeSuccess" :before-upload="storebeforeUpload">
          <img v-if="storeUrl" :src="storeUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width" label="收银台照片" prop="cash" :label-width="formLabelWidth">
        <el-upload :data="cashData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :on-success="cashSuccess" :before-upload="cashbeforeUpload">
          <img v-if="cashUrl" :src="cashUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback('paystatusFirst')">返回</el-button>
      <el-button type="primary" @click="editSave('payStatusForm')">下一步</el-button>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@media screen and (min-width: 500px) {
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
      // rowData_: rowData,
      // 身份证正面
      idcardData: {
        imgType: "LEGAL_PERSON_ID_POSITIVE",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      // 身份证反面
      idcardBackData: {
        imgType: "LEGAL_PERSON_ID_BACK",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      // 营业执照
      businessData: {
        imgType: "BUSINESS_LICENSE",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      // 结算卡
      settleData: {
        imgType: "SETTLE_CARD_IMG",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      //开户许可证
      accountData: {
        imgType: "ACCOUNT_OPENING_LICENSE",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      //门头照片
      placeData: {
        imgType: "PLACE_IMG",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      //店内照片
      storeData: {
        imgType: "STORE_IMG",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      //店内照片
      cashData: {
        imgType: "CASH_SPACE_IMG",
        businessNo: "",
        businessType: "customer",
        imgString: ""
      },
      idcardUrl: "",
      idcardBackUrl: "",
      businessUrl: "",
      settleUrl: "",
      accountUrl: "",
      placeUrl: "",
      storeUrl: "",
      cashUrl: "",
      formLabelWidth: "140px",
      payStatusForm: {},
      payStatusFormRules: {
        idcard: [
          { required: true, message: "请上传身份证正面图片", trigger: "blur" }
        ],
        idcardBack: [
          { required: true, message: "请上传身份证反面图片", trigger: "blur" }
        ],
        business: [
          { required: true, message: "请上传营业执照", trigger: "blur" }
        ],
        settle: [
          { required: true, message: "请上传结算卡正面照片", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请上传开户许可证", trigger: "blur" }
        ],
        place: [{ required: true, message: "请上传门头照片", trigger: "blur" }],
        store: [{ required: true, message: "请上传店内照片", trigger: "blur" }],
        cash: [{ required: true, message: "请上传收银台照片", trigger: "blur" }]
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
    // 身份证正面
    idcardSuccess(res, file) {
      if (res.code == "00") {
        this.idcardUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    idcardbeforeUpload(file) {
      this.imgTransform(file, "idcardData");

      return this.checkUpload(file);
    },
    // 身份证反面
    idcardBackSuccess(res, file) {
      if (res.code == "00") {
        this.idcardBackUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    idcardBackbeforeUpload(file) {
      this.imgTransform(file, "idcardBackData");
      return this.checkUpload(file);
    },
    // 营业执照
    businessSuccess(res, file) {
      if (res.code == "00") {
        this.businessUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    businessbeforeUpload(file) {
      this.imgTransform(file, "businessData");
      return this.checkUpload(file);
    },
    // 结算卡
    settleSuccess(res, file) {
      if (res.code == "00") {
        this.settleUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    settlebeforeUpload(file) {
      this.imgTransform(file, "settleData");
      return this.checkUpload(file);
    },
    // 开户许可证
    accountSuccess(res, file) {
      if (res.code == "00") {
        this.accountUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    accountbeforeUpload(file) {
      this.imgTransform(file, "accountData");
      return this.checkUpload(file);
    },
    //门头照片编号
    placeSuccess(res, file) {
      if (res.code == "00") {
        this.placeUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    placebeforeUpload(file) {
      this.imgTransform(file, "placeData");
      return this.checkUpload(file);
    },
    //店内照片
    storeSuccess(res, file) {
      if (res.code == "00") {
        this.storeUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    storebeforeUpload(file) {
      this.imgTransform(file, "storeData");
      return this.checkUpload(file);
    },
    //收银台照片
    cashSuccess(res, file) {
      if (res.code == "00") {
        this.cashUrl = URL.createObjectURL(file.raw);
      } else {
        this.warningMsg(res);
      }
    },
    cashbeforeUpload(file) {
      this.imgTransform(file, "cashData");
      return this.checkUpload(file);
    },
    // 上传文件格式校验
    checkUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return true;
    },
    //img转化base64
    imgTransform(file, where) {
      let reader = new FileReader();
      let self = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // base64编码
        // console.log(this.result);
        self[where].imgString = this.result;
        console.log(self.idcardData.imgString);
      };
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
    // 遗憾信息提示
    warningMsg(data) {
      this.$message({
        message: data.msg,
        type: "warning",
        center: true
      });
    },
    goback(path) {
      this.$emit("backFn", path);
    }
  },
  computed: {
    // storeBussinessNo() {
    //   return this.$store.state.customerProductPc.customerProductRowdate
    //     .bussinessNo;
    // }
  },
  watch: {}
};
</script>

