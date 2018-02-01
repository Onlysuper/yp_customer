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
          <mt-field @click.native="goodsVisible = true" type="text" label="商品编码" placeholder="请选择商品编码" :value="goodsModel.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
          <mt-field type="text" label="商户编号" placeholder="请输入商品编号" v-model="good.customerNo"></mt-field>
          <mt-field type="text" label="商品名称" placeholder="请输入商品名称" v-model="good.goodsName"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>
          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <mt-field @click.native="$refs.TaxratePicker.open" type="text" label="税率" placeholder="请选择税率" :value="taxModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
          <mt-field @click.native="$refs.EnjoyPicker.open" type="text" label="享受优惠" placeholder="请选择享受优惠" :value="enjoyModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
          <mt-field @click.native="$refs.DiscountPicker.open" type="text" label="优惠类型" placeholder="请选择优惠类型" :value="discountModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
        </template>

        <!-- 编辑表单 -->
        <template v-if="pageType == 'EDIT'">
          <mt-field @click.native="goodsVisible = true" type="text" label="商品编码" placeholder="请选择商品编码" :value="goodsModel.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
          <mt-field type="text" label="商品名称" placeholder="请输入商品名称" v-model="good.goodsName"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>
          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <mt-field @click.native="$refs.TaxratePicker.open" type="text" label="税率" placeholder="请选择税率" :value="taxModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
          <mt-field @click.native="$refs.EnjoyPicker.open" type="text" label="享受优惠" placeholder="请选择享受优惠" :value="enjoyModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
          <mt-field @click.native="$refs.DiscountPicker.open" type="text" label="优惠类型" placeholder="请选择优惠类型" :value="discountModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-admin"></i>
          </mt-field>
        </template>

      </input-wrapper>
    </view-radius>
    <mt-actionsheet :actions="goodsActions" v-model="goodsVisible" cancelText="取消"></mt-actionsheet>
    <picker ref="TaxratePicker" v-model="taxModle" :slotsActions="taxActions" @confirm="taxratePickerChange"></picker>
    <picker ref="DiscountPicker" v-model="discountModle" :slotsActions="discountActions" @confirm="discountPickerChange"></picker>
    <picker ref="EnjoyPicker" v-model="enjoyModle" :slotsActions="enjoyActions" @confirm="enjoyPickerChange"></picker>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import taxJson from "@src/data/tax.json";
import discountJson from "@src/data/discount.json";
import enjoyJson from "@src/data/enjoy.json";
import goodsNoJson from "@src/data/goodsNo.json";
export default {
  components: {
    Picker
  },
  data() {
    return {
      btnDisabled: false,
      good: {
        unionNo: "3070401000000000000",
        taxRate: "0",
        enjoyDiscount: "0",
        discountType: "10"
      },
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      },
      goodsNo: this.$route.params["goodsNo"],

      goodsVisible: false,
      goodsModel: {},
      goodsActions: goodsNoJson.map(item => {
        item.method = this.goodsActionChange;
        return item;
      }),

      taxModle: {},
      taxActions: taxJson,
      discountModle: {},
      discountActions: discountJson,
      enjoyModle: {},
      enjoyActions: enjoyJson
    };
  },
  created() {
    this.pageType == "EDIT" &&
      this.getGood(this.goodsNo).then(good => {
        this.good = Object.assign(this.good, good);
        this.echoForm(this.good);
      });
  },
  methods: {
    ...mapActions(["getGood", "updataGood", "addGood"]),

    //回显信息
    echoForm(good) {
      //回显商品编码
      let unionNo = this.goodsActions.find(item => item.code == good.unionNo);
      this.goodsActionChange(unionNo || {});

      //回显费率
      let tax = this.taxActions.find(item => item.code == good.taxRate);
      this.taxratePickerChange(tax || {});

      //回显享受优惠
      let enjoyDiscount = this.enjoyActions.find(
        item => item.code == good.enjoyDiscount
      );
      this.enjoyPickerChange(enjoyDiscount || {});

      //回显优惠类型
      let discountType = this.discountActions.find(
        item => item.code == good.discountType
      );
      this.discountPickerChange(discountType || {});
    },

    //选择商品结果
    goodsActionChange(obj) {
      this.goodsModel = obj;
      this.good.unionNo = obj.code;
    },

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

    //设置优惠类型
    discountPickerChange(obj) {
      this.discountModle = obj;
      this.good.discountType = obj.code;
    },

    save() {
      if (!this.validator.isEmpty(this.good.customerNo)) {
        this.MessageBox.alert("商户编号不能为空");
        return;
      }
      if (!this.validator.isEmpty(this.good.unionNo)) {
        this.MessageBox.alert("请选择商品");
        return;
      }
      if (!this.validator.isEmpty(this.good.goodsName)) {
        this.MessageBox.alert("商品名称不能为空！");
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

      this.btnDisabled = true;
      this.pageType == "EDIT"
        ? this.updataGood(this.good).then(flag => {
            this.btnDisabled = false;
            if (flag) this.$router.back({ query: { d: 11 } });
          })
        : this.addGood(this.good).then(flag => {
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
