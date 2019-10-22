<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" size="small" @click="handleToAdduser">添加会员</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >查询搜索</el-button>
        <el-button style="float:right;" @click="handleResetSearch()" size="small">重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="会员名称：">
            <el-input v-model="listQuery.nickname" class="input-width" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-input v-model="listQuery.com_name" class="input-width" placeholder="会员等级"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.create_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>会员列表</span>
    </el-card>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      v-loading="listLoading"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="编号" min-width="80"></el-table-column>
      <el-table-column prop="userName" label="账号" min-width="120"></el-table-column>
      <el-table-column prop="teams" label="团队人数" min-width="100"></el-table-column>
      <el-table-column label="等级" min-width="180">
        <template slot-scope="scope">
          <p>{{levelList[scope.row.memberLevelId]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="150">
        <template slot-scope="scope">
          <p>{{scope.row.status == '1' ? '正常' : '冻结'}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="充值余额" min-width="150"></el-table-column>
      <el-table-column prop="unreceivedIncome" label="未到账收益" min-width="150"></el-table-column>
      <el-table-column label="操作" min-width="400" align="center">
        <template slot-scope="scope">
          <p>
            <el-button size="mini" @click="handleUserEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleFrozen(scope.$index, scope.row)"
            >{{scope.row.status == '1' ? '冻结' : '解冻'}}</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleUserBill(scope.$index, scope.row)"
            >用户账单</el-button>
          </p>
          <p>
            <el-button size="mini" type="info" @click="handleViewInfo(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleBalanceDialog(scope.$index, scope.row)"
            >扣减/充值余额</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleLevelDialog(scope.$index, scope.row)"
            >调整代理登记</el-button>
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
    <balance-dialog :user="this.userProps" @reload="reload" v-model="balanceDialogVisible"></balance-dialog>
    <level-dialog :user="this.userProps" @reload="reload" v-model="levelDialogVisible"></level-dialog>
  </div>
</template>
<script src="./user.js"></script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


