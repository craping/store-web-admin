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
          <el-select v-model="form.level" :placeholder="vipName[user.memberLevelId]">
            <el-option v-for="(item,index) in vipName" :label="item" :value="index" :key="item"></el-option>
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
      formLabelWidth: '120px',
      vipName: [
        '普通会员',
        '白金会员',
        '黄金会员',
        '钻石会员',
        '金钻会员',
        '至尊会员',
        '至尊会员2',
        '至尊会员3',
        '至尊会员4',
        '至尊会员5'
      ]
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
      this.emitInput(false)

      this.$http
        .post('member/levelSet', {
          id: this.user.id,
          levelId: this.form.level
        })
        .then(data => {
          this.$emit('reload')
          this.form.level = ''
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
