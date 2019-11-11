<template>
<el-card class="form-container" shadow="never">
  <el-form :model="gateway" :rules="rules" ref="gatewayForm" label-width="150px" size="">
    <el-form-item label="业务类型：">
      <el-radio-group v-model="gateway.type">
        <el-radio-button  label="WXPAY"> 微信 </el-radio-button>
        <el-radio-button  label="ALIPAY"> 支付宝 </el-radio-button>
        <el-radio-button  label="UNIONPAY"> 银联 </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="下单请求地址：" prop="requestUrl">
      <el-input v-model="gateway.requestUrl" class="input-width" placeholder="请输入下单请求地址"></el-input>
    </el-form-item>
    <el-form-item label="查询地址：" prop="queryUrl">
      <el-input v-model="gateway.queryUrl" class="input-width" placeholder="请输入查询地址"></el-input>
    </el-form-item>
    <el-form-item label="出款请求地址：" prop="withdrawUrl">
      <el-input v-model="gateway.withdrawUrl" class="input-width" placeholder="请输入出款请求地址"></el-input>
    </el-form-item>
    <el-form-item label="出款查询地址：" prop="withdrawQueryUrl">
      <el-input v-model="gateway.withdrawQueryUrl" class="input-width" placeholder="请输入出款查询地址"></el-input>
    </el-form-item>
    <el-form-item label="异步通知地址：" prop="notifyUrl">
      <el-input v-model="gateway.notifyUrl" class="input-width" placeholder="请输入异步通知地址"></el-input>
    </el-form-item>
    <el-form-item label="同步通知地址：" prop="pageNotifyUrl">
      <el-input v-model="gateway.pageNotifyUrl" class="input-width" placeholder="请输入同步通知地址"></el-input>
    </el-form-item>
    <el-form-item label="对账单地址：" prop="reconUrl">
      <el-input v-model="gateway.reconUrl" class="input-width" placeholder="请输入对账单地址"></el-input>
    </el-form-item>
    <el-form-item label="退款地址：" prop="refundUrl">
      <el-input v-model="gateway.refundUrl" class="input-width" placeholder="请输入退款地址"></el-input>
    </el-form-item>
    <el-form-item label="退款查询：" prop="refundQueryUrl">
      <el-input v-model="gateway.refundQueryUrl" class="input-width" placeholder="请输入退款查询"></el-input>
    </el-form-item>
    <el-form-item label="备用字段1：" prop="bakTemp1">
      <el-input v-model="gateway.bakTemp1" class="input-width" placeholder="请输入备用字段"></el-input>
    </el-form-item>
    <el-form-item label="备用字段2：" prop="bakTemp2">
      <el-input v-model="gateway.bakTemp2" class="input-width" placeholder="请输入备用字段"></el-input>
    </el-form-item>
    <el-form-item label="备用字段3：" prop="bakTemp3">
      <el-input v-model="gateway.bakTemp3" class="input-width" placeholder="请输入备用字段"></el-input>
    </el-form-item>
    <el-form-item label="是否启用：" prop="status">
      <el-switch v-model="gateway.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('gatewayForm')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('gatewayForm')">重置</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script src="./add.js"></script>
<style scoped>
.input-width {
  width: 60%;
}
</style>


