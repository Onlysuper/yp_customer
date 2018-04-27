<template>
  <div>
    <div v-if="formVisible" class="paystatusUpload-box">
      <el-form size="small" label-position="right" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="80px">
        <div class="upload-group">
          <upload-img :label="'营业执照'" v-if="bussinessLicenseVisible" :upType="'BUSSINESS_LICENSE'" :imgKey="'bussinessLicenseImg'" :defaultImg='bussinessLicenseImg' ref="bussinessLicenseImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'法人身份证人像面'" v-if="identityFrontVisible" :upType="'LEGAL_PERSON_ID_POSITIVE'" :imgKey="'identityFrontImg'" :defaultImg='identityFrontImg' ref="identityFrontImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'法人身份证国徽面'" v-if="identityBackVisible" :upType="'LEGAL_PERSON_ID_BACK'" :imgKey="'identityBackImg'" :defaultImg='identityBackImg' ref="identityBackImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'门头照片'" v-if="placeVisible" :upType="'PLACE_IMG'" :imgKey="'placeImg'" :defaultImg='placeImg' ref="placeImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'收银台照片'" v-if="cashSpaceVisible" :upType="'CASH_SPACE_IMG'" :imgKey="'cashSpaceImg'" :defaultImg='cashSpaceImg' ref="cashSpaceImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'开户许可证'" v-if="accountVisible" :upType="'ACCOUNT_OPENING_LICENSE'" :imgKey="'accountLicenseImg'" :defaultImg='accountLicenseImg' ref="accountLicenseImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>

          <upload-img :label="'法人手持身份证照'" v-if="identityHolderVisible" :upType="'APPLICANT_WITH_ID'" :imgKey="'identityHolderImg'" :defaultImg='identityHolderImg' ref="identityHolderImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'结算卡正面'" v-if="settleCardVisible" :upType="'SETTLE_CARD_IMG'" :imgKey="'settleCardImg'" :defaultImg='settleCardImg' ref="settleCardImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'店内照片'" v-if="storeVisible" :upType="'STORE_IMG'" :imgKey="'storeImg'" :defaultImg='storeImg' ref="storeImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'授权书'" v-if="certificateVisible" :upType="'CERTIFICATE_IMG'" :imgKey="'certificateImg'" :defaultImg='certificateImg' ref="certificateImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'持卡人身份证人像面'" v-if="cardHolderFrontVisible" :upType="'CARDHOLDER_ID_POSITIVE'" :imgKey="'cardHolderFrontImg'" :defaultImg='cardHolderFrontImg' ref="cardHolderFrontImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'持卡人身份证国徽面'" v-if="cardHolderBackVisible" :upType="'CARDHOLDER_ID_BACK'" :imgKey="'cardHolderBackImg'" :defaultImg='cardHolderBackImg' ref="cardHolderBackImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'法人手持身份证与授权书'" v-if="holdCertificateVisible" :upType="'HOLD_CERTIFICATE_IMG'" :imgKey="'holdCertificateImg'" :defaultImg='holdCertificateImg' ref="holdCertificateImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'持卡人手持身份证'" v-if="cardHolderIdVisible" :upType="'CARDHOLDER_WITH_ID'" :imgKey="'cardHolderIdImg'" :defaultImg='cardHolderIdImg' ref="cardHolderIdImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
        </div>
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
  .upload-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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
import UploadImg from "@src/components/UploadImg";
import {
  upload,
  completeBussinessImg,
  getCustomerEchoProduct
} from "@src/apis";
import paystatusAgreement from "./paystatusAgreement.vue";

export default {
  name: "",
  components: { UploadImg },
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
      uploadApi: upload,
      allImgData: allImgData,
      publicPerson: false,//对公
      corporatePerson: false,//对私法人
      unCorporatePerson: false,//对私非法人
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
      payStatusFormRules: {} // 编辑单个规则
    };
  },

  methods: {
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
              this.publicPerson = true,
                this.bussinessLicenseVisible = true;//营业执照
              this.identityFrontVisible = true;// 法人身份证正面
              this.identityBackVisible = true;// 法人身份证国徽面
              this.cashSpaceVisible = true;// 收银台照片
              this.accountVisible = true;// 开户许可证
              this.placeVisible = true; //门头照片
              this.storeVisible = true;// 店内照片
            } else if (newSettleCard.accountType == "1") {
              // 对私

              if (newSettleCard.accountName == newCustomer.legalPerson) {
                // 法人
                this.corporatePerson = true;
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
                this.unCorporatePerson = true;
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
    },
    saveOneImg(imgkey, data) {
      console.log(imgkey);
      console.log(data);
      this.saveForm[imgkey] = data;
    }
  },
  created() {
    this.getCustomerEcho();
  },
  computed: {},
  watch: {}
};
</script>

