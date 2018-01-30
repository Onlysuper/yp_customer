<template>
  <picker v-model="visible" :slotsActions="taxActions" :cb="taxSelectCallBack"></picker>
</template>

<script>
//税率
let taxJson = [
  {
    name: "授权码序列号",
    code: "OUT_ORDER"
  },
  {
    name: "授权码号段转移",
    code: "ORDER"
  }
];

import Picker from "../Picker";
export default {
  components: { Picker },
  data() {
    return {
      visible: false,
      taxActions: taxJson
    };
  },
  methods: {
    taxSelectCallBack(result) {
      this.$emit("change", {
        name: result.name,
        value: result.code
      });
    },
    open() {
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
