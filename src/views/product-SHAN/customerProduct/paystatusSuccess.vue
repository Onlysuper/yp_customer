<template>
  <div class="paystatusSuccess">
    <div class="msgbox">
      <div class="row icon-box">
        <i class="el-alert__icon el-icon-success is-big"></i>
      </div>
      <div class="row" v-if="doWhat.type=='open'">
        <h2>您申请的支付产品已受理！</h2>
        <p>开通结果预计会在1-3个工作日以短信的形式通知到您{{phoneNo}}的手机上，敬请查收。</p>
      </div>
      <div class="row" v-if="doWhat.type=='change'">
        <h2>您的变更申请已受理！</h2>
        <p>详情可查看变更单。</p>
      </div>
      <!-- {{rowData}}  -->
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="goback('paystatusUpload')">上一步</el-button> -->
      <el-button type="primary" @click="goback('reload')">确定</el-button>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.paystatusSuccess {
  .msgbox {
    width: 100%;
    display: flex;
    .icon-box {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #67c23a;
    }
    .row {
      color: #67c23a;
      padding: 30px 20px;
      h2 {
        padding: 10px;
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
.dialog-footer {
  text-align: center;
}
.msgbox {
  margin-bottom: 50px;
  background: #f0f9eb;
}
</style>
<script>
import { mixinsPc } from "@src/common/mixinsPc";
import { getCustomerEchoProduct } from "@src/apis";
export default {
  name: "",
  components: {},
  mixins: [mixinsPc],
  props: {
    rowData: {
      type: Object
    },
    doWhat: {
      type: Object
    },
  },
  data() {
    return {
      phoneNo: ""
    };
  },
  methods: {
    //上一步
    goback(path) {
      this.$emit("backFn", path);
    },
    // 回显
    getCustomerEcho() {
      getCustomerEchoProduct()({
        customerNo: this.rowData.bussinessNo,
        featureType: "CONVERGE_PAY"
      }).then(res => {
        if (res.code == "00") {
          console.log(res.data);
          this.phoneNo = res.data.settleCard.phoneNo;
        }
      });
    }
  },
  created() {
    this.getCustomerEcho();
  },
  computed: {},
  watch: {},
  mounted() { }
};
</script>

