<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 审核授权码采购清单 -->
        <template v-if="pageType == 'AUTHCHECK'">
          <mt-field type="text" :disabled="true" label="购方名称" placeholder="请输入购方名称" v-model="unitData.enterpriseName"></mt-field>
          <mt-field type="text" label="采购单号" placeholder="请输入采购单号" v-model="unitData.receiptNo"></mt-field>
          <mt-field type="text" label="服务商编号" placeholder="请输入服务商编号" v-model="unitData.agentNo"></mt-field>
          <mt-field type="text" label="申请数量" placeholder="请输入申请数量" v-model="unitData.qrcodeCount"></mt-field>
          <mt-field type="text" label="采购单价" placeholder="请输入采购单价" v-model="unitData.price"></mt-field>
          <div @click="openMigratePicker">
            <mt-field type="text" label="分发方式" placeholder="请选择分发方式" :value="unitData.migrateType | handleTaxRate" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
        </template>
        <!--扫码枪审核-->
        <template v-if="pageType == 'SCANCHECK'">
          <mt-field type="text" :disabled="true" label="购方名称" placeholder="请输入购方名称" v-model="unitData.enterpriseName"></mt-field>
          <mt-field type="text" label="采购单号" placeholder="请输入采购单号" v-model="unitData.receiptNo"></mt-field>
          <mt-field type="text" label="服务商编号" placeholder="请输入服务商编号" v-model="unitData.agentNo"></mt-field>
          <mt-field type="text" label="申请数量" placeholder="请输入申请数量" v-model="unitData.qrcodeCount"></mt-field>
          <mt-field type="text" label="采购单价" placeholder="请输入采购单价" v-model="unitData.price"></mt-field>
          <div @click="openMigratePicker">
            <mt-field type="text" label="分发方式" placeholder="请选择分发方式" :value="unitData.migrateType | handleTaxRate" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
        </template>
      </input-wrapper>
    </view-radius>
    <migrate-picker ref="MigratePicker">
    </migrate-picker>
  </full-page>
</template>

<script>
import MigratePicker from "@src/components-app/SelectPicker/MigratePicker";
import { mapState, mapActions } from "vuex";
export default {
  components: { MigratePicker },
  data() {
    return {
      btnDisabled: false,
      unitData: {
        enterpriseName: "",
        taxNo: "",
        enterpriseAddress: "",
        bankName: "",
        bankAccountNo: "",
        companyPhone: "",
        bussinessName: "",
        billAmount: ""
      },
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        AUTHCHECK: "审核授权码采购清单",
        SCANCHECK: "扫码枪审核"
      },
      receiptNo: this.$route.params["receiptNo"]
    };
  },
  mounted() {
    this.pageType == "AUTHCHECK" &&
      this.getUnit(this.receiptNo).then(data => {
        this.unitData = Object.assign(this.unitData, data);
      });
  },
  methods: {
    ...mapActions(["getUnit", "updataUnit"]),
    save() {
      this.btnDisabled = true;
      if (this.pageType == "AUTHCHECK") {
        this.updataUnit(this.unitData).then(flag => {
          this.btnDisabled = false;
          if (flag) this.$router.back({ query: { d: 11 } });
        });
      } else if (this.pageType == "SCANCHECK") {
        this.updataUnit(this.unitData).then(flag => {
          this.btnDisabled = false;
          if (flag) this.$router.back({ query: { d: 11 } });
        });
      }
    },
    // 选择分发方式
    openMigratePicker() {
      this.$refs.MigratePicker.open();
    }
  }
};
</script>

<style>

</style>
