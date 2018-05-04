
<template>
  <div class="searchModle-box">
    <!-- <div class="_search-mask" @touchmove.prevent v-show="visible"></div> -->
    <!-- <div class="my-search" :class="{show:visible,hide:!visible}"> -->
    <div class="my-search my-search-visible" :class="{show:visible,hide:!visible}">
      <div class="mint-searchbar">
        <a @click="close" class="mint-searchbar-cancel">取消</a>
        <div class="mint-searchbar-inner">
          <input ref="inputEle" v-focus="true" placeholder="请输入企业名称 / 关键字" type="text" v-model="myval" class="mint-searchbar-core"></div>
        <span class="searchbut" @click="searchHandle">
          <i class="mintui mintui-search"></i>
        </span>
      </div>
      <div class="query-list">
        <ul>
          <slot></slot>
          <li class="no-search" v-show="isNoSearchShow" @click="noSearch">
            <span>没有更多了！</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getsmartgoodscodeCustomerGood,
  testKeyQuery,
  entCardQueryCode
} from "@src/apis";

export default {
  props: {
    defaultVal: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      myval: "",
      visible: false,
      billType: "1",
      isNoSearchShow: false,
      queryList: []
    };
  },
  directives: {
    focus: {
      // inserted: function (el) {
      //   $(el).trigger("focus");
      // },
      componentUpdated: function (el) {
        el.focus();
      }
    }
  },
  watch: {
    defaultVal(val) {
      this.myval = val;
    },
    myval(val) {
      if (!val) {
        this.$emit("initData");
      } else {
      }
      this.$emit("initData");
      this.$emit("changeName", val);
    }
  },
  created() {
  },
  mounted() {
    this.myval = this.defaultVal;
  },
  methods: {
    searchHandle() {
      this.getsmartgoodscodeCustomerGood({ name: this.myval, tax: "0" });
    },
    getsmartgoodscodeCustomerGood(obj) {
      getsmartgoodscodeCustomerGood()(obj).then(res => {
        if (res.code == "00") {
          this.$emit("watchDataList", res.data);
        } else {
          this.queryList = [];
          this.Toast({
            message: res.msg,
            duration: 500
          });
        }
        this.isNoSearchShow = true;
      });
    },
    select(item) {
      this.$emit("selectChange", item);
      this.close();
    },
    noSearch() {
      this._czcEvent("点我试试", "企业名称:" + this.myval);
      this.close();
      setTimeout(() => {
        this.$parent.mixinsToTycUrl(this.myval);
      }, 500);
    },
    open() {
      this.visible = true;
      let el = this.$refs.inputEle;
      $(el).trigger("focus");
      el.focus();
    },
    close() {
      this.visible = false;
    },
    getNameClose(val) {
      this.visible = false;
      this.myval = val
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.searchModle-box {
  .mint-searchbar {
    width: 100%;
  }
  .searchbut {
    display: flex;
    display: inline-block;
    padding: 10px 20px;
    z-index: 10;
    i {
      display: inline-block;
      text-align: center;
    }
  }
  .mint-searchbar-cancel {
    padding: 10px;
  }
  ._search-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
  }
  .my-search {
    height: auto;
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    // border-radius: 10px;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    transition: opacity 0.5s;
    top: 50px;
    // bottom: 0;
  }

  .input-bg {
    background: #ff5959;
    box-shadow: 0 0 5px #000;
    padding: 20*$rem;
  }
  .input-field {
    border-radius: 3px;
    .mint-cell-wrapper {
    }
  }
  .query-list {
    position: relative;
    padding: 50*$rem 30*$rem;
    overflow-x: hidden;
    overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
    height: 800*$rem;
    li {
      line-height: 100*$rem;
    }
  }

  .show {
    top: 200px;
    bottom: 0%;
    // opacity: 1;
    // display: block;
  }
  .hide {
    // top: 200px;
    // bottom: 0%;
    top: -100%;
    // opacity: 0;
    // display: none;
  }

  .no-search {
    text-align: center;
    span {
      text-decoration: underline;
      color: #666;
    }
  }
}
</style>
