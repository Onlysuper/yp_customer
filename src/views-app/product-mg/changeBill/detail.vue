<template>
  <full-page class="changebill-detail">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button v-if="productType=='check'?true:false" slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
      <mt-button v-if="productType=='detail'&&(rowData.status== 'ADMIN_AUDIT' || rowData.status == 'REJECT' ||rowData.status == 'INIT' )?true:false" slot="right" :disabled="false" type="danger" @click="editFn">编辑</mt-button>
    </mt-header>
    <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
    <div class="page-navbar">
      <mt-navbar class="page-part myp-mint-navbar" v-model="selected" :fixed="true">
        <mt-tab-item id="oldData">更新前</mt-tab-item>
        <mt-tab-item id="newData">更新后</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" :swipeable="true">
        <div class="container-box">
          <mt-tab-container-item id="oldData">
            <!-- 更新前start -->
            <view-radius>
              <input-wrapper>
                <mt-cell title="企业名称">{{oldData.enterpriseName}}</mt-cell>
                <mt-cell title="企业税号">{{oldData.taxNo}}</mt-cell>
                <mt-cell title="所在地区">{{oldData.orgCode?utils.findCity(oldData.orgCode).resultAddr:""}}</mt-cell>
                <mt-cell title="详细地址">{{oldData.bussinessAddress}}</mt-cell>
                <mt-cell title="法人">{{oldData.legalPerson}}</mt-cell>
                <mt-cell title="身份证号">{{oldData.idCard}}</mt-cell>
                <mt-cell title="身份证生效期">{{oldData.idNoEffectiveBegin}}</mt-cell>
                <mt-cell title="身份证结束期">{{oldData.idNoEffectiveEnd}}</mt-cell>
                <mt-cell title="行业类型">{{utils.findBussinessType(oldData.category).name}}</mt-cell>
                <mt-cell title="营业执照开始日期">{{oldData.bussinessLicenseEffectiveBegin}}</mt-cell>
                <mt-cell title="营业执照结束日期">{{oldData.bussinessLicenseEffectiveEnd}}</mt-cell>
                <mt-cell title="邮箱">{{oldData.contactEmail}}</mt-cell>
                <mt-cell title="结算信息">
                  {{oldData.accountType | statusFilter('accountType')}}
                </mt-cell>
                <mt-cell title="账户名称">{{oldData.accountName}}</mt-cell>
                <mt-cell v-if="settleIdCardVisible" title="结算人身份证号">{{oldData.settleIdCard}}</mt-cell>
                <mt-cell title="开户银行">{{oldData.bankName}}</mt-cell>
                <mt-cell title="开户支行">
                  <div class="text-r">{{oldData.branchName}}</div>
                </mt-cell>
                <mt-cell title="帐号">{{oldData.accountNo}}</mt-cell>
                <mt-cell title="预留手机号">{{oldData.reservedPhoneNo}}</mt-cell>
                <mt-cell title="微信费率">{{oldData.wechatRate}}%</mt-cell>
                <mt-cell title="支付宝费率">{{oldData.alipayRate}}%</mt-cell>
                <mt-cell title="结算方式">{{oldData.settleMode}}</mt-cell>
                <mt-cell title="D0手续费" v-if="oldData.settleMode == 'T0'">{{oldData.t0CashCostFixed}}元</mt-cell>
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
            <!-- 更新前end -->
          </mt-tab-container-item>
        </div>
        <mt-tab-container-item id="newData">
          <!-- 更新后start -->
          <div class="container-box">
            <view-radius>
              <input-wrapper>
                <mt-cell title="企业名称">{{nowData.enterpriseName}}</mt-cell>
                <mt-cell title="企业税号">{{nowData.taxNo}}</mt-cell>
                <mt-cell title="所在地区">{{nowData.orgCode?utils.findCity(nowData.orgCode).resultAddr:""}}</mt-cell>
                <mt-cell title="详细地址">{{nowData.bussinessAddress}}</mt-cell>
                <mt-cell title="法人">{{nowData.legalPerson}}</mt-cell>
                <mt-cell title="身份证号">{{nowData.idCard}}</mt-cell>
                <mt-cell title="身份证生效期">{{nowData.idNoEffectiveBegin}}</mt-cell>
                <mt-cell title="身份证结束期">{{nowData.idNoEffectiveEnd}}</mt-cell>
                <mt-cell title="行业类型">{{utils.findBussinessType(nowData.category).name}}</mt-cell>
                <mt-cell title="营业执照开始日期">{{nowData.bussinessLicenseEffectiveBegin}}</mt-cell>
                <mt-cell title="营业执照结束日期">{{nowData.bussinessLicenseEffectiveEnd}}</mt-cell>
                <mt-cell title="邮箱">{{nowData.contactEmail}}</mt-cell>
                <mt-cell title="结算信息">{{nowData[settleCard.accountType]}}</mt-cell>
                <mt-cell title="账户名称">{{nowData.accountName}}</mt-cell>
                <mt-cell v-if="settleIdCardVisible" title="结算人身份证号">{{nowData.settleIdCard}}</mt-cell>
                <mt-cell title="开户银行">{{nowData.bankName}}</mt-cell>
                <mt-cell title="开户支行">
                  <div class="text-r">{{nowData.branchName}}</div>
                </mt-cell>
                <mt-cell title="帐号">{{nowData.accountNo}}</mt-cell>
                <mt-cell title="预留手机号">{{nowData.reservedPhoneNo}}</mt-cell>
                <mt-cell title="微信费率">{{nowData.wechatRate}}%</mt-cell>
                <mt-cell title="支付宝费率">{{nowData.alipayRate}}%</mt-cell>
                <mt-cell title="结算方式">{{nowData.settleMode}}</mt-cell>
                <mt-cell title="D0手续费" v-if="nowData.settleMode == 'T0'">{{nowData.t0CashCostFixed}}元</mt-cell>
              </input-wrapper>
            </view-radius>
            <view-radius class="uploads imagesParent" id="WeixinJSBridgeAfter">
              <show-img-view class="item" :disabled="true" ref="identityFrontImgNow" :label="'法人身份证人像面'"></show-img-view>
              <show-img-view class="item" :disabled="true" ref="identityBackImgNow" :label="'法人身份证国徽面'"></show-img-view>
              <show-img-view v-show="corporatePersonNow" class="item" :disabled="true" ref="identityHolderImgNow" :label="'法人手持身份证照'"></show-img-view>
              <show-img-view class="item" :disabled="true" ref="bussinessLicenseImgNow" :label="'营业执照'"></show-img-view>
              <show-img-view class="item" :disabled="true" ref="storeImgNow" :label="'店内照片'"></show-img-view>
              <show-img-view class="item" :disabled="true" ref="cashSpaceImgNow" :label="'收银台照片'"></show-img-view>
              <show-img-view class="item" :disabled="true" ref="placeImgNow" :label="'门头照片'"></show-img-view>
              <show-img-view class="item" v-show="publicPersonNow" :disabled="true" ref="accountLicenseImgNow" :label="'开户许可证'"></show-img-view>
              <show-img-view v-show="unCorporatePersonNow" class="item" :disabled="true" ref="holdCertificateImgNow" :label="'法人手持身份证与授权书'"></show-img-view>
              <show-img-view class="item" v-show="unCorporatePersonNow" :disabled="true" ref="certificateImgNow" :label="'授权书加盖公章'"></show-img-view>
              <show-img-view v-show="unCorporatePersonNow" class="item" :disabled="true" ref="cardHolderFrontImgNow" :label="'结算人身份证人面像'"></show-img-view>
              <show-img-view v-show="unCorporatePersonNow" class="item" :disabled="true" ref="cardHolderBackImgNow" :label="'结算人身份证国徽面'"></show-img-view>
              <show-img-view v-show="unCorporatePersonNow" class="item" :disabled="true" ref="cardHolderIdImgNow" :label="'结算人手持身份证'"></show-img-view>
              <show-img-view v-show="corporatePersonNow || unCorporatePersonNow" class="item" :disabled="true" ref="settleCardImgNow" :label="'结算卡正面'"></show-img-view>
            </view-radius>
          </div>
          <!-- 更新后end -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </full-page>
</template>
<script>
import { getCustomerEchoProduct, postUpdateBill } from "@src/apis";
import bussinessTypeJson from "@src/data/bussinessType.json";
// import UploadView from "@src/components-app/Upload/UploadView";
import ShowImgView from "@src/components-app/Upload/ShowImgView";
import MypPopupActions from "@src/components-app/MypPopupActions";
import utils from "@src/common/utils";
import { mapState, mapActions } from "vuex";

export default {
  components: { ShowImgView, MypPopupActions },
  data() {
    return {
      popupActionsVisible: false,
      popupActions: [
        {
          name: "审核通过",
          icon: "icon-admin",
          method: () => {
            // MessageBox.confirm('确定执行此操作?', '提示');
            // this.toUrl("BUILD");
            this.MessageBox.confirm('确定审核通过吗?').then(action => {
              let obj = {
                billNo: this.rowData.billNo,
                status: "WAIT_AUDIT"
              };
              this.resaultHandle(obj)
            }).catch(() => {

            });;
          }
        },
        {
          name: "审核拒绝",
          icon: "icon-admin",
          method: () => {
            this.$nextTick(() => {
              this.MessageBox.prompt(' ', '填写拒绝原因！').then(({ value }) => {
                if (value) {
                  let obj = {
                    billNo: this.rowData.billNo,
                    status: "REJECT",
                    auditResult: value
                  };
                  this.resaultHandle(obj)
                }
              }).catch(() => {

              });
            })

            // this.toUrl("ADDMATERIEL");
          }
        }
      ],
      selected: "oldData",
      settleIdCardVisible: false,
      publicPerson: false,//对公
      corporatePerson: false,//对私法人
      unCorporatePerson: false,//对私非法人
      publicPersonNow: false,//对公
      corporatePersonNow: false,//对私法人
      unCorporatePersonNow: false,//对私非法人
      productType: this.$route.query["productType"],
      customerNo: this.$route.query["customerNo"],
      billNo: this.$route.query["billNo"],
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
    this.echoForm(this.oldData, 'oldData');
    this.echoForm(this.nowData, 'nowData');
  },
  computed: {
    ...mapState({
      oldData: state => state.changeBill.oldData,
      nowData: state => state.changeBill.nowData,
      rowData: state => state.changeBill.rowData
    })
  },
  methods: {
    // 关闭，拒绝，通过
    resaultHandle(obj) {
      postUpdateBill()(obj).then(res => {
        if (res.code == "00") {
          this.Toast({
            message: '操作成功！',
            position: 'center',
            duration: 5000
          });
        } else {
          alert('操作失败!')
        }
      });
    },
    // 点击编辑
    editFn() {
      this.$nextTick(() => {
        this.$router.push({
          path: "./edit",
          query: {
            billNo: this.rowData.billNo,
            customerNo: this.rowData.customerNo,
          }
        });
      })
    },
    changeUrl(url) {
      let before = "";
      switch (process.env.NODE_ENV) {
        case "development" || "productionTest":
          before = "http://tf.yeepiao.com";
          break;
        case "productionTest":
          before = "http://tf.yeepiao.com";
          break;
        case "production":
          before = "https://f.yeepiao.com";
          break;
      }
      if (url) {
        return url.replace("/nfs/test", before)
      }
    },
    echoForm(imgsArr, type) {
      let imgsAll = {
        bussinessLicenseImg: {
          id: imgsArr.bussinessLicenseImgId,
          imgname: "营业执照",
          url: this.changeUrl(imgsArr.bussinessLicenseImg)
        },
        identityFrontImg: {
          id: imgsArr.identityFrontImgId,
          imgname: "法人身份证人像面",
          url: this.changeUrl(imgsArr.identityFrontImg)
        },
        identityBackImg: {
          id: imgsArr.identityBackImgId,
          imgname: "法人身份证国徽面",
          url: this.changeUrl(imgsArr.identityBackImg)
        },
        placeImg: {
          id: imgsArr.placeImgId,
          imgname: "门头照片",
          url: this.changeUrl(imgsArr.placeImg)
        },
        cashSpaceImg: {
          id: imgsArr.cashSpaceImgId,
          imgname: "收银台照片",
          url: this.changeUrl(imgsArr.cashSpaceImg)
        },
        storeImg: {
          id: imgsArr.storeImgId,
          imgname: "店内照片",
          url: this.changeUrl(imgsArr.storeImg)
        },
        accountLicenseImg: {
          id: imgsArr.accountLicenseImgId,
          imgname: "开户许可证",
          url: this.changeUrl(imgsArr.accountLicenseImg)
        },
        settleCardImg: {
          id: imgsArr.settleCardImgId,
          imgname: "结算卡正面",
          url: this.changeUrl(imgsArr.settleCardImg)
        },
        identityHolderImg: {
          id: imgsArr.identityHolderImgId,
          imgname: "法人手持身份证",
          url: this.changeUrl(imgsArr.identityHolderImg)
        },
        settleCardImg: {
          id: imgsArr.settleCardImgId,
          imgname: "结算卡正面",
          url: this.changeUrl(imgsArr.settleCardImg)
        },
        certificateImg: {
          id: imgsArr.certificateImgId,
          imgname: "授权书照片",
          url: this.changeUrl(imgsArr.certificateImg)
        },
        cardHolderFrontImg: {
          id: imgsArr.cardHolderFrontImgId,
          imgname: "结算人人面像",
          url: this.changeUrl(imgsArr.cardHolderFrontImg)
        },
        cardHolderBackImg: {
          id: imgsArr.cardHolderBackImgId,
          imgname: "结算人人国徽面",
          url: this.changeUrl(imgsArr.cardHolderBackImg)
        },
        holdCertificateImg: {
          id: imgsArr.holdCertificateImgId,
          imgname: "法人手持身份证与授权书",
          url: this.changeUrl(imgsArr.holdCertificateImg)
        },
        cardHolderIdImg: {
          id: imgsArr.cardHolderIdImgId,
          imgname: "结算人手持身份证合影",
          url: this.changeUrl(imgsArr.cardHolderIdImg)
        },
        accountLicenseImg: {
          id: imgsArr.accountLicenseImgId,
          imgname: "开户许可证",
          url: this.changeUrl(imgsArr.accountLicenseImg)
        }
      };

      if (imgsArr.accountType == "0") {
        // 对公:
        type == 'oldData' ? this.publicPerson = true : this.publicPersonNow = true

      } else if (imgsArr.accountType == "1") {
        // 对私
        if (imgsArr.accountName == imgsArr.legalPerson) {
          // 法人
          type == 'oldData' ? this.corporatePerson = true : this.corporatePersonNow = true;
        } else {
          // 非法人
          type == 'oldData' ? this.unCorporatePerson = true : this.unCorporatePersonNow = true;
        }
      }
      // 图片预览
      this.$nextTick(() => {
        if (type == 'oldData') {
          for (let key in imgsAll) {
            if (imgsAll[key] instanceof Object) {
              this.$refs[key].setImg(imgsAll[key].url);
            }
          }
        }
        else if (type = "nowData") {
          for (let key in imgsAll) {
            if (imgsAll[key] instanceof Object) {
              this.$refs[key + 'Now'].setImg(imgsAll[key].url);
            }
          }
        }
        this.initWeixinJSBridge($("#WeixinJSBridge"));
        this.initWeixinJSBridge($("#WeixinJSBridgeAfter"));
      })

    },
    initWeixinJSBridge(imgParent) {
      this.$nextTick(() => {
        let img = imgParent.find("img");
        console.log(img);
        let imgArr = [];
        for (var i = 0; i < img.length; i++) {
          let item = img.eq(i);
          let imgUrl = item.attr('src');
          imgArr.push(imgUrl);
        }
        img.click(function () {
          console.log('点击');
          let thisSrc = $(this).attr('src');
          WeixinJSBridge.invoke("imagePreview", {
            "current": thisSrc,
            urls: imgArr
          });
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.changebill-detail {
  .uploads {
    padding: 20 * $rem;
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
    width: 500 * $rem;
    text-align: right;
  }
  .myp-mint-navbar {
    top: 100 * $rem;
  }
  .container-box {
    margin-top: 90 * $rem;
    width: 100%;
  }
}
</style>
