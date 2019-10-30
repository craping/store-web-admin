<template>
  <div class="select-dailog">
    <el-dialog
      title="选择用户"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      :visible.sync="visible"
      width="60%"
    >
      <el-table
        :data="userData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        v-loading="listLoading"
      >
        <el-table-column prop="id" label="编号" min-width="80"></el-table-column>
        <el-table-column prop="userName" label="用户名" min-width="80"></el-table-column>
        <el-table-column label="选择框" min-width="80">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-check"
              v-if="selectUserId.indexOf(`${scope.row.id}`) == -1"
              circle
              :disabled="messageInfo.state == 1"
              @click="addUser(`${scope.row.id}`)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              v-else
              circle
              :disabled="messageInfo.state == 1"
              @click="deleteUser(`${scope.row.id}`)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size.sync="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="total"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'selectUserDialog',
  props: {
    value: Boolean
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(visible) {
        this.value = visible
      }
    },
    ...mapState({
      messageInfo: state => state.message.messageInfo
    })
  },
  data() {
    return {
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 5
      },
      total: null,
      userData: [],
      selectUserId: [],
      btnContent: '选择用户'
    }
  },
  created() {
    if (this.messageInfo.sendObject) {
      let selectUserData = this.messageInfo.sendObject.split('|')
      selectUserData = selectUserData.slice(1, -1)
      this.$nextTick(() => {
        this.selectUserId = selectUserData
      })
    }
    this.getList()
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleClose() {
      this.emitInput(false)
    },
    confirm() {
      this.selectUserId = Array.from(new Set([...this.selectUserId]))
      this.$emit('getSelectedUser', this.selectUserId)
      this.emitInput(false)
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    getList() {
      this.$http
        .post('member/getsUserIds', {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize
        })
        .then(data => {
          this.userData = data.info
          this.total = data.totalnum
        })
        .catch(error => {
          console.log(error)
        })
    },
    addUser(id) {
      this.selectUserId.push(id)
    },
    deleteUser(id) {
      const index = this.selectUserId.indexOf(id)
      this.selectUserId.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.select-dailog {
  .dialog-footer {
    margin-top: 50px;
  }
}
</style>
