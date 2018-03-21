<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>

    <div class="add-playinfo">
      <view-radius class="uploads">
        <upload-view class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_POSITIVE'" @result="resultMediaId" :dataKey="'identityFrontImg'" ref="identityFrontImg" :label="'身份证正面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_BACK'" @result="resultMediaId" :dataKey="'identityBackImg'" ref="identityBackImg" :label="'身份证反面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'BUSSINESS_LICENSE'" @result="resultMediaId" :dataKey="'bussinessLicenseImg'" ref="bussinessLicenseImg" :label="'营业执照'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'STORE_IMG'" @result="resultMediaId" :dataKey="'storeImg'" ref="storeImg" :label="'店内照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'CASH_SPACE_IMG'" @result="resultMediaId" :dataKey="'cashSpaceImg'" ref="cashSpaceImg" :label="'收银台照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accountLicenseImg'" ref="accountLicenseImg" :label="'开户许可证'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'SETTLE_CARD_IMG'" @result="resultMediaId" :dataKey="'settleCardImg'" ref="settleCardImg" :label="'结算卡正面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'PLACE_IMG'" @result="resultMediaId" :dataKey="'placeImg'" ref="placeImg" :label="'门头照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'APPLICANT_WITH_ID'" @result="resultMediaId" :dataKey="'identityHolderImg'" ref="identityHolderImg" :label="'手持身份证照'"></upload-view>
      </view-radius>
      <mt-radio v-model="value" v-targetTo style="text-align: center;" @click.native="visible = true" :options="['同意《支付开通协议》']"></mt-radio>
    </div>
    <mt-button class="btn" size="large" :disabled="value?false:true" type="primary" @click="submit">开通</mt-button>
    <myp-popup v-model="visible">
      <full-page class="agree">
        <div slot="header" class="border-bottom-1px clear">
          <span class="mint-datetime-action mint-datetime-cancel" @click="isAgree(false)">不同意</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="isAgree(true)">同意</span>
        </div>
        <div class="agree-text">
          <p class="indent">甲方：（商户）</p>
          <p class="indent">乙方：北京速票通科技有限公司</p>
          <p class="indent">地址：北京市朝阳区华腾世纪总部公园E2-7层</p>
          <p class="indent">联系人/电话：4001102662</p>
          <br/>
          <p class="indent">鉴于：</p>
          <p class="indent">乙方是一家依据中华人民共和国法律合法成立并有效存续的有限责任公司，开发和运营“易票”相关系统、软件和硬件，拥有强大的技术研发和运维能力。甲方是一家依据中华人民共和国法律合法成立并有效存续的有限责任公司（或股份有限公司）或是一个年满18周岁并具有完全民事权利能力和民事行为能力的自然人，甲方基于其业务需要，拟接入乙方的系统、软件和硬件产品，便于完成业务所需的资金操作或客户服务。</p>
          <p class="indent">因此，甲乙双方根据《中国人民共和国合同法》及相关法律法规的规定，本着资源共享、优势互补、双赢合作的原则和目标，拟建立长期、稳定、互惠、互利的合作关系，并经友好协商一致，就合作事宜达成如下协议条款，以兹共同遵守：</p>
          <h4 class="indent">第一条 合作内容</h4>
          <p class="indent">1.合作关系：乙方是本协议下相关“易票”系统、快速开票、聚合支付、电子发票、软件和硬件产品的提供方，甲方是本协议下相关“易票”系统（包括但不限于网站和APP）、软件和硬件产品的使用方。</p>
          <p class="indent">2.合作期限：本协议有效期壹年自即开通日起壹年内有效，有效期届满后终止。甲方在本协议有效期内未发生违约或违规行为的，本协议有效期届满后，甲方享有续约优先权。</p>
          <h4 class="indent">第二条 快速开票</h4>
          <p class="indent">快速开具纸质发票的解决方案。消费者通过扫描商户开票二维码，或者商户通过扫码枪扫描客户企业名片完成发票信息的快速填充以及发票的开具。</p>
          <h4 class="indent">第三条 聚合支付</h4>
          <p class="indent">1.甲方按照支付机构的要求独立申请结算账户，由合作支付机构（本协议指“支付宝”、“财付通”、乙方合作银行及其他第三方支付机构等）直接对甲方指定的结算账户进行结算账户划款工作。</p>
          <p class="indent">2.本协议涉及支付产品结算方式如下：</p>
          <p class="indent">（1）甲方同意“支付宝”将消费交易资金在扣除支付宝规定的交易标准费率后，在约定的结算日期，向甲方指定的结算账户划款。</p>
          <p class="indent">（2）甲方同意“财付通”及其他移动支付渠道将当日支付消费交易资金在扣除规定的交易标准费率后，在约定的结算日期，向甲方指定结算账户划款。</p>
          <p class="indent">（3）甲方同意乙方合作银行及其他第三方支付机构将当日银行卡支付消费交易资金在扣除协议规定的交易标准费率后，在约定的结算日期，向甲方指定结算账户划款。</p>
          <p class="indent">3.如果由于“支付宝”、“财付通”、乙方合作银行及其他第三方支付机构等支付机构原因导致上述费率调整，双方另行签署补充协议。</p>
          <p class="indent">4.甲方应在本协议签署之后将《商户信息及产品登记表》盖章提交乙方。</p>
          <h4 class="indent">第四条 电子发票</h4>
          <p class="indent">1．为进一步适应经济社会发展和税收现代化建设需要，满足纳税人开具增值税电子普通发票的需求，降低纳税人经营成本，节约社会资源，方便消费者保存使用发票，营造健康公平的税收环境，甲乙双方合作完成甲方客户（第三方客户）电子发票系统上线工作。</p>
          <p class="indent">2．乙方对“电子发票系统”享有所有权，经乙方授权后甲方可享有对“电子发票系统”的使用权。</p>
          <p class="indent">3．乙方应实现甲方客户相关业务数据与易票发票服务平台的对接。</p>
          <p class="indent">4．乙方应提供甲方客户电子发票信息从易票发票服务平台的开具、存储、查询、下载基础服务。</p>
          <h4 class="indent">第五条 甲方的权利与义务</h4>
          <p class="indent">1.甲方需向乙方提供乙方要求的包括但不限于相关身份资料及经营内容等资料，并在该等资料发生变更后三个工作日内书面通知乙方。甲方应承担因上述资料不准确、不真实、不及时和不完整而产生的一切责任。</p>
          <p class="indent">2.甲方应严格按照相关经营资质上的规范开展业务。严格禁止甲方超越经营范围开展业务使用乙方的产品或进行经营范围外的二次清算行为。若甲方超越经营范围开展业务或进行经营外范围外的二次清算行为，乙方有权立即暂停、中止或终止向甲方提供本协议项下的服务并要求甲方支付二次清算总额 2 倍违约金，同时乙方可冻结甲方未结算的所有款项。</p>
          <p class="indent">3.甲方应自行承担因其自身的交易信息违法、虚假、未及时更新、不详实、提供的商品或服务或售后等存在问题等造成的投诉、退货、纠纷、处罚等责任，因此造成乙方损失的，甲方应予赔偿。</p>
          <p class="indent">4.未经乙方书面授权，甲方不得擅自转载、复制、截取、篡改乙方网站上有关支付、收银的内容或创造与该内容有关的衍生产品。</p>
          <p class="indent">5.甲方应妥善保管乙方提供给甲方的商户账户、密码、密钥和（或）数字证书等，因甲方的商户账户、密码、密钥和（或）数字证书遗失、泄露、被窃所导致的损失由甲方自行承担。</p>
          <p class="indent">6.甲方承诺，在使用乙方产品或服务时遵守各项法律法规及规范性文件，接受并遵守乙方制定（包括后期修改）的关于本协议所指产品或服务的相关管理规则和运行中的技术和非技术规定。</p>
          <p class="indent">7.甲方保证其使用乙方产品和服务所完成的业务的合法性、真实性。如因其业务的合法性、真实性等原因而造成乙方或其他第三方损失的，由甲方承担责任。</p>
          <p class="indent">8.甲方不得主动进行或协助持卡人进行信用卡套现、洗钱、交易分单等违法经营行为，不得出现虚假申请、侧录、恶意倒闭等严重风险行为，否则，乙方有权暂停或终止提供本协议服务，冻结甲方结算款，并将甲方信息报送至中国人民银行和公安部及相关监管机构。</p>
          <p class="indent">9.在合作期间，因甲方出现违法违规（包括不限于套现、赌博、洗钱等）而产生的一切风险和责任均由甲方自行承担，与乙方无关。如因甲方过错原因致使给乙方造成损失（包括但不限于行政处罚）的，由甲方承担相应的赔偿责任。</p>
          <p class="indent">10.在合作期间，甲方应遵守乙方在其系统、软件内不时发布的相关规则及管理规范。</p>
          <p class="indent">11.甲方如遇迁址、停业、域名或联系电话等资料信息变更，应提前通知乙方，乙方有权视具体情况暂停服务，若由于甲方未及时通知乙方导致的一切投诉和纠纷，均由甲方独立担责。</p>
          <h4 class="indent">第六条 乙方的权利与义务</h4>
          <p class="indent">1.乙方应确保其所提供的产品和服务不违反现行法律、法规和规章的规定。</p>
          <p class="indent">2.乙方保留产品和服务协议条款、产品功能、工作规范、服务价格的制定权、发布权、调整权及最终解释权。</p>
          <p class="indent">3.乙方负责制定“易票”相关系统、软件使用规则和管理规范。</p>
          <p class="indent">4.乙方不对其合作的支付机构（包括但不限于“支付宝”、“财付通”、乙方合作银行及其他第三方支付机构等）的服务品质作保证，如甲方使用过程中，因该等支付机构服务品质原因导致相关损失，乙方无需承担责任。</p>
          <p class="indent">5.乙方有权根据风险防范需要（如甲方涉嫌套现、赌博、洗钱等），随时中止（终止）向甲方提供产品和服务、冻结甲方结算款，并将甲方信息报送至中国人民银行和公安部及相关监管机构。</p>
          <p class="indent">6.本协议项下，除乙方确有过错外，如甲方与甲方客户或其他第三方因款项等问题发生纠纷，与乙方无关。因纠纷产生的风险及责任由甲方与甲方客户或其他第三方自行解决与承担。</p>
          <p class="indent">7.乙方有权定期或不定期审核甲方经营的业务，由于甲方业务不符合本协议约定或国家相关法律法规规定的，乙方有权暂停或终止与甲方的合作，并保留进一步追究甲方责任的权利。</p>
          <p class="indent">8.若甲方自本协议签订之日起连续 365 日未产生交易，乙方有权免责单方解除本协议。乙方向甲方发出协议解除通知书之日，本协议解除，双方合作关系终止。</p>
          <h4 class="indent">第七条 保密和保密义务</h4>
          <p class="indent">双方应严格遵守保密义务。甲方应对本协议约定的包括但不限于乙方提供的系统、软件和硬件产品的价格、产品资料等负有保密义务，不得擅自向第三方透露；本条所约定的保密义务为永久性义务，不受本协议合作期限的限制，任何一方违反保密义务，应立即停止伤害，并向另一方承担赔偿责任。</p>
          <h4 class="indent">第八条 知识产权</h4>
          <p class="indent">乙方提供给甲方的系统、软件和硬件产品（包括但不限于软件中所含的任何图象、照片、动 画、录像、录音、音乐、文字和附加程序、随附的帮助材料）的一切权利均属于该系统、软件和硬件产品的著作权人，未经著作权人许可，甲方不得对该软件进行反向工程 （reverse engineer）、反向编译（decompile）或反汇编（disassemble）。</p>
          <h4 class="indent">第九条 违约及违约责任</h4>
          <p class="indent">1.任何一方没有履行、没有完全履行或者没有适当履行本协议下的责任和义务，或者违反本协议约定的条款，无论是作为或者不作为，另一方有权向违约一方发出书面通知，要求违约一方进行纠正，并有权要求违约一方承担违约赔偿责任。若双方都有过错，则应根据实际的情况分别承担各自的责任和损失。</p>
          <p class="indent">2.任何一方由于不能预见、对其发生和后果不可避免且不能克服的客观情况（“不可抗力”）导致该方不能履行或不能完全履行本合同约定的义务，该方应在不可抗力发生后24小时内书面通知对方，并提供有效证明后，该方可以根据情况全部或部分免除责任。由于不可抗力导致第三方损失的，由甲乙双方另行协商解决。</p>
          <h4 class="indent">第十条 适用法律及争议处理</h4>
          <p class="indent">1.本协议的订立、生效、履行和解释应适用中华人民共和国现行的法律、法规。</p>
          <p class="indent">2.因本协议引起的或与本协议有关的争议，双方可协商解决；协商不成的，任何一方有权就争议事项向乙方所在地有管辖权的法院起诉。</p>
          <h4 class="indent">第十一条 协议变更、延续和终止</h4>
          <p class="indent">1.在协议合作期内，双方可以协商解除本协议；任何一方需要终止本合作协议，应提前一个月以书面形式提出。</p>
          <p class="indent">2.甲方有下列任一行为发生，乙方有权立即终止本协议，并向甲方追偿由此导致的损失：</p>
          <p class="indent">（1）故意提供虚假申请材料，采取欺骗手段骗取乙方合作的；</p>
          <p class="indent">（2）直接或间接参与欺诈的；</p>
          <p class="indent">（3）从事套现、洗单、伪冒交易、恶意欠款以及其他违法违规行为的；</p>
          <p class="indent">（4）利用乙方提供的服务从事非法业务的；</p>
          <p class="indent">（5）出现风险事件或经乙方判断交易异常的；</p>
          <p class="indent">（6）出现违规操作，经乙方指出拒不纠正的；</p>
          <p class="indent">（7）无理拒绝或故意拖延乙方查询和监查要求的；</p>
          <p class="indent">（8）因甲方与其客户发生投诉、仲裁和诉讼等情形之一而致使乙方被监管部门或合作机构处罚、重整、整改、媒体负面报道、赔偿损失等影响乙方商誉的；</p>
          <p class="indent">（9）经营的业务违反法律法规的；</p>
          <p class="indent">（10）甲方违反法律规定致使监管部门要求甲方停止业务从而导致乙方遭受损失的；</p>
          <p class="indent">（11）发生重大投诉、群体性投诉、媒体集中负面报道等情况引发重大社会争议，使业务合作无法持续的；</p>
          <p class="indent">（12）实施其他有损乙方利益行为或其他违反本协议约定的情形</p>
          <h4 class="indent">第十二条 附则</h4>
          <p class="indent">1.甲乙双方同意，任何一方因本协议而产生的所有相关税费（如有）应依照适用法律规定由该方自行承担。</p>
          <p class="indent">2.本协议的相关附件、双方书面确认的信息文件及补充合同应为本协议不可分割的一部分，具有如同已在本协议正文中明文载列的同等效力。</p>
          <p class="indent">3.在本协议有效期内，双方可以通过友好协商，对本协议相应条款进行补充或修改；本协议的任何补充或修改必须经过双方书面同意后生效。双方如在本协议之前已经签有协议，并与本协议内容有不符的地方，当以本协议为准。</p>
          <p class="indent">4.任何一方均不被视为放弃本协议中的任何条款，除非该方以书面形式明确作出放弃。任何一方未坚持要求对方严格履行本协议中的任何条款，或未行使其本协议中约定的任何权利，均不应被视为对任何上述条款的放弃或对今后行使任何上述权利的放弃。</p>
          <p class="indent">5.如果本协议任何条款不合法、无效或不能执行，或者被任何有管辖权的仲裁庭或法院宣布为不合法、无效或不能执行，则其他条款仍然有效和可执行。</p>
          <p class="indent">6.一方未经另一方事先书面同意不得将其本协议下的权利和义务全部或部分转让给任何第三方。尽管有前述规定，甲方可未经乙方事先同意将本协议（或其在本协议项下的任何权利或义务）转让给其关联公司，或当发生合并、重组、出售全部或重要资产或类似交易时转让给其后续公司。</p>
          <p class="indent">7.本合同共壹式贰份，甲乙双方各执壹份，每份具有同等法律效力，本合同自双方签订之日起生效。</p>
          <!-- <p class="indent" style="text-align:right;">完！</p> -->
          <pull-down-tip></pull-down-tip>
        </div>
      </full-page>
    </myp-popup>
  </full-page>
</template>

<script>
import UploadView from "@src/components-app/Upload/UploadView";
import MypPopup from "@src/components-app/MypPopup";
import PullDownTip from "@src/components-app/PullDownTip";

import { completeBussinessImg, getCustomerEchoProduct } from "@src/apis";
export default {
  components: {
    UploadView,
    MypPopup,
    PullDownTip
  },
  data() {
    return {
      visible: false,
      value: "",
      customerNo: this.$route.query["customerNo"],
      phoneNo: "",
      imgs: {}
    };
  },
  created() {
    getCustomerEchoProduct()({
      customerNo: this.customerNo,
      featureType: "CONVERGE_PAY"
    }).then(data => {
      if (data.code == "00") {
        //回显信息
        this.echoForm(data.data);
      } else {
        this.Toast(data.msg);
      }
    });
    // let data = JSON.parse(localStorage.getItem("echo_form") || "{}");
    // this.echoForm(data);
  },
  directives: {
    targetTo: {
      // 指令的定义
      inserted: function (el) {
        // console.log(el);
      }
    }
  },
  methods: {
    echoForm(data) {
      let { imgs, settleCard } = data;
      if (imgs instanceof Object) {
        for (let key in imgs) {
          if (imgs[key] instanceof Object) {
            this.$refs[key].setImg(imgs[key].url);
            this.resultMediaId(key, imgs[key].id);
          }
        }
      }
      if (settleCard instanceof Object) {
        this.phoneNo = settleCard.phoneNo;
      }
    },
    //图片上传结果
    resultMediaId(dataKey, mediaId) {
      this.imgs[dataKey] = mediaId;
    },
    isAgree(bool) {
      this.visible = false;
      if (bool) this.value = "同意《支付开通协议》";
      else this.value = "";
    },
    submit() {
      completeBussinessImg()({
        ...this.imgs,
        customerNo: this.customerNo
      }).then(data => {
        if (data.code == "00") {
          this.$router.push({ path: "./addSuccess", query: { phoneNo: this.phoneNo } });
        } else {
          this.Toast(data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.add-playinfo {
  padding: 20*$rem;
  box-sizing: border-box;
}
.btn {
  margin: 30*$rem auto;
  width: 95%;
}
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
.agree {
  height: 400px;
}
.agree-text {
  padding: 20*$rem;
  box-sizing: border-box;
}
.indent {
  text-indent: 25px;
}
</style>
