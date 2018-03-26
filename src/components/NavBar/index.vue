
<template>
  <!-- layout顶部 公司名与用户信息操作区域-->
  <el-header class="my-header">
    <div @click="isCollapsefn" class="head-l">
      <span :class="[isCollapseicon?'isCollapseicon':'','icon-recycling','collapse-button']"></span>
    </div>
    <tags-view></tags-view>
    <div class="head-r">
      <i title="全屏显示" class="el-icon-rank fullpage-icont" @click="fullPageHandle()"></i>
      <!-- <theme-picker class="theme-picker"></theme-picker> -->
      <el-popover popper-class="msg-tooltip" placement="bottom-start" ref="popover2" width="300" trigger="click">
        <el-tabs v-model="msgName" @tab-click="msgFn">
          <el-tab-pane label="通知" name="first">
            <div class="msg-list">
              <div class="list notice">
                通知1
              </div>
              <div class="but">
                清空信息
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="消息" name="second">
            <div class="msg-list">
              <div class="list">
                消息1
              </div>
              <div class="but">
                历史消息
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-popover>
      <!-- <div v-popover:popover2 title="信息" class="hover-back message-box"> -->
      <div title="信息" class="hover-back message-box">
        <!-- <router-link to="/message-list"> -->
        <el-badge :value="noticeCount" :max="999" class="item" id="messageIcon">
          <span class="icon-news"></span>
        </el-badge>
        <!-- </router-link> -->
      </div>
      <myp-admin-operation></myp-admin-operation>
    </div>
    <!-- 修改管理员密码 end -->
  </el-header>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
// msg start
.msg-list {
  .list {
    padding: 10px 10px;
  }
  .notice {
    border-bottom: 1px solid #eee;
  }
  .but {
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #eee;
    cursor: pointer;
  }
}
.msg-tooltip {
  padding: 0px !important;
}
.el-tabs__nav-scroll {
  padding: 0 10px;
}
// msg end
</style>
<style lang='scss' scoped>
/*重置样式*/
@mixin my-transition($attr,$section) {
  transition: $attr $section;
  -moz-transition: $attr $section;
  -webkit-transition: $attr $section;
  -o-transition: $attr $section;
} //声明一个带有参数$radius的混合宏
.my-header {
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
  color: #333;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0px !important;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 54px !important;

  .theme-picker {
    margin-right: 10px;
  }

  .fullpage-icont {
    font-size: 25px;
    transform: rotate(45deg);
    margin-right: 10px;
    cursor: pointer;
  }
  .color-picker {
    display: inline-block;
  }
  .hover-back {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    padding: 0 5px;
    min-width: 50px;
    &:hover,
    &.message-box.active {
      outline: none;
      @include my-transition(background,0.8s);
      background: rgba(0, 193, 223, 0.2);
      cursor: pointer;
    }
  }

  .head-l {
    width: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    vertical-align: middle;
    .isCollapseicon {
      transform: rotate(180deg); /* Safari 和 Chrome */
    }
    &:hover {
      @include my-transition(background,0.8s);
      background: rgba(0, 193, 223, 0.2);
      cursor: pointer;
    }
    .collapse-button {
      font-size: 25px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .tagbox {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .head-r {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding-right: 20px;
    .icon-news {
      font-size: 18px;
    }
    .el-badge {
      line-height: 0;
      margin-right: 30px;
      &.active {
        animation: tada 3s infinite !important;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .el-header {
    display: none;
  }
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@keyframes tada {
  0% {
    transform: scaleX(1);
  }
  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate(3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate(-3deg);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>

<script>
import $ from "jquery";
import screenfull from "screenfull";
import { PasswordUpdate, Logout } from "@src/apis";
import TagsView from "@src/components/TagsView"; // 面包屑
import ThemePicker from "@src/components/ThemePicker"; // 选色器
import AdminOperation from "@src/components/AdminOperation"; // 管理员信息操作
export default {
  name: "navbar",
  components: {
    TagsView,
    ThemePicker,
    "myp-admin-operation": AdminOperation
  },
  data() {
    return {
      num: 0,
      msgName: 'second'
    };
  },
  computed: {
    isCollapseicon() {
      //菜单是否收起
      return this.$store.state.userInfoAndMenu.isCollapse;
    },
    noticeCount() {
      return this.$store.state.acceptMessage.noticeCount;
    }
  },
  created() {
    this.$store.dispatch('getMessagesFetch').then(resmenuList => {
      this.num = resmenuList.data.length;
    })
  },
  watch: {
    noticeCount(value) {
      this.$nextTick(() => {
        $('#messageIcon').addClass("tada");
      })
    },
    $route() {
      this.$nextTick(() => {
        if (this.$route.name == "message-list") {
          $(".hover-back").addClass('active')
        } else {
          $(".hover-back").removeClass('active')
        }
      })
    }
  },
  methods: {
    isCollapsefn() {
      this.$store.commit("SidebarHandle");
    },
    // 全屏幕显示
    fullPageHandle(element) {
      if (!screenfull.enabled) {
        this.$message({
          message: "很抱歉，您的浏览器不支持次功能",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.$store.commit("changeFullScreen");
    },
    msgFn(tab, event) {
    }
  }
};
</script>