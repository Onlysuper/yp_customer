<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!--编辑-->
        <template v-if="pageType == 'EDIT'">
          <mt-field type="text" :disabled="true" label="序列号" placeholder="请输入序列号" v-model="unitData.qrcode"></mt-field>
          <mt-field type="text" :disabled="true" label="授权码" placeholder="请输入授权码" v-model="unitData.authCode"></mt-field>
          <mt-field type="text" :disabled="true" label="合伙人编号" placeholder="请输入合伙人编号" v-model="unitData.agentNo"></mt-field>
          <mt-field type="text" :disabled="true" label="商户编号" placeholder="请输入商户编号" v-model="unitData.customerNo"></mt-field>
          <mt-field type="text" label="分机号" placeholder="请输入分机号" v-model="unitData.extensionNum"></mt-field>
          <div>
            <mt-cell title="服务方式" class="border-1px"></mt-cell>
            <mt-radio class="myp-radio border-1px" v-model="unitData.serviceMode" :options="selectOptions.serviceMode"></mt-radio>
          </div>
        </template>
      </input-wrapper>
    </view-radius>
    <!-- <migrate-picker ref="MigratePicker" @change="openMigratePickerChange">
    </migrate-picker> -->
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
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
      selectOptions: {
        serviceMode: [
          {
            label: "disabled option",
            value: "valueF",
            disabled: true
          },
          {
            label: "optionA",
            value: "valueA"
          },
          {
            label: "optionB",
            value: "valueB"
          }
        ]
      },
      pageType: this.$route.query["type"],
      pageTitle: {
        EDIT: "编辑"
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
    // 保存
    save() {
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
