<template>
  <div class="info-container">
    <div class="userInfo">
      <div class="info-item" v-for="(item,keyV,index) in infoData" :key="keyV">
        <div class="left">{{titleData[index]}}</div>
        <div class="right">{{item}}</div>
      </div>
    </div>
    <div class="dataList">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>充值记录</span>
      </el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" style="width:33.333%"></el-table-column>
        <el-table-column prop="date" label="充值日期" style="width:33.333%"></el-table-column>
        <el-table-column prop="recharge" label="充值额度(RMB)" style="width:33.333%"></el-table-column>
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          recharge: '50'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          recharge: '100'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          recharge: '88'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          recharge: '77'
        }
      ],
      titleData: [
        '会员名称',
        '会员账号',
        '会员手机',
        '会员等级',
        '创建时间',
        '会员余额(RMB)',
        '团队人数',
        '团队订单数',
        '团队销量(RMB)'
      ],
      infoData: {
        name: 'xxx',
        userName: 'ppp',
        phone: '12345678912',
        level: '普通用户',
        createTime: '2019-09-09 18:30:20',
        balance: '100',
        teams: 10,
        orders: 100,
        sales: '1000'
      }
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';

.info-container {
  padding: 20px;
  .userInfo {
    margin-top: 30px;
    border: 1px solid #eee;
    .info-item {
      display: flex;
      justify-content: space-around;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      color: #606266;
      .left {
        text-align: right;
        width: 40%;
      }
      .right {
        width: 40%;
        text-align: left;
      }
    }
  }
  .pagination-container {
    margin-bottom: 50px;
  }
}
</style>