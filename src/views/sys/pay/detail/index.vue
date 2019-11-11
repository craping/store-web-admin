<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-s-tools" style="margin-left: 20px"></i>
        <span class="">{{channel.channelName}}配置信息</span>
        <div class="operate-button-container">
          <el-button size="mini" @click="gatewayAdd" icon="el-icon-plus">添加通道信息</el-button>
          <el-button size="mini" type="danger" @click="channelDelete" icon="el-icon-delete">删除所有配置</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">渠道信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">渠道名称</el-col>
          <el-col :span="4" class="table-cell-title">渠道简称</el-col>
          <el-col :span="4" class="table-cell-title">商户号</el-col>
          <el-col :span="4" class="table-cell-title">商户名称</el-col>
          <el-col :span="4" class="table-cell-title">创建时间</el-col>
          <el-col :span="4" class="table-cell-title">状态</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{channel.channelName}}</el-col>
          <el-col :span="4" class="table-cell">{{channel.channelShortName}}</el-col>
          <el-col :span="4" class="table-cell">{{channel.merNo}}</el-col>
          <el-col :span="4" class="table-cell">{{channel.merName}}</el-col>
          <el-col :span="4" class="table-cell">{{channel.createTime | formatCreateTime}}</el-col>
          <el-col :span="4" class="table-cell">{{channel.status | formatStatus}}</el-col>
        </el-row>
      </div>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">通道信息</span>
      </div>
      <el-table style="margin-top: 20px;width: 100%" ref="gatewayTable" :data="channelGateways">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="下单请求地址">
                <span>{{ props.row.requestUrl }}</span>
              </el-form-item>
              <el-form-item label="查询地址">
                <span>{{ props.row.queryUrl }}</span>
              </el-form-item>
              <el-form-item label="出款请求地址">
                <span>{{ props.row.withdrawUrl }}</span>
              </el-form-item>
              <el-form-item label="出款查询地址">
                <span>{{ props.row.withdrawQueryUrl }}</span>
              </el-form-item>
              <el-form-item label="异步通知地址">
                <span>{{ props.row.notifyUrl }}</span>
              </el-form-item>
              <el-form-item label="同步通知地址">
                <span>{{ props.row.pageNotifyUrl }}</span>
              </el-form-item>
              <el-form-item label="对账单地址">
                <span>{{ props.row.reconUrl }}</span>
              </el-form-item>
              <el-form-item label="退款地址">
                <span>{{ props.row.refundUrl }}</span>
              </el-form-item>
              <el-form-item label="退款查询">
                <span>{{ props.row.refundQueryUrl }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column label="渠道名称" width="250" align="center">
          <template slot-scope="scope"> {{channel.channelName}} </template>
        </el-table-column> -->
        <el-table-column label="业务类型" width="200" align="center">
          <template slot-scope="scope"> {{scope.row.type}} </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="center">
          <template slot-scope="scope"> {{scope.row.createTime | formatCreateTime}} </template>
        </el-table-column>
        <el-table-column label="状态" width="200" align="center">
          <template slot-scope="scope">
            <el-switch @change="gatewayStatusChange(scope.$index, scope.row)"
              :active-value="1" :inactive-value="0" v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope"> 
            <el-button size="mini" icon="el-icon-plus" @click="methodAddShow(scope.row.id)">添加支付方式</el-button>
            <el-button size="mini" icon="el-icon-search" @click="search=scope.row.type">查看支付方式</el-button>
            <el-button size="mini" icon="el-icon-edit" type="primary" @click="gatewayEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="gatewayDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">渠道支付方式信息</span>
      </div>
      <el-table :data="channelMethods.filter(data => !search || data.gatewayType.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="通道类型" width="100" align="center">
        <template slot-scope="scope"> {{scope.row.gatewayType}} </template>
      </el-table-column> 
      <el-table-column label="支付方式" width="150" align="center"> 
        <template slot-scope="scope"> {{scope.row.methodType}} </template>
      </el-table-column>
      <el-table-column label="费率类型" width="150" align="center"> 
        <template slot-scope="scope"> {{scope.row.feeType | formatFeeType}} </template>
      </el-table-column>
      <el-table-column label="手续费进位方式" width="150" align="center"> 
        <template slot-scope="scope"> {{scope.row.roundType | formatRoundType}} </template>
      </el-table-column>
      <el-table-column label="手续费" width="150" align="center"> 
        <template slot-scope="scope"> {{scope.row.payFee}} </template>
      </el-table-column>
      <el-table-column label="最低手续费" width="150" align="center"> 
        <template slot-scope="scope"> {{scope.row.minFee}} </template>
      </el-table-column>
      <el-table-column label="状态" align="center"> 
        <template slot-scope="scope">
            <el-switch @change="methodStatusChange(scope.$index, scope.row)"
              :active-value="1" :inactive-value="0" v-model="scope.row.status">
            </el-switch>
          </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入通道类型搜索" clearable/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary" @click="methodUpdateShow(scope.row.id)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="methodDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>

    <el-dialog title="渠道支付方式信息" :visible.sync="methodDialogVisible" width="40%">
      <el-form :model="methodInfo" :rules="rules" ref="methodInfofoForm" label-width="150px" size="">
        <el-form-item label="支付方式：">
          <el-radio-group v-model="methodInfo.methodType">
            <el-radio-button  label="APP"></el-radio-button>
            <el-radio-button  label="H5"></el-radio-button>
            <el-radio-button  label="SCAN"></el-radio-button>
            <el-radio-button  label="WITHDRAW"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="费率类型：">
          <el-radio-group v-model="methodInfo.feeType">
            <el-radio-button  label="1"> 百分比 </el-radio-button>
            <el-radio-button  label="2"> 固定金额 </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手续费进位方式：">
          <el-radio-group v-model="methodInfo.roundType">
            <el-radio-button  label="1"> 进一法 </el-radio-button>
            <el-radio-button  label="2"> 四舍五入法 </el-radio-button>
            <el-radio-button  label="3"> 舍尾法 </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手续费：" prop="payFee">
          <el-input v-model="methodInfo.payFee" style="width: 200px" placeholder="请输入手续费" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="最低手续费：" prop="minFee">
          <el-input v-model="methodInfo.minFee" style="width: 200px" placeholder="请输入最低手续费" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-switch v-model="methodInfo.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="methodDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="methodOnSubmit('methodInfofoForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog title="修改费用信息"
               :visible.sync="moneyDialogVisible"
               width="40%">
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.totalAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"><template slot="prepend">￥</template></el-input>
          </el-col>
          <el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.discountAmount" size="mini"><template slot="prepend">-￥</template></el-input>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.totalAmount+moneyInfo.freightAmount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="moneyDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdateMoneyInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="发送站内信"
               :visible.sync="messageDialogVisible"
               width="40%">
      <el-form :model="message"
               ref="receiverInfoForm"
               label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭订单"
               :visible.sync="closeDialogVisible"
               width="40%">
      <el-form :model="closeInfo"
               label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注订单"
               :visible.sync="markOrderDialogVisible"
               width="40%">
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script src="./detail.js"></script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>


