<template>
  <!-- 产品费率 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <div class="source-container">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>产品费率</span>
          </div>
          <ul class="myp-content-list">
            <li>
              <div>
                <span class="lable">借记卡手续费率:</span>
                <span class="text"> 0.45%</span>
              </div>
              <div>
                <span class="lable">借记卡封顶金额:</span>
                <span class="text">0.0</span>
              </div>
            </li>
            <li>
              <div>
                <span class="lable">贷记卡手续费率: </span>
                <span class="text">0.52%</span>
              </div>

            </li>
            <li>
              <div>
                <span class="lable">微信手续费率:</span>
                <span class="text">0.38%</span>
              </div>
            </li>
            <li>
              <div>
                <span class="lable">支付宝手续费率: </span>
                <span class="text">0.45%</span>
              </div>
            </li>
            <li>
              <div>
                <span class="lable">快捷支付手续费率:</span>
                <span class="text">1%</span>
              </div>
            </li>
            <li>
              <div>
                <span class="lable">代付手续费率:</span>
                <span class="text">0.5元/笔</span>
              </div>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.source-container {
  margin-top: 10px;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import { mixinsPc } from "@src/common/mixinsPc";
import { getPartnerTransfer, getTransferBranchoffice } from "@src/apis";
export default {
  name: "agent_transfer",
  components: {},
  mixins: [mixinsPc],
  data() {
    return {
      form: {
        name: ''
      },
      fileList: [],
      activeName: 'first',
      labelPosition: "left",
      transferForm: {},
      transferFormRules: {
        transferAgentNo: [
          { required: true, message: "请输入转移合伙人编号", trigger: "blur,change" }
        ],
        targetAgentNo: [
          { required: true, message: "请输入接受合伙人编号", trigger: "blur,change" }
        ]
      },
      branchOfficeForm: {},
      branchOfficeFormRules: {
        targetAgentNo: [
          { required: true, message: "请输入接收合伙人编号", trigger: "blur,change" }
        ],
        agentNo: [
          { required: true, message: "请输入一代合伙人编号", trigger: "blur,change" }
        ]
      }
    };
  },

  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前共选择了 ${files.length +
        fileList.length} 个文件,超出限定个数。可删除下方上传列表，再重新选择上传`
      );
      this.saveLoading = false;
    },
    beforeBindBatchUpload(file) {
      const extension = file.name.split(".")[1] === "xlsx";
      const extension2 = file.name.split(".")[1] === "numbers";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message.error("上传文件只能是 xlsx,numbers 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      this.saveLoading = false;
      return (extension || extension2) && isLt2M;
    },
    batchBindUploadSuccess(res, file) {
      // 文件上传成功
      if (res.data == "00") {
        this.$message.success("恭喜您！上传成功");
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
      this.reloadData();
      this.$refs.batchBindFile.clearFiles();
      this.batchBindVisible = false;
      this.saveLoading = false;
    },
    uploadFilleError(response, file, fileList) {
      this.$message({
        message: "很抱歉，上传失败！",
        type: "warning",
        center: true
      });
      this.$refs.batchBindFile.clearFiles();
      this.saveLoading = false;
    },
  }
};
</script>

