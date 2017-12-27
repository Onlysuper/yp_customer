<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <div class="tree-box">
        <!-- <el-tree :props="dataTreeProps" render-after-expand="true" @node-click="treeClick" :load="rootTreeload" lazy show-checkbox> -->
        <div class="zTreeDemoBackground left">
          <ul id="rootTreeNenu" class="ztree"></ul>
        </div>
      </div>
      <div class="table-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
        <myp-data-page ref="dataTable" :tableDataInit="tableData" @operation="operationHandle"></myp-data-page>
      </div>
    </div>
    <!-- 编辑 start -->
    <el-dialog title="修改菜单" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="editForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" prop="menuCode" :label-width="formLabelWidth">
          <el-input v-model="editForm.menuCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="editForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有下级菜单">
          <el-select prop="isParent" v-model="editForm.isParent" placeholder="是否有下级菜单">
            <el-option v-for="item in ['是','否']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "../../common/zTree/css/metroStyle/metroStyle.css";
.admin-page {
  position: relative;
  background: #eff2f5;
  padding: 10px;
  .detail-content {
    .line-label-box {
      padding: 4px 0;
      .line-label {
        min-width: 100px;
        display: inline-block;
        padding: 0 10px;
      }
      &:nth-child(odd) {
        background-color: rgba(0, 193, 223, 0.1);
      }
      &:nth-child(even) {
        background-color: #fff;
      }
    }
  }
  .content-center-box {
    text-align: center;
  }
  .sep-inline {
    margin: 5px 0;
    width: 100%;
  }
  .operation-box {
    float: left;
    width: 100%;
    .button-group {
      margin-right: 10px;
    }
    .line {
      text-align: center;
    }
  }
  .operation-group {
    padding: 5px 0;
    .line {
      text-align: center;
    }
  }
  .tableHeader {
    background: #f0f0f0;
  }
  .page-tag {
    margin-bottom: 10px;
  }
  .admin-main-box {
    padding: 10px;
    position: relative;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .form-box {
    margin-top: 10px;
  }
  .el-pagination {
    text-align: right;
    padding-top: 17px;
  }
  .tip-text {
    color: #67c23a;
  }
  .button-group {
    padding-bottom: 5px;
  }
}
</style>



<script>
import DataPage from "@src/components/DataPage";
import { getMenuTrees, getMenuTreePage } from "@src/apis";
import $ from "jquery";
// import "@src/common/zTree/js/jquery.min.js";
import "@src/common/zTree/js/jquery.ztree.all.js";
// import "@src/common/zTree/js/jquery.ztree.all.min.js";

export default {
  name: "usermanage",
  components: {
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    return {
      treeNodeObj: "",
      treeId: "rootTreeNenu",
      zTreeObj: "",
      menuFunctionParentNode: "",
      editFormVisible: false,
      editForm: {},
      addFormRules: {},
      formLabelWidth: "100px",
      // 列表数据
      tableData: {
        getDataUrl: {
          url: getMenuTreePage, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: ""
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "功能",
            width: "100px",
            sortable: true,
            word: "functionName"
          },
          {
            key: "功能编号",
            width: "100px",
            word: "functionCode"
          },
          {
            key: "url",
            word: "url"
          },
          {
            key: "请求方法",
            width: "100px",
            word: "httpMethod"
          }
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              text: "删除",
              cb: rowdata => {
                console.log(rowdata);
              }
            }
          ]
        }
      },
      dataTreeProps: {
        label: "menuName",
        isLeaf: "isParent"
      }
    };
  },
  methods: {
    removeHoverDom(treeId, treeNode) {
      $("#addBtn_" + treeNode.tId)
        .unbind()
        .remove();
    },
    addHoverDom(treeId, treeNode) {
      this.treeNodeObj = treeNode;
      var sObj = $("#" + treeNode.tId + "_span");
      if (
        !treeNode.isParent ||
        treeNode.editNameFlag ||
        $("#addBtn_" + treeNode.tId).length > 0
      ) {
        return;
      }
      var addStr =
        "<span class='button add' id='addBtn_" +
        treeNode.tId +
        "' title='添加菜单' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) {
        btn.bind("click", function() {
          $("#add-menu-form")[0].reset();
          showUrlDiv(false);
          layerIndex = layer.open({
            type: 1,
            title: "新增菜单",
            area: ["600px", "350px"],
            shade: 0.4,
            content: $("#add-menu-form")
          });
          $("#parentCode").val(treeNode.menuCode);
          return false;
        });
      }
    },
    // 树加载成功之后展开根节点
    zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
      var treeObj = $.fn.zTree.getZTreeObj(this.treeId);
      var nodes = treeObj.getNodes();
      for (var i = 0; i < nodes.length; i++) {
        treeObj.expandNode(nodes[i], true);
      }
    },
    beforeEditName(treeId, treeNode) {
      this.treeNodeObj = treeNode.getParentNode();
      this.editForm = treeNode;
      console.log(treeNode.isParent);
      this.editFormVisible = true;
      console.log(treeNode);
      // $("#edit-menu-form")[0].reset();
      // $("#edit-menu-form").setForm(treeNode);
      // $("[lay-filter='isParent-select']").val(
      //   treeNode.isParent ? "TRUE" : "FALSE"
      // );
      // showUrlDiv(treeNode.isParent);

      // layerIndex = layer.open({
      //   type: 1,
      //   title: "修改菜单",
      //   area: ["600px", "350px"],
      //   shade: 0.4,
      //   content: $("#edit-menu-form")
      // });
      // return false;
    },
    beforeRemove(treeId, treeNode) {
      if (
        treeNode.isParent &&
        treeNode.children != null &&
        treeNode.children.length != 0
      ) {
        layer.msg("操作失败: 请先删除该菜单下的子菜单", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // layer.confirm("确定删除吗?", function(index) {
      //   $.ajax({
      //     type: "DELETE",
      //     dataType: "json",
      //     url: "/menu/delete/" + treeNode.menuCode,
      //     success: function(data) {
      //       layer.close(index);
      //       zTreeObj.removeNode(treeNode, false);
      //       $("#menuFuntionDiv").hide();
      //     }
      //   });
      // });

      return false;
    },
    zTreeOnClick(event, treeId, treeNode) {
      if (treeNode.isParent) {
        this.zTreeObj.expandNode(treeNode, null, null, null);
      } else {
        this.menuFunctionParentNode = treeNode;
        $("#menuFuntionDiv").show();
        this.tableData.getDataUrl = {
          url: getMenuTreePage, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: {
            menuCode: treeNode.menuCode
          }
        };
      }
      return false;
    },
    addDialog() {
      alert("新增");
    },
    // 加载树列表
    rootTreeload(node, resolve) {
      getMenuTrees()({
        _: new Date() * 1
      }).then(data => {
        console.log(data);
      });
    },
    treeClick(data) {
      if (data.level == 2) {
        this.tableData.getDataUrl = {
          url: getMenuTreePage, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: {
            menuCode: data.menuCode
          }
        };
      }
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    }
  },
  mounted() {
    let setting = {
      async: {
        enable: true,
        url: this.oaIp + "/menu/tree",
        type: "get",
        dataType: "json",
        autoParam: ["menuCode"]
      },
      view: {
        addHoverDom: this.addHoverDom,
        removeHoverDom: this.removeHoverDom,
        selectedMulti: false
      },
      check: {
        enable: true
      },
      data: {
        simpleData: {
          enable: true,
          idKey: "menuCode",
          pIdKey: "parentCode"
        },
        keep: {
          leaf: false,
          parent: true
        },
        key: {
          name: "menuName"
        }
      },
      edit: {
        enable: true
      },
      callback: {
        onAsyncSuccess: this.zTreeOnAsyncSuccess,
        beforeEditName: this.beforeEditName,
        beforeRemove: this.beforeRemove,
        onClick: this.zTreeOnClick
      }
    };
    this.zTreeObj = $.fn.zTree.init($("#rootTreeNenu"), setting);
    // this.rootTreeload();
  }
};
</script>

