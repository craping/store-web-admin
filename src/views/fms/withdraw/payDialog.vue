<template>
  <div class="banlance-dailog">
    <el-dialog
      title="提现支付"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      :visible.sync="visible"
      width="80%"
    >
      <div class="text item">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">用户名</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.agentId}}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">持卡人</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.agentId}}(没有)</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">到账金额</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.amount}}元</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">提现金额</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.amount}}元</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">开户行</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">中国银行(没有)</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">卡号</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">1234567891234567(没有)</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">申请时间</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.createTime}}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">手续费</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.fees}}元</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">提现状态</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.status}}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">锁定状态</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.lockStatus}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">审核状态</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.checkStatus}}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">汇款状态</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.remitStatus}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">订单流水号</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">{{userData.recordNo}}</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">拒绝理由</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-select v-model="reason" placeholder="请选择拒绝理由">
              <el-option label="拒绝理由一" value="拒绝理由一"></el-option>
              <el-option label="拒绝理由二" value="拒绝理由二"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple">操作备注</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-input placeholder="请输入备注" v-model="remarks"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="autoPayment">自动汇款</el-button>
        <el-button type="primary" @click="handlePayment">确认汇款</el-button>
        <el-button type="danger" @click="refuseApply">拒绝申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'balanceDialog',
  props: {
    value: Boolean,
    userProps: {
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
    },
    userData() {
      return this.userProps
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        balance: ''
      },
      radio: '1',
      remarks: '',
      reason: ''
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
          this.emitInput(false)
        } else {
          return false
        }
      })
    },
    autoPayment() {
      const params = {
        id: this.userData.id,
        status: 0,
        remitStatus: this.userData.remitStatus,
        payType: 3
      }
      this.$confirm('确认使用天机付代付？请确认余额可供本次支付', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //先调用接口
          this.payOperation(params)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消失败'
          })
        })
    },
    handlePayment() {
      //       id:id [是否必要：true]
      // remitAmount:汇款金额 [是否必要：true]
      // agentId:代理id [是否必要：true]

      const params = {
        id: this.userData.id,
        status: 0,
        remitStatus: this.userData.remitStatus,
        payType: 2
      }
      this.$confirm('确定您已手动完成打款操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //先调用接口
          this.payOperation(params)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消支付'
          })
        })
    },
    refuseApply() {
      if (!this.remarks || !this.reason) {
        this.$notify.error({
          title: '错误',
          message: '请选择备注或原因'
        })
        return
      }
      this.$confirm('确认拒绝本次用户体现并将金额返还至用户账户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //先调用接口
          this.confuseApply(this.userData.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    },
    payOperation(params) {
      this.$http
        .post('withdraw/remittance', params)
        .then(data => {
          this.$emit('getList')
        })
        .catch(error => {
          console.log(error)
        })
    },
    confuseApply(id) {
      const params = {
        id,
        checkStatus: 0
      }
      this.$http
        .post('withdraw/audit', params)
        .then(data => {
          this.$emit('getList')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
  text-align: right;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
}
</style>
