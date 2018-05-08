<template>
  <div>
    <div v-if="formVisible" class="paystatusUpload-box">
      <el-form size="small" label-position="right" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="80px">
        <div class="upload-group">
          <upload-img :label="'营业执照'" :upType="'BUSSINESS_LICENSE'" :imgKey="'bussinessLicenseImg'" :defaultImg='bussinessLicenseImg' ref="bussinessLicenseImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'门头照片'" :upType="'PLACE_IMG'" :imgKey="'placeImg'" :defaultImg='placeImg' ref="placeImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
          <upload-img :label="'收银台照片'" :upType="'CASH_SPACE_IMG'" :imgKey="'cashSpaceImg'" :defaultImg='cashSpaceImg' ref="cashSpaceImg" :sendData="allImgData" :action="oaIp+'/bussinessImg/upload'" :uploadApi="uploadApi" @result="saveOneImg"></upload-img>
        </div>
      </el-form>
      <!-- <div center slot="footer" class="dialog-footer">
        <el-button @click="goback()">确定</el-button>
      </div> -->
    </div>
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
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
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
  name: "qrcodeUpload",
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
      this.$emit("backDetail");
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
              this.publicPerson = true;
            } else if (newSettleCard.accountType == "1") {
              // 对私
              if (newSettleCard.accountName == newCustomer.legalPerson) {
                // 法人
                this.corporatePerson = true;
              } else {
                // 非法人
                this.unCorporatePerson = true;
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

