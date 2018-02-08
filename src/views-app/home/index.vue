<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="right" :disabled="false" type="danger">
        <i class="icon-news"></i>
      </mt-button>
    </mt-header>

    <mt-tab-container class="page-tabbar-container page" v-model="selected">
      <mt-tab-container-item id="首页" class="page">
        <content-home/>
      </mt-tab-container-item>
      <mt-tab-container-item id="业务">
        <content-business/>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <content-my/>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar slot="tabar" class="g-b-c tabbar no-absolute" v-model="selected">
      <mt-tab-item id="首页">
        <i slot="icon" class="icon-my tab-icon-center"></i>首页
      </mt-tab-item>
      <mt-tab-item id="业务">
        <i slot="icon" class="icon-business tab-icon-center"></i>业务
      </mt-tab-item>
      <mt-tab-item id="我的">
        <i slot="icon" class="icon-Home-page tab-icon-center"></i>我的
      </mt-tab-item>
    </mt-tabbar>
  </full-page>
</template>

<script>
import contentHome from "./content-home";
import contentBusiness from "./content-business";
import contentMy from "./content-my";
export default {
  components: { contentHome, contentBusiness, contentMy },
  data() {
    return {
      selected: "业务"
    };
  },
  watch: {
    selected(tabText) {
      if (tabText == "首页") {
        document.querySelector(".full-main").scrollTop = 200;
        console.log(tabText);
      } else if (tabText == "业务") {
        document.querySelector(".full-main").scrollTop = 10;
      } else if (tabText == "我的") {
        document.querySelector(".full-main").scrollTop = 110;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.page-tabbar-container {
  // padding: 10px;
}
.tab-icon-center {
  line-height: 50*$rem;
  text-align: center;
  font-size: 50*$rem;
}

.is-selected {
  background-color: $active-color !important;
  color: #fff !important;
}
.no-absolute {
  position: static !important;
}
</style>
