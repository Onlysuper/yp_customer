<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('role_add')" class="mybutton" @click="showDialog('addFormVisible')" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增角色" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.roleCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->

    <!-- 编辑 start -->
    <el-dialog title="修改角色" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode" :label-width="formLabelWidth">
          <el-input disabled v-model="editForm.roleCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
    <!-- 配置权限 start -->
    <el-dialog ref="roleTreebox" title="修改角色信息" center :visible.sync="configRoleFormVisible" width="500px">
      <div class="zTreeDemoBackground left">
        <ul id="roleTree" class="ztree"></ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configRoleFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="configRoleSave(roleForm)">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 配置角色 end -->

  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "../../common/zTree/css/metroStyle/metroStyle.css";
</style>
<script>
import SearchForm from "@src/components/SearchForm";
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import DataPage from "@src/components/DataPage";
import $ from "jquery";
import "@src/common/zTree/js/jquery.ztree.all.min.js";
import {
  getRoleManages,
  postAddRole,
  patchEditRole,
  deleteRole,
  getRolesTreeConfig,
  patchRolesTreeSave
} from "@src/apis";

export default {
  name: "role",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      // 默认搜索条件
      roleName: "", // 角色名称
      status: "" // 状态
    };
    return {
      addFormVisible: false, // 新增框
      editFormVisible: false, // 编辑框
      configRoleFormVisible: false, // 配置角色框
      zTreeObj: "",
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "nodeId",
            pIdKey: "parentNodeId",
            url: "xUrl"
          },
          keep: {
            leaf: false,
            parent: true
          },
          key: {
            name: "privilegeName"
          }
        }
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      roleDatas: [],
      roleDatasCheck: [],
      propsRoleData: {
        children: "children",
        label: "privilegeName"
      },
      addFormRules: {
        roleName: [{ required: true, message: "请输入内容", trigger: "blur,change" }],
        roleCode: [{ required: true, message: "请输入内容", trigger: "blur,change" }]
      },
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      roleForm: {
        roleCode: "",
        defaultCheckdMenu: [],
        defaultCheckdFunction: []
      }, // 设置角色表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      addForm: {
        roleName: "", // 角色名称
        roleCode: "" // 角色编号
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "roleName",
          type: "text", // 表单类型
          label: "角色名称", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.roleName = value;
          }
        },

        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "请选择"
            },
            {
              value: "TRUE",
              label: "有效"
            },
            {
              value: "FALSE",
              label: "无效"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        }
      ],
      searchCondition: searchConditionVar, // 搜索内容
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getRoleManages // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "角色名称",
            sortable: true,
            width: "",
            word: "roleName"
          },
          {
            key: "角色编号",
            width: "",
            word: "roleCode"
          },
          {
            key: "状态",
            word: "status",
            width: "",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "有效",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "未开启",
                  type: "info"
                };
              } else {
                return {
                  text: "没写",
                  type: ""
                };
              }
            }
          }
        ],
        operation: {
          // 操作按钮
          width: "150px",
          options: [
            {
              color: "#67C23A",
              text: "编辑",
              visibleFn: rowdata => {
                if (this.adminOperationAll.role_edit == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              text: "配置权限",
              color: "#E6A23C",
              visibleFn: rowdata => {
                if (this.adminOperationAll.role_privilege_edit == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.roleForm = rowdata;
                this.configRoleFormVisible = true;
                this.$nextTick(() => {
                  if (this.zTreeObj != null) {
                    $.fn.zTree.destroy("roleTree");
                    this.zTreeObj = null;
                  }
                  getRolesTreeConfig()({
                    roleCode: rowdata.roleCode
                  }).then(data => {
                    this.$nextTick(() => {
                      this._roleTree(data);
                    });
                  });
                });
              }
            },
            {
              text: "删除",
              color: "#00c1df",
              visibleFn: rowdata => {
                if (this.adminOperationAll.role_delete == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.$confirm("此操作将删除该条管理员数据, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    deleteRole()(rowdata.roleCode).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "删除成功!"
                        });
                        this.reloadData();
                      }
                    });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消删除"
                    });
                  });
              }
            }
          ]
        }
      }
    };
  },

  methods: {
    _roleTree(data) {
      this.zTreeInit($("#roleTree"), data, this.setting);
    },
    zTreeInit(element, zNodes, setting) {
      this.zTreeObj = $.fn.zTree.init(element, setting, zNodes);
      this.zTreeObj.expandAll(true);
    },
    zTreeOnClick(event, treeId, treeNode) {
      this.zTreeObj.expandNode(treeNode, null, null, null);
      return false;
    },
    // 普通搜索 具备隐藏
    // visiblesomeHandle() {
    //   this.searchOptions.forEach(element => {
    //     // searchOptions数组里面的corresattr 是索引
    //     if (!element.show) {
    //       if (element.type == "dateGroup") {
    //         // 开始时间 到结束时间组合 特殊处理
    //         element.options.forEach(element => {
    //           var corresattr = element.corresattr;
    //           element.value = "";
    //           this.searchCondition[corresattr] = "";
    //         });
    //       } else {
    //         var corresattr = element.corresattr;
    //         element.value = "";
    //         this.searchCondition[corresattr] = "";
    //       }
    //     }
    //   });
    // },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          postAddRole()(this.addForm).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，创建角色成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
              this.resetForm("addForm");
              this.reloadData();
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
            console.log(data);
          });
        }
      });
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          patchEditRole()({
            roleName: this.editForm.roleName,
            roleCode: this.editForm.roleCode
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，该角色修改成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
            console.log(data);
          });
        }
      });
    },
    voidnnode(arr1, arr2) {
      var newarr = [];
      for (var i = 0; i < arr1.length; i++) {
        var exists = 0;
        for (var z = 0; z < arr2.length; z++) {
          if (arr2[z] == arr1[i]) {
            exists++;
          }
        }
        if (exists == 0) {
          newarr.push(arr1[i]);
        }
      }
      return newarr;
    },
    configRoleSave(roleForm) {
      let roleCode = roleForm.roleCode;
      let nodes = this.zTreeObj.getChangeCheckedNodes();
      if (nodes.length == 0) {
        this.$message({
          message: "请勾选或取消菜单权限",
          type: "warning",
          center: true
        });
      } else {
        let addMenuCodes = "";
        let deleteMenuCodes = "";

        let addMenuFunctionCodes = "";
        let deleteMenuFunctionCodes = "";
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i][this.zTreeObj.setting.data.key.checked] == true) {
            if (nodes[i].type == "menu") {
              addMenuCodes += nodes[i].privilegeCode + ",";
            } else if (nodes[i].type == "function") {
              addMenuFunctionCodes += nodes[i].privilegeCode + ",";
            }
          } else {
            if (nodes[i].type == "menu") {
              deleteMenuCodes += nodes[i].privilegeCode + ",";
            } else if (nodes[i].type == "function") {
              deleteMenuFunctionCodes += nodes[i].privilegeCode + ",";
            }
          }
        }
        this.saveLoading = true;
        patchRolesTreeSave()({
          roleCode: roleCode,
          addMenuCodes: addMenuCodes,
          deleteMenuCodes: deleteMenuCodes,
          addMenuFunctionCodes: addMenuFunctionCodes,
          deleteMenuFunctionCodes: deleteMenuFunctionCodes
        }).then(data => {
          if (data.code == "00") {
            this.$message({
              message: "恭喜你，角色修改成功!",
              type: "success",
              center: true
            });
            this.reloadData();
            this.configRoleFormVisible = false;
          } else {
            this.$message({
              message: data.msg,
              type: "success",
              center: true
            });
          }
          this.saveLoading = false;
        });
      }
    }
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      // var roleTree = this.$refs;
      // console.log(roleTree);
    });
  },
  watch: {
    addFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
    configRoleFormVisible(val) {
      this.saveLoadingStop(val);
    },
  }
};
</script>

