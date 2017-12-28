<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 添加表单 -->
        <template v-if="pageType == 'ADD'">
          <mt-field type="text" label="商户编号" placeholder="请输入商品编号" v-model="good.customerNo"></mt-field>
          <div @click="openGoodsActions">
            <mt-field type="text" label="商品编码" placeholder="请选择商品编码" :value="good.unionNo | handleUnionNo" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
          <mt-field type="text" label="商品名称" placeholder="请输入商品名称" v-model="good.goodsName"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>
          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <div @click="openTaxratePicker">
            <mt-field type="text" label="税率" placeholder="请选择税率" :value="good.taxRate | handleTaxRate" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
          <div @click="openTypeenjoyPicker">
            <mt-field type="text" label="享受优惠" placeholder="请选择享受优惠" :value="good.enjoyDiscount | handleEnjoyDiscount" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
          <div @click="openDiscountPicker">
            <mt-field type="text" label="优惠类型" placeholder="请选择优惠类型" :value="good.discountType | handleDiscountType" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
        </template>

        <!-- 编辑表单 -->
        <template v-if="pageType == 'EDIT'">
          <mt-field type="text" label="商户编号" placeholder="请输入商品编号" v-model="good.customerNo" :disabled="true" :disableClear="true" :readonly="true"></mt-field>
          <mt-field type="text" label="商品编号" placeholder="请输入商品编号" v-model="good.goodsNo" :disabled="true" :disableClear="true" :readonly="true"></mt-field>
          <div @click="openGoodsActions">
            <mt-field type="text" label="商品编码" placeholder="请选择商品编码" :value="good.unionNo | handleUnionNo" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
          <mt-field type="text" label="商品名称" placeholder="请输入商品名称" v-model="good.goodsName"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>
          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <div @click="openTaxratePicker">
            <mt-field type="text" label="税率" placeholder="请选择税率" :value="good.taxRate | handleTaxRate" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
          <div @click="openTypeenjoyPicker">
            <mt-field type="text" label="享受优惠" placeholder="请选择享受优惠" :value="good.enjoyDiscount | handleEnjoyDiscount" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
          <div @click="openDiscountPicker">
            <mt-field type="text" label="优惠类型" placeholder="请选择优惠类型" :value="good.discountType | handleDiscountType" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-admin"></i>
            </mt-field>
          </div>
        </template>

      </input-wrapper>
    </view-radius>
    <goods-actionsheet ref="GoodsActionsheet" @change="goodsActionsheetChange"></goods-actionsheet>
    <taxrate-picker ref="TaxratePicker" @change="taxratePickerChange"></taxrate-picker>
    <discount-picker ref="DiscountPicker" @change="discountPickerChange"></discount-picker>
    <typeenjoy-picker ref="TypeenjoyPicker" @change="typeenjoyPickerChange"></typeenjoy-picker>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GoodsActionsheet from "@src/components-app/GoodsActionsheet";
import TaxratePicker from "@src/components-app/SelectPicker/TaxratePicker";
import DiscountPicker from "@src/components-app/SelectPicker/DiscountPicker";
import TypeenjoyPicker from "@src/components-app/SelectPicker/TypeenjoyPicker";
export default {
  components: {
    GoodsActionsheet,
    TaxratePicker,
    DiscountPicker,
    TypeenjoyPicker
  },
  data() {
    return {
      btnDisabled: false,
      good: {
        unionNo: "",
        taxRate: "",
        enjoyDiscount: "",
        discountType: ""
      },
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      },
      customerNo: this.$route.params["customerNo"]
    };
  },
  created() {
    this.pageType == "EDIT" &&
      this.getGood(this.customerNo).then(good => {
        this.good = Object.assign(this.good, good);
      });
  },
  methods: {
    ...mapActions(["getGood", "updataGood", "addGood"]),
    //选择商品
    openGoodsActions() {
      this.$refs.GoodsActionsheet.open();
    },
    //选择商品结果
    goodsActionsheetChange(obj) {
      this.good.unionNo = obj.unionNo;
    },
    //选择费率
    openTaxratePicker() {
      this.$refs.TaxratePicker.open();
    },
    //选择费率结果
    taxratePickerChange(obj) {
      this.good.taxRate = obj.value;
    },
    //选择费率类型
    openDiscountPicker() {
      this.$refs.DiscountPicker.open();
    },
    //选择费率类型结果
    discountPickerChange(obj) {
      this.good.discountType = obj.value;
    },
    //选择折扣类型
    openTypeenjoyPicker() {
      this.$refs.TypeenjoyPicker.open();
    },
    //选择折扣类型结果
    typeenjoyPickerChange(obj) {
      this.good.enjoyDiscount = obj.value;
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
      if (!this.validator.isEmpty(this.good.taxRate)) {
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
              this.$store.commit("IS_ADD_GOOD", true);
              this.$router.back();
            }
          });
    }
  }
};
</script>

<style>

</style>
