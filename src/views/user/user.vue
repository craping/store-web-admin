<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <!-- <el-button type="primary" icon="plus" v-if="hasPerm('user:add')" @click="showCreate">添加 -->
          <el-button type="primary" icon="plus" v-if="hasPerm" @click="showCreate">添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" prop="nickname" style="width: 60px;"></el-table-column>
      <el-table-column align="center" label="用户名" prop="username" style="width: 60px;"></el-table-column>
      <el-table-column align="center" label="角色" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-text="scope.row.roleName" v-if="scope.row.roleId===1"></el-tag>
          <el-tag type="primary" v-text="scope.row.roleName" v-else></el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime" width="170"></el-table-column>
      <el-table-column align="center" label="最近修改时间" prop="updateTime" width="170"></el-table-column>
      <!-- <el-table-column align="center" label="管理" width="220" v-if="hasPerm('user:update')"> -->
      <el-table-column align="center" label="管理" width="220" v-if="hasPerm">
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" @click="showUpdate(scope.$index)">修改</el-button>
          <el-button type="danger" icon="delete" v-if="scope.row.userId!=userId "
                     @click="removeUser(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageRow"
      :total="totalCount"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="tempUser" label-position="left" label-width="80px"
               style='width: 300px; margin-left:50px;'>
        <el-form-item label="用户名" required v-if="dialogStatus=='create'">
          <el-input type="text" v-model="tempUser.username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="dialogStatus=='create'" required>
          <el-input type="password" v-model="tempUser.password">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" v-else>
          <el-input type="password" v-model="tempUser.password" placeholder="不填则表示不修改">
          </el-input>
        </el-form-item>
        <el-form-item label="角色" required style='width: 550px; '>
          <!-- <el-select v-model="tempUser.roleId" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select> -->

          <!-- 可以添加多角色 -->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="tempUser.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>

        </el-form-item>
        <el-form-item label="昵称" required>
          <el-input type="text" v-model="tempUser.nickname">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="success" @click="createUser">创 建</el-button>
        <el-button type="primary" v-else @click="updateUser">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        totalCount: 0, //分页组件--数据总条数
        //表格的数据
        list: [
            {
                "createTime": "2017.10.30 11:52:38", 
                "roleId": 1, 
                "deleteStatus": "1", 
                "nickname": "公用管理员账户", 
                "roleName": "管理员", 
                "permissionList": [ ], 
                "updateTime": "2019.07.23 08:37:24", 
                "userId": 10001, 
                "username": "admin"
            }, 
            {
                "createTime": "2019.11.06 04:45:30", 
                "roleId": 280, 
                "deleteStatus": "1", 
                "nickname": "yaoyao", 
                "roleName": "文章管理员", 
                "permissionList": [
                    "文章管理列表", 
                    "角色权限列表", 
                    "用户新增", 
                    "文章管理修改", 
                    "用户列表", 
                    "文章管理新增"
                ], 
                "updateTime": "2019.11.06 04:45:30", 
                "userId": 10357, 
                "username": "yy"
            }, 
            {
                "createTime": "2019.11.06 07:23:32", 
                "roleId": 281, 
                "deleteStatus": "1", 
                "nickname": "qwert", 
                "roleName": "测试", 
                "permissionList": [
                    "文章管理列表", 
                    "角色权限列表", 
                    "角色权限修改", 
                    "用户新增", 
                    "文章管理修改", 
                    "角色权限新增", 
                    "用户修改", 
                    "用户列表", 
                    "文章管理新增", 
                    "角色权限删除"
                ], 
                "updateTime": "2019.11.06 07:23:32", 
                "userId": 10358, 
                "username": "qwert"
            }
        ],
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 50,//每页条数
        },
        //角色列表
        // roles: [
        //   {roleId: 1, roleName: "管理员"},
        //   {roleId: 280, roleName: "文章管理员"},
        //   {roleId: 281, roleName: "测试"}
        // ],
        // 角色
        checkAll: false,
        cities: ['管理员1', '管理员2', '管理员3', '管理员4', '管理员5', '管理员6', '管理员7', '管理员8'],
        isIndeterminate: false,

        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '新建用户'
        },
        tempUser: {
          username: '',
          password: '',
          nickname: '',
          // roleId: '',
          checkedCities: '',
          userId: '10357'
        },
        hasPerm: true
      }
    },
    created() {
      // this.getList();
      // if (this.hasPerm('user:add') || this.hasPerm('user:update')) {
      //   this.getAllRoles();
      // }
    },
    computed: {
      // ...mapGetters([
      //   'userId'
      // ])
    },
    methods: {
      // 角色选择
      handleCheckAllChange(val) {
        this.tempUser.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      // 获取所有角色
      getAllRoles() {

        // this.$http({
        //   url: "/user/getAllRoles",
        //   method: "get"
        // }).then(data => {
        //   this.roles = data.list;
        // })
      },
      getList() {
        //查询列表
        // this.listLoading = true;
        // this.$http({
        //   url: "/user/list",
        //   method: "get",
        //   params: this.listQuery
        // }).then(data => {
        //   this.listLoading = false;
        //   this.list = data.list;
        //   this.totalCount = data.totalCount;
        // })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      handleFilter() {
        //查询事件
        this.listQuery.pageNum = 1
        this.getList()
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        //显示新增对话框
        this.tempUser.username = "";
        this.tempUser.password = "";
        this.tempUser.nickname = "";
        this.tempUser.roleId = "";
        this.tempUser.userId = "";
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      showUpdate($index) {
        let user = this.list[$index];
        this.tempUser.username = user.username;
        this.tempUser.nickname = user.nickname;
        this.tempUser.roleId = user.roleId;
        this.tempUser.userId = user.userId;
        this.tempUser.deleteStatus = '1';
        this.tempUser.password = '';
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },
      createUser() {
        console.log(this.tempUser);
        //添加新用户
        // this.$http({
        //   url: "/user/addUser",
        //   method: "post",
        //   data: this.tempUser
        // }).then(() => {
        //   this.getList();
        //   this.dialogFormVisible = false
        // })
      },
      updateUser() {
        console.log(this.tempUser);
        //修改用户信息
        // let _vue = this;
        // this.$http({
        //   url: "/user/updateUser",
        //   method: "post",
        //   data: this.tempUser
        // }).then(() => {
        //   let msg = "修改成功";
        //   this.dialogFormVisible = false
        //   if (this.userId === this.tempUser.userId) {
        //     msg = '修改成功,部分信息重新登录后生效'
        //   }
        //   this.$message({
        //     message: msg,
        //     type: 'success',
        //     duration: 1 * 1000,
        //     onClose: () => {
        //       _vue.getList();
        //     }
        //   })
        // })
      },
      removeUser($index) {
        let _vue = this;
        this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let user = _vue.list[$index];
          user.deleteStatus = '2';
          _vue.$http({
            url: "/user/updateUser",
            method: "post",
            data: user
          }).then(() => {
            _vue.getList()
          }).catch(() => {
            _vue.$message.error("删除失败")
          })
        })
      },
    }
  }
</script>
