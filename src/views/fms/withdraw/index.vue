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
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="用户名" width="80"></el-table-column>
      <el-table-column prop="withdraw" label="金额" width="50"></el-table-column>
      <el-table-column prop="balance" label="余额" width="50"></el-table-column>
      <el-table-column prop="cardNo" label="银行卡号" width="160"></el-table-column>
      <el-table-column prop="date" label="申请时间" width="100"></el-table-column>
      <el-table-column prop="level" label="等级" width="100"></el-table-column>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">
          <p>{{statusArr[scope.row.status]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="锁定状态" width="100">
        <template slot-scope="scope">
          <p>{{lockArr[scope.row.lock]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="100">
        <template slot-scope="scope">
          <p>{{verifyArr[scope.row.verify]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="打款状态" width="100">
        <template slot-scope="scope">
          <p>{{progressArr[scope.row.progress]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <p>
            <el-button
              size="mini"
              type="danger"
              @click="handleFrozen(scope.$index, scope.row)"
            >{{scope.row.lock == '0' ? '解锁' : '锁定'}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handlePayDialog(scope.$index, scope.row)"
              v-show="scope.row.lock == '0'"
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
    <pay-dialog :userId="this.userId" v-model="payDialogVisible"></pay-dialog>
  </div>
</template>
<script>
import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date'
import payDialog from '@/views/fms/withdraw/payDialog'
const defaultListQuery = {
  page: 1,
  num: 10,
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
      userId: '',
      statusArr: ['待处理', '已处理'],
      lockArr: ['锁定', '未锁定'],
      verifyArr: ['审核中', '已通过'],
      progressArr: ['未处理', '已处理'],
      tableData: [
        {
          id: 1,
          name: '王小虎',
          withdraw: 100,
          balance: 20,
          cardNo: '1000000000000000',
          date: '2016-05-02',
          level: '普通会员',
          status: '0',
          lock: '0',
          verify: '0',
          progress: '0'
        },
        {
          id: 2,
          name: '王小虎',
          withdraw: 100,
          balance: 20,
          cardNo: '1000000000000000',
          date: '2016-05-02',
          level: '普通会员',
          status: '1',
          lock: '1',
          verify: '1',
          progress: '1'
        }
      ],
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
      if (row.lock == '0') {
        this.tableData[index].lock = '1'
      } else {
        this.tableData[index].lock = '0'
      }
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            level: '普通会员',
            status: '正常',
            balance: 20
          },
          {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            level: '普通会员',
            status: '冻结',
            balance: 20
          }
        ])
      }, 1000)
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      // fetchList(this.listQuery).then(data => {
      //     this.listLoading = false;
      //     this.list = data.info;
      //     this.total = data.totalnum;
      // });

      this.$http
        .post('sup/supList?format=json', this.listQuery)
        .then(data => {
          this.listLoading = false
          this.list = data.info
          this.total = data.totalnum
          console.log(this.$store.getters.roles[0])
          // if (!data.result) {
          //     this.bettings = data.info;
          // } else {
          //     Toast.fail(data.msg);
          // }
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
