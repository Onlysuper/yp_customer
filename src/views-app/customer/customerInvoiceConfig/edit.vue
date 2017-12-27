<template>
  <full-page-popup v-model="visible" position="bottom">
    <mt-header slot="header" title="编辑">
      <mt-button slot="left" :disabled="false" type="danger" @click="close">关闭</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="商户编号" :disabled="true" :disableClear="true" :readonly="true" v-model="customer.customerNo"></mt-field>
        <div @click="setSheetVisible('deviceTypes')">
          <mt-field type="text" label="设备类型" placeholder="请选择设备类型" :value="deviceTypeText" :disabled="true" :disableClear="true" :readonly="true">
            <i class="icon-admin"></i>
          </mt-field>
        </div>
        <div @click="setSheetVisible('clientTypes')">
          <mt-field type="text" label="客户端类型" placeholder="请选择客户端类型" :value="clientTypeText" :disabled="true" :disableClear="true" :readonly="true">
            <i class="icon-admin"></i>
          </mt-field>
        </div>
        <mt-field type="text" label="设备编号" placeholder="请输入设备编号" v-model="customer.deviceNo"></mt-field>
        <mt-field type="text" label="收款人" placeholder="请输入收款人" v-model="customer.receiveMan"></mt-field>
        <mt-field type="text" label="开票人" placeholder="请输入开票人" v-model="customer.invoiceMan"></mt-field>
        <mt-field type="text" label="复核人" placeholder="请输入复核人" v-model="customer.checkMan"></mt-field>
      </input-wrapper>
    </view-radius>

    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
  </full-page-popup>
</template>

<script>
import { postAddCustomer, postEditCustomer } from "@src/apis";
export default {
  data() {
    return {
      visible: false,
      btnDisabled: false,
      customer: {},
      sheetVisible: false,
      deviceTypes: [
        {
          mode: "deviceTypes",
          name: "金税盘",
          type: "HX_PAN",
          method: this.transfer
        },
        {
          mode: "deviceTypes",
          name: "税控盘",
          type: "BW_PAN",
          method: this.transfer
        }
      ],
      clientTypes: [
        {
          mode: "clientTypes",
          name: "浏览器",
          type: "BROWER",
          method: this.transfer
        },
        {
          mode: "clientTypes",
          name: "桌面客户端",
          type: "CLIENT",
          method: this.transfer
        }
      ],
      actions: []
    };
  },
  computed: {
    deviceTypeText() {
      switch (this.customer.deviceType) {
        case "HX_PAN":
          return "金税盘";
          break;
        case "BW_PAN":
          return "税控盘";
          break;
        default:
          return "";
      }
    },
    clientTypeText() {
      switch (this.customer.clientType) {
        case "BROWER":
          return "浏览器";
          break;
        case "CLIENT":
          return "桌面客户端";
          break;
        default:
          return "";
      }
    }
  },
  methods: {
    close() {
      this.customer = {};
      this.visible = false;
    },
    open(customer, type) {
      this.customer = Object.assign({}, customer);
      this.visible = true;
    },
    setSheetVisible(type) {
      if (type == "deviceTypes") this.actions = this.deviceTypes;
      else if (type == "clientTypes") this.actions = this.clientTypes;
      this.sheetVisible = true;
    },
    transfer(obj) {
      if (obj.mode == "deviceTypes") this.customer.deviceType = obj.type;
      else if (obj.mode == "clientTypes") this.customer.clientType = obj.type;
    },
    save() {
      if (!this.validator.isEmpty(this.customer.deviceType)) {
        this.MessageBox.alert("请选择设备类型！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.clientType)) {
        this.MessageBox.alert("请选择客户端类型！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.deviceNo)) {
        this.MessageBox.alert("设备编号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.receiveMan)) {
        this.MessageBox.alert("收款人不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.invoiceMan)) {
        this.MessageBox.alert("开票人不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.checkMan)) {
        this.MessageBox.alert("复核人不能为空！");
        return;
      }
      return;
      this.btnDisabled = true;

      postEditCustomer()(this.customer).then(data => {
        this.btnDisabled = false;
        if (data.code == "00") {
          this.Toast("修改成功");
          this.$parent.updata(this.customer);
          this.close();
        } else {
          this.Toast(data.msg);
        }
      });
    }
  }
};
</script>

<style>

</style>
