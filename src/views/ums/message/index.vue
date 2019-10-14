<template>
  <div class="message-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="消息名称">
        <el-input v-model="form.name" placeholder="请输入消息名称"></el-input>
      </el-form-item>
      <el-form-item label="消息内容">
        <tinymce :height="300" width="99%" v-model="form.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布消息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        name: '',
        detailHtml: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('发布的消息', this.form)
    }
  }
}
</script>
<style lang="scss" scoped>
.message-container {
  padding: 20px;
}
</style>
