<template>
  <el-cascader :options="options" v-model="areaOptions" @change="changeHandle()"></el-cascader>
</template>

<style lang="scss">

</style>

<style lang="scss">

</style>

<script>
import json from "@src/data/org.json";

export default {
  name: "CityPicher",
  props: ["areaSelected"],
  data() {
    return {
      options: [],
      areaOptions: ["130000", "130100", "130101"]
    };
  },

  created() {
    let provinceNew = [];
    let cityNew = [];
    let areaNew = [];
    let provinCode = "";
    let areaCode = "";
    for (let [provinceKey, province] of Object.entries(json)) {
      // 省
      cityNew = [];
      for (let [cityKey, city] of Object.entries(province)) {
        // 市
        areaNew = [];
        for (let [areaKey, area] of Object.entries(city)) {
          // 区
          areaNew.push({
            value: area,
            label: areaKey,
          });
          areaCode = area.slice(0, 4) + '00';
          provinCode = area.slice(0, 2) + '0000'
        }
        cityNew.push({
          value: areaCode,
          label: cityKey,
          children: areaNew
        })
      }
      provinceNew.push({
        value: provinCode,
        label: provinceKey,
        children: cityNew
      })
    }
    console.log(provinceNew);
    this.options = provinceNew;
    // 默认选中
    this.areaOptions = this.areaSelected
  },
  mounted() {

  },
  methods: {
    changeHandle(val) {
      console.log(val);
    }
  },
};
</script>
