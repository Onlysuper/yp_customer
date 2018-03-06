<template>
  <full-page-popup v-model="visible" position="bottom" title="分润详情">
    <input-wrapper>
      <mt-cell title="商户" :value="sumData.customerSum+'个'"></mt-cell>
      <mt-cell title="返利" :value="sumData.subsidySum+'元'"></mt-cell>
      <mt-cell v-if="isAdmin" title="中间人" :value="sumData.rebateSum+'元'"></mt-cell>
    </input-wrapper>
  </full-page-popup>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      sumData: {}
    };
  },
  computed: {
    isAdmin() {
      let user = this.$store.state.userInfoAndMenu.userMessage.all;
      if (user.userType === "admin" || user.userType === "branchOffice") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    open(sumData) {
      this.sumData = sumData;
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
