<template>
<el-card class="form-container" shadow="never">
  <el-form :model="address" :rules="rules" ref="addressForm" label-width="150px" size="">
    <el-form-item label="地址名称：" prop="address_name">
      <el-input v-model="address.addressName" class="input-width" placeholder="请输入地址名称"></el-input>
    </el-form-item>
    <el-form-item label="收发货人姓名：" prop="name">
      <el-input v-model="address.name" class="input-width" placeholder="请输入收发货人姓名"></el-input>
    </el-form-item>
    <el-form-item label="收发货人电话：" prop="phone">
      <el-input v-model="address.phone" class="input-width" placeholder="请输入收发货人电话"></el-input>
    </el-form-item>
    <el-form-item label="省/市/区：" prop="selectedOptions">
      <div id="app">
        <el-cascader style="width: 275px" :options="options" v-model="selectedOptions" @change="handleChange" placeholder="请选择省市区">
        </el-cascader>
      </div>
    </el-form-item>
    <el-form-item label="详细地址：" prop="detail_address">
      <el-input type="textarea" v-model="address.detailAddress" class="input-width" placeholder="请输入详细地址">
        
      </el-input>
    </el-form-item>
    <el-form-item label="默认发货地址：" prop="send_status">
      <el-switch v-model="address.sendStatus" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item label="默认收货地址：" prop="nickname">
      <el-switch v-model="address.receiveStatus" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('addressForm')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('addressForm')">重置</el-button>
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


