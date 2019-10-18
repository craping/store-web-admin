<template>
<el-card class="form-container" shadow="never">
  <el-form :model="channel" :rules="rules" ref="channelForm" label-width="150px" size="">
    <el-form-item label="渠道名称：" prop="name">
      <el-input v-model="channel.name" class="input-width" placeholder="请输入渠道名称"></el-input>
    </el-form-item>
    <el-form-item label="渠道简称：" prop="abbr">
      <el-input v-model="channel.abbr" class="input-width" placeholder="例：快钱微信 WXKQ"></el-input>
    </el-form-item>
    <div v-show="channel.type != 4">
      <el-form-item label="渠道类型：" prop="phone">
        <el-radio-group v-model="channel.type">
          <el-radio :label="1">微信</el-radio>
          <el-radio :label="2">支付宝</el-radio>
          <el-radio :label="3">银联</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
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


