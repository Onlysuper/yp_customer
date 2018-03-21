<template>
  <div>
    <div v-if="formVisible" class="paystatusUpload-box">
      <el-form size="small" label-position="right" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width is-required" label="法人身份证正面" prop="idcard" :label-width="formLabelWidth">
                <el-upload :data="idcardData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="idcardbeforeUpload">
                  <img v-if="identityFrontImg" :src="identityFrontImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width is-required" label="法人身份证反面" prop="idcardBack" :label-width="formLabelWidth">
                <el-upload :data="idcardBackData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="idcardBackbeforeUpload">
                  <img v-if="identityBackImg!=''&&identityBackImg!=null" :src="identityBackImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="full-width is-required" label="手持身份证照" prop="applicant" :label-width="formLabelWidth">
              <el-upload :data="applicantData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="applicantbeforeUpload">
                <img v-if="identityHolderImg" :src="identityHolderImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="full-width is-required" label="营业执照" prop="business" :label-width="formLabelWidth">
              <el-upload :data="businessData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="businessbeforeUpload">
                <img v-if="bussinessLicenseImg" :src="bussinessLicenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="full-width is-required" label="结算卡正面" prop="settle" :label-width="formLabelWidth">
              <el-upload :data="settleData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="settlebeforeUpload">
                <img v-if="settleCardImg" :src="settleCardImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="full-width is-required" label="开户许可证" prop="account" :label-width="formLabelWidth">
              <el-upload :data="accountData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="accountbeforeUpload">
                <img v-if="accountLicenseImg" :src="accountLicenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="full-width is-required" label="店内照片" prop="store" :label-width="formLabelWidth">
              <el-upload :data="storeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="storebeforeUpload">
                <img v-if="storeImg" :src="storeImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="full-width is-required" label="收银台照片" prop="cash" :label-width="formLabelWidth">
              <el-upload :data="cashData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="cashbeforeUpload">
                <img v-if="cashSpaceImg" :src="cashSpaceImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="full-width is-required" label="门头照片" prop="cash" :label-width="formLabelWidth">
          <el-upload :data="placeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="placebeforeUpload">
            <img v-if="placeImg" :src="placeImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="agree-box">
          <el-checkbox v-model="agreeOpen"> </el-checkbox>
          <span>同意《开通支付协议》
            <span class="show" @click="agreeShowFn">查看详情</span>
          </span>
        </div>
      </el-form>
      <div center slot="footer" class="dialog-footer">
        <el-button @click="goback('paystatusGoods')">返回</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave()">下一步</el-button>
      </div>
    </div>
    <component v-if="agreementVisible" :is="currentChildView" @goback_c="goback_c">
    </component>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@media screen and (min-width: 500px) {
  .agree-box {
    text-align: center;
    padding: 0px 0 20px 0;
    .show {
      cursor: pointer;
      color: rgb(0, 193, 223);
    }
  }
  .paystatusUpload-box {
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
}
</style>
<script>
import utils from "@src/common/utils";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import {
  upload,
  completeBussinessImg,
  getCustomerEchoProduct
} from "@src/apis";
import paystatusAgreement from "./paystatusAgreement.vue";

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
      agreeOpen: true, // 同意协议
      currentChildView: paystatusAgreement,
      agreementVisible: false,
      formVisible: true,
      // rowData_: rowData,
      // 身份证正面
      saveForm: {
        customerNo: this.rowData.bussinessNo,
        identityFrontImg: "",
        identityBackImg: "",
        identityHolderImg: "",
        bussinessLicenseImg: "",
        settleCardImg: "",
        accountLicenseImg: "",
        placeImg: "",
        storeImg: "",
        cashSpaceImg: ""
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
        imgType: "BUSSINESS_LICENSE",
        businessNo: this.rowData.bussinessNo,
        businessType: "customer",
        imgString: ""
      },
      // 结算卡
      settleData: {
        imgType: "SETTLE_CARD_IMG",
        businessNo: this.rowData.bussinessNo,
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
      identityFrontImg: "",
      identityBackImg: "",
      identityHolderImg: "",
      bussinessLicenseImg: "",
      settleCardImg: "",
      accountLicenseImg: "",
      placeImg: "",
      storeImg: "",
      cashSpaceImg: "",
      formLabelWidth: "130px",
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
        this.imgTransBase(file, "idcardData");
      }
      return false;
    },
    // 身份证反面
    idcardBackbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "idcardBackData");
      }
      return false;
    },
    // 身份证反面
    applicantbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "applicantData");
      }
      return false;
    },
    // 营业执照
    businessbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "businessData");
      }
      return false;
    },
    // 结算卡
    settlebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "settleData");
      }
      return false;
    },
    // 开户许可证
    accountbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "accountData");
      }
      return false;
    },
    //门头照片编号
    placebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "placeData");
      }
      return false;
    },
    //店内照片

    storebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "storeData");
      }
      return;
    },
    //收银台照片
    cashbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "cashData");
      }
      return;
    },
    // 上传文件格式校验
    checkUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPEG && !isPNG && !isJPG) {
        this.$message.error("上传图片只能是 jpeg,jpg,png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return (isJPEG || isPNG || isJPG) && isLt2M;
    },
    //img转化base64
    imgTransBase(file, where) {
      let reader = new FileReader();
      let self = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        // base64编码
        self[where].imgString = this.result;
        // base64编码压缩成更小的
        // console.log(
        //   "压缩前：" + this.result.length / 1024 / 1024 + " " + this.result
        // );
        // utils.dealImage(this.result, { width: 200 }, function(data) {
        //   console.log("压缩后：" + data.length / 1024 + " " + data);
        upload()(self[where]).then(data => {
          console.log(data);
          if (data.code == "00") {
            switch (where) {
              // 身份证正面
              case "idcardData":
                self.identityFrontImg = self[where].imgString;
                self.saveForm.identityFrontImg = data.data;
                break;
              // 身份证反面
              case "idcardBackData":
                self.identityBackImg = self[where].imgString;
                self.saveForm.identityBackImg = data.data;
                break;
              // 手持身份证
              case "applicantData":
                self.identityHolderImg = self[where].imgString;
                self.saveForm.identityHolderImg = data.data;
                break;
              // 营业执照
              case "businessData":
                self.bussinessLicenseImg = self[where].imgString;
                self.saveForm.bussinessLicenseImg = data.data;
                break;
              // 结算
              case "settleData":
                self.settleCardImg = self[where].imgString;
                self.saveForm.settleCardImg = data.data;
                break;
              // 开户许可证
              case "accountData":
                self.accountLicenseImg = self[where].imgString;
                self.saveForm.accountLicenseImg = data.data;
                break;
              // 门头照片
              case "placeData":
                self.placeImg = self[where].imgString;
                self.saveForm.placeImg = data.data;
                break;
              // 店内照片
              case "storeData":
                self.storeImg = self[where].imgString;
                self.saveForm.storeImg = data.data;
                break;
              // 收银台照片
              case "cashData":
                self.cashSpaceImg = self[where].imgString;
                self.saveForm.cashSpaceImg = data.data;
                break;
            }
          } else {
            self.$message({
              message: data.msg,
              type: "warning"
            });
          }
        });
        // });
      };
    },
    editSave() {

      // 编辑内容保存
      // return false;
      for (var i in this.saveForm) {
        console.log(this.saveForm[i]);
        // return false;
        if (!this.saveForm[i]) {
          switch (i) {
            // 身份证正面
            case "identityFrontImg":
              this.warningMsg("请上传身份证正面照片");
              return false;
            // 身份证反面
            case "identityBackImg":
              this.warningMsg("请上传身份证反面照片");
              return false;
            // 营业执照
            case "bussinessLicenseImg":
              this.warningMsg("请上传营业执照");
              return false;
            // 结算
            case "settleCardImg":
              this.warningMsg("请上传结算卡照片");
              return false;
            // 开户许可证
            case "accountLicenseImg":
              this.warningMsg("请上传开户许可证照片");
              return false;
            // 门头照片
            case "placeImg":
              this.warningMsg("请上传门头照片");
              return false;
            // 店内照片
            case "storeImg":
              this.warningMsg("请上传店内照片");
              return false;
            // 收银台照片
            case "cashSpaceImg":
              this.warningMsg("请上传收银台照片");
              return false;
          }
        }
      }
      if (!this.agreeOpen) {
        this.warningMsg("必须先勾选《同意开通支付协议》！");
        return false;
      }
      this.saveLoading = true;
      // 点击下一步提交所有图片
      completeBussinessImg()(this.saveForm).then(res => {
        if (res.code == "00") {
          // 下一步
          this.$emit("nextFn", "paystatusSuccess");
        } else {
          this.warningMsg(res.msg);
        }
        this.saveLoading = false;
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
    },
    // 查看协议
    agreeShowFn() {
      this.agreementVisible = true;
      this.formVisible = false;
      this.$emit("titleChange", "协议");
    },
    goback_c() {
      this.agreementVisible = false;
      this.formVisible = true;
      this.$emit("titleChange", "上传资质");
    },
    // 回显
    getCustomerEcho() {
      getCustomerEchoProduct()({
        customerNo: this.rowData.bussinessNo,
        featureType: "CONVERGE_PAY"
      }).then(res => {
        if (res.code == "00") {
          console.log(res.data);
          let imgs = res.data.imgs;
          if (imgs) {
            if (imgs.identityFrontImg != null) {
              this.identityFrontImg = imgs.identityFrontImg.url;
              this.saveForm.identityFrontImg = imgs.identityFrontImg.id;
            }
            if (imgs.identityBackImg != null) {
              this.identityBackImg = imgs.identityBackImg.url;
              this.saveForm.identityBackImg = imgs.identityBackImg.id;
            }
            if (imgs.identityHolderImg != null) {
              this.identityHolderImg = imgs.identityHolderImg.url;
              this.saveForm.identityHolderImg = imgs.identityHolderImg.id;
            }
            if (imgs.bussinessLicenseImg != null) {
              this.bussinessLicenseImg = imgs.bussinessLicenseImg.url;
              this.saveForm.bussinessLicenseImg = imgs.bussinessLicenseImg.id;
            }
            if (imgs.settleCardImg != null) {
              this.settleCardImg = imgs.settleCardImg.url;
              this.saveForm.settleCardImg = imgs.settleCardImg.id;
            }
            if (imgs.accountLicenseImg != null) {
              this.accountLicenseImg = imgs.accountLicenseImg.url;
              this.saveForm.accountLicenseImg = imgs.accountLicenseImg.id;
            }
            if (imgs.placeImg != null) {
              this.placeImg = imgs.placeImg.url;
              this.saveForm.placeImg = imgs.placeImg.id;
            }
            if (imgs.storeImg != null) {
              this.storeImg = imgs.storeImg.url;
              this.saveForm.storeImg = imgs.storeImg.id;
            }
            if (imgs.cashSpaceImg != null) {
              this.cashSpaceImg = imgs.cashSpaceImg.url;
              this.saveForm.cashSpaceImg = imgs.cashSpaceImg.id;
            }
          }
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

