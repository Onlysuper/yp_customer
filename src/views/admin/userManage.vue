<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page ref="dataTable" :tableDataInit="tableData" @operation="operationHandle"></myp-data-page>
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
        <el-button type="primary" @click="addSave('addForm')">确 定</el-button>
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
        <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
    <!-- 配置角色 start -->
    <el-dialog title="修改用户信息" center :visible.sync="configRoleFormVisible" width="500px">
      <el-tree :data="roleData" ref="roleConfigtree" :props="propsRoleData" lazy show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="configRoleSave(roleForm.username)">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 配置角色 end -->

  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
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
    // width: 100%;
    background: #fff;
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
import axios from "axios";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import {
  getUserManages,
  postAddUser,
  patchEditUser,
  getRolesTree,
  patchConfigRole,
  deleteUserManage
} from "@src/apis";

export default {
  name: "usermanage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    // 不能为空
    var notNullVerify = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空!"));
      } else {
        callback();
      }
    };
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
      addFormVisible: false, // 新增框
      editFormVisible: false, // 编辑框
      configRoleFormVisible: false, // 配置角色框
      roleData: [], // 配置角色的数据
      propsRoleData: {
        children: "children",
        label: "roleName"
      },
      addFormRules: {
        realname: [{ validator: notNullVerify, trigger: "blur" }],
        username: [{ validator: notNullVerify, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      roleForm: {
        username: ""
      }, // 设置角色表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      addForm: {
        realname: "", // 用户名
        username: "", // 登录名
        password: "", // 登录密码
        repassword: "" //确认登录密码
      },
      // 顶部搜索表单信息
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
          show: false, // 普通搜索显示
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
      tableData: {
        getDataUrl: {
          url: getUserManages, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: searchConditionVar // 搜索内容
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "用户名称",
            sortable: true,
            word: "realname"
          },
          {
            key: "用户登录名",
            width: "100px",
            word: "username"
          },
          {
            key: "状态",
            word: "status",
            width: "80px",
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
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              text: "配置角色",
              color: "#E6A23C",
              cb: rowdata => {
                this.roleForm = rowdata;
                getRolesTree()({ username: rowdata.username }).then(data => {
                  this.roleData = data;
                });

                this.configRoleFormVisible = true;
              }
            },
            {
              text: "删除",
              color: "#00c1df",
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
        }
      }
    };
  },

  methods: {
    // 普通搜索 具备隐藏
    visiblesomeHandle() {
      this.searchOptions.forEach(element => {
        // searchOptions数组里面的corresattr 是索引
        if (!element.show) {
          if (element.type == "dateGroup") {
            // 开始时间 到结束时间组合 特殊处理
            element.options.forEach(element => {
              var corresattr = element.corresattr;
              element.value = "";
              this.searchCondition[corresattr] = "";
            });
          } else {
            var corresattr = element.corresattr;
            element.value = "";
            this.searchCondition[corresattr] = "";
          }
        }
      });
    },
    callbackformHandle(cb, data) {
      // 表单双向绑定 得到输入的内容并返回到本页面
      cb(data);
    },
    resetSearchHandle() {
      // 重置查询表单
      this.searchOptions.forEach(element => {
        if (element.type != "dateGroup") {
          element.value = "";
          this.searchCondition[element.corresattr] = "";
        } else {
          element.options.forEach(element => {
            element.value = "";
            this.searchCondition[element.corresattr] = "";
          });
        }
      });
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取新数据
    reloadData() {
      console.log(this.searchCondition);
      this.tableData.getDataUrl = {
        url: getUserManages,
        page: 1,
        limit: 10,
        searchCondition: this.searchCondition
      };
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.resetSearchHandle();
          // console.log(this.addForm);
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
                message: data.resultMsg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
          });
        }
      });
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          // {
          //   realname: this.editForm.realname,
          //   username: this.editForm.username
          // }
          // this.resetSearchHandle();
          let fmdate = new FormData();
          fmdate.append("realname", this.editForm.realname);
          fmdate.append("username", this.editForm.username);
          console.log(axios);

          // axios.fetch("http://192.168.100.229:8090/tm/user", {
          //   realname: this.editForm.realname,
          //   username: this.editForm.username
          // });
          // return;
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
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data.resultMsg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
          });
        }
      });
    },
    configRoleSave(username) {
      // 配置角色保存
      let checkRole = this.$refs.roleConfigtree.getCheckedNodes();
      let roleCodes = checkRole.map((item, index, input) => {
        return item.roleCode;
      });
      patchConfigRole()({
        username: username,
        addRoleCodes: roleCodes.toString(),
        deleteRoleCodes: ""
      }).then(data => {
        console.log(data);
      });
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    },
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    }
  },
  mounted() {}
};
</script>

