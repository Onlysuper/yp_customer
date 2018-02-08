<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <input-wrapper>
      <mt-field type="text" label="合伙人名称" v-model="agent.agentName" :disabled="true" placeholder="请输入合伙人名称"></mt-field>
      <mt-field type="text" label="合伙人编号" v-model="agent.agentNo" :disabled="true" placeholder="请输入合伙人编号"></mt-field>
      <mt-field type="tel" label="手机号" v-model="agent.phoneNo" :disabled="true" placeholder="请输入手机号"></mt-field>
      <mt-field type="tel" label="联系人" v-model="agent.linkMan" :disabled="true" placeholder="请输入联系人"></mt-field>
      <mt-field type="tel" label="固定电话" v-model="agent.fixedPhone" :disabled="true" placeholder="请输入固定电话"></mt-field>
      <mt-field type="text" label="经营区域" v-model="city.resultAddr" @click.native="cityVisible = true" v-readonly-ios :readonly="true" placeholder="请选择地区">
        <i class="icon-arrow"></i>
      </mt-field>
      <mt-field type="textarea" label="回调地址" v-model="agent.redirectUrl" placeholder="请输入内容"></mt-field>
    </input-wrapper>
    <city-picher ref="CityPicher" v-model="cityVisible" :resultCallback="resultCallback"></city-picher>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CityPicher from "@src/components-app/CityPicher";
export default {
  components: { CityPicher },
  data() {
    return {
      btnDisabled: false,
      cityVisible: false,
      agent: {},
      city: {},
      agentNo: this.$route.params["agentNo"]
    };
  },
  created() {
    this.findAgentInfo(this.agentNo).then(agent => {
      this.agent = { ...this.agent, ...agent };
      //回显地区
      this.resultCallback(this.$refs.CityPicher.findCity(this.agent.orgCode));
    });
  },
  methods: {
    ...mapActions(["findAgentInfo", "editAgent"]),

    //地区选择回调函数
    resultCallback(obj) {
      this.city = obj;
    },

    //处理地区编码
    handleCityCode(orgCode) {
      let cityCode = {};
      cityCode["province"] = orgCode.slice(0, 2) + "0000";
      cityCode["city"] = orgCode.slice(0, 4) + "00";
      cityCode["orgCode"] = orgCode;
      return cityCode;
    },

    //提交表单
    save() {
      if (!this.validator.isEmpty(this.city.resultAddr)) {
        this.MessageBox.alert("请选择经营地区！");
        return;
      }

      let newAgent = {
        ...this.agent,
        ...this.handleCityCode(this.city.resultCode)
      };
      // return;
      this.btnDisabled = true;
      this.editAgent(newAgent).then(flag => {
        this.btnDisabled = false;
        if (flag) {
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style>

</style>
