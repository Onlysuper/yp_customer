<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="资质名称" v-model="form.name" placeholder="请输入资质名称" :attr="{maxlength:50}"></mt-field>
        <mt-field type="text" label="税号" v-model="form.tax" placeholder="请输入税号" :attr="{maxlength:50}"></mt-field>
        <mt-field type="text" label="地址" v-model="form.address" placeholder="请输入地址" :attr="{maxlength:50}"></mt-field>
        <mt-field type="text" label="电话" v-model="form.tel" placeholder="请输入电话" :attr="{maxlength:50}"></mt-field>
        <mt-field type="text" label="开户银行名称" v-model="form.bank" placeholder="请输入开户银行" :attr="{maxlength:50}"></mt-field>
        <mt-field type="text" label="银行帐号" v-model="form.account" placeholder="请输入银行帐号" :attr="{maxlength:50}"></mt-field>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      btnDisabled: false,
      form: {}
    };
  },
  created() {},
  methods: {
    ...mapActions(["addEnterpriseSupply"]),
    save() {
      if (!this.validator.isEmpty(this.form.name)) {
        this.MessageBox.alert("资质名称不能为空！");
        return;
      }
      if (!this.validator.isTax(this.form.tax)) {
        this.MessageBox.alert("企业税号有误！");
        return;
      }

      this.btnDisabled = true;
      this.addEnterpriseSupply(this.form).then(flag => {
        this.btnDisabled = false;
        if (flag) {
          this.$store.commit("ENTERPRISE_SUPPLY_IS_SEARCH", true);
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style>

</style>
