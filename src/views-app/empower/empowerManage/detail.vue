<template>
  <full-page-popup v-model="visible" position="right" transition="popup-fade" title="商户信息">
    <input-wrapper>
      <mt-cell title="企业名称" :value="detailsForm.enterpriseName"></mt-cell>
      <mt-cell title="企业税号" :value="detailsForm.taxNo"></mt-cell>
      <mt-cell title="企业法人" :value="detailsForm.legalPerson"></mt-cell>
      <mt-cell title="身份证" :value="detailsForm.idCard"></mt-cell>
      <mt-cell title="联系人" :value="detailsForm.linkMan"></mt-cell>
      <mt-cell title="手机号" :value="detailsForm.phoneNo"></mt-cell>
      <mt-cell title="商户编号" :value="detailsForm.customerNo"></mt-cell>
      <mt-cell title="商户来源" :value="detailsForm.customerFrom | statusFilter('customerFrom')"></mt-cell>
      <mt-cell title="公司电话" :value="detailsForm.bussinessPhone"></mt-cell>
      <mt-cell title="经营名称" :value="detailsForm.bussinessName"></mt-cell>
      <mt-cell title="经营地址" :value="detailsForm.bussinessAddress"></mt-cell>
    </input-wrapper>
  </full-page-popup>
</template>

<script>
import utils from "@src/common/utils"
export default {
  data() {
    return {
      visible: false,
      detailsForm: {}
    };
  },
  methods: {
    open(detailsForm) {
      this.detailsForm = detailsForm;
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
