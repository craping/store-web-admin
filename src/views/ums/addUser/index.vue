<template>
  <div class="adduser-container">
    <div class="form-container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="会员名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" prop="level">
          <el-select v-model="ruleForm.level" placeholder="请选择会员等级">
            <el-option
              v-for="item in levelList"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            ></el-option>
            <!-- <el-option label="白金" value="白金"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="会员账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号码" prop="telphone">
          <el-input v-model.number="ruleForm.telphone"></el-input>
        </el-form-item>-->
        <el-form-item label="上级ID" prop="superiorId">
          <el-input v-model.number="ruleForm.superiorId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-loading.fullscreen.lock="fullscreenLoading"
          >立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      ruleForm: {
        name: '',
        level: '',
        account: '',
        date1: '',
        pass: '',
        checkPass: '',
        // telphone: '',
        superiorId: ''
      },
      fullscreenLoading: false,
      levelList: [],

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择会员等级', trigger: 'change' }
        ],
        account: [
          { required: true, validator: checkPhone, trigger: 'blur' }
          // { required: true, message: '请输入电话号码', trigger: 'blur' },
          // { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
        // telphone: [{ required: true, validator: checkPhone, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserByStatus()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { ruleForm } = this
          const params = {
            userName: ruleForm.account,
            password: md5(ruleForm.pass),
            nickName: ruleForm.name,
            parentId: ruleForm.superiorId,
            level: ruleForm.level
          }
          this.fullscreenLoading = true
          this.$http
            .post('member/addMember', params)
            .then(data => {
              this.fullscreenLoading = false
              this.$message({
                message: '会员添加成功',
                type: 'success',
                onClose: () => {
                  this.resetForm('ruleForm')
                }
              })
            })
            .catch(err => {
              this.fullscreenLoading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getUserByStatus() {
      this.$http
        .post('ams/level/list', {})
        .then(data => {
          data.info.forEach(item => {
            this.levelList.push({ value: item.name, label: item.id })
          })
          console.log('this.levelList', this.levelList)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.adduser-container {
  display: flex;
  justify-content: center;
}
.adduser-container .form-container {
  width: 60%;
}
</style>
