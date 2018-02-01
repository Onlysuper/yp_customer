<template>
  <picker v-model="visible" :slotsActions="taxActions" :cb="taxSelectCallBack"></picker>
</template>

<script>
import Picker from "../Picker";
export default {
  components: { Picker },
  data() {
    return {
      visible: false,
      value: {
        name: "授权码序列号",
        code: "OUT_ORDER"
      },
      taxActions: [
        {
          name: "授权码序列号",
          code: "OUT_ORDER"
        },
        {
          name: "授权码号段转移",
          code: "ORDER"
        }
      ]
    };
  },
  methods: {
    taxSelectCallBack(result) {
      console.log(result);
      // this.$emit("change", {
      //   name: result.name,
      //   value: result.code
      // });
    },
    open() {
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
