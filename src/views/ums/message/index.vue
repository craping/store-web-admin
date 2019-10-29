<template>
  <div class="message-container" v-if="isShow">
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
        <el-button size="medium" @click="showDialog">{{isShowBtn ? '选择用户': '查看用户'}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-show="isShowBtn" @click="onSubmit">{{btnContent}}</el-button>
      </el-form-item>
    </el-form>
    <select-user-dialog @getSelectedUser="getSelectedUser" v-model="selectDialogVisible"></select-user-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { mapState } from 'vuex'
import selectUserDialog from '@/views/ums/message/selectUserDialog'
export default {
  components: {
    Tinymce,
    selectUserDialog
  },
  data() {
    return {
      form: {
        name: '',
        detailHtml: '',
        radio: '0'
      },
      value1: [],
      isShowBtn: true,
      isShow: true,
      btnContent: '发布消息',
      isDisabled: false,
      selectDialogVisible: false
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
  },
  watch: {
    $route() {
      if (!this.$route.query.id) {
        this.$store.commit('SET_MESSAGEi_INFP', {})
        this.isShow = false
        this.$nextTick(() => {
          this.isShow = true
          this.init()
        })
      }
    }
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

    getSelectedUser(temArr) {
      this.value1 = temArr
    },

    init() {
      ;(this.form = {
        name: '',
        detailHtml: '',
        radio: '0'
      }),
        (this.value1 = []),
        (this.isShowBtn = true),
        (this.isShow = true),
        (this.btnContent = '发布消息'),
        (this.isDisabled = false),
        (this.selectDialogVisible = false)
    },

    initMessage(message) {
      const { title, state, content, sendObject } = message
      this.form.name = title
      this.form.detailHtml = content
      this.form.radio = state + ''
      if (state == 1) {
        this.isShowBtn = false
        this.isDisabled = true
      }
      if (state == 0) {
        this.btnContent = '更新消息'
      }
    },
    showDialog() {
      this.selectDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.message-container {
  padding: 20px;
}
.el-scrollbar {
  .el-button--medium {
    width: 100%;
  }
}
</style>
