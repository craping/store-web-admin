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
        <el-radio v-model="form.radio" :disabled="isDisabled" label="0">不发布</el-radio>
        <el-radio v-model="form.radio" :disabled="isDisabled" label="1">发布</el-radio>
      </el-form-item>
      <el-form-item label="选择用户">
        <el-select v-model="value1" :disabled="isDisabled" multiple placeholder="请选择">
          <el-option
            v-for="item in userData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-show="isShowBtn" @click="onSubmit">{{btnContent}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { mapState } from 'vuex'
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
      userData: [],
      isShowBtn: true,
      btnContent: '发布消息',
      isDisabled: false
    }
  },
  computed: {
    ...mapState({
      messageInfo: state => state.message.messageInfo
    })
  },
  created() {
    if (this.$route.query.id) {
      this.initMessage(this.messageInfo)
    }
    this.getList()
  },
  methods: {
    onSubmit() {
      const params = {
        title: this.form.name,
        content: this.form.detailHtml,
        state: this.form.radio, //0 未发布 1 发布
        sendObject: this.value1
      }
      if (this.$route.query.type == 'update') {
        params.id = this.$route.query.id
      }
      this.$http
        .post('msg/addOrUpdateMsg', params)
        .then(data => {
          this.fullscreenLoading = false
          this.$message({
            message: '消息发布成功',
            type: 'success'
          })
          this.$router.push('messagelist')
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
    },
    initMessage(message) {
      const { title, state, content, sendObject } = message
      this.form.name = title
      this.form.detailHtml = content
      this.form.radio = state + ''
      this.value1 = sendObject.substring(1, sendObject.length - 1).split('|')
      console.log(this.value1)
      if (state == 1) {
        this.isShowBtn = false
        this.isDisabled = true
      }
      if (state == 0) {
        this.btnContent = '更新消息'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.message-container {
  padding: 20px;
}
</style>
