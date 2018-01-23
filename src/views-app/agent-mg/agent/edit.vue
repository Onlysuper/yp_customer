<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="合伙人名称" placeholder="请输入合伙人名称" v-model="good.customerNo"></mt-field>
        <mt-field type="text" label="合伙人编号" placeholder="请输入合伙人编号" v-model="good.goodsName"></mt-field>
        <mt-field type="tel" label="手机号" placeholder="请输入手机号" v-model="good.model"></mt-field>
        <mt-field type="text" label="经营区域" placeholder="请选择地区" v-model="good.unit"></mt-field>
        <mt-field type="text" label="回调地址" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      btnDisabled: false,
      good: {
        unionNo: "3070401000000000000",
        taxRate: "0",
        enjoyDiscount: "0",
        discountType: "10"
      },
      goodsNo: this.$route.params["goodsNo"]
    };
  },
  created() {
    this.getGood(this.goodsNo).then(good => {
      this.good = Object.assign(this.good, good);
    });
  },
  methods: {
    ...mapActions(["getGood", "updataGood", "addGood"]),

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
      this.addGood(this.good).then(flag => {
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
