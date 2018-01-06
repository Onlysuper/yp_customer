<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <div class="form-box">
        <el-form :label-position="labelPosition" ref="form" center :model="form" label-width="120px">
          <el-form-item label="转移合伙人编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="接受合伙人编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定转移</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="division-line"></div>
      <div class="form-box">
        <el-form ref="form" center :model="form" label-width="120px">
          <el-form-item label="一代合伙人编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="接收合伙人编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item center>
            <el-button type="primary" @click="onSubmit">一代升级为分公司</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.form-box {
  width: 500px;
  padding-left: 20px;
  &:first-of-type {
    margin-bottom: 50px;
    margin-top: 30px;
  }
  &:last-of-type {
    padding-top: 30px;
  }
}
</style>
<script>
export default {
  name: "agentTranster",
  components: {},
  data() {
    return {
      labelPosition: "left",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

