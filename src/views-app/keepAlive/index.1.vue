<template>
  <full-page class="my-customer-detail-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="$router.back()">操作</mt-button>
    </mt-header>
    <slider-nav slot="header" :munes="munes" @trigger="toUrl"></slider-nav>
    <router-view></router-view>
  </full-page>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
export default {
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[3].child
    };
  },
  methods: {
    toUrl(index) {
      console.log(index);
    }
  },
  created() {
    console.log(this.$store.state.userInfoAndMenu.menuList[3].child);
  }
};
</script>

<style>

</style>
