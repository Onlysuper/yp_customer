<template>
  <full-page class="" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <div class="tip">敬请期待</div>
  </full-page>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: ""
    };
  },
  mounted() {},
  activated() {
    this.routeMenuCode = this.$route.name;
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.tip {
  line-height: 200px;
  text-align: center;
}
</style>
