<template>
  <div class="admin-page">
    <div class="admin-main-box tree-table-box">
      <div class="tree-box">
        <!-- <el-tree :props="dataTreeProps" render-after-expand="true" @node-click="treeClick" :load="rootTreeload" lazy show-checkbox> -->
        <div class="zTreeDemoBackground left">
          <ul id="rootTreeNenu" class="ztree"></ul>
        </div>
      </div>
      <div class="table-box" v-show="tableVisible">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addFuncDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
        <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
      </div>
    </div>
    <!-- 新增功能 start -->
    <el-dialog v-dialogDrag title="新增功能" center :visible.sync="addFuncFormVisible" width="500px">
      <el-form size="small" :model="addFuncForm" ref="addFuncForm" :rules="addFuncFormRules">
        <el-form-item label="归属菜单" prop="menuName" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="addFuncForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能类型" :label-width="formLabelWidth">
          <el-select @change="functionTypeChange" prop="functiontype" v-model="addFuncForm.functiontype" placeholder="功能类型">
            <el-option v-for="item in addFuncForm.typeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能名称" prop="functionName" :label-width="formLabelWidth">
          <el-input v-model="addFuncForm.functionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="addFuncForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请求方法" :label-width="formLabelWidth">
          <el-select prop="httpMethod" v-model="addFuncForm.httpMethod" placeholder="请求方法">
            <el-option v-for="item in httpMethodOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能编号" prop="functionCode" :label-width="formLabelWidth">
          <el-input v-model="addFuncForm.functionCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFuncFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addFuncSave('addFuncForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增功能 end -->
    <!-- 功能编辑 start -->
    <el-dialog v-dialogDrag title="修改功能" center :visible.sync="editFuncFormVisible" width="500px">
      <el-form size="small" :model="editFuncForm" ref="editFuncForm" :rules="addFormRules">
        <el-form-item label="归属菜单" prop="menuName" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editFuncForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="functionName" :label-width="formLabelWidth">
          <el-input v-model="editFuncForm.functionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="editFuncForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请求方法" :label-width="formLabelWidth">
          <el-select prop="httpMethod" v-model="editFuncForm.httpMethod" placeholder="是否有下级菜单">
            <el-option v-for="item in httpMethodOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能编号" prop="functionCode" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editFuncForm.functionCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFuncFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editFuncSave('editFuncFormVisible')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 功能编辑 end -->
    <!-- 新增菜单 start -->
    <el-dialog v-dialogDrag title="新增菜单" center :visible.sync="addFormVisible" width="500px">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="addForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" prop="menuCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.menuCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有下级菜单">
          <el-switch v-model="addForm.isParent" active-value="TRUE" inactive-value="FALSE" active-text="是" inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="(addForm.isParent=='TRUE'?false:true)" label="菜单url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="addForm.url" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增菜单 end -->
    <!-- 编辑 start -->
    <el-dialog v-dialogDrag title="修改菜单" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="editForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" prop="menuCode" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editForm.menuCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!editForm.isParent" label="菜单url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="editForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有下级菜单">
          <el-select :disabled="true" prop="isParent" v-model="editForm.isParent" placeholder="是否有下级菜单">
            <el-option v-for="item in editForm.editOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "../../common/zTree/css/metroStyle/metroStyle.css";
.tree-table-box {
  display: flex;
  flex-direction: row;
  .tree-box {
    flex-shrink: 0;
    overflow: auto;
    width: 250px;
  }
  .table-box {
    flex-shrink: 1;
    width: 100%;
  }
}
</style>
<script>
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import {
  getMenuTrees,
  getMenuTreePage,
  patchEditMenuTree,
  patchAddMenuTree,
  deleteMenuTree,
  postAddMenuFunction,
  patchEditMenuFunction,
  deleteMenuFunction
} from "@src/apis";
import $ from "jquery";
import "@src/common/zTree/js/jquery.ztree.all.js";

export default {
  name: "menu",
  components: {
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      // 查询条件
      menuCode: ""
    };
    var httpMethodOptions = [
      {
        value: "GET",
        label: "GET"
      },
      {
        value: "POST",
        label: "POST"
      },
      {
        value: "PATCH",
        label: "PATCH"
      },
      {
        value: "DELETE",
        label: "DELETE"
      },
      {
        value: "PUT",
        label: "PUT"
      },
      {
        value: "HEADN",
        label: "HEADN"
      },
      {
        value: "OPTIONS",
        label: "OPTIONS"
      }
    ];
    return {
      tableVisible: false,
      editFuncFormVisible: false,
      httpMethodOptions: httpMethodOptions,
      editFuncForm: {},
      functionMenu: {},
      treeNodeObj: "",
      treeId: "rootTreeNenu",
      zTreeObj: "",
      addFuncFormVisible: false,
      addFuncFormRules: {},
      addFuncForm: {
        menuName: "",
        functionName: "",
        url: "",
        httpMethod: "",
        functionCode: "",
        // 功能类型
        typeOptions: [
          {
            value: "add",
            label: "新增"
          },
          {
            value: "edit",
            label: "修改"
          },
          {
            value: "page",
            label: "分页查询"
          },
          {
            value: "delete",
            label: "删除"
          }
        ]
        // 请求方法
      },
      menuFunctionParentNode: "",
      addFormVisible: false,
      addForm: {
        addOptions: [
          {
            value: true,
            label: "是"
          },
          {
            value: false,
            label: "否"
          }
        ]
      },
      editFormVisible: false,
      editForm: {
        editOptions: [
          {
            value: true,
            label: "是"
          },
          {
            value: false,
            label: "否"
          }
        ]
      },

      addFormRules: {},
      formLabelWidth: "100px",
      // 列表数据
      actionUrl: getMenuTreePage,
      postSearch: searchConditionVar,
      searchCondition: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getMenuTreePage // 初始化数据
        // },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "功能",
            width: "130px",
            sortable: true,
            word: "functionName"
          },
          {
            key: "功能编号",
            width: "",
            word: "functionCode"
          },
          {
            key: "url",
            word: "url",
            width: ""
          },
          {
            key: "请求方法",
            width: "",
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
              visibleFn: rowdata => {
                return this.adminFilter('menu_function_edit')
                // if (this.adminOperationAll.menu_function_edit == "TRUE") {
                //   return true;
                // } else {
                //   return false;
                // }
              },
              cb: rowdata => {
                this.editFuncForm = rowdata;
                this.editFuncForm.menuName = this.functionMenu.menuName;
                this.editFuncFormVisible = true;
              }
            },
            {
              text: "删除",
              visibleFn: rowdata => {
                return this.adminFilter('menu_function_delete')
                // if (this.adminOperationAll.menu_function_delete == "TRUE") {
                //   return true;
                // } else {
                //   return false;
                // }
              },
              cb: rowdata => {
                console.log(rowdata.functionCode);
                this.$confirm("此操作将永久删除该功能, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  deleteMenuFunction()(rowdata.functionCode).then(data => {
                    if (data.code == "00") {
                      this.$message({
                        type: "success",
                        message: "删除成功!"
                      });
                      // 更新数据
                      this.postSearch = {
                        menuCode: this.functionMenu.menuCode
                      };
                      this.reloadData();
                    } else {
                      this.$message({
                        type: "warning",
                        message: data.msg
                      });
                    }
                  });
                });
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
    // 新增功能弹出显示
    addFuncDialog() {
      this.addFuncForm.httpMethod = "";
      this.addFuncForm.functiontype = "";
      this.addFuncForm.functionName = "";
      this.addFuncForm.url = "";
      this.addFuncForm.functionCode = "";
      this.addFuncForm.httpMethod = "GET";
      var functionMenu = this.functionMenu;
      var addFuncForm = this.addFuncForm;
      this.addFuncForm.menuName = functionMenu.menuName;
      this.addFuncFormVisible = true;
    },
    editFuncSave() {
      // 修改功能保存
      this.saveLoading = true;
      var editFuncForm = this.editFuncForm;
      patchEditMenuFunction()({
        menuCode: this.functionMenu.menuCode,
        menuName: editFuncForm.menuName,
        functionName: editFuncForm.functionName,
        url: editFuncForm.url,
        httpMethod: editFuncForm.httpMethod,
        functionCode: editFuncForm.functionCode
        // ...this.editFuncForm
      }).then(data => {
        if (data.code == "00") {
          this.$message({
            type: "success",
            message: "恭喜您，功能更改成功!"
          });
          // 更新数据
          this.postSearch = {
            // 查询条件
            menuCode: this.functionMenu.menuCode
          };
          this.reloadData();
          this.editFuncFormVisible = false;
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
        this.saveLoading = false;
      });
    },
    // 新增菜单功能类型改变
    functionTypeChange(data) {
      if (data.value == "") {
        return false;
      }
      let menuCode = this.functionMenu.menuCode;
      let functionName = "";
      let url = "/" + menuCode;
      if (data == "add") {
        this.addFuncForm.httpMethod = "POST";
        functionName = "新增";
      } else if (data == "edit") {
        functionName = "修改";
        this.addFuncForm.httpMethod = "PATCH";
      } else if (data == "page") {
        functionName = "分页查询";
        this.addFuncForm.httpMethod = "GET";
        url += "/page";
      } else if (data == "delete") {
        functionName = "删除";
        this.addFuncForm.httpMethod = "DELETE";
        url += "/delete/*";
      }
      this.addFuncForm.functionName = functionName;
      this.addFuncForm.url = url;
      this.addFuncForm.functionCode = menuCode + "_" + data;
    },
    // 保存新增功能
    addFuncSave() {
      this.saveLoading = true;
      postAddMenuFunction()({
        menuCode: this.functionMenu.menuCode,
        menuName: this.addFuncForm.menuName,
        "function-type": this.addFuncForm.functiontype,
        functionName: this.addFuncForm.functionName,
        url: this.addFuncForm.url,
        httpMethod: this.addFuncForm.httpMethod,
        functionCode: this.addFuncForm.functionCode
      }).then(data => {
        if (data.code == "00") {
          this.$message({
            type: "success",
            message: "恭喜您，添加功能成功!"
          });
          // 更新数据
          this.postSearch = {
            menuCode: this.functionMenu.menuCode
          };
          this.reloadData();
          this.addFuncFormVisible = false;
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
        this.saveLoading = false;
      });
    },
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
        btn.bind("click", () => {
          // 点击新增按钮
          // treeNode.menuCode
          this.addForm.parentCode = treeNode.menuCode;
          this.addFormVisible = true;
          return false;
        });
      }
    },
    addSave() {
      // 保存新增信息
      this.saveLoading = true;
      var addForm = this.addForm;
      patchAddMenuTree()({
        menuName: addForm.menuName,
        parentCode: addForm.parentCode,
        menuCode: addForm.menuCode,
        isParent: addForm.isParent,
        url: addForm.url
      }).then(data => {
        if (data.code == "00") {
          this.$message({
            type: "success",
            message: "恭喜您，新增菜单成功!"
          });
          this.zTreeObj.reAsyncChildNodes(this.treeNodeObj, "refresh");
          this.zTreeObj.expandNode(this.treeNodeObj, null, null, null);
          this.addFormVisible = false;
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
        this.saveLoading = false;
      });
    },
    // 树加载成功之后展开根节点
    zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
      var treeObj = $.fn.zTree.getZTreeObj(this.treeId);
      var nodes = treeObj.getNodes();
      for (var i = 0; i < nodes.length; i++) {
        treeObj.expandNode(nodes[i], true);
      }
    },
    // 点击编辑按钮
    beforeEditName(treeId, treeNode) {
      // this.resetForm("editForm");
      this.editForm = {};
      this.treeNodeObj = treeNode.getParentNode();
      this.editForm = treeNode;
      // editForm.isParent = false;
      if (treeNode.isParent) {
        this.editForm.editOptions = [
          {
            value: true,
            label: "是"
          },
          {
            value: false,
            label: "否"
          }
        ];
      } else {
        this.editForm.editOptions = [
          {
            value: false,
            label: "是"
          },
          {
            value: true,
            label: "否"
          }
        ];
      }
      this.editFormVisible = true;
    },
    editSave() {
      this.saveLoading = true;
      let editForm = this.editForm;
      patchEditMenuTree()({
        menuName: editForm.menuName,
        menuCode: editForm.menuCode,
        isParent: editForm.isParent,
        url: editForm.url
      }).then(data => {
        if (data.code == "00") {
          this.$message({
            type: "success",
            message: "恭喜您，更改成功!"
          });
          this.zTreeObj.reAsyncChildNodes(this.treeNodeObj, "refresh");
          this.zTreeObj.expandNode(this.treeNodeObj, null, null, null);
          this.editFormVisible = false;
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
        this.saveLoading = false;
      });
    },
    // 点击删除按钮
    beforeRemove(treeId, treeNode) {
      if (
        treeNode.isParent &&
        treeNode.children != null &&
        treeNode.children.length != 0
      ) {
        this.$message({
          message: "操作失败: 请先删除该菜单下的子菜单",
          type: "warning"
        });
        return false;
      }
      // return false;
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMenuTree()(treeNode.menuCode).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.zTreeObj.removeNode(treeNode, false);
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      return false;
    },
    zTreeOnClick(event, treeId, treeNode) {
      if (treeNode.isParent) {
        this.zTreeObj.expandNode(treeNode, null, null, null);
      } else {
        this.functionMenu = treeNode; // 同步当前所点击的菜单menuCode
        this.menuFunctionParentNode = treeNode;
        // 更新数据
        this.postSearch = {
          menuCode: this.functionMenu.menuCode
        };
        this.reloadData();
        // 显示表格
        this.tableVisible = true;
      }
      return false;
    },
    // 加载树列表
    rootTreeload(node, resolve) {
      getMenuTrees()({
        _: new Date() * 1
      }).then(data => {
        console.log(data);
      });
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    }
  },
  mounted() {
    // 配置ztree初始化属性，异步加载路径
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
  }
};
</script>

