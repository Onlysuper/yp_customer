<template>
  <mt-loadmore class="loadmore-api-warpper" ref="loadmore" :style="{overflow:true?'hidden':'inherit'}" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="loadMoreConfig.allLoaded" :auto-fill="loadMoreConfig.autoFill" :top-pull-text="loadMoreConfig.topPullText" :top-drop-text="loadMoreConfig.topDropText" :top-loading-text="loadMoreConfig.topLoadingText" :bottom-pull-text="loadMoreConfig.bottomPullText" :bottom-drop-text="loadMoreConfig.bottomDropText" :bottom-loading-text="loadMoreConfig.bottomLoadingText">
    <div class="loadmore-api-warpper-list" :style="{ minHeight: wrapperHeight + 'px' }">
      <slot></slot>
      <pull-down-tip v-if="loadMoreConfig.allLoaded"></pull-down-tip>
      <div v-show="gotopVisible" class="gotop-box" @click="gotop">顶</div>
    </div>
  </mt-loadmore>
</template>

<script>
import PullDownTip from "../PullDownTip";
import { Toast, Indicator } from "mint-ui";
export default {
  name: "myp-loadmore-api",
  data() {
    return {
      gotopVisible: false,
      wrapperHeight: "",
      list: [],
      count: 0,
      //指定loadQuery条件
      loadQuery: {},
      loadMoreConfig: {
        //如果TRUE，loadmore将检查和填写其集装箱
        autoFill: false,
        //手指移动的距离与组件卷轴的距离之比
        distanceIndex: 2,
        //组件可以滚动的最大距离（以像素为单位）。可以通过设置为0禁用它。
        maxDistance: 0,
        //距离阈值触发topMethod（像素）
        topDistance: 70,
        topPullText: "下拉刷新",
        topDropText: "释放更新",
        topLoadingText: "刷新中...",
        //距离阈值触发bottomMethod（像素）
        bottomDistance: 70,
        bottomPullText: "上拉加载",
        bottomDropText: "释放加载",
        bottomLoadingText: "加载中...",
        //如果是true，bottomMethod不再能触发
        allLoaded: false
      }
    };
  },
  components: {
    PullDownTip
  },

  props: {
    api: {
      type: Function,
      default: () => { }
    },
    //loadQuery默认值
    defaultLoadQuery: {
      type: Object,
      default() {
        return {
          limit: 20,
          page: 1
        };
      }
    }
  },
  watch: {
    list(list) {
      this.$emit("watchDataList", list, this.count, this.loadQuery.page);
    }
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.wrapperHeight = this.$refs.loadmore.$el.clientHeight;
      }, 0);
    });
    this.BottomJumpPage();
    $(".full-main").scroll(() => {
      this.BottomJumpPage();
    });
  },

  methods: {
    loadData(query) {
      return this.api()(query).then(data => {
        if (data.code === "00") {
          this.count = data.count;
          return data.data || [];
        } else {
          Toast(data.msg);
          return [];
        }
      });
    },
    //首次加载和搜索加载操作
    load(searchQuery) {
      this.searchQuery = searchQuery || {};
      this.loadQuery = Object.assign(
        {},
        this.defaultLoadQuery,
        this.searchQuery
      );
      this.loadMoreConfig.allLoaded = false;
      this.list = [];
      Indicator.open();
      this.loadData(this.loadQuery).then(list => {
        this.list = list;
        this.isAllLoaded(list);
        Indicator.close();
      });
    },
    //下拉刷新操作
    loadTop() {
      this.loadQuery = Object.assign(
        {},
        this.defaultLoadQuery,
        this.searchQuery
      );
      this.loadMoreConfig.allLoaded = false;
      this.list = [];
      this.loadData(this.loadQuery).then(list => {
        setTimeout(() => {
          this.list = list;
          this.$refs.loadmore.onTopLoaded();
          this.isAllLoaded(list);
        }, 500);
      });
    },
    //上拉加载操作
    loadBottom() {
      this.loadQuery.page++;
      this.loadData(this.loadQuery).then(list => {
        setTimeout(() => {
          this.list = this.list.concat(list);
          this.$refs.loadmore.onBottomLoaded();
          this.isAllLoaded(list);
        }, 500);
      });
    },
    isAllLoaded(data) {
      if (data.length < this.loadQuery.limit)
        this.loadMoreConfig.allLoaded = true;
    },
    gotop() {
      $(".full-main").animate({ scrollTop: "0px" }, 250)
    },
    BottomJumpPage() {
      var scrollTop = $(".full-main").scrollTop();
      var scrollHeight = $(document).height();
      var windowHeight = $(".full-main").height();
      if (scrollTop + windowHeight == scrollHeight) {  //滚动到底部执行事件
      }
      if (scrollTop < 50) {  //滚动到头部部执行事件
        this.gotopVisible = false;
      } else {
        this.gotopVisible = true;
      }
    }
  }
};
</script>

<style lang="scss">
.loadmore-api-warpper {
  //如果不使用absolute在ios中下拉刷新时会失去高度，导致下拉loading不显示
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  min-height: 100%;
  // border: 1px solid red;
  // box-sizing: border-box;
  overflow: hidden;
  // .mint-loadmore{
  //     overflow: inherit;
  // }
  .loadmore-api-warpper-list {
    overflow: hidden;
  }
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
}
</style>