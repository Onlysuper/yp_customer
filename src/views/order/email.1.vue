<template>
  <!-- 发起代付 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <div class="source-container">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label=" 单笔代付 " name="first">
            <div class="source-block">
              <div class="source ">
                <el-form ref="form " :model="form " label-width="100px">
                  <el-form-item label="代付金额">
                    <el-input v-model="form.name "></el-input>
                  </el-form-item>
                  <el-form-item label="收款人姓名">
                    <el-input v-model="form.name "></el-input>
                  </el-form-item>
                  <el-form-item label="开户银行">
                    <el-input v-model="form.name "></el-input>
                  </el-form-item>
                  <el-form-item label="选择支行">
                    <el-input v-model="form.name "></el-input>
                  </el-form-item>
                  <el-form-item label="银行账号">
                    <el-input v-model="form.name "></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button>重置</el-button>
                    <el-button type="primary ">发起代付</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批量代付 " name="second">
            <div class="source-block ">
              <div class="source ">
                <el-form ref="form " :model="form " label-width="100px">
                  <div class="content-center-box">
                    <div class="sep-inline">
                      <a class="link-Label" :href="oaIp+'/static/template/qrcode-batch-bind.xlsx'">下载批量代付模板</a>
                    </div>
                    <div class="sep-inline">
                      <el-upload :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :on-exceed="handleExceed" class="upload-demo" ref="batchBindFile" :before-upload="beforeBindBatchUpload" :on-success="batchBindUploadSuccess" :on-error="uploadFilleError" :action="oaIp+'/qrcode/bindBatchQrCode'" :file-list="fileList" :auto-upload="false" accept="file" drag>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将入网文件拖到此处，或
                          <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传xlsx文件,请注意文件格式</div>
                      </el-upload>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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

