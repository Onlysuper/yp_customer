<template>
  <full-page class="" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <input-wrapper>
      <mt-field type="text" label="交易费率" placeholder="请输入交易费率"></mt-field>
      <mt-field type="text" label="默认固定成本" placeholder="请输入交易费率"></mt-field>
      <mt-field type="number" label="默认可用天数" placeholder="请输入交易费率"></mt-field>
    </input-wrapper>
  </full-page>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior, filterColor } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: ""
    };
  },
  mounted() { },
  activated() {
    this.routeMenuCode = this.$route.name;
  },
  methods: {
    save() {
      this.Toast("暂不支持");
    }
  }
};
</script>

<style>

</style>
