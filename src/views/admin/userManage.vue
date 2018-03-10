<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('user_add')" class="mybutton" @click="showDialog('addFormVisible')" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增用户" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="用户名" prop="realname" :label-width="formLabelWidth">
          <el-input v-model="addForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码" prop="repassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="addForm.repassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddForm('addForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->

    <!-- 编辑 start -->
    <el-dialog title="修改用户信息" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="用户名" prop="realname" :label-width="formLabelWidth">
          <el-input v-model="editForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户登录名" prop="username" :label-width="formLabelWidth">
          <el-input disabled v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
    <!-- 配置角色 start -->
    <el-dialog title="修改用户信息" center :visible.sync="configRoleFormVisible" width="500px">
      <!-- <el-tree :data="roleData" ref="roleConfigtree" :props="propsRoleData" lazy show-checkbox>
      </el-tree> -->
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
import $ from "jquery";
import "@src/common/zTree/js/jquery.ztree.all.min.js";
import axios from "axios";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import {
  getUserManages,
  postAddUser,
  patchEditUser,
  getRolesTree,
  patchConfigRole,
  deleteUserManage
} from "@src/apis";

export default {
  name: "user",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addForm.repassword !== "") {
          this.$refs.addForm.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var searchConditionVar = {
      // 查询条件
      realname: "", // 用户名
      username: "", // 登录名
      status: "" // 状态
    };
    return {
      zTreeObj: "",
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "roleCode",
            pIdKey: "parentCode",
            url: "xUrl"
          },
          keep: {
            leaf: false,
            parent: true
          },
          key: {
            name: "roleName"
          }
        }
      },
      addFormVisible: false, // 新增框
      editFormVisible: false, // 编辑框
      configRoleFormVisible: false, // 配置角色框
      roleData: [], // 配置角色的数据
      propsRoleData: {
        children: "children",
        label: "roleName"
      },
      addFormRules: {
        realname: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入登陆名", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      roleForm: {
        username: ""
      }, // 设置角色表单

      addForm: {
        realname: "", // 用户名
        username: "", // 登录名
        password: "", // 登录密码
        repassword: "" //确认登录密码
      },
      // 顶部搜索表单信息
      // 查询条件数据
      searchCondition: searchConditionVar,
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "realname",
          type: "text", // 表单类型
          label: "用户名称", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.realname = value;
          }
        },
        {
          corresattr: "username",
          type: "text",
          label: "登录名称",
          show: true, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.username = value;
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
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getUserManages // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "用户名称",
            sortable: true,
            word: "realname",
            width: ""
          },
          {
            key: "用户登录名",
            width: "",
            word: "username"
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
              } else if (data === "DELETE") {
                return {
                  text: "已删除",
                  type: "info"
                };
              } else {
                return {
                  text: data,
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
                if (this.adminOperationAll.user_edit == "TRUE") {
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
              text: "配置角色",
              color: "#E6A23C",
              visibleFn: rowdata => {
                if (this.adminOperationAll.user_role_edit == "TRUE") {
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
                  getRolesTree()({ username: rowdata.username }).then(data => {
                    this.$nextTick(() => {
                      this._roleTree(data);
                    });
                  });
                });

                // getRolesTree()({ username: rowdata.username }).then(data => {
                //   this.roleData = data;
                // });
              }
            },
            {
              text: "删除",
              color: "#00c1df",
              visibleFn: rowdata => {
                if (this.adminOperationAll.user_delete == "TRUE") {
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
                    deleteUserManage()(rowdata.username).then(data => {
                      console.log(data);
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
        },
        // 数据加载成功
        dataSuccess: data => {
          console.log("数据加载完成");
          console.log(data);
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
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          postAddUser()(this.addForm).then(data => {
            console.log(data);
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，用户创建成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
              this.resetAddForm("addForm");
              this.reloadData();
            } else if (data.code === "98") {
              this.$message({
                message: "当前登录名已存在，请修改！",
                type: "warning",
                center: true
              });
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
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          let fmdate = new FormData();
          fmdate.append("realname", this.editForm.realname);
          fmdate.append("username", this.editForm.username);
          patchEditUser()({
            realname: this.editForm.realname,
            username: this.editForm.username
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，用户信息更改成功",
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
    configRoleSave(roleForm) {
      // 配置角色保存
      let roleCode = roleForm.roleCode;
      let nodes = this.zTreeObj.getChangeCheckedNodes();
      if (nodes.length == 0) {
        this.$message({
          message: "请勾选或取消菜单权限",
          type: "warning",
          center: true
        });
        return false;
      }
      let addRoleCodes = "";
      let deleteRoleCodes = "";
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i][this.zTreeObj.setting.data.key.checked] == true) {
          addRoleCodes += nodes[i].roleCode + ",";
        } else {
          deleteRoleCodes += nodes[i].roleCode + ",";
        }
      }
      this.saveLoading = true;
      patchConfigRole()({
        username: roleForm.username,
        addRoleCodes: addRoleCodes,
        deleteRoleCodes: deleteRoleCodes
      }).then(data => {
        if (data.code == "00") {
          this.$message({
            message: "恭喜你，角色配置成功",
            type: "success",
            center: true
          });
          this.configRoleFormVisible = false;
          this.reloadData();
        } else {
          this.$message({
            message: data.msg,
            type: "warning",
            center: true
          });
        }
        if (data.code == "00") {
          this.$message({
            message: "恭喜你，角色配置成功",
            type: "success",
            center: true
          });
          this.configRoleFormVisible = false;
          this.reloadData();
        } else {
          this.$message({
            message: data.msg,
            type: "warning",
            center: true
          });
        }
        this.saveLoading = false;
      });
      // let checkRole = this.$refs.roleConfigtree.getCheckedNodes();
      // let roleCodes = checkRole.map((item, index, input) => {
      //   return item.roleCode;
      // });
      // patchConfigRole()({
      //   username: username,
      //   addRoleCodes: roleCodes.toString(),
      //   deleteRoleCodes: ""
      // }).then(data => {
      //   if (data.code == "00") {
      //     this.$message({
      //       message: "恭喜你，角色配置成功",
      //       type: "success",
      //       center: true
      //     });
      //     this.configRoleFormVisible = false;
      //     this.reloadData();
      //   } else {
      //     this.$message({
      //       message: data.msg,
      //       type: "warning",
      //       center: true
      //     });
      //   }
      // });
    }
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
  },
  computed: {},
  mounted() { }
};
</script>

