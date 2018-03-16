<template>
  <div v-on:scroll.passive="onScroll" class="keep-alive page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {

  },
  created() {
  }
};
</script>

<style>

</style>
