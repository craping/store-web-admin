<template>
  <div class="systemConfit">
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">开启会员模块</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content middle switchClass">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <el-button type="primary">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">提现手续费</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content middle">
          <el-input placeholder="请输入提现手续费,eg:0.01即1%" v-model="charge" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <el-button type="primary">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="关于我们-用户协议">
        <tinymce :height="300" width="99%" v-model="form.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存修改</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form1" label-width="180px">
      <el-form-item label="关于我们-隐私政策">
        <tinymce :height="300" width="99%" v-model="form1.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'config',
  components: {
    Tinymce
  },
  data() {
    return {
      value: true,
      charge: '',
      form: {
        detailHtml: ''
      },
      form1: {
        detailHtml: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.systemConfit {
  padding: 20px;
  .grid-content {
    padding: 10px;
    margin-bottom: 20px;
  }
  .left {
    text-align: right;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .switchClass {
    padding-top: 20px;
  }
}
</style>
