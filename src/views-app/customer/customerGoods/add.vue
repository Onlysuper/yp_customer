<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 添加表单 -->
        <template v-if="pageType == 'ADD'">
          <mt-field @click.native="$refs.searchList.open" type="text" label="商品名称" placeholder="请输入商品名称" v-model="good.goodsName" v-readonly-ios :readonly="true"></mt-field>
          <mt-field type="text" label="统一编码" placeholder="请输入统一编码" v-model="good.unionNo"></mt-field>
          <mt-field type="text" label="商品类别简称" placeholder="请输入商品类别简称" v-model="good.goodsFirstType"></mt-field>
          <mt-field type="text" label="商品类别名称" placeholder="请输入商品类别名称" v-model="good.goodsType"></mt-field>
          <mt-field @click.native="$refs.TaxratePicker.open" type="text" label="税率" placeholder="请选择税率" :value="taxModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-cell :title="'是否为成品油商品 '">
            <mt-switch v-model="typeSwitch" @change="typeChange"></mt-switch>
          </mt-cell>
          <mt-field type="text" label="商户编号" placeholder="请输入商户编号" v-model="good.customerNo"></mt-field>
          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>
          <mt-field @click.native="$refs.EnjoyPicker.open" type="text" label="享受优惠" placeholder="请选择享受优惠" :value="enjoyModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-field @click.native="$refs.DiscountPicker.open" type="text" label="优惠类型" placeholder="请选择优惠类型" :value="discountModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
        </template>
      </input-wrapper>
    </view-radius>
    <mt-actionsheet :actions="goodsActions" v-model="goodsVisible" cancelText="取消"></mt-actionsheet>
    <picker ref="TaxratePicker" v-model="taxModle" :slotsActions="taxActions" @confirm="taxratePickerChange"></picker>
    <picker ref="DiscountPicker" v-model="discountModle" :slotsActions="discountActions" @confirm="discountPickerChange"></picker>
    <picker ref="EnjoyPicker" v-model="enjoyModle" :slotsActions="enjoyActions" @confirm="enjoyPickerChange"></picker>
    <search-modle @changeName="changeName" @watchDataList="watchDataList" :defaultVal="good.goodsName" @initData="goodsInit" ref="searchList">
      <li class="border-bottom-1px _av" @click="goodsNameChange(item)" v-for="(item,index) in queryList" :key="index">
        {{item.name}}
      </li>
    </search-modle>
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
import goodsNoJson from "@src/data/goodsNo.json";
import { getsmartgoodscodeCustomerGood } from "@src/apis";
import SearchModle from "@src/components-app/SearchModle";
// import SearchNameList from "@src/components-app/SearchNameList";
import utils from "@src/common/utils";
export default {
  components: {
    Picker,
    SearchModle
    // SearchNameList
  },
  data() {
    return {
      queryList: [],
      goodsActions: [],
      goodsName: "", // 商品名称
      goodsNameOptions: [], // 商品名称 智能编码
      btnDisabled: false,
      typeSwitch: false,
      good: {
        goodsName: "",
        unionNo: "",
        goodsFirstType: "",
        goodsType: "",
        goodsNo: "",
        customerNo: "",
        unit: "",
        unitPrice: "",
        model: "",
        taxRate: "0",
        enjoyDiscount: "0",
        discountType: "10",
        type: "FALSE"
      },
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      },
      goodsNo: this.$route.params["goodsNo"],

      goodsVisible: false,
      goodsModel: {},
      taxModle: {},
      taxActions: taxJson,
      discountModle: {},
      discountActions: discountJson,
      enjoyModle: {},
      enjoyActions: enjoyJson
    };
  },
  created() { },
  methods: {
    ...mapActions(["getGood", "updataGood", "addGood"]),
    //设置费率
    taxratePickerChange(obj) {
      this.taxModle = obj;
      this.good.taxRate = obj.code;
    },
    //设置享受优惠
    enjoyPickerChange(obj) {
      this.enjoyModle = obj;
      this.good.enjoyDiscount = obj.code;
    },
    typeChange(obj) {
      if (obj) {
        this.good.type = "FALSE"
      } else {
        this.good.type = "TRUE"
      }
    },
    //设置优惠类型
    discountPickerChange(obj) {
      this.discountModle = obj;
      this.good.discountType = obj.code;
    },

    // 商品名称智能编码
    goodsInit(val) {
      this.goodsName = "";
    },
    goodsNameChange(item) {
      console.log(item);
      this.good.unionNo = item.code;
      this.good.goodsType = item.name;
      this.good.goodsFirstType = item.shortName;
      this.good.goodsName = item.goodsName || this.good.goodsName;
      let tax = this.taxActions.find(row => {
        return row.code == item.rate;
      });
      this.taxratePickerChange(tax || {});
      this.$refs.searchList.getNameClose(this.good.goodsName);
    },
    watchDataList(data) {
      this.queryList = data;
    },
    changeName(val) {
      this.good.goodsName = val;
    },
    // 检验税号是否存在
    checkTaxRateHave(code, type) {
      let index_ = this.taxActions.findIndex(item => {
        return item.code == code;
      });
      if (index_ == "-1") {
        this.MessageBox.alert("税号不存在！");
        return false;
      } else {
        return true;
      }
    },
    save() {
      if (!this.validator.isEmpty(this.good.goodsName)) {
        this.MessageBox.alert("商品名称不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.customerNo)) {
        this.MessageBox.alert("商户编号不能为空");
        return;
      }
      if (!this.validator.isEmpty(this.good.model)) {
        this.MessageBox.alert("规格型号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.unit)) {
        this.MessageBox.alert("单位不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.unitPrice)) {
        this.MessageBox.alert("含税单价不能为空！");
        return;
      }
      if (
        !this.validator.isEmpty(this.good.taxRate) &&
        this.good.taxRate != "0"
      ) {
        this.MessageBox.alert("请选择税率！");
        return;
      }
      if (!this.validator.isEmpty(this.good.enjoyDiscount)) {
        this.MessageBox.alert("请选择享受优惠！");
        return;
      }
      if (!this.validator.isEmpty(this.good.discountType)) {
        this.MessageBox.alert("请选择优惠类型！");
        return;
      }
      if (!this.checkTaxRateHave) {
        return false;
      }
      let sendata = { ...this.good };
      this.btnDisabled = true;
      this.addGood({ ...sendata }).then(flag => {
        this.btnDisabled = false;
        if (flag) {
          this.$store.commit("IS_RELOAD_GOOD", true);
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style>

</style>
