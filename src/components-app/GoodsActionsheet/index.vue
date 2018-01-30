<template>
  <mt-actionsheet :actions="goodsActions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
</template>

<script>
export default {
  data() {
    return {
      sheetVisible: false,
      goodsActions: [
        {
          mode: "goodsActions",
          name: "餐饮服务",
          unionNo: "3070401000000000000",
          method: this.sheetClick
        },
        {
          mode: "goodsActions",
          name: "住宿服务",
          unionNo: "3070402000000000000",
          method: this.sheetClick
        }
      ]
    };
  },
  methods: {
    sheetClick(obj) {
      this.$emit("change", obj);
    },
    open() {
      this.sheetVisible = true;
    }
  }
};
</script>

<style>

</style>
