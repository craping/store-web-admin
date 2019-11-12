<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="渠道名称/简称"></el-input>
          </el-form-item>
          <el-form-item label="启用状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" icon="el-icon-plus" class="btn-add" @click="handleAddChannel()">添加渠道配置</el-button>
      <el-button size="mini" icon="el-icon-s-tools" class="btn-add" style="float:right;margin-right: 15px"  type="primary"
        @click="handlePaySetting()">前端支付配置</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="渠道名称" width="248" align="center">
          <template slot-scope="scope">{{scope.row.channel_name}}</template>
        </el-table-column>
        <el-table-column label="渠道简称" width="248" align="center">
          <template slot-scope="scope">{{scope.row.channel_short_name}}</template>
        </el-table-column>
        <el-table-column label="商户号" width="248" align="center">
          <template slot-scope="scope">{{scope.row.mer_no}}</template>
        </el-table-column>
        <el-table-column label="商户名称" width="248" align="center">
          <template slot-scope="scope">{{scope.row.mer_name}}</template>
        </el-table-column>
        <el-table-column label="启用状态" width="248" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1" :inactive-value="0" v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="viewDeatil(scope.$index, scope.row)" icon="el-icon-s-tools" circle size="mini"></el-button>
            <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button type="danger" @click="deleteChannel(scope.$index, scope.row)" icon="el-icon-delete" circle size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script src="./channel.js"></script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


