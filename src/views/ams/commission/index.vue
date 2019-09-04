<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="searchLevelList()" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <!-- <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="等级名称/关键字"></el-input>
          </el-form-item>-->
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="levelTable"
        :data="list"
        :span-method="objectSpanMethod"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <!-- <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productId}}</template>
        </el-table-column>-->
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img style="height: 80px" :src="scope.row.pic" />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="productName"></el-table-column>
        <el-table-column label="规格" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.sp1?scope.row.sp1:''}} {{scope.row.sp2?scope.row.sp2:''}} {{scope.row.sp3?scope.row.sp3:''}}</p>
            <p>成本：{{scope.row.cost}}元</p>
            <p>售价：{{scope.row.price}}元</p>
            <p>利润：{{scope.row.price - scope.row.cost}}元</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="成本" align="center" >
          <template slot-scope="scope">{{scope.row.price}}元</template>
        </el-table-column>
        <el-table-column label="价格" align="center" >
          <template slot-scope="scope">{{scope.row.price}}元</template>
        </el-table-column>-->
        <el-table-column label="代理等级" align="center" prop="level"></el-table-column>
        <el-table-column label="佣金" align="center">
          <template slot-scope="scope">{{commission(scope.row)}}元</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >确定</el-button>
    </div>-->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList, remove } from "@/api/agentLevel";
import Big from "big.js";

const defaultListQuery = {
  name: null,
  pageNum: 1,
  pageSize: 10
};

export default {
  name: "levelList",
  data() {
    return {
      operates: [
        {
          label: "显示品牌",
          value: "showBrand"
        },
        {
          label: "隐藏品牌",
          value: "hideBrand"
        }
      ],
      operateType: null,
      listQuery: { ...{}, ...defaultListQuery },
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: [],
      spanArr: {
        product: [],
        sku: []
      }
    };
  },
  computed: {
    commission() {
      return function(row) {
        return row.commission
          ? new Big(row.commission).toFixed(2)
          : row.cost
          ? new Big(row.price - row.cost).mul(row.rebate).toFixed(2)
          : "";
      };
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$http.post("ams/commission/list", this.listQuery).then(data => {
        this.listLoading = false;
        /* let map = {};
        data.info.forEach(e => {
          const p = map[e.productId];
          if (!p) {
            map[e.productId] = {
              id: e.productId,
              name: e.productName,
              pic: e.pic,
              skus: {
                [e.skuId]: {
                  id: e.skuId,
                  price: e.price,
                  cost: e.cost,
                  sp1: e.sp1,
                  sp2: e.sp2,
                  sp3: e.sp3,
                  levels: {
                    [e.levelId]: {
                      levelId: e.levelId,
                      level: e.level,
                      rebate: e.rebate,
                      commissionId: e.commissionId,
                      commission: e.commission
                    }
                  }
                }
              }
            };
          } else {
            let sku = p.skus[e.skuId];
            if (!sku) {
              p.skus[e.skuId] = {
                id: e.skuId,
                price: e.price,
                cost: e.cost,
                sp1: e.sp1,
                sp2: e.sp2,
                sp3: e.sp3,
                levels: {
                  [e.levelId]: {
                    levelId: e.levelId,
                    level: e.level,
                    rebate: e.rebate,
                    commissionId: e.commissionId,
                    commission: e.commission
                  }
                }
              };
            } else {
              let level = sku.levels[e.levelId];
              if (!level) {
                sku.levels[e.levelId] = {
                  levelId: e.levelId,
                  level: e.level,
                  rebate: e.rebate,
                  commissionId: e.commissionId,
                  commission: e.commission
                };
              }
            }
          }
        });
        this.list = Object.values(map); */
        this.list = data.info;
        this.getSpanArr(data.info);
        this.total = data.totalnum;
        this.totalPage = data.totalPage;
        this.pageSize = data.pageSize;
      });
    },
    getSpanArr(data) {
      let productPos;
      let skuPost;
      this.spanArr = {
        product: [],
        sku: []
      };
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.product.push(1);
          this.spanArr.sku.push(1);
          productPos = 0;
          skuPost = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].productId === data[i - 1].productId) {
            this.spanArr.product[productPos] += 1;
            this.spanArr.product.push(0);
          } else {
            this.spanArr.product.push(1);
            productPos = i;
          }

          if (data[i].skuId === data[i - 1].skuId) {
            this.spanArr.sku[skuPost] += 1;
            this.spanArr.sku.push(0);
          } else {
            this.spanArr.sku.push(1);
            skuPost = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 2) {
        const _row = this.spanArr.product[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }

      if (columnIndex <= 3) {
        const _row = this.spanArr.sku[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdate(index, row) {
      const me = this;
      this.$prompt("请输入佣金值", row.level + "-佣金设置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: me.commission(row),
        inputValidator: function(val) {
          let com;
          try {
            com = new Big(val);
          } catch (e) {
            return "佣金格式错误";
          }
          if (com.cmp(new Big(row.price - row.cost)) == 1)
            return "佣金值不可大于利润";
          return true;
        },
        inputErrorMessage: "佣金格式错误"
      }).then(({ value }) => {
        const commission = {
          id: row.commissionId ? row.commissionId : null,
          skuId: row.skuId,
          levelId: row.levelId,
          commission: value
        };
        console.log(commission);
        this.$http.post("ams/commission/set", commission).then(data => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
          me.getList();
        })
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    searchLevelList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleBatchOperate() {
      if (this.multipleSelection < 1) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000
        });
        return;
      }
      let showStatus = 0;
      if (this.operateType === "showBrand") {
        showStatus = 1;
      } else if (this.operateType === "hideBrand") {
        showStatus = 0;
      } else {
        this.$message({
          message: "请选择批量操作类型",
          type: "warning",
          duration: 1000
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      let data = new URLSearchParams();
      data.append("ids", ids);
      data.append("showStatus", showStatus);
      updateShowStatus(data).then(data => {
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000
        });
      });
    },
    addLevel() {
      this.$router.push({ path: "/ams/addLevel" });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
