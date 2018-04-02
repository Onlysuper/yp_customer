<template>
  <full-page-popup v-model="visible" title="商户详情">
    <input-wrapper>
      <mt-cell label="企业名称">{{customer.enterpriseName}}</mt-cell>
      <mt-cell label="企业税号">{{customer.taxNo}}</mt-cell>
      <mt-cell label="企业法人">{{customer.legalPerson}}</mt-cell>
      <mt-cell label="身份证">{{customer.idCard}}</mt-cell>
      <mt-cell label="联系人">{{customer.linkMan}}</mt-cell>
      <mt-cell label="手机号">{{customer.phoneNo}}</mt-cell>
      <mt-cell label="商户编号">{{customer.customerNo}}</mt-cell>
      <mt-cell label="商户来源">{{customer.customerFrom | statusFilter("customerFrom")}}</mt-cell>
      <mt-cell label="所属合伙人">{{customer.levelDetail}}</mt-cell>
      <mt-cell label="经营名称">{{customer.bussinessName}}</mt-cell>
      <mt-cell label="经营地址">{{customer.bussinessAddress}}</mt-cell>
      <mt-cell label="公司电话">{{customer.bussinessPhone}}</mt-cell>
    </input-wrapper>
  </full-page-popup>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      customer: {}
    };
  },
  created() { },
  methods: {
    close() {
      this.customer = {};
      this.visible = false;
    },
    open(customer) {
      this.customer = customer;
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
