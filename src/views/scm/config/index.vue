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
          <el-button type="primary" @click="saveDate(1,'VIP_ENABLE',value)">保存修改</el-button>
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
          <el-button type="primary" @click="saveDate(2,'ACCOUNT_FEE',charge)">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">最低提现申请金额</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content middle">
          <el-input placeholder="请输入版本号" v-model="minWithdraw" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <el-button type="primary" @click="saveDate(9,'ACCOUNT_MIN_WITHDRAW',minWithdraw)">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">同等级会员佣金返点率</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content middle">
          <el-input placeholder="请输入佣金返点率eg:0.01即1%" v-model="equalRate" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <el-button type="primary" @click="saveDate(10,'COMMISSION_EQUAL_RATE',equalRate)">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">同等级会员佣金返点层级</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content middle">
          <el-input placeholder="请输入版本号" v-model="equalLevel" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <el-button type="primary" @click="saveDate(11,'COMMISSION_EQUAL_LEVEL',equalLevel)">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">版本号</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content middle">
          <el-input placeholder="请输入版本号" v-model="veision" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <el-button type="primary" @click="saveDate(8,'ABOUT_VERSION',veision)">保存修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="关于我们-用户协议">
        <tinymce :height="300" width="99%" v-model="form.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveDate(3,'ABOUT_TERMS',form.detailHtml)">保存修改</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form1" label-width="180px">
      <el-form-item label="关于我们-隐私政策">
        <tinymce :height="300" width="99%" v-model="form1.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveDate(4,'ABOUT_PRIVACY',form1.detailHtml)">保存修改</el-button>
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
      veision: '',
      equalRate: '',
      minWithdraw: '',
      equalLevel: '',
      form: {
        detailHtml: ''
      },
      form1: {
        detailHtml: ''
      }
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      this.$http
        .post('config/querySysConfigInfo', {})
        .then(data => {
          const { info } = data
          this.value = info[0].configValue == 1
          this.charge = info[1].configValue
          this.veision = info[4].configValue
          this.form.detailHtml = info[2].configValue
          this.form1.detailHtml = info[3].configValue
          this.minWithdraw = info[5].configValue
          this.equalRate = info[6].configValue
          this.equalLevel = info[7].configValue
        })
        .catch(err => {})
    },
    saveDate(id, code, value) {
      const params = {
        id,
        configCode: code,
        configValue: value
      }
      this.$http
        .post('config/updateSysConfigInfo', params)
        .then(data => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getConfig()
        })
        .catch(err => {
          this.$message.error(`保存错误${err}`)
        })
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
