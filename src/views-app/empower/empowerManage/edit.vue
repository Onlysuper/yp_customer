<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="序列号" placeholder="请输入序列号" v-model="empowerList.qrcode"></mt-field>
        <mt-field type="text" label="授权码" placeholder="请输入授权码" v-model="empowerList.authCode"></mt-field>
        <mt-field type="text" label="合伙人编号" placeholder="请输入合伙人编号" v-model="empowerList.agentNo"></mt-field>
        <mt-field type="text" label="商户编号" placeholder="请输入商户编号" v-model="empowerList.customerNo"></mt-field>
        <mt-field type="text" label="分机号" placeholder="请输入分机号" v-model="empowerList.extensionNum"></mt-field>
        <myp-radio @result="serviceModeChange" :title="'服务方式'" :modleValue="empowerList.serviceMode" :actions="serviceModeOptions"></myp-radio>
        <myp-checkList @result="supportTypesChange" :title="'支持类型'" :modleValue="empowerList.supportTypes" :actions="supportTypesOptions"></myp-checkList>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import checkList from "@src/components-app/CheckList";
import Radio from "@src/components-app/Radio";
export default {
  components: {
    "myp-checkList": checkList,
    "myp-radio": Radio
  },
  data() {
    return {
      btnDisabled: false,
      pageType: this.$route.query["type"] || "ADD",
      authCode: this.$route.params["authCode"],
      empowerList: {
        serviceMode: "YP",
        supportTypes: ["4"]
      },
      pageTitle: {
        ADD: "添加",
        EDIT: "编辑"
      },
      supportTypesOptions: [
        {
          label: "普票",
          value: "1"
        },
        {
          label: "专票",
          value: "2"
        },
        {
          label: "特殊",
          value: "4"
        }
      ],
      serviceModeOptions: [
        {
          label: "航信",
          value: "HX"
        },
        {
          label: "易票",
          value: "YP"
        },
        {
          label: "航信_易票",
          value: "HX_YP"
        }
      ]
    };
  },
  mounted() {
    this.pageType == "EDIT" &&
      this.getEmpowerManageUnit(this.authCode).then(empowerList => {
        this.empowerList = { ...empowerList };
        let supportType = empowerList.supportType;
        console.log(supportType);
        if (supportType == "1") {
          this.empowerList.supportTypes = ["1"];
        } else if (supportType == "2") {
          this.empowerList.supportTypes = ["2"];
        } else if (supportType == "3") {
          console.log(11111);
          this.empowerList.supportTypes = ["1", "2"];
        } else if (supportType == "5") {
          this.empowerList.supportTypes = ["1", "4"];
        } else if (supportType == "7") {
          this.empowerList.supportTypes = ["1", "2", "4"];
        }
      });
  },
  methods: {
    ...mapActions(["getEmpowerManageUnit", "updataCustomer", "addCustomer"]),
    serviceModeChange(value) {
      console.log(value);
    },
    supportTypesChange(value) {
      console.log(value);
    },
    save() {}
    // save() {
    //   if (!this.validator.isEmpty(this.customer.enterpriseName)) {
    //     this.MessageBox.alert("企业名称不能为空！");
    //     return;
    //   }
    //   if (!this.validator.isTax(this.customer.taxNo)) {
    //     this.MessageBox.alert("企业税号有误！");
    //     return;
    //   }
    //   if (!this.validator.isEmpty(this.customer.legalPerson)) {
    //     this.MessageBox.alert("企业法人不能为空！");
    //     return;
    //   }
    //   if (!this.validator.isCardNo(this.customer.idCard)) {
    //     this.MessageBox.alert("身份证号有误！");
    //     return;
    //   }
    //   if (!this.validator.isEmpty(this.customer.linkMan)) {
    //     this.MessageBox.alert("联系人不能为空！");
    //     return;
    //   }
    //   if (!this.validator.isMobile(this.customer.phoneNo)) {
    //     this.MessageBox.alert("手机号有误！");
    //     return;
    //   }
    //   this.btnDisabled = true;
    //   this.pageType == "EDIT"
    //     ? this.updataCustomer(this.customer).then(flag => {
    //         this.btnDisabled = false;
    //         if (flag) {
    //           this.$router.back();
    //         }
    //       })
    //     : this.addCustomer(this.customer).then(flag => {
    //         this.btnDisabled = false;
    //         if (flag) {
    //           this.$store.commit("CUSTOMER_MANAGE_IS_SEARCH", true);
    //           this.$router.back();
    //         }
    //       });
    // }
  }
};
</script>

<style>

</style>
