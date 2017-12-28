<template>
  <picker v-model="visible" :slotsActions="taxActions" :cb="taxSelectCallBack"></picker>
</template>

<script>
//优惠政策
let discountJson = {
  不使用优惠政策: "10",
  不征税: "11",
  免税: "12",
  先征后退: "13",
  "100%先征后退": "14",
  "50%先征后退": "15",

  "即征即退30%": "16",
  "即征即退50%": "17",
  "即征即退70%": "18",
  "即征即退100%": "19",

  "超税负3%即征即退": "20",
  "超税负8%即征即退": "21",
  "超税负12%即征即退": "22",

  简易征收: "23",
  "按5%简易征收减按1.5%计征": "24",
  "按5%简易征收": "25",
  "按3%简易征收": "26",
  稀土产品: "27"
};
import Picker from "../Picker";
export default {
  components: { Picker },
  data() {
    return {
      visible: false,
      taxActions: Object.keys(discountJson)
    };
  },
  methods: {
    taxSelectCallBack(result) {
      this.$emit("change", {
        name: result,
        value: discountJson[result]
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
