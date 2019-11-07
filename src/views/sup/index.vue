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
          <el-form-item label="供应商名称：">
            <el-input v-model="listQuery.nickname" class="input-width" placeholder="供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：">
            <el-input v-model="listQuery.com_name" class="input-width" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker class="input-width" v-model="listQuery.create_time" value-format="yyyy-MM-dd"
              type="date" placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAddSup()">添加供应商</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="供应商名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.nick_name}}</template>
        </el-table-column>
        <el-table-column label="公司名称" width="350" align="center">
          <template slot-scope="scope">{{scope.row.com_name}}</template>
        </el-table-column>
        <el-table-column label="联系人" width="100" align="center">
          <template slot-scope="scope">{{scope.row.contact}}</template>
        </el-table-column>
        <el-table-column label="电话号码" width="120" align="center">
          <template slot-scope="scope">{{scope.row.tel_no}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="center">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="邮箱地址" width="200" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="center">
          <template slot-scope="scope">{{scope.row.create_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.$index, scope.row)" icon="el-icon-view" circle size="mini"></el-button>
            <el-button type="primary" @click="handleView(scope.$index, scope.row)" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button type="success" @click="handleUpdateStatus(scope.$index, scope.row, 1)" v-show="scope.row.status===0" icon="el-icon-open" circle size="mini"></el-button>
            <el-button type="danger" @click="handleUpdateStatus(scope.$index, scope.row, 0)" v-show="scope.row.status===1" icon="el-icon-turn-off" circle size="mini"></el-button>
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
<script src="./sups.js"></script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


