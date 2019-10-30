<template>
  <div class="message-list-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>消息列表</span>
    </el-card>
    <el-table :data="tableData" style="width: 100%" v-loading="fullscreenLoading">
      <el-table-column prop="title" label="标题" style="width:100"></el-table-column>
      <el-table-column label="创建时间" style="width:100">
        <template slot-scope="scope">
          <p>{{scope.row.sendTime | formatTime}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sendObject" label="发送对象" style="width:100"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" @click="onClick(scope.$index, scope.row)">删除</el-button>
          <el-button
            type="info"
            v-show="scope.row.state == 1"
            @click="checkOrUpdateInfo(scope.row,'check')"
          >查看详情</el-button>
          <el-button
            type="primary"
            v-show="scope.row.state == 0"
            @click="checkOrUpdateInfo(scope.row,'update')"
          >更新</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="pageNum"
        :page-size.sync="pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
export default {
  name: 'messagelist',
  data() {
    return {
      tableData: [],
      fullscreenLoading: true,
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  filters: {
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.fullscreenLoading = true
      this.$http
        .post('msg/queryMsgList', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(data => {
          this.tableData = data.info
          this.total = data.totalnum
          this.fullscreenLoading = false
        })
        .catch(err => {
          this.fullscreenLoading = false
        })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    onClick(i, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteMessage(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteMessage(id) {
      this.fullscreenLoading = true
      this.$http
        .post('msg/removeMsg', {
          id
        })
        .then(data => {
          this.getList()
        })
        .catch(err => {
          this.fullscreenLoading = false
        })
    },
    checkOrUpdateInfo(item, type) {
      this.$store.commit('SET_MESSAGEi_INFP', item)
      this.$router.push({
        name: 'message',
        query: {
          id: item.id,
          type
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.message-list-container {
  padding: 20px;
  margin-bottom: 50px;
}
</style>
