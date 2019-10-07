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
        <div class="filter-item">
          <p>收入：￥{{income}}</p>
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="incomeper"
            status="success"
          ></el-progress>
        </div>
        <div class="filter-item">
          <p>支出：-￥{{outcome}}</p>
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="outcomeper"
            status="exception"
          ></el-progress>
        </div>
      </div>
    </div>
    <div class="dataList">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>账单记录</span>
      </el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" style="width:25%"></el-table-column>
        <el-table-column prop="date" label="日期" style="width:25%"></el-table-column>
        <el-table-column prop="matter" label="事项" style="width:25%"></el-table-column>
        <el-table-column prop="recharge" label="额度(RMB)" style="width:25%"></el-table-column>
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
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100,
      listLoading: false,
      value11: '',
      income: 200,
      outcome: 300,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          matter: '购买衣服',
          recharge: '-50'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          matter: '分销收益',
          recharge: '100'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          matter: '购买衣服',
          recharge: '-88'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          matter: '分销收益',
          recharge: '77'
        }
      ],
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