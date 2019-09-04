<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="level" :rules="rules" ref="levelFrom" label-width="150px">
      <el-form-item label="等级名称：" prop="name">
        <el-input v-model="level.name"></el-input>
      </el-form-item>
      <el-form-item label="订单指标：">
        <el-input-number v-model="level.orderQuantity" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="佣金返点率：">
        <el-input-number v-model="level.rebate" controls-position="right" :step="0.01" :min="0.01" :max="1"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="等级图标：" prop="logo">
        <single-upload v-model="level.logo"></single-upload>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('levelFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('levelFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
    import {create, get, update} from '@/api/agentLevel'
    import SingleUpload from '@/components/Upload/singleUpload'
    const defaultLevel={
        name:'',
        orderQuantity:0,
        rebate:1.00
    };
  export default {
    name: 'LevelDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        level:{...{}, ...defaultLevel},
        rules: {
          name: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请输入品牌logo', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get({id:this.$route.query.id}).then(data => {
          this.level = data.info;
        });
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                update(this.level).then(data => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.level).then(data => {
                  this.$refs[formName].resetFields();
                  this.level = Object.assign({},defaultLevel);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.level = Object.assign({},defaultLevel);
      }
    }
  }
</script>
<style>
</style>


