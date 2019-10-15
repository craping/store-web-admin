<template>
  <div class="message-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="消息名称">
        <el-input v-model="form.name" placeholder="请输入消息名称"></el-input>
      </el-form-item>
      <el-form-item label="消息内容">
        <tinymce :height="300" width="99%" v-model="form.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio v-model="form.radio" label="0">不发布</el-radio>
        <el-radio v-model="form.radio" label="1">发布</el-radio>
      </el-form-item>
      <el-form-item label="选择用户">
        <el-select v-model="value1" multiple placeholder="请选择">
          <el-option
            v-for="item in userData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
        detailHtml: '',
        radio: '0'
      },
      value1: [],
      userData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.$http
        .post('msg/addOrUpdateMsg', {
          title: this.form.name,
          content: this.form.detailHtml,
          state: this.form.radio, //0 未发布 1 发布
          sendObject: this.value1
        })
        .then(data => {
          this.fullscreenLoading = false
          this.$message({
            message: '消息发布成功',
            type: 'success'
          })
        })
        .catch(err => {
          this.fullscreenLoading = false
        })
    },
    getList() {
      this.$http
        .post('member/queryParentList', {})
        .then(data => {
          this.userData = data.info.map(item => {
            return { value: item.id, label: item.userName }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.message-container {
  padding: 20px;
}
</style>
