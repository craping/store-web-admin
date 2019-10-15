<template>
  <div class="withdraw-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right;" @click="handleResetSearch()" size="small">重置</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >查询搜索</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="会员名称：">
            <el-input v-model="listQuery.nickname" class="input-width" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="订单号：">
            <el-input v-model="listQuery.orderNo" class="input-width" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-select v-model="listQuery.level" placeholder="全部等级">
              <el-option label="全部等级" value="0"></el-option>
              <el-option label="普通会员" value="1"></el-option>
              <el-option label="白金会员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select
              v-model="listQuery.progress"
              class="input-width"
              placeholder="全部状态"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
              v-model="listQuery.apply_time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>提现列表</span>
      <span style="float: right; padding: 3px 0" type="text">总提现金额：1000</span>
    </el-card>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      lazy
      v-loading="listLoading"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="agentId" label="用户名" width="200" align="center"></el-table-column>
      <el-table-column prop="recordNo" label="订单号" width="200" align="center"></el-table-column>
      <el-table-column prop="amount" label="金额" width="100" align="center"></el-table-column>
      <el-table-column prop="fees" label="手续费(元)" width="100" align="center"></el-table-column>
      <el-table-column label="申请时间" width="200" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.createTime | formatTime}}</p>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="100" align="center">
        <template slot-scope="scope">
          <p>{{statusArr[scope.row.status+1]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="锁定状态" width="100" align="center">
        <template slot-scope="scope">
          <p>{{lockArr[scope.row.lockStatus]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="100" align="center">
        <template slot-scope="scope">
          <p>{{verifyArr[scope.row.checkStatus]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="汇款状态" width="100" align="center">
        <template slot-scope="scope">
          <p>{{progressArr[scope.row.remitStatus]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <p>
            <el-button
              size="mini"
              type="danger"
              @click="handleFrozen(scope.$index, scope.row)"
            >{{scope.row.lockStatus == '0' ? '锁定' : '解锁'}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handlePayDialog(scope.$index, scope.row)"
              v-show="scope.row.lockStatus == '1'"
            >支付</el-button>
            <el-button size="mini" type="info" @click="handleViewInfo(scope.$index, scope.row)">查看详情</el-button>
          </p>
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
    <pay-dialog :userProps="userProps" @getList="getList" v-model="payDialogVisible"></pay-dialog>
  </div>
</template>
<script>
import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatDate } from '@/utils/date'
import payDialog from '@/views/fms/withdraw/payDialog'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nickname: null,
  apply_time: null,
  status: null,
  orderNo: null,
  level: null,
  progress: null
}
export default {
  name: 'orderList',
  components: { payDialog },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      userProps: {},
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },
      statusArr: ['提现失败', '处理中', '提现成功'], //-1:提现失败，0:处理中，1:提现成功
      lockArr: ['未锁定', '已锁定'],
      verifyArr: ['未审核', '已审核'],
      progressArr: ['未汇款', '已汇款'],
      tableData: [],
      statusOptions: [
        {
          label: '全部状态',
          value: 0
        },
        {
          label: '待处理',
          value: 1
        },
        {
          label: '已完成',
          value: 2
        },
        {
          label: '拒绝支付',
          value: 3
        }
      ],
      payDialogVisible: false,
      payDialogVisible: false
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
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleViewInfo(index, row) {
      this.$router.push({ path: '/fms/withdrawInfo', query: { id: row.id } })
    },
    handlePayDialog(index, row) {
      this.userProps = row
      this.payDialogVisible = true
    },
    handleFrozen(index, row) {
      let tipCon1 =
        row.lockStatus == '0'
          ? '此操作将锁定该订单, 是否继续?'
          : '此操作将解锁该会员，是否继续?'
      let tipCon2 = row.lockStatus == '0' ? '锁定成功!' : '解锁成功!'
      let tipCon3 = row.lockStatus == '1' ? '已取消锁定' : '已取消解锁'
      this.$confirm(tipCon1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('withdraw/withdrawalLock', {
              id: row.id,
              lockStatus: row.lockStatus == '1' ? 0 : 1
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: tipCon2
              })
              this.getList()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: tipCon3
          })
        })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      this.$http
        .post('withdraw/queryWithdrawList', {})
        .then(data => {
          this.listLoading = false
          this.tableData = data.info
          this.total = data.totalnum
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.withdraw-container {
  padding: 20px;
}
</style>
