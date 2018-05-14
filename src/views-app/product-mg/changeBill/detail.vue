<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <!-- 聚合支付详情 -->
    <template v-if="productType == 'pay'">
      <view-radius>
        <input-wrapper>
          <mt-cell title="企业名称">{{customer.enterpriseName}}</mt-cell>
          <mt-cell title="企业税号">{{customer.taxNo}}</mt-cell>
          <mt-cell title="所在地区">{{customer.addr}}</mt-cell>
          <mt-cell title="详细地址">{{customer.bussinessAddress}}</mt-cell>
          <mt-cell title="法人">{{customer.legalPerson}}</mt-cell>
          <mt-cell title="身份证号">{{customer.idCard}}</mt-cell>
          <mt-cell title="身份证生效期">{{customer.idNoEffectiveBegin}}</mt-cell>
          <mt-cell title="身份证结束期">{{customer.idNoEffectiveEnd}}</mt-cell>
          <mt-cell title="行业类别">{{customer.name}}</mt-cell>
          <mt-cell title="营业执照开始日期">{{customer.bussinessLicenseEffectiveBegin}}</mt-cell>
          <mt-cell title="营业执照结束日期">{{customer.bussinessLicenseEffectiveEnd}}</mt-cell>
          <mt-cell title="邮箱">{{customer.contactEmail}}</mt-cell>
          <mt-cell title="结算信息">{{accountTypes[settleCard.accountType]}}</mt-cell>
          <mt-cell title="账户名称">{{settleCard.accountName}}</mt-cell>
          <mt-cell v-if="settleIdCardVisible" title="结算人身份证号">{{settleCard.settleIdCard}}</mt-cell>
          <mt-cell title="开户银行">{{settleCard.bankName}}</mt-cell>
          <mt-cell title="开户支行">
            <div class="text-r">{{settleCard.branchName}}</div>
          </mt-cell>
          <mt-cell title="帐号">{{settleCard.accountNo}}</mt-cell>
          <mt-cell title="预留手机号">{{settleCard.reservedPhoneNo}}</mt-cell>
          <mt-cell title="微信费率">{{product.wechatRate}}%</mt-cell>
          <mt-cell title="支付宝费率">{{product.alipayRate}}%</mt-cell>
          <mt-cell title="结算方式">{{product.settleMode}}</mt-cell>
          <mt-cell title="D0手续费" v-if="product.settleMode == 'T0'">{{product.t0CashCostFixed}}元</mt-cell>
        </input-wrapper>
      </view-radius>
      <view-radius class="uploads imagesParent" id="WeixinJSBridge">
        <show-img-view class="item" :disabled="true" ref="identityFrontImg" :label="'法人身份证人像面'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="identityBackImg" :label="'法人身份证国徽面'"></show-img-view>
        <show-img-view v-show="corporatePerson" class="item" :disabled="true" ref="identityHolderImg" :label="'法人手持身份证照'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="bussinessLicenseImg" :label="'营业执照'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="storeImg" :label="'店内照片'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="cashSpaceImg" :label="'收银台照片'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="placeImg" :label="'门头照片'"></show-img-view>
        <show-img-view class="item" v-show="publicPerson" :disabled="true" ref="accountLicenseImg" :label="'开户许可证'"></show-img-view>
        <show-img-view v-show="unCorporatePerson" class="item" :disabled="true" ref="holdCertificateImg" :label="'法人手持身份证与授权书'"></show-img-view>
        <show-img-view class="item" v-show="unCorporatePerson" :disabled="true" ref="certificateImg" :label="'授权书加盖公章'"></show-img-view>
        <show-img-view v-show="unCorporatePerson" class="item" :disabled="true" ref="cardHolderFrontImg" :label="'结算人身份证人面像'"></show-img-view>
        <show-img-view v-show="unCorporatePerson" class="item" :disabled="true" ref="cardHolderBackImg" :label="'结算人身份证国徽面'"></show-img-view>
        <show-img-view v-show="unCorporatePerson" class="item" :disabled="true" ref="cardHolderIdImg" :label="'结算人手持身份证'"></show-img-view>
        <show-img-view v-show="corporatePerson || unCorporatePerson" class="item" :disabled="true" ref="settleCardImg" :label="'结算卡正面'"></show-img-view>
      </view-radius>
    </template>
    <!-- 电票详情 -->
    <template v-if="productType == 'elec'">
      <view-radius>
        <input-wrapper>
          <mt-cell title="商户编号">{{customerNo}}</mt-cell>
          <mt-cell title="商户名称">{{elec.enterpriseName}}</mt-cell>
          <mt-cell title="经营名称">{{elec.enterpriseName}}</mt-cell>
          <mt-cell title="经营区域">{{elec.addr}}</mt-cell>
          <mt-cell title="经营地址">{{elec.bussinessAddress}}</mt-cell>
          <mt-cell title="联系电话">{{elec.bussinessPhone}}</mt-cell>
          <mt-cell title="行业类别">{{elec.name}}</mt-cell>
          <mt-cell title="开户银行">{{elec.bankName}}</mt-cell>
          <mt-cell title="开户支行">
            <div class="text-r">{{elec.branchName}}</div>
          </mt-cell>
          <mt-cell title="银行帐号">{{elec.bankAccountNo}}</mt-cell>
          <mt-cell title="注册资金">{{elec.registMoney}}</mt-cell>
          <mt-cell title="月开票量">{{elec.mounthCount}}</mt-cell>
        </input-wrapper>
      </view-radius>
    </template>

    <!-- 聚合支付 -->
  </full-page>
</template>

<script>
import { getCustomerEchoProduct, getQueryCustomerElectronic } from "@src/apis";
import bussinessTypeJson from "@src/data/bussinessType.json";
// import UploadView from "@src/components-app/Upload/UploadView";
import ShowImgView from "@src/components-app/Upload/ShowImgView";
import utils from "@src/common/utils";
export default {
  components: { ShowImgView },
  data() {
    return {
      settleIdCardVisible: false,
      publicPerson: false,//对公
      corporatePerson: false,//对私法人
      unCorporatePerson: false,//对私非法人
      productType: this.$route.params["productType"],
      customerNo: this.$route.query["customerNo"],
      customer: {
        enterpriseName: "",
        taxNo: "",
        addr: "",
        bussinessAddress: "",
        legalPerson: "",
        name: "",
        idCard: "",
        contactEmail: "",
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        idNoEffectiveBegin: "",
        idNoEffectiveEnd: ""
      },
      settleCard: {
        accountName: "",
        bankName: "",
        branchName: "",
        accountType: "",
        accountNo: "",
        reservedPhoneNo: ""
      },
      product: {
        alipayRate: "",
        wechatRate: "",
        settleMode: "",
        t0CashCostFixed: ""
      },
      elec: {
        enterpriseName: "",
        bussinessAddress: "",
        bussinessPhone: "",
        bankAccountNo: "",
        registMoney: "",
        mounthCount: "",
        bussinessName: "",
        addr: "",
        name: "",
        bankName: "",
        branchName: ""
      },
      accountTypes: {
        "0": "对公",
        "1": "对私"
      }
    };
  },
  created() {
    getCustomerEchoProduct()({
      customerNo: this.customerNo,
      featureType: "CONVERGE_PAY"
    }).then(data => {
      if (data.code == "00") {
        this.echoForm(data.data);
      } else {
        this.Toast(data.msg);
      }
    });
  },
  methods: {
    echoForm(data) {
      console.log(this.customerNo);
      // return false;
      let { customer, settleCard, product, imgs } = data;
      if (customer instanceof Object) {
        this.customer.enterpriseName = customer.enterpriseName;
        this.customer.taxNo = customer.taxNo;
        this.customer.addr = utils.findCity(customer.orgCode).resultAddr;
        this.customer.bussinessAddress = customer.bussinessAddress;
        this.customer.legalPerson = customer.legalPerson;
        this.customer.idCard = customer.idCard;
        this.customer.contactEmail = customer.contactEmail;
        this.customer.bussinessLicenseEffectiveBegin = customer.bussinessLicenseEffectiveBegin;
        this.customer.bussinessLicenseEffectiveEnd = customer.bussinessLicenseEffectiveEnd;
        this.customer.idNoEffectiveBegin = customer.idNoEffectiveBegin;
        this.customer.idNoEffectiveEnd = customer.idNoEffectiveEnd;
        this.customer.name = utils.findBussinessType(customer.category).name;
      }
      if (settleCard instanceof Object) {
        this.settleCard.accountName = settleCard.accountName;
        this.settleCard.bankName = settleCard.bankName;
        this.settleCard.branchName = settleCard.branchName;
        this.settleCard.accountType = settleCard.accountType;
        this.settleCard.accountNo = settleCard.accountNo;
        this.settleCard.reservedPhoneNo = settleCard.reservedPhoneNo;
      }
      if (product instanceof Object) {
        this.product.alipayRate = utils.accMul(product.alipayRate, 100);
        this.product.wechatRate = utils.accMul(product.wechatRate, 100);
        this.product.settleMode = product.settleMode;
        this.product.t0CashCostFixed = product.t0CashCostFixed;
      }
      if (this.settleCard.accountType == '0') {
        //对公
        this.publicPerson = true;
      } else if (this.settleCard.accountType == '1') {
        // 对私
        if (this.settleCard.accountName == this.customer.legalPerson) {
          //法人
          this.corporatePerson = true;
        } else {
          // 非法人
          this.unCorporatePerson = true;
          this.settleIdCardVisible = true
        }
      }

      // 图片预览
      if (imgs instanceof Object) {
        for (let key in imgs) {
          if (imgs[key] instanceof Object) {
            this.$refs[key].setImg(imgs[key].url);
          }
        }
      }
      this.$nextTick(() => {
        this.initWeixinJSBridge($("#WeixinJSBridge"));
      })
    },
    initWeixinJSBridge(imgParent) {
      let img = imgParent.find("img");
      let imgArr = [];
      for (var i = 0; i < img.length; i++) {
        let item = img.eq(i);
        let imgUrl = item.attr('src');
        imgArr.push(imgUrl);
      }
      img.click(function () {
        let thisSrc = $(this).attr('src');
        WeixinJSBridge.invoke("imagePreview", {
          "current": thisSrc,
          urls: imgArr
        });
      })
    },
    echoFormElec(data) {
      let { customer, customerInvoiceConfig, product } = data;
      if (customer instanceof Object) {
        this.elec.enterpriseName = customer.enterpriseName;
        this.elec.bussinessAddress = customer.bussinessAddress;
        this.elec.bussinessPhone = customer.bussinessPhone;
        this.elec.registMoney = customer.registMoney;
        this.elec.bussinessName = customer.bussinessName;
        this.elec.addr = utils.findCity(customer.orgCode).resultAddr;
        this.elec.name = utils.findBussinessType(customer.category).name;
      }
      if (customerInvoiceConfig instanceof Object) {
        this.elec.bankName = customerInvoiceConfig.bankName;
        this.elec.branchName = customerInvoiceConfig.branchName;
        this.elec.bankAccountNo = customerInvoiceConfig.bankAccountNo;
      }
      if (product instanceof Object) {
        this.elec.mounthCount = product.elecBillnum;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.uploads {
  padding: 20*$rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .item {
    // float: left;
    width: 33%;
    // flex: 1;
  }
}
.text-r {
  width: 500*$rem;
  text-align: right;
}
</style>
