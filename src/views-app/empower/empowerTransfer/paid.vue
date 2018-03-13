<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field @click.native="$refs.deviceTypePicker.open" type="text" label="设备类型" placeholder="请选择设备类型" :value="deviceType.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field @click.native="$refs.migrateTypePicker.open" type="text" label="上缴方式" placeholder="请选择上缴方式" :value="migrateType.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field type="text" label="序列号前缀" placeholder="请输入序列号前缀" v-model="empowerList.prefixNo"></mt-field>
        <mt-field v-if="visibleQrcodes" type="text" label="授权码序列号" placeholder="请输入授权码序列号" v-model="empowerList.qrcodes"></mt-field>
        <mt-field v-if="visibleQrNums" type="text" label="号段开始" placeholder="请输入号段开始" v-model="empowerList.qrcodeStart"></mt-field>
        <mt-field v-if="visibleQrNums" type="text" label="号段结束" placeholder="请输入号段结束" v-model="empowerList.qrcodeEnd"></mt-field>
        <mt-field type="text" label="转移数量" placeholder="请输入转移数量" v-model="empowerList.migrateCount"></mt-field>
      </input-wrapper>
    </view-radius>
    <picker ref="deviceTypePicker" v-model="deviceType" :slotsActions="deviceTypeActions" @confirm="deviceTypePickerChange"></picker>
    <picker ref="migrateTypePicker" v-model="migrateType" :slotsActions="migrateTypeActions" @confirm="migrateTypeChange"></picker>
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
export default {
  components: { Picker },
  data() {
    return {
      btnDisabled: false,
      pageType: this.$route.query["type"] || "PAID",
      visibleQrcodes: false,
      visibleQrNums: true,
      deviceType: {
        code: "AUTHCODE",
        name: "二维码"
      },
      migrateType: {
        code: "ORDER",
        name: "号段入库"
      },
      empowerList: {},
      pageTitle: {
        PAID: "授权码转移"
      },
      deviceTypeActions: [
        {
          code: "AUTHCODE",
          name: "二维码"
        },
        {
          code: "SCANCODEGUN",
          name: "扫码枪"
        }
      ],
      migrateTypeActions: [
        {
          code: "ORDER",
          name: "号段入库"
        },
        {
          code: "OUT_ORDER",
          name: "序列号入库"
        }
      ]
    };
  },
  mounted() { },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(["getEmpowerManageUnit", "paidEmpowerSave"]),
    save() {
      if (!this.validator.isEmpty(this.deviceType.name)) {
        this.MessageBox.alert("请选择分配方式！");
        return;
      } else if (!this.validator.isEmpty(this.migrateType.name)) {
        this.MessageBox.alert("请选择分配类型！");
        return;
      } else if (
        !this.validator.isEmpty(this.empowerList.qrcodes) &&
        this.migrateType.code == "OUT_ORDER"
      ) {
        this.MessageBox.alert("请输入授权码序列号！");
        return;
      } else if (
        !this.validator.isEmpty(this.empowerList.qrcodeStart) &&
        this.migrateType.code == "ORDER"
      ) {
        this.MessageBox.alert("请输入开始号段！");
        return;
      } else if (
        !this.validator.isEmpty(this.empowerList.qrcodeEnd) &&
        this.migrateType.code == "ORDER"
      ) {
        this.MessageBox.alert("请输入结束号段！");
        return;
      } else if (!this.validator.isEmpty(this.empowerList.migrateCount)) {
        this.MessageBox.alert("请输入转移数量！");
        return;
      }
      this.empowerList.deviceType = this.deviceType.code;
      this.empowerList.migrateType = this.migrateType.code;
      this.btnDisabled = true;
      if (this.pageType == "PAID") {
        this.paidEmpowerSave(this.empowerList).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$store.commit("QRCODEMIGRATE_SEARCH", true)
            this.$router.back();
          }
        });
      }
    },
    // 设备类型
    deviceTypePickerChange(obj) {
      this.deviceType = obj;
    },
    // 入库方式
    migrateTypeChange(obj) {
      if (obj.code == "ORDER") {
        // 号段入库
        this.visibleQrNums = true;
        this.visibleQrcodes = false;
      } else if (obj.code == "OUT_ORDER") {
        // 序列号入库
        this.visibleQrNums = false;
        this.visibleQrcodes = true;
      }
      this.migrateType = obj;
    }
  }
};
</script>

<style>

</style>
