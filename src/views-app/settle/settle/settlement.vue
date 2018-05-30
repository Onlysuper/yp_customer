<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field v-if="!surePage" type="text" label="订单编号" placeholder="请输入订单编号" v-model="dataList.orderNo"></mt-field>

        <mt-field :disabled="!surePage" type="text" label="对公账户名称" placeholder="请输入对公账户名称" v-model="dataList.receiveMan"></mt-field>
        <mt-field :disabled="!surePage" type="text" label="收款账号" placeholder="请输入收款账号" v-model="dataList.accountNo"></mt-field>
        <mt-field :disabled="!surePage" type="text" label="开户行" placeholder="请输入开户行" v-model="dataList.bankName"></mt-field>

        <mt-field :disabled="true" type="text" label="实付金额" placeholder="请输入实付金额" v-model="dataList.settlePrice"></mt-field>
        <mt-field :disabled="true" type="text" label="达标商户数量" placeholder="请输入达标商户数量" v-model="dataList.customerNumber"></mt-field>
        <mt-field :disabled="true" type="text" label="联系电话" placeholder="请输入联系电话" v-model="dataList.agentPhone"></mt-field>
        <mt-field v-if="!$store.state.userInfoAndMenu.isOperate" :disabled="true" type="text" label="打款时间" placeholder="请输入打款时间" v-model="dataList.remitTime"></mt-field>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>
<style lang="scss">
.myp-chek-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
  .mint-cell {
    background-image: none;
    background-color: #fcfcfc;
    width: 33.333%;
  }
  .mint-radiolist-label,
  .mint-checklist-label {
    padding: 0;
  }
  .mint-radiolist-title,
  .mint-checklist-title {
    margin: 0;
  }
  .mint-cell-wrapper {
    padding: 5px;
  }
}
</style>
<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import utils from "@src/common/utils"
export default {
  components: { Picker },
  data() {
    let user = this.$store.state.userInfoAndMenu.userMessage.all;
    return {
      settleNo: this.$route.params["settleNo"],
      surePage: false,
      statusObj: {},
      type: {},
      btnDisabled: false,
      pageType: this.$route.query["type"] || "SETTLEMENT",
      dataList: {},
      pageTitle: {
        SETTLEMENT: "结算",
        SETTLESURE: "确认"
      },
    };
  },
  computed: {},

  watch: {
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getAgentSettleUnit", "postUpdateSettlesAc"]),
    init() {
      if (this.pageType == "SETTLEMENT") {
        this.surePage = false;
        this.getAgentSettleUnit(this.settleNo).then(empowerList => {
          this.dataList = { ...empowerList }

        });
      } else if (this.pageType == "SETTLESURE") {
        this.surePage = true;
        this.getAgentSettleUnit(this.settleNo).then(empowerList => {
          this.dataList = { ...empowerList }
        });
      }

    },
    save() {
      if (this.pageType == "SETTLEMENT") {
        if (!this.validator.isEmpty(this.dataList.orderNo)) {
          this.MessageBox.alert("请输入订单编号！");
          return;
        }
        this.btnDisabled = true;
        // 结算
        let newObj = utils.pickObj(this.dataList, [
          "settleNo", "agentNo", "orderNo", "receiveMan",
          "accountNo", "bankName", "settlePrice",
          "customerNumber", "agentPhone"])
        this.postUpdateSettlesAc({ ...newObj }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
            let row = { ...this.dataList };
            row.status = "SUCCESS";
            this.$store.commit("SETTLE_UPDATA", row);
          }
        });
      } else if (this.pageType == "SETTLESURE") {
        if (!this.validator.isEmpty(this.dataList.receiveMan)) {
          this.MessageBox.alert("请输入对公账户名称！");
          return;
        }
        if (!this.validator.isEmpty(this.dataList.accountNo)) {
          this.MessageBox.alert("请输入收款账号！");
          return;
        }
        if (!this.validator.isEmpty(this.dataList.bankName)) {
          this.MessageBox.alert("请输入开户行！");
          return;
        }
        this.btnDisabled = true;
        // 编辑
        let newObj = utils.pickObj(this.dataList, [
          "settleNo", "agentNo", "bankName", "accountNo", "receiveMan"])
        this.postUpdateSettlesAc({ ...newObj }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
            let row = { ...this.dataList };
            row.status = "SUCCESS";
            this.$store.commit("SETTLE_UPDATA", row);
          }
        });
      }
    },
  }
};
</script>

<style>

</style>
