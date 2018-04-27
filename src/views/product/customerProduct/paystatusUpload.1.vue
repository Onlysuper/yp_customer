<template>
  <div>
    <div v-if="formVisible" class="paystatusUpload-box">
      <el-form size="small" label-position="right" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="80px">
        <el-row>
          <el-col v-if="identityFrontVisible" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width is-required" label="法人身份证人像面" prop="idcard" :label-width="formLabelWidth">
                <el-upload :data="idcardData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="idcardbeforeUpload">
                  <img v-if="identityFrontImg" :src="identityFrontImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="identityBackVisible" :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width is-required" label="法人身份证国徽面" prop="idcardBack" :label-width="formLabelWidth">
                <el-upload :data="idcardBackData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="idcardBackbeforeUpload">
                  <img v-if="identityBackImg!=''&&identityBackImg!=null" :src="identityBackImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="identityHolderVisible" :span="12">
            <el-form-item class="full-width is-required" label="法人手持身份证照" prop="applicant" :label-width="formLabelWidth">
              <el-upload :data="applicantData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="applicantbeforeUpload">
                <img v-if="identityHolderImg" :src="identityHolderImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="bussinessLicenseVisible" :span="12">
            <el-form-item class="full-width is-required" label="营业执照" prop="business" :label-width="formLabelWidth">
              <el-upload :data="businessData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="businessbeforeUpload">
                <img v-if="bussinessLicenseImg" :src="bussinessLicenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="settleCardVisible" :span="12">
            <el-form-item class="full-width is-required" label="结算卡正面" prop="settle" :label-width="formLabelWidth">
              <el-upload :data="settleData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="settlebeforeUpload">
                <img v-if="settleCardImg" :src="settleCardImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="placeVisible" :span="12">
            <el-form-item class="full-width is-required" label="门头照片" prop="cash" :label-width="formLabelWidth">
              <el-upload :data="placeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="placebeforeUpload">
                <img v-if="placeImg" :src="placeImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="storeVisible" :span="12">
            <el-form-item class="full-width is-required" label="店内照片" prop="store" :label-width="formLabelWidth">
              <el-upload :data="storeData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="storebeforeUpload">
                <img v-if="storeImg" :src="storeImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="cashSpaceVisible" :span="12">
            <el-form-item class="full-width is-required" label="收银台照片" prop="cash" :label-width="formLabelWidth">
              <el-upload :data="cashData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="cashbeforeUpload">
                <img v-if="cashSpaceImg" :src="cashSpaceImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="accountVisible" :span="12">
            <el-form-item class="full-width is-required" label="开户许可证" prop="account" :label-width="formLabelWidth">
              <el-upload :data="accountData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="accountbeforeUpload">
                <img v-if="accountLicenseImg" :src="accountLicenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="certificateVisible" :span="12">
            <el-form-item class="full-width is-required" label="授权书" prop="certificate" :label-width="formLabelWidth">
              <el-upload :data="certificateData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="certificatebeforeUpload">
                <img v-if="certificateImg" :src="certificateImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="cardHolderFrontVisible" :span="12">
            <el-form-item class="full-width is-required" label="持卡人身份证人像面" prop="cardHolderFront" :label-width="formLabelWidth">
              <el-upload :data="cardHolderFrontData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="cardHolderFrontbeforeUpload">
                <img v-if="cardHolderFrontImg" :src="cardHolderFrontImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="cardHolderBackVisible" :span="12">
            <el-form-item class="full-width is-required" label="持卡人身份证国徽面" prop="cardHolderBack" :label-width="formLabelWidth">
              <el-upload :data="cardHolderBackData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="cardHolderBackbeforeUpload">
                <img v-if="cardHolderBackImg" :src="cardHolderBackImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="holdCertificateVisible" :span="12">
            <el-form-item class="full-width is-required" label="法人手持身份证与授权书" prop="holdCertificate" :label-width="formLabelWidth">
              <el-upload :data="holdCertificateData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="holdCertificatebeforeUpload">
                <img v-if="holdCertificateImg" :src="holdCertificateImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="cardHolderIdVisible" :span="12">
            <el-form-item class="full-width is-required" label="持卡人手持身份证" prop="cardHolderId" :label-width="formLabelWidth">
              <el-upload :data="cardHolderIdData" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="oaIp+'/bussinessImg/upload'" class="avatar-uploader" :show-file-list="false" :before-upload="cardHolderIdbeforeUpload">
                <img v-if="cardHolderIdImg" :src="cardHolderIdImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

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
    var allImgData = {
      businessNo: this.rowData.bussinessNo,
      businessType: "customer",
      imgString: ""
    }
    return {
      personType: "",
      // accountVisible: true,// 开户行许可证 
      // certificateVisible: true,// 授权书
      // identityHolderVisible: true,// 手持结算卡正面
      // settleCardVisible: true, // 结算卡正面
      // holdCertificateVisible: false,
      // cardHolderFrontVisible: false,
      // cardHolderBackVisible: false,
      // cardHolderIdVisible: false,
      agreeOpen: true, // 同意协议
      currentChildView: paystatusAgreement,
      agreementVisible: false,
      formVisible: true,
      accountType: "",
      // 图片显示隐藏start
      identityFrontVisible: false,// 法人身份证正面
      identityBackVisible: false,// 法人身份证国徽面
      identityHolderVisible: false,// 法人手持身份证照
      bussinessLicenseVisible: false,//营业执照
      settleCardVisible: false,// 结算卡正面
      placeVisible: false, //门头照片
      storeVisible: false,// 店内照片
      cashSpaceVisible: false,// 收银台照片
      accountVisible: false,// 开户许可证
      certificateVisible: false,// 授权书
      cardHolderFrontVisible: false,// 持卡人身份证人像面
      cardHolderBackVisible: false,// 持卡人身份证国徽面
      holdCertificateVisible: false,//法人手持身份证与授权书
      cardHolderIdVisible: false,//持卡人手持身份证
      // 图片显示隐藏end
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
        cashSpaceImg: "",
        certificateImg: "",
        holdCertificateImg: "",
        cardHolderFrontImg: "",
        cardHolderBackImg: "",
        cardHolderIdImg: ""
      },
      idcardData: {
        imgType: "LEGAL_PERSON_ID_POSITIVE",
        ...allImgData
      },
      // 身份证反面
      idcardBackData: {
        imgType: "LEGAL_PERSON_ID_BACK",
        ...allImgData
      },
      // 营业执照
      businessData: {
        imgType: "BUSSINESS_LICENSE",
        ...allImgData
      },
      // 结算卡
      settleData: {
        imgType: "SETTLE_CARD_IMG",
        ...allImgData
      },
      //开户许可证
      accountData: {
        imgType: "ACCOUNT_OPENING_LICENSE",
        ...allImgData
      },
      //门头照片
      placeData: {
        imgType: "PLACE_IMG",
        ...allImgData
      },
      //店内照片
      storeData: {
        imgType: "STORE_IMG",
        ...allImgData
      },
      //收银台照片
      cashData: {
        imgType: "CASH_SPACE_IMG",
        ...allImgData
      },
      //手持身份证
      applicantData: {
        imgType: "APPLICANT_WITH_ID",
        ...allImgData
      },
      certificateData: {
        imgType: "CERTIFICATE_IMG",
        ...allImgData
      },
      cardHolderIdData: {
        imgType: "CARDHOLDER_WITH_ID",
        ...allImgData
      },
      holdCertificateData: {
        imgType: "HOLD_CERTIFICATE_IMG",
        ...allImgData
      },
      cardHolderBackData: {
        imgType: "CARDHOLDER_ID_BACK",
        ...allImgData
      },
      cardHolderFrontData: {
        imgType: "CARDHOLDER_ID_POSITIVE",
        ...allImgData
      },
      // 图片start
      identityFrontImg: "",
      identityBackImg: "",
      identityHolderImg: "",
      bussinessLicenseImg: "",
      settleCardImg: "",
      accountLicenseImg: "",
      placeImg: "",
      storeImg: "",
      cashSpaceImg: "",
      certificateImg: "",
      holdCertificateImg: "",
      cardHolderFrontImg: "",
      cardHolderBackImg: "",
      cardHolderIdImg: "",
      // 图片end
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
    // 授权书
    certificatebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "certificateData");
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
    //法人手持身份证与授权书
    holdCertificatebeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "holdCertificateData");
      }
      return;
    },
    // 持卡人人面像
    cardHolderFrontbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "cardHolderFrontData");
      }
      return;
    },
    //持卡人国徽面
    cardHolderBackbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "cardHolderBackData");
      }
      return;
    },
    // 持卡人手持身份证合影
    cardHolderIdbeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file, "cardHolderIdData");
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
              // 授权书
              case "certificateData":
                self.certificateImg = self[where].imgString;
                self.saveForm.certificateImg = data.data;
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
              case "holdCertificateData":// 法人手持身份证与授权书
                self.holdCertificateImg = self[where].imgString;
                self.saveForm.holdCertificateImg = data.data;
                break;
              case "cardHolderFrontData":
                self.cardHolderFrontImg = self[where].imgString;
                self.saveForm.cardHolderFrontImg = data.data;
                break;
              case "cardHolderBackData":
                self.cardHolderBackImg = self[where].imgString;
                self.saveForm.cardHolderBackImg = data.data;
                break;
              case "cardHolderIdData":
                self.cardHolderIdImg = self[where].imgString;
                self.saveForm.cardHolderIdImg = data.data;
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
      // for (var i in this.saveForm) {
      //   if (!this.saveForm[i]) {
      //     if (i == "identityFrontImg") {
      //       this.warningMsg("请上传身份证正面照片");
      //       return false;
      //     }
      //     if (i == "identityBackImg") {
      //       this.warningMsg("请上传身份证反面照片");
      //       return false;
      //     }
      //     if (i == "identityHolderImg") {
      //       this.warningMsg("请上传手持身份证照片");
      //       return false;
      //     }
      //     if (i == "bussinessLicenseImg") {
      //       this.warningMsg("请上传营业执照");
      //       return false;
      //     }
      //     if (i == "settleCardImg") {
      //       this.warningMsg("请上传结算卡照片");
      //       return false;
      //     }
      //     if (i == "accountLicenseImg") {
      //       if (this.accountVisible) {
      //         this.warningMsg("请上传开户许可证照片");
      //         return false;
      //       }
      //     }
      //     if (i == "placeImg") {
      //       this.warningMsg("请上传门头照片");
      //       return false;
      //     }
      //     if (i == "storeImg") {
      //       this.warningMsg("请上传店内照片");
      //       return false;
      //     }
      //     if (i == "cashSpaceImg") {
      //       this.warningMsg("请上传收银台照片");
      //       return false;
      //     }
      //     if (i == "certificateImg") {
      //       if (this.certificateVisible) {
      //         this.warningMsg("请上传授权书照片");
      //         return false;
      //       }
      //     }
      //   }
      // }
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
          let customerData = res.data.customer;
          let imgs = res.data.imgs;
          let settleCard = res.data.settleCard;
          if (settleCard) {
            let newCustomer = utils.pickObj(customerData, [
              'legalPerson'
            ]);
            let newSettleCard = utils.pickObj(settleCard, [
              'accountType', 'accountName'
            ]);
            if (newSettleCard.accountType == "0") {
              // 对公:
              this.bussinessLicenseVisible = true;//营业执照
              this.identityFrontVisible = true;// 法人身份证正面
              this.identityBackVisible = true;// 法人身份证国徽面
              this.cashSpaceVisible = true;// 收银台照片
              this.accountVisible = true;// 开户许可证
              this.placeVisible = true; //门头照片
              this.storeVisible = true;// 店内照片
            } else if (newSettleCard.accountType == "1") {
              // 对私
              this.personType = "publicPerson";
              if (newSettleCard.accountName == newCustomer.legalPerson) {
                // 法人
                this.personType = "corporatePerson";
                this.bussinessLicenseVisible = true;//营业执照
                this.identityFrontVisible = true;// 法人身份证正面
                this.identityBackVisible = true;// 法人身份证国徽面
                this.identityHolderVisible = true;// 法人手持身份证照
                this.placeVisible = true; //门头照片
                this.storeVisible = true;// 店内照片
                this.cashSpaceVisible = true;// 收银台照片
                this.settleCardVisible = true;// 结算卡正面
              } else {
                // 非法人
                this.personType = "unCorporatePerson";
                this.bussinessLicenseVisible = true;//营业执照
                this.cardHolderFrontVisible = true;// 结算人身份证人像面
                this.cardHolderBackVisible = true;// 结算人身份证国徽面
                this.identityFrontVisible = true;// 法人身份证正面
                this.identityBackVisible = true;// 法人身份证国徽面
                this.placeVisible = true; //门头照片
                this.cashSpaceVisible = true;// 收银台照片
                this.storeVisible = true;// 店内照片
                this.settleCardVisible = true;// 结算卡正面
                this.cardHolderIdVisible = true;//结算人手持身份证
                this.certificateVisible = true;// 授权书
                this.holdCertificateVisible = true;//法人手持授权授权书照片
              }
            }
            this.accountType = settleCard.accountType
          }
          if (imgs) {
            let imgsidArr = ["identityFrontImg", "identityBackImg", "identityHolderImg", "bussinessLicenseImg",
              "settleCardImg", "accountLicenseImg", "placeImg", "storeImg", "cashSpaceImg", "certificateImg",
              "holdCertificateImg", "cardHolderFrontImg", "cardHolderBackImg", "cardHolderIdImg"]
            imgsidArr.forEach((item) => {
              if (imgs[item] != null) {
                this[item] = imgs[item].url;
                this.saveForm[item] = imgs[item].id;
              }
            })
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

