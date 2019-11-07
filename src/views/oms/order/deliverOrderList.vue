<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>发货列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="deliverOrderTable"
                style="width: 100%;"
                :data="list" border>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column label="收货人" width="180" align="center">
          <template slot-scope="scope">{{scope.row.receiverName}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverPhone}}</template>
        </el-table-column>
        <el-table-column label="邮政编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverPostCode}}</template>
        </el-table-column>
        <el-table-column label="收货地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="配送方式" width="160" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.deliveryCompany" 
              filterable class="input-width" placeholder="请选择物流公司" clearable>
              <el-option v-for="item in companyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="物流单号" width="180" align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.deliverySn"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="物流运费" width="180" align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.freightAmount"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {deliveryOrder} from '@/api/order'
  export default {
    name: 'deliverOrderList',
    data() {
      return {
        list:[],
        companyOptions:[]
      }
    },
    created(){
      this.list= this.$route.query.list;
      this.loadExpress();
    },
    methods:{
      cancel(){
        this.$router.back();
      },
      loadExpress() {
        this.$http.post("express/list", {status: 1}).then(data => {
          this.companyOptions = data.info;
        }).catch(error => {
          console.log(error);
        });
      },
      confirm(){
        this.$confirm('是否要进行发货操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deliveryOrder(this.list).then(data=>{
            this.$router.back();
            this.$message({
              type: 'success',
              message: '发货成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          });
        });
      }
    }
  }
</script>
<style></style>


