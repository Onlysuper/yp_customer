<template>
  <div class="admin-page">
    <div class="admin-main-box product-config-page">
      <h3>商户入网产品配置</h3>
      <el-form ref="pcForm" :model="pcForm" :label-width="formLabelWidth">
        <el-form-item label="修改商户默认交易费率">
          <el-input v-model="pcForm.name"></el-input>
        </el-form-item>
        <el-form-item label="修改商户默认交易固定成本">
          <el-input v-model="pcForm.name"></el-input>
        </el-form-item>
        <el-form-item label="修改商户授权码默认可用天数">
          <el-input v-model="pcForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="configSave('pcForm')">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.product-config-page {
  width: 600px;
  padding: 20px;
}
</style>



<script>
import {} from "@src/apis";

export default {
  name: "customermanage",
  components: {},
  data() {
    return {
      formLabelWidth: "250px",
      pcForm: {}
    };
  },
  methods: {
    configSave() {}
  },
  computed: {},
  mounted() {}
};
</script>

