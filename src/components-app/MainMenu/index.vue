<template>
  <mt-tabbar v-model="selected" :fixed="false" class="main-menu">

    <router-link class="mint-tab-item" :to="{path:'/home'}">
      <i class="icon mintui-home"></i>
      <div class="mint-tab-item-label">首页</div>
    </router-link>

    <router-link class="mint-tab-item" :to="{path:'/business/business'}">
      <i class="icon mintui-home"></i>
      <div class="mint-tab-item-label">业务</div>
    </router-link>

    <router-link class="mint-tab-item" :to="{path:'/opportunity'}">
      <i class="icon mintui-home"></i>
      <div class="mint-tab-item-label">商机</div>
    </router-link>

    <router-link class="mint-tab-item" :to="{path:'/mine/myMain'}">
      <i class="icon mintui-home"></i>
      <div class="mint-tab-item-label">我的</div>
    </router-link>

  </mt-tabbar>
</template>
<style lang="scss">
@import '../../assets/scss/base.scss';
.main-menu {
  background-image: none;
  background-color: #fafbfe;
  color: #999;
  border-top: 1px solid #e1e1e1;
  .icon {
    color: #999;
    font-size: 48*$rem;
  }
  .mint-tab-item-label {
    margin-top: 3px;
    color: #999;
  }
  //选中状态
  .router-link-active {
    background-color: #fafbfe !important;
    .mint-tab-item-label {
      color: @global-sub-title-color !important;
    }
    .icon {
      color: @global-sub-title-color !important;
    }
  }
}
</style>
<script>
import { Tabbar, TabItem } from "mint-ui";
export default {
  components: {
    Tabbar,
    TabItem
  },
  props: {},
  data() {
    return {
      selected: this.$route.path
    };
  },
  watch: {
    selected(value) {
      this.toUrl(value);
    }
  },
  mounted() {},
  methods: {
    toUrl(path) {
      this.$router.push({
        path: path
      });
    }
  }
};
</script>