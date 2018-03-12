<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="btnDisabled" type="danger" @click="saveRefus">拒绝</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="saveAdopt">通过</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="服务商编号" v-model="unitData.agentNo" placeholder="请输入服务商编号" :disabled="true"></mt-field>
        <mt-field type="text" label="采购单号" v-model="unitData.receiptNo" placeholder="请输入采购单号" :disabled="true"></mt-field>
        <mt-field type="text" label="申请数量" v-model="unitData.qrcodeCount" placeholder="请输入申请数量"></mt-field>
        <mt-field type="text" label="采购单价" v-model="unitData.price" placeholder="请输入采购单价"></mt-field>
        <mt-field type="text" v-if="pageType == 'SCANCODEGUN'" label="前缀" v-model="unitData.prefixNo" placeholder="请输入序列号前缀"></mt-field>

        <mt-field @click.native="$refs.MigratePicker.open" type="text" label="分发方式" :value="migratePickerModle.name" placeholder="请选择分发方式" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field type="text" v-if="migratePickerModle.code == 'OUT_ORDER'" label="授权码序列号" v-model="unitData.qrcodes" placeholder="请输入授权码序列号"></mt-field>
        <mt-field type="text" v-if="migratePickerModle.code == 'ORDER'" label="开始号段" v-model="unitData.qrcodeStart" placeholder="请输入开始号段"></mt-field>
        <mt-field type="text" v-if="migratePickerModle.code == 'ORDER'" label="结束号段" v-model="unitData.qrcodeEnd" placeholder="请输入结束号段"></mt-field>
      </input-wrapper>
    </view-radius>
    <picker ref="MigratePicker" v-model="migratePickerModle" :slotsActions="migrateTaxActions" @confirm="openMigratePickerChange"></picker>
  </full-page>
</template>

<script>
import Picker from "@src/components-app/SelectPicker/Picker";
import { mapState, mapActions } from "vuex";
export default {
  components: { Picker },
  data() {
    return {
      btnDisabled: false,
      migratePickerModle: {},
      unitData: {
        receiptNo: "",
        agentNo: "",
        migrateType: "",
        qrcodeCount: "",
        price: "",
        prefixNo: "",
        qrcodeStart: "",
        qrcodeEnd: "",
        qrcodes: ""
      },
      migrateTaxActions: [
        {
          name: "根据序列号",
          code: "OUT_ORDER"
        },
        {
          name: "根据号段",
          code: "ORDER"
        }
      ],
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        AUTHCODE: "授权码",
        SCANCODEGUN: "扫码枪"
      },
      receiptNo: this.$route.params["receiptNo"]
    };
  },
  created() {
    this.getEmpowerCheckUnit(this.receiptNo).then(data => {
      this.unitData = Object.assign(this.unitData, data);
      //设置默认转移方式
      this.openMigratePickerChange({
        name: "根据序列号",
        code: "OUT_ORDER"
      });
    });
  },
  methods: {
    ...mapActions([
      "getEmpowerCheckUnit",
      "adoptEmpowerCheck",
      "refuseEmpowerCheck"
    ]),
    // 通过
    saveAdopt() {
      this.btnDisabled = true;
      this.adoptEmpowerCheck(this.unitData).then(flag => {
        this.btnDisabled = false;
        if (flag) { this.$router.back(); }
      });
    },
    // 拒绝
    saveRefus() {
      this.btnDisabled = true;
      this.refuseEmpowerCheck(this.unitData).then(flag => {
        this.btnDisabled = false;
        if (flag) this.$router.back();
      });
    },
    // 选择分发方式
    openMigratePicker() {
      this.$refs.MigratePicker.open();
    },
    // 分发方式选择结构
    openMigratePickerChange(obj) {
      this.migratePickerModle = obj;
      this.unitData.migrateType = obj.code;
    }
  }
};
</script>

<style>

</style>
