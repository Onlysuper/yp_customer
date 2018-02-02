<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle+pageTitle[form.receiptType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <input-wrapper>
      <mt-field type="tel" label="申请数量" v-model="form.qrcodeCount" placeholder="请填写数量"></mt-field>
      <mt-cell title="是否需要生产水牌" v-if="form.receiptType == 'AUTHCODE'">
        <mt-switch v-model="isPrint"></mt-switch>
      </mt-cell>
    </input-wrapper>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      btnDisabled: false,
      isPrint: false,
      form: {
        qrcodeCount: "",
        isPrint: "N",
        receiptType: this.$route.query["type"]
      },
      pageTitle: { AUTHCODE: "授权码", SCANCODEGUN: "扫码枪" }
    };
  },
  watch: {
    isPrint(flag) {
      if (flag) this.form.isPrint = "Y";
      else this.form.isPrint = "N";
    }
  },
  created() {},
  methods: {
    ...mapActions(["addEmpowerCodeInfo"]),

    //提交表单
    save() {
      this.form.qrcodeCount = Number(this.form.qrcodeCount);
      if (
        !(
          this.validator.isEmpty(this.form.qrcodeCount) &&
          this.form.qrcodeCount > 0
        )
      ) {
        this.MessageBox.alert("请填写数量");
        return;
      }

      this.btnDisabled = true;
      this.addEmpowerCodeInfo(this.form).then(flag => {
        this.btnDisabled = false;
        if (flag) {
          this.$router.back();
          this.$store.commit("QRCODERECIEPT_SEARCH", true);
        }
      });
    }
  }
};
</script>

<style>

</style>
