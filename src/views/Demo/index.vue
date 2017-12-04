<template>
  <full-page-popup class="customer-change-name" v-model="visible" :title="'审核结果'">
    <!-- <br/>
    <div class="public head">
      <p>旧商户名称：武威市张鹏鲜果超市</p>
      <p>新商户名称：武威市蔬果汇鲜果超市</p>
    </div>
    <br/>
    <feedback-box :state="true" time="12345" desc="描述"></feedback-box> -->
    <input placeholder="Date" class="textbox-n" type="date" id="date">
  </full-page-popup>
</template>

<script>
import FeedbackBox from "@src/containers/Feedback";
import axios from "axios";
export default {
  components: { FeedbackBox },
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    axios.defaults.withCredentials = true;

    var params = new URLSearchParams();
    params.append("username", "admin");
    params.append("password", "123456");
    axios.post("http://192.168.100.244:8010/tm/login", params);

    setTimeout(() => {
      axios.get("http://192.168.100.244:8010/tm/user/privilege");
    }, 3000);
  },
  methods: {
    open() {
      this.visible = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../assets/less/base.less);
.customer-change-name {
  .public {
    background: #fff;
  }
  .head {
    font-size: 30/@rem;
    padding: 0 40/@rem;
    box-sizing: border-box;
    p {
      line-height: 60/@rem;
    }
  }
}
</style>