<template>
<el-card class="form-container" shadow="never">
  <el-form :model="supplier" :rules="rules" ref="supplierForm" label-width="150px" size="small">
    <el-form-item label="登录帐号：" prop="username">
      <el-input v-model="supplier.username" class="input-width" placeholder="请输入登录帐号" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="登录密码：" prop="password">
      <el-input v-model="supplier.password" class="input-width" placeholder="请输入登录密码" show-password :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="供应商名称：" prop="nickName">
      <el-input v-model="supplier.nickName" class="input-width" placeholder="请输入供应商名称"></el-input>
    </el-form-item>
    <el-form-item label="公司名称：" prop="comName">
      <el-input v-model="supplier.comName" class="input-width" placeholder="请输入公司名称"></el-input>
    </el-form-item>
    <el-form-item label="公司地址：" prop="comAddress">
      <el-input v-model="supplier.comAddress" class="input-width" placeholder="请输入公司地址"></el-input>
    </el-form-item>
    <el-form-item label="联系人：" prop="contact">
      <el-input v-model="supplier.contact" class="input-width" placeholder="请输入联系人"></el-input>
    </el-form-item>
    <el-form-item label="联系电话：" prop="telNo">
      <el-input v-model="supplier.telNo" class="input-width" placeholder="请输入联系电话"></el-input>
    </el-form-item>
    <el-form-item label="手机号码：" prop="mobile">
      <el-input v-model="supplier.mobile" class="input-width" placeholder="请输入手机号码" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item label="邮箱地址：" prop="email">
      <el-input v-model="supplier.email" class="input-width" placeholder="请输入Email地址"></el-input>
    </el-form-item>
    <el-form-item label="网易七鱼客服ID：" prop="groupId">
      <el-input v-model="supplier.groupId" class="input-width" placeholder="请输入网易七鱼客服ID"></el-input>
    </el-form-item>
    <el-form-item label="启用状态：" prop="status">
      <el-switch v-model="supplier.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item label="备注信息：" prop="note">
      <el-input v-model="supplier.note" class="input-width" placeholder="请输入备注信息" type="textarea"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('supplierForm')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('supplierForm')">重置</el-button>
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


