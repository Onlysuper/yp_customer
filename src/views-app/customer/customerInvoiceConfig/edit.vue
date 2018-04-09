<template>
  <full-page-popup v-model="visible" position="bottom">
    <mt-header slot="header" :title="pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="close">关闭</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="商户编号" placeholder="请输入商户编号" :disabled="true" :disableClear="true" :readonly="true" v-model="customer.customerNo" v-if="pageType == 'EDIT'"></mt-field>
        <mt-field type="text" label="商户编号" placeholder="请输入商户编号" :disabled="false" :disableClear="false" :readonly="false" v-model="customer.customerNo" v-if="pageType == 'ADD'"></mt-field>
        <mt-field @click.native="$refs.invoiceLocationPicker.open" type="text" label="开票地区" placeholder="请选择开票地区" :value="customer.invoiceLocation" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <div @click="setSheet('deviceTypes')">
          <mt-field type="text" label="设备类型" placeholder="请选择设备类型" :value="customer.deviceType | statusFilter('handleDeviceType')" :disabled="true" :disableClear="true" :readonly="true">
            <i class="icon-arrow"></i>
          </mt-field>
        </div>
        <div @click="setSheet('clientTypes')">
          <mt-field type="text" label="客户端类型" placeholder="请选择客户端类型" :value="customer.clientType | statusFilter('handleClientType')" :disabled="true" :disableClear="true" :readonly="true">
            <i class="icon-arrow"></i>
          </mt-field>
        </div>
        <mt-field type="text" label="设备编号" placeholder="请输入设备编号" v-model="customer.deviceNo"></mt-field>
        <mt-field type="text" label="收款人" placeholder="请输入收款人" v-model="customer.receiveMan"></mt-field>
        <mt-field type="text" label="开票人" placeholder="请输入开票人" v-model="customer.invoiceMan"></mt-field>
        <mt-field type="text" label="复核人" placeholder="请输入复核人" v-model="customer.checkMan"></mt-field>
      </input-wrapper>
    </view-radius>

    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
    <picker ref="invoiceLocationPicker" v-model="invoiceLocation" :slotsActions="invoiceAreaOptions" @confirm="invoiceLocationPickerChange"></picker>
  </full-page-popup>
</template>

<script>
import Picker from "@src/components-app/SelectPicker/Picker";
import { postEditCustomerConfigs, postAddCustomerConfigs } from "@src/apis";
import invoiceAreaJson from "@src/data/invoiceArea.json"
export default {
  components: {
    Picker
  },
  data() {
    return {
      visible: false,
      btnDisabled: false,
      customer: {},
      invoiceLocation: {},
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
      actions: [],
      pageType: "",
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  methods: {
    invoiceLocationPickerChange(obj) {
      this.invoiceLocation = obj;
      this.customer.invoiceLocation = obj.code;
    },
    close() {
      this.visible = false;
    },
    open(customer, type) {
      this.pageType = type;
      this.customer = Object.assign({}, customer);
      this.visible = true;
    },
    setSheet(type) {
      if (type == "deviceTypes") this.actions = this.deviceTypes;
      else if (type == "clientTypes") this.actions = this.clientTypes;
      this.sheetVisible = true;
    },
    transfer(obj) {
      if (obj.mode == "deviceTypes") this.customer.deviceType = obj.type;
      else if (obj.mode == "clientTypes") this.customer.clientType = obj.type;
    },
    save() {
      if (!this.validator.isEmpty(this.customer.customerNo)) {
        this.MessageBox.alert("商户编号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.invoiceLocation)) {
        this.MessageBox.alert("请选择开票地区！");
        return;
      }
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

      this.btnDisabled = true;

      let api =
        this.pageType == "EDIT"
          ? postEditCustomerConfigs
          : postAddCustomerConfigs;

      api()({
        customerNo: this.customer.customerNo,
        deviceType: this.customer.deviceType,
        clientType: this.customer.clientType,
        deviceNo: this.customer.deviceNo,
        receiveMan: this.customer.receiveMan,
        invoiceMan: this.customer.invoiceMan,
        checkMan: this.customer.checkMan,
        invoiceLocation: this.customer.invoiceLocation
      }).then(data => {
        this.btnDisabled = false;
        if (data.code == "00") {
          this.Toast(this.pageTitle[this.pageType] + "成功");
          this.pageType == "EDIT"
            ? this.$parent.updata(this.customer)
            : this.$parent.$refs.MypLoadmoreApi.load();
          this.close();
        } else {
          this.Toast(data.msg);
        }
      });
    }
  },
  computed: {
    invoiceAreaOptions() {
      let arr_ = invoiceAreaJson.map(item => {
        return { name: item.name, code: item.name }
      })
      return arr_
    }
  }
};
</script>

<style>

</style>
