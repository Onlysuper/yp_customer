<template>
  <!-- 预览 -->
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="saveAdopt">通过</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="saveRefus">拒绝</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 预览 -->
        <template v-if="pageType == 'PREVIEW'">
          <mt-field type="text" :disabled="true" label="采购单号" placeholder="请输入采购单号" v-model="unitData.receiptNo"></mt-field>
          <mt-field type="text" :disabled="true" label="服务商编号" placeholder="请输入服务商编号" v-model="unitData.agentNo"></mt-field>
          <mt-field type="text" :disabled="true" label="申请数量" placeholder="请输入申请数量" v-model="unitData.qrcodeCount"></mt-field>
          <mt-field type="text" label="采购单价" placeholder="请输入采购单价" v-model="unitData.price"></mt-field>
          <div @click="openMigratePicker">
            <mt-field type="text" label="分发方式" placeholder="请选择分发方式" :value="unitData.migrateType | statusFilter('migrateType')">
            </mt-field>
          </div>
          <mt-field type="text" v-if="qrNumsVisible" label="号段开始" placeholder="请输入号段" v-model="unitData.qrcodeStart"></mt-field>
          <mt-field type="text" v-if="qrNumsVisible" label="号段结束" placeholder="请输入号段" v-model="unitData.qrcodeEnd"></mt-field>
          <mt-field type="text" v-if="qrcodesVisible" label="授权码序列号" placeholder="请输入授权码序列号" v-model="unitData.qrcodes"></mt-field>
        </template>
        <!--编辑-->
        <template v-if="pageType == 'EDIT'">
          <mt-field type="text" :disabled="true" label="服务商编号" placeholder="请输入服务商编号" v-model="unitData.agentNo"></mt-field>
          <mt-field type="text" label="采购单号" placeholder="请输入采购单号" v-model="unitData.receiptNo"></mt-field>
          <mt-field type="text" label="申请数量" placeholder="请输入申请数量" v-model="unitData.qrcodeCount"></mt-field>
          <mt-field type="text" label="采购单价" placeholder="请输入采购单价" v-model="unitData.price"></mt-field>
          <mt-field type="text" label="序列号前缀" placeholder="请输入序列号前缀" v-model="unitData.prefixNo"></mt-field>
          <div @click="openMigratePicker">
            <mt-field type="text" label="分发方式" placeholder="请选择分发方式" :value="unitData.migrateType">
            </mt-field>
          </div>
          <mt-field type="text" v-if="qrNumsVisible" label="号段开始" placeholder="请输入号段" v-model="unitData.qrcodeStart"></mt-field>
          <mt-field type="text" v-if="qrNumsVisible" label="号段结束" placeholder="请输入号段" v-model="unitData.qrcodeEnd"></mt-field>
          <mt-field type="text" v-if="qrcodesVisible" label="授权码序列号" placeholder="请输入授权码序列号" v-model="unitData.qrcodes"></mt-field>
        </template>
        <!-- 绑定 -->
        <template v-if="pageType == 'BIND'">
        </template>
        <!-- 解绑 -->
        <template v-if="pageType == 'UNBIND'">
        </template>
        <!-- 绑定子码 -->
        <template v-if="pageType == 'BINDCHILD'">
        </template>
      </input-wrapper>
    </view-radius>
    <migrate-picker ref="MigratePicker" @change="openMigratePickerChange">
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
      qrNumsVisible: false,
      qrcodesVisible: false,
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
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        AUTHCHECK: "审核授权码采购清单",
        SCANCHECK: "扫码枪审核"
      },
      receiptNo: this.$route.params["receiptNo"]
    };
  },
  created() {
    this.getEmpowerCheckUnit(this.receiptNo).then(data => {
      console.log(data);
      this.unitData = Object.assign(this.unitData, data);
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
      if (!this.validator.isEmpty(this.unitData.price)) {
        this.MessageBox.alert("单价不能为空");
        return;
      }
      if (!this.validator.isEmpty(this.unitData.migrateType)) {
        this.MessageBox.alert("分发方式不能为空");
        return;
      }
      this.btnDisabled = true;
      this.adoptEmpowerCheck(this.unitData).then(flag => {
        this.btnDisabled = false;
        if (flag) this.$router.back({ query: { d: 11 } });
      });
    },
    // 拒绝
    saveRefus() {
      if (!this.validator.isEmpty(this.unitData.price)) {
        this.MessageBox.alert("单价不能为空");
        return;
      }
      if (!this.validator.isEmpty(this.unitData.migrateType)) {
        this.MessageBox.alert("分发方式不能为空");
        return;
      }
      this.btnDisabled = true;
      this.refuseEmpowerCheck(this.unitData).then(flag => {
        this.btnDisabled = false;
        if (flag) this.$router.back({ query: { d: 11 } });
      });
    },
    // 选择分发方式
    openMigratePicker() {
      this.$refs.MigratePicker.open();
    },
    // 分发方式选择结构
    openMigratePickerChange(obj) {
      if (obj.value == "ORDER") {
        //号段转移
        this.qrNumsVisible = true;
        this.qrcodesVisible = false;
      } else if (obj.value == "OUT_ORDER") {
        this.qrcodesVisible = true;
        this.qrNumsVisible = false;
      }
      this.unitData.migrateType = obj.value;
    }
  }
};
</script>

<style>

</style>
