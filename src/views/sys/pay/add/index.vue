<template>
<el-card class="form-container" shadow="never">
  <el-form :model="channel" :rules="rules" ref="channelForm" label-width="150px" size="">
    <el-form-item label="渠道名称：" prop="channelName">
      <el-input v-model="channel.channelName" class="input-width" placeholder="请输入渠道名称"></el-input>
    </el-form-item>
    <el-form-item label="渠道简称：" prop="channelShortName">
      <el-input v-model="channel.channelShortName" class="input-width" placeholder="请输入渠道简称"></el-input>
    </el-form-item>
    <el-form-item label="商户号：" prop="merNo">
      <el-input v-model="channel.merNo" class="input-width" placeholder="请输入商户号"></el-input>
    </el-form-item>
    <el-form-item label="商户名称：" prop="merName">
      <el-input v-model="channel.merName" class="input-width" placeholder="请输入商户名称"></el-input>
    </el-form-item>
    <el-form-item label="交易秘钥：" prop="payKey">
      <el-input v-model="channel.payKey" class="input-width" placeholder="请输入交易秘钥"></el-input>
    </el-form-item>
    <el-form-item label="签名秘钥：" prop="signKey">
      <el-input v-model="channel.signKey" class="input-width" placeholder="请输入签名秘钥"></el-input>
    </el-form-item>
    <el-form-item label="平台公钥：" prop="platPublicKey">
      <el-input v-model="channel.platPublicKey" class="input-width" placeholder="请输入平台公钥"></el-input>
    </el-form-item>
    <el-form-item label="平台私钥：" prop="platPrivateKey">
      <el-input v-model="channel.platPrivateKey" class="input-width" placeholder="请输入平台私钥"></el-input>
    </el-form-item>
    <el-form-item label="渠道公钥：" prop="channelPublicKey">
      <el-input v-model="channel.channelPublicKey" class="input-width" placeholder="请输入渠道公钥"></el-input>
    </el-form-item>
    <el-form-item label="是否启用：" prop="status">
      <el-switch v-model="channel.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('channelForm')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('channelForm')">重置</el-button>
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


