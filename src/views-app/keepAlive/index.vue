<template>
  <div v-on:scroll.passive="onScroll" class="keep-alive page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="keep-alive-fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<style>
.keep-alive-fade-enter-active {
  transition: all 0.3s ease-out;
}
.keep-alive-fade-leave-active {
  transition: all 0.3s ease-out;
}
.keep-alive-fade-enter,
.keep-alive-fade-leave-to {
  transform: translateX(10px);
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
    // --------
    // 进入中
    // --------

    beforeEnter: function (el) {
      console.log('1')
      // ...
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
      // ...
      console.log('2')
      done()
    },
    afterEnter: function (el) {
      // ...
      console.log('3')
    },
    enterCancelled: function (el) {
      // ...
      console.log('4')
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function (el) {
      // ...
      console.log('11')
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    leave: function (el, done) {
      // ...
      console.log('22')
      done()
    },
    afterLeave: function (el) {
      // ...
      console.log('33')
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      // ...
      console.log('44')
    }
  },
  mounted() {

  },
  created() {
  }
};
</script>

<style>

</style>
