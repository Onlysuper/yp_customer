<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 编辑表单 -->
           <mt-field v-if="pageType == 'ADD'?true:false" @click.native="$refs.bussinessTypePicker.open" type="text" label="商户类型" placeholder="请选择商户类型" :value="bussinessTypeModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-field :disabled="pageType == 'EDIT'?true:false" type="text" label="商户编号" placeholder="请输入商户编号" v-model="good.bussinessNo"></mt-field>
          <mt-field @click.native="$refs.statusPicker.open" type="text" label="状态" placeholder="请选择状态" :value="statusModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-field type="text" label="邮箱" placeholder="请输入邮箱" v-model="good.contactEmail"></mt-field>
        <!-- </template> -->
      </input-wrapper>
    </view-radius>
    <picker ref="bussinessTypePicker" v-model="bussinessTypeModle" :slotsActions="bussinessTypeOptions" @confirm="bussinessTypePickerChange"></picker>
    <picker ref="statusPicker" v-model="statusModle" :slotsActions="emailStatusOptions" @confirm="statusPickerChange"></picker>
  </full-page>
</template>
<style  lang='scss' scoped>
.inputoption-box {
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1.28rem;
  .inputoption_title {
    line-height: 3;
    width: 8.8rem;
  }
  input {
    color: #666;
    opacity: 1;
    &::-webkit-input-placeholder {
      font-size: 1.28rem;
    }
  }
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import taxJson from "@src/data/tax.json";
import discountJson from "@src/data/discount.json";
import enjoyJson from "@src/data/enjoy.json";
// import goodsNoJson from "@src/data/goodsNo.json";
import { getsmartgoodscodeCustomerGood } from "@src/apis";
import SearchModle from "@src/components-app/SearchModle";
import utils from "@src/common/utils";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  mixins: [statusFilterQuery],
  components: {
    Picker,
    SearchModle
  },
  data() {
    return {
      btnDisabled: false,
      bussinessNo: this.$route.query["bussinessNo"],
      pageType: this.$route.query["pageType"] || "ADD",
      bussinessTypeOptions: [],
      bussinessTypeModle: {},
      emailStatusOptions: [],
      statusModle: {},
      good: {
        status: "",
        bussinessType: "",
        bussinessNo: "",
        contactEmail: ""
      },
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    this.emailStatusOptions = this.statusFilterQuery('emailStatus');
    this.bussinessTypeOptions = this.statusFilterQuery('emailBussinessType');
    this.pageType == "EDIT" &&
      this.getEmailUnit(this.bussinessNo).then(good => {
        let newGood = utils.pickObj(good, [
          "status",
          "bussinessType",
          "bussinessNo",
          "contactEmail"
        ]);
        this.good = Object.assign(this.good, newGood);
        this.echoForm(this.good);
      });
  },
  methods: {
    ...mapActions(["getEmailUnit", "postAddEmailconfig", "postEditEmailconfig"]),
    changeName(val) {
      this.good.goodsName = val;
    },
    //回显信息
    echoForm(good) {
      //商户类型
      let bussinessType = this.bussinessTypeOptions.find(item => item.code == good.bussinessType);
      this.bussinessTypePickerChange(bussinessType || {});
      //状态
      let status = this.emailStatusOptions.find(item => item.code == good.status);
      this.statusPickerChange(status || {});
    },
    //设置费率
    bussinessTypePickerChange(obj) {
      this.bussinessTypeModle = obj;
      this.good.bussinessType = obj.code;
    },
    //状态
    statusPickerChange(obj) {
      this.statusModle = obj;
      this.good.status = obj.code;
    },
    save() {
      if (!this.validator.isEmpty(this.good.bussinessType)) {
        this.MessageBox.alert("请选择商户类型");
        return;
      }
      if (!this.validator.isEmpty(this.good.bussinessNo)) {
        this.MessageBox.alert("商户编号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.status)) {
        this.MessageBox.alert("请选择状态！");
        return;
      }
      if (!this.validator.isEmpty(this.good.contactEmail)) {
        this.MessageBox.alert("邮箱不能为空");
        return;
      }
      let sendata = { ...this.good };
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
        let senddata_ = utils.pickObj(sendata, [
          "bussinessNo", "contactEmail", "status", "bussinessType"
        ]);
        this.postEditEmailconfig({ ...senddata_ }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        })
      } else {
        this.postAddEmailconfig({ ...sendata }).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$store.commit("EMAIL_IS_SEARCH", true);
            this.$router.back();
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
