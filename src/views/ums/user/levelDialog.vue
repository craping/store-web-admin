<template>
  <div class="level-dailog">
    <el-dialog
      title="调整代理等级"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      :visible.sync="visible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="代理等级">
          <el-select v-model="form.level" :placeholder="user.level">
            <el-option label="普通会员" value="0"></el-option>
            <el-option label="白金会员" value="1"></el-option>
            <el-option label="黄金会员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'levelDialog',
  props: {
    value: Boolean,
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(visible) {
        this.value = visible
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        level: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleClose() {
      this.emitInput(false)
    },
    confirm() {
      console.log(this.form)
      this.emitInput(false)
    }
  }
}
</script>
