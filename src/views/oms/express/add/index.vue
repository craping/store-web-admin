<template>
<el-card class="form-container" shadow="never">
  <el-form :model="express" :rules="rules" ref="expressForm" label-width="150px" size="">
    <el-form-item label="快递名称：" prop="name">
      <el-input v-model="express.name" class="input-width" placeholder="请输入渠道名称"></el-input>
    </el-form-item>
    <el-form-item label="快递简称：" prop="abbr">
      <el-input v-model="express.abbr" class="input-width" placeholder="例：顺丰 SF"></el-input>
    </el-form-item>
    <el-form-item label="快递官网：" prop="website">
      <el-input v-model="express.website" class="input-width" placeholder="例：www.sf.com"></el-input>
    </el-form-item>
    <el-form-item label="LOGO地址：" prop="logo">
      <el-input v-model="express.logo" class="input-width" placeholder="请输入logo地址"></el-input>
    </el-form-item>
    <el-form-item label="是否启用：" prop="status">
      <el-switch v-model="express.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('expressForm')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('expressForm')">重置</el-button>
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


