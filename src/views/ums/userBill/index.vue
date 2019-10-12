<template>
  <div class="info-container">
    <div class="filter">
      <div class="block">
        <el-date-picker
          v-model="value11"
          type="date"
          placeholder="选择日期删选"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button @click="filterSearch">搜索</el-button>
        <!-- <div class="filter-item">
          <p>剩余余额：￥{{income}}</p>
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="incomeper"
            status="success"
          ></el-progress>
        </div>
        <div class="filter-item">
          <p>总操作金额：-￥{{outcome}}</p>
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="outcomeper"
            status="exception"
          ></el-progress>
        </div>-->
      </div>
    </div>
    <div class="dataList">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>账单记录</span>
      </el-card>
      <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
        <el-table-column label="账户" style="width:25%">{{$route.query.name}}</el-table-column>
        <el-table-column label="日期" style="width:30%">
          <template slot-scope="scope">
            <p>{{scope.row.createTime | formatTime}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="事项" style="width:25%"></el-table-column>
        <el-table-column prop="amount" label="操作金额(RMB)" style="width:25%"></el-table-column>
        <el-table-column prop="afterAmount" label="当前账户余额(RMB)" style="width:25%"></el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100,
      listLoading: true,
      value11: '',
      income: '',
      outcome: '',
      tableData: [],
      titleData: [
        '会员名称',
        '会员账号',
        '会员手机',
        '会员等级',
        '创建时间',
        '会员余额'
      ],
      infoData: {
        name: 'xxx',
        userName: 'ppp',
        phone: '12345678912',
        level: '普通用户',
        createTime: '2019-09-09 18:30:20',
        balance: '100'
      }
    }
  },
  computed: {
    incomeper() {
      var str = Number((this.income / (this.outcome + this.income)) * 100)
      return str
    },
    outcomeper() {
      var str = Number((this.outcome / (this.outcome + this.income)) * 100)
      return str
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
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
    getList() {
      this.listLoading = true

      this.$http
        .post('member/memberBill', {
          id: this.$route.query.id,
          pageNum: 1,
          pageSize: 10
        })
        .then(data => {
          this.tableData = data.info
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    filterSearch() {
      console.log(`删选的日期时间为${this.value11}`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';

.info-container {
  padding: 20px;
}
</style>