<template>
  <div class="home-business border-top-scale-1px">
    <div class="mode mode-b-1px _av" @click="toUrl(item.menuCode,index)" v-for="(item,index) in $store.state.moduleLayour.menuList" :key="index" :class="(index+1)%3==0?'':'mode-r-1px'">
      <i :class="'icon icon-'+item.menuCode || 'icon-admin'"></i>
      <div>{{item.menuName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //定义各种图标类型
      // menuIcon: {
      //   "bill-mg": "icon-admin"
      // }
    };
  },
  mounted() {
    // console.log(this.$store.state.moduleLayour.menuList);
  },
  methods: {
    toUrl(menuCode, index) {
      console.log(menuCode);
      this.$router.push({
        name: menuCode,
        query: { menuIndex: index }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-business {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.mode {
  width: 33.333%;
  text-align: center;
  padding: 10px 0;
  position: relative;
  background-color: #fff;
  .icon {
    font-size: 50px;
  }
}

.mode-b-1px::after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid #c8c7cc;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

.mode-r-1px::before {
  content: "";
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  border-right: 1px solid #c8c7cc;
  transform: scaleX(0.5);
  transform-origin: 0 0;
}
</style>
