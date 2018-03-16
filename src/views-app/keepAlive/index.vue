<template>
  <div v-on:scroll.passive="onScroll" class="keep-alive page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-show="gotopVisible" class="gotop-box" @click="gotop">
      顶
    </div>
  </div>
</template>

<script>
import $ from "Jquery";
export default {
  data() {
    return {
      gotopVisible: false
    }
  },
  methods: {
    gotop() {
      $(".full-main").animate({ scrollTop: "0px" }, 250)
    },
    BottomJumpPage() {
      var scrollTop = $(".full-main").scrollTop();
      var scrollHeight = $(document).height();
      var windowHeight = $(".full-main").height();
      if (scrollTop + windowHeight == scrollHeight) {  //滚动到底部执行事件
      }
      if (scrollTop < 200) {  //滚动到头部部执行事件
        this.gotopVisible = false;
      } else {
        this.gotopVisible = true;
      }
    }
  },
  mounted() {
    this.BottomJumpPage();
    $(".full-main").scroll(() => {
      this.BottomJumpPage();
    });
  }
};
</script>

<style>
.gotop-box {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #eee;
  border-radius: 100%;
  border-radius: 100%;
  position: fixed;
  right: 0;
  bottom: 10px;
  z-index: 100;
}
</style>
