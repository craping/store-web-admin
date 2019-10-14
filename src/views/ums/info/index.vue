<template>
  <div class="info-container">
    <div class="userInfo">
      <div class="info-item">
        <div class="left">会员名称</div>
        <div class="right">{{infoData.nickname}}</div>
      </div>
      <div class="info-item">
        <div class="left">会员账号</div>
        <div class="right">{{infoData.username}}</div>
      </div>
      <div class="info-item">
        <div class="left">会员手机</div>
        <div class="right">{{infoData.phone}}</div>
      </div>
      <div class="info-item">
        <div class="left">会员等级</div>
        <div class="right">{{infoData.member_level_id}}</div>
      </div>
      <div class="info-item">
        <div class="left">创建时间</div>
        <div class="right">{{infoData.create_time | formatCreateTime}}</div>
      </div>
      <div class="info-item">
        <div class="left">余额</div>
        <div class="right">{{infoData.balance}}元</div>
      </div>
      <div class="info-item">
        <div class="left">提现</div>
        <div class="right">{{infoData.cashout}}元</div>
      </div>
      <div class="info-item">
        <div class="left">未到账收益</div>
        <div class="right">{{infoData.unreceived_income}}元</div>
      </div>
      <div class="info-item">
        <div class="left">直接成员</div>
        <div class="right">{{infoData.direct_teams}}人</div>
      </div>
      <div class="info-item">
        <div class="left">全部成员</div>
        <div class="right">{{infoData.teams}}人</div>
      </div>
      <div class="info-item">
        <div class="left">订单数</div>
        <div class="right">{{infoData.orders}}人</div>
      </div>
      <div class="info-item">
        <div class="left">用户状态</div>
        <div class="right">{{infoData.STATUS == '1' ? '正常': '冻结'}}</div>
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
import { formatDate } from '@/utils/date'
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
      infoData: {}
    }
  },
  filters: {
    formatCreateTime(time) {
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
      // this.getList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      // this.getList()
    },
    getList() {
      this.listLoading = true
      const params = {
        id: this.$route.query.id
      }
      this.$http
        .post('member/queryDetails', params)
        .then(data => {
          this.listLoading = false
          this.infoData = data.info[1]
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