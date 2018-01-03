<template>
  <!-- 表单数据搜索区域 -->
  <div class="search-page">
    <!-- Form 表单编写 start -->
    <el-form size="small" :class="[visibleinput?'showform-box':'visibleform-box','form-box']" ref="searchform" label-width="100px">
      <el-form-item class="form-item" v-for="(item,index) in searchOptions" :key="index+'in'" :label="item.label" v-show="item.show?showinput:visibleinput">
        <!-- 文本框 -->
        <el-input ref="myinput" v-if="item.type=='text'" :placeholder="item.label" @input="changeInput(item.cb,$event)" v-model="item.value"></el-input>

        <!-- 选择框 -->
        <el-select ref="myinput" class="form-select" @input="changeInput(item.cb,$event)" v-if="item.type=='select'" v-model="item.value" placeholder="请选择">
          <el-option v-for="(item) in item.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <!-- 日期组合 -->
        <el-form-item class="dateGroup" v-if="item.type=='dateGroup'">
          <el-date-picker ref="myinput" v-model="item.options[0].value" @input="changeInput(item.options[0].cb,$event,'dateMonth')" type="date" placeholder="开始时间"></el-date-picker>
          <span class="to-line">-</span>
          <el-date-picker ref="myinput" class="enddate-box" v-model="item.options[1].value" @input="changeInput(item.options[1].cb,$event,'date')" type="date" placeholder="结束时间"></el-date-picker>
        </el-form-item>

        <!-- 月份的日期 -->
        <!-- <el-form-item class="dateMonth" v-if="item.type=='dateMonth'"> -->
        <el-date-picker class="dateMonth" v-if="item.type=='dateMonth'" v-model="item.value" @input="changeInput(item.cb,$event,'dateMonth')" type="month" placeholder="选择月">
        </el-date-picker>
        <!-- </el-form-item> -->
      </el-form-item>
      <div class="button-box">
        <el-button size="small" @click="searchStart" type="primary">开始搜索</el-button>
        <el-button size="small" @click="resetInput('searchform')">重置</el-button>
        <el-button size="small" v-if="visibleSenior" class="seach-mode" @click="advancSeachfn()" type="text">{{visibleinput?"普通搜索":"高级搜索"}}</el-button>

      </div>
    </el-form>
    <!-- Form end -->
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    searchOptions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value8: "",
      advancSeach: false,
      showinput: true
      //   visibleinput:false // true为高级搜索 false为普通搜索
    };
  },
  computed: {
    visibleinput() {
      return this.$store.state.dataTable.visibleinput;
    },
    visibleSenior() {
      //隐藏高级搜索
      var showlen = 0;
      this.searchOptions.forEach(element => {
        if (element.show) {
          showlen++;
        }
      });
      if (showlen == this.searchOptions.length) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {},
  methods: {
    advancSeachfn() {
      // 高级搜索与普通搜索转换
      this.$store.commit("visibleinputHandle");
    },
    changeInput(cb, event, type) {
      // 表单内容双向绑定 把表单输入的内容交给父页面进行操作

      if (event) {
        var val = "";
        if (type == "date") {
          var date = new Date(event);
          var month = date.getMonth() + 1;
          month = month * 1 < 10 ? "0" + month : month;
          var day =
            date.getDate() * 1 < 10 ? "0" + date.getDate() : date.getDate();
          date = date.getFullYear() + "-" + month + "-" + day;
          val = date;
        } else if ((type = "dateMonth")) {
          var date = new Date(event);
          var month = date.getMonth() + 1;
          month = month * 1 < 10 ? "0" + month : month;
          date = date.getFullYear() + "-" + month;
          val = date;
        } else {
          val = event;
        }
        this.$emit("changeform", cb, val);
      }
      this.$emit("changeform", cb, event);
    },
    searchStart() {
      //交给父页面操作
      this.$emit("seachstart");
    },
    resetInput(formName) {
      //交给父页面操作
      this.$emit("resetInput");
    }
  },
  watch: {
    visibleinput: function(val) {
      if (!val) {
        //普通搜索的时候
        this.$emit("visiblesome");
      }
    }
  }
};
</script>
<style lang="less">
.search-page {
  min-width: 600px;
  .form-box {
    .form-item {
      width: 340px;
      flex-shrink: 1;
    }
    .form-select {
      width: 100%;
      margin-left: 0;
    }
    .dateMonth {
      width: 240px;
    }
    .el-form-item {
      margin-bottom: 5px;
      .dateGroup {
        width: 240px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        .to-line {
          font-size: 14px;
          color: #d8dce5;
        }
        .el-form-item__content {
          width: 260px;
          display: flex;
          flex: 1;
          .enddate-box {
            .el-input__suffix {
              right: 17px;
            }
            .el-input__prefix {
              display: none;
            }
            input {
              padding-left: 17px;
            }
          }
          input {
            padding-right: 0px;
            border: 0px;
            background: none;
          }
        }
      }
    }
  }
  .showform-box {
    margin-top: 0 !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: baseline;
    .el-form-item {
      margin-bottom: 10px;
    }

    .button-box {
      width: 100%;
      text-align: right;
    }
  }
  .visibleform-box {
    display: block;
    .form-item {
      float: left;
    }
    .seach-mode {
      float: right;
    }
    .button-box {
      button {
        margin: 0 10px;
      }
    }
  }
}
</style>
