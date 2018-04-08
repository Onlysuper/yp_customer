<template>
  <div v-on:scroll.passive="onScroll" class="keep-alive page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

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
