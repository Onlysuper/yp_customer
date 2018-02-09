<template>
  <div>
    <el-form size="small" label-position="left" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="100px">
      <el-row>
        <!-- {{rowData}}  -->
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item class="full-width is-required" label="申请人身份证正面" prop="idcard" :label-width="formLabelWidth">
              <el-upload :data="idcardData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="idcardbeforeUpload">
                <img v-if="idcardUrl" :src="idcardUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item class="full-width is-required" label="申请人身份证反面" prop="idcardBack" :label-width="formLabelWidth">
              <el-upload :data="idcardBackData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="idcardBackbeforeUpload">
                <img v-if="idcardBackUrl" :src="idcardBackUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item class="full-width is-required" label="手持身份证照" prop="applicant" :label-width="formLabelWidth">
        <el-upload :data="applicantData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="applicantbeforeUpload">
          <img v-if="applicantUrl" :src="applicantUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width is-required" label="营业执照" prop="business" :label-width="formLabelWidth">
        <el-upload :data="businessData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="businessbeforeUpload">
          <img v-if="businessUrl" :src="businessUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width is-required" label="结算卡正面" prop="settle" :label-width="formLabelWidth">
        <el-upload :data="settleData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="settlebeforeUpload">
          <img v-if="settleUrl" :src="settleUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width is-required" label="开户许可证" prop="account" :label-width="formLabelWidth">
        <el-upload :data="accountData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="accountbeforeUpload">
          <img v-if="accountUrl" :src="accountUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width is-required" label="门头照片" prop="place" :label-width="formLabelWidth">
        <el-upload :data="placeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="placebeforeUpload">
          <img v-if="placeUrl" :src="placeUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width is-required" label="店内照片" prop="store" :label-width="formLabelWidth">
        <el-upload :data="storeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="storebeforeUpload">
          <img v-if="storeUrl" :src="storeUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="full-width is-required" label="收银台照片" prop="cash" :label-width="formLabelWidth">
        <el-upload :data="cashData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="cashbeforeUpload">
          <img v-if="cashUrl" :src="cashUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback('paystatusSecond')">返回</el-button>
      <el-button type="primary" @click="editSave()">下一步</el-button>
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
import { upload, completeBussinessImg } from "@src/apis";

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
      saveForm: {
        customerNo: this.rowData.bussinessNo
      },
      idcardData: {
        imgType: "LEGAL_PERSON_ID_POSITIVE",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      // 身份证反面
      idcardBackData: {
        imgType: "LEGAL_PERSON_ID_BACK",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      // 营业执照
      businessData: {
        imgType: "BUSINESS_LICENSE",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      // 结算卡
      settleData: {
        imgType: "SETTLE_CARD_IMG",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      //开户许可证
      accountData: {
        imgType: "ACCOUNT_OPENING_LICENSE",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      //门头照片
      placeData: {
        imgType: "PLACE_IMG",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      //店内照片
      storeData: {
        imgType: "STORE_IMG",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      //收银台照片
      cashData: {
        imgType: "CASH_SPACE_IMG",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      //手持身份证
      applicantData: {
        imgType: "APPLICANT_WITH_ID",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      idcardUrl: "",
      idcardBackUrl: "",
      applicantUrl: "",
      businessUrl: "",
      settleUrl: "",
      accountUrl: "",
      placeUrl: "",
      storeUrl: "",
      cashUrl: "",
      formLabelWidth: "140px",
      payStatusForm: {},
      payStatusFormRules: {}, // 编辑单个规则
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
    idcardbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "idcardData");
      }
      return false;
    },
    // 身份证反面
    idcardBackbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "idcardBackData");
      }
      return false;
    },
    // 身份证反面
    applicantbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "applicantData");
      }
      return false;
    },
    // 营业执照
    businessbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "businessData");
      }
      return false;
    },
    // 结算卡
    settlebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "settleData");
      }
      return false;
    },
    // 开户许可证
    accountbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "accountData");
      }
      return false;
    },
    //门头照片编号
    placebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "placeData");
      }
      return false;
    },
    //店内照片

    storebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "storeData");
      }
      return;
    },
    //收银台照片
    cashbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransform(file, "cashData");
      }
      return;
    },
    // 上传文件格式校验
    checkUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
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
        self[where].imgString = this.result;
        upload()(self[where]).then(data => {
          if (data.code == "00") {
            switch (where) {
              // 身份证正面
              case "idcardData":
                self.idcardUrl = self[where].imgString;
                self.saveForm.identityFrontImg = data.data;
                break;
              // 身份证反面
              case "idcardBackData":
                self.idcardBackUrl = self[where].imgString;
                self.saveForm.identityBackImg = data.data;
                break;
              // 手持身份证
              case "applicantData":
                self.applicantUrl = self[where].imgString;
                self.saveForm.identityHolderImg = data.data;
                break;
              // 营业执照
              case "businessData":
                self.businessUrl = self[where].imgString;
                self.saveForm.bussinessLicenseImg = data.data;
                break;
              // 结算
              case "settleData":
                self.settleUrl = self[where].imgString;
                self.saveForm.settleCardImg = data.data;
                break;
              // 开户许可证
              case "accountData":
                self.accountUrl = self[where].imgString;
                self.saveForm.accountLicenseImg = data.data;
                break;
              // 门头照片
              case "placeData":
                self.placeUrl = self[where].imgString;
                self.saveForm.placeImg = data.data;
                break;
              // 店内照片
              case "storeData":
                self.storeUrl = self[where].imgString;
                self.saveForm.storeImg = data.data;
                break;
              // 收银台照片
              case "cashData":
                self.cashUrl = self[where].imgString;
                self.saveForm.cashSpaceImg = data.data;
                break;
            }
          } else {
            this.$message({
              message: data.msg,
              type: "warning"
            });
          }
        });
      };
    },
    editSave() {
      // 编辑内容保存
      for (var i in this.saveForm) {
        if (!this.saveForm[i]) {
          switch (i) {
            // 身份证正面
            case "identityFrontImg":
              this.warningMsg("请上传身份证正面照片");
              break;
            // 身份证反面
            case "identityBackImg":
              this.warningMsg("请上传身份证反面照片");
              break;
            // 营业执照
            case "bussinessLicenseImg":
              this.warningMsg("请上传营业执照");
              break;
            // 结算
            case "settleCardImg":
              this.warningMsg("请上传结算卡照片");
              break;
            // 开户许可证
            case "accountLicenseImg":
              this.warningMsg("请上传开户许可证照片");
              break;
            // 门头照片
            case "placeData":
              this.warningMsg("请上传门头照片");
              break;
            // 店内照片
            case "storeData":
              this.warningMsg("请上传店内照片");
              break;
            // 收银台照片
            case "cashData":
              this.warningMsg("请上传收银台照片");
              break;
          }
          return false;
        }
      }
      // 点击下一步提交所有图片
      completeBussinessImg()(this.saveForm).then(res => {
        if (res.code == "00") {
          // 下一步
          this.$emit("nextFn", "paystatusSuccess");
        } else {
          this.warningMsg(res.msg);
        }
      });
    },
    // 遗憾信息提示
    warningMsg(msg) {
      this.$message({
        message: msg,
        type: "warning",
        center: true
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

