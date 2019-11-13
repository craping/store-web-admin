<template>
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <el-tabs v-model="settingTableTabsVal" @tab-click="initSetting()">
        <el-tab-pane v-for="(item, index) in settingTableTabs" :key="item.name" :name="item.name">
          <span slot="label">
            <svg-icon :icon-class="item.icon"></svg-icon>{{item.title}}
          </span>
        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 20px">
        <svg-icon icon-class="balance-pay"></svg-icon><span class="font-small">余额钱包</span>
        <el-button size="mini" type="primary" icon="el-icon-finished" @click="handleAddChannel()" 
          style="float:right;margin-right: 15px">余额钱包</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="balanceCheck" size="mini">
          <el-checkbox v-for="item in balanceList" :label="item.methodId" :key="item.methodId" border>
            {{item.channelName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="wechat-pay-fill"></svg-icon><span class="font-small">微信支付</span>
        <el-button size="mini" type="primary" icon="el-icon-finished" @click="handleAddChannel()" 
          style="float:right;margin-right: 15px">微信支付</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="wxpayCheck" size="mini">
            <el-checkbox v-for="item in wxpayList" :label="item.methodId" :key="item.methodId" :checked="item.isChecked" border>
              {{item.channelName}} - {{item.methodType}}
            </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="alipay"></svg-icon> <span class="font-small">支付宝支付</span>
        <el-button size="mini" type="primary" icon="el-icon-finished" @click="handleAddChannel()" 
          style="float:right;margin-right: 15px">支付宝支付</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="alipayCheck" size="mini" :max="1">
          <el-checkbox v-for="item in alipayList" :label="item.methodId" :key="item.methodId" :checked="item.isChecked" border>
            {{item.channelName}} - {{item.methodType}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="unionpay"></svg-icon><span class="font-small">银联支付</span>
        <el-button size="mini" type="primary" icon="el-icon-finished" @click="handleAddChannel()" 
          style="float:right;margin-right: 15px">银联支付</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="unionpayCheck" size="mini">
          <el-checkbox v-for="item in unionpayList" :label="item.methodId" :key="item.methodId" :checked="item.isChecked" border>
            {{item.channelName}} - {{item.methodType}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>
<script src="./setting.js"></script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}
</style>


