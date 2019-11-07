<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAddAddress()">添加地址</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="addressTable"  :data="list" style="width: 100%" v-loading="listLoading">
        <el-table-column label="地址名称" width="150" align="center">
          <template slot-scope="scope">{{scope.row.addressName}}</template>
        </el-table-column>
        <el-table-column label="默认发货地址" width="120" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleSendStatusChange(scope.$index, scope.row)"
              :active-value="1" :inactive-value="0" v-model="scope.row.sendStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="默认收货地址" width="120" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleReceiveStatusChange(scope.$index, scope.row)"
              :active-value="1" :inactive-value="0" v-model="scope.row.receiveStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="收发货人姓名" width="120" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="收发货人电话" width="120" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="省/直辖市" width="100" align="center">
          <template slot-scope="scope">{{scope.row.province}}</template>
        </el-table-column>
         <el-table-column label="市" width="100" align="center">
          <template slot-scope="scope">{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column label="区" width="100" align="center">
          <template slot-scope="scope">{{scope.row.region}}</template>
        </el-table-column>
        <el-table-column label="详细地址" width="500" align="center">
          <template slot-scope="scope">{{scope.row.detailAddress}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button type="danger" @click="deleteAddress(scope.$index, scope.row)" icon="el-icon-delete" circle size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script src="./address.js"></script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


