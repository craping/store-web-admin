<template>
  <div class="banlance-dailog">
    <el-dialog
      title="充值/扣减余额"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      :visible.sync="visible"
    >
      <el-form :model="form" ref="from">
        <el-form-item
          label="输入金额"
          prop="balance"
          :rules="[
      { required: true, message: '金额不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          :label-width="formLabelWidth"
        >
          <el-input type="balance" v-model.number="form.balance" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择类型" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">充值</el-radio>
          <el-radio v-model="radio" label="2">扣减</el-radio>
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
  name: 'balanceDialog',
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
        balance: ''
      },
      radio: '1',
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
      this.$refs['from'].validate(valid => {
        if (valid) {
          console.log(this.form)
          console.log(this.radio)
          this.$http
            .post('member/memberBalance', {
              id: this.user.id,
              balance:
                this.radio == '1' ? this.form.balance : `-${this.form.balance}`
            })
            .then(data => {
              this.$emit('reload')
            })
            .catch(error => {
              console.log(error)
            })
          this.emitInput(false)
        } else {
          return false
        }
      })
    }
  }
}
</script>
