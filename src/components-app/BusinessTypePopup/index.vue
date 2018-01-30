<template>
  <mt-popup v-model="popupVisible" position="right" class="businessType-page" :modal="false">
    <full-page>
      <mt-header slot="header" title="选择主营业务" class="re-mint-header">
        <div slot="left">
          <i class="mintui-arrow_down-left" @click="popupVisible=false"></i>
        </div>
      </mt-header>
      <div class="businessType-wrapper">
        <div class="left">
          <ul class="left-list">
            <li class="item" @click="businessListType=index" :class="{active:businessListType == index}" v-for="(item,index) in businessList" :key="index">{{item.type}}</li>
          </ul>
        </div>
        <div class="right">
          <ul class="right-list">
            <li class="item border-1px" @click="confirm(item)" v-for="(item,index) in businessListData" :key="index">
              {{item}}
            </li>
          </ul>
        </div>
      </div>
    </full-page>
  </mt-popup>
</template>
<style lang="scss">
@import '../../assets/scss/base.scss';
.businessType-page {
  width: 100%;
  height: 100%;
  .businessType-wrapper {
    height: 100%;
    display: flex;
  } // 左侧
  .left {
    width: 300*$rem;
    height: 100%;
    background: #eee;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .left-list {
    .item {
      line-height: 100*$rem;
      padding-left: 20*$rem;
      .text-ellipsis();
    }
    .active {
      background: #fff;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .right-list {
    .item {
      line-height: 100*$rem;
      margin-left: 20*$rem;
      .text-ellipsis();
      &:active {
        background: #eee;
      }
    }
  }
}
</style>
<script>
import FullPage from "@src/containers/FullPage";

export default {
  components: {
    FullPage
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popupVisible: false,
      //当前索引
      businessListType: 2,
      //所需数据
      businessList: [
        {
          type: "园艺设计室园艺设计室园艺设计室",
          data: ["园林设计工作室园林设计工作室园林设计工作室", "绿化服务中心", "园艺设计室"]
        },
        {
          type: "园艺设计室",
          data: [
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "园林设计工作室",
            "绿化服务中心",
            "园艺设计室",
            "园艺设计室1"
          ]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        },
        {
          type: "园艺设计室",
          data: ["园林设计工作室", "绿化服务中心", "园艺设计室", "园艺设计室2"]
        }
      ]
    };
  },
  computed: {
    businessListData() {
      return this.businessList[this.businessListType].data;
    }
  },
  watch: {
    value(val) {
      this.popupVisible = val;
    },
    popupVisible(val) {
      this.$emit("input", val);
    }
  },
  created() {},
  mounted() {
    if (this.value) {
      this.popupVisible = true;
    }
  },
  methods: {
    confirm(item) {
      this.popupVisible = false;
      this.$emit("businessresult", item);
    }
  }
};
</script>