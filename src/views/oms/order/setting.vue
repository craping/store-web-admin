<template> 
  <el-card class="form-container" shadow="hover" body-style="padding: 0px">
    <el-form :model="orderSetting"
             ref="orderSettingForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="秒杀订单超过：" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">
          <template slot="append">分钟</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="正常订单超过：" prop="normalOrderOvertime">
        <el-input v-model="orderSetting.normalOrderOvertime" class="input-width">
          <template slot="append">分钟</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：" prop="confirmOvertime">
        <el-input v-model="orderSetting.confirmOvertime" class="input-width">
          <template slot="append">小时</template>
        </el-input>
        <span class="note-margin">未收货，订单自动确认收货</span>
      </el-form-item>
      <el-form-item label="确认收货后：" prop="confirmAllowReturnNoReasonTime">
        <el-input v-model="orderSetting.confirmAllowReturnNoReasonTime" class="input-width">
          <template slot="append">小时</template>
        </el-input>
        <span class="note-margin">内，不影响二次销售，无理由退换货</span>
      </el-form-item>
      <el-form-item label="确认收货后：" prop="confirmAllowReturnTime">
        <el-input v-model="orderSetting.confirmAllowReturnTime" class="input-width">
          <template slot="append">小时</template>
        </el-input>
        <span class="note-margin">内，商品出现质量问题，可退换货</span>
      </el-form-item>
      <el-form-item label="确认收货超过：" prop="confirmNotAllowReturnTime">
        <el-input v-model="orderSetting.confirmNotAllowReturnTime" class="input-width">
          <template slot="append">小时</template>
        </el-input>
        <span class="note-margin">不可退换货</span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getOrderSetting,updateOrderSetting} from '@/api/orderSetting';
  const defaultOrderSetting = {
    id: null,
    flashOrderOvertime: 0,
    normalOrderOvertime: 0,
    confirmOvertime: 0,
    confirmAllowReturnNoReasonTime: 0,
    confirmAllowReturnTime: 0,
    confirmNotAllowReturnTime: 0
  };
  const checkTime = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('时间不能为空'));
    }
    console.log("checkTime",value);
    let intValue = parseInt(value);
    if (!Number.isInteger(intValue)) {
      return callback(new Error('请输入数字值'));
    }
    callback();
  };
  export default {
    name: 'orderSetting',
    data() {
      return {
        orderSetting: Object.assign({}, defaultOrderSetting),
        rules: {
          flashOrderOvertime:{validator: checkTime, trigger: 'blur' },
          normalOrderOvertime:{validator: checkTime, trigger: 'blur' },
          confirmOvertime: {validator: checkTime, trigger: 'blur' },
          confirmAllowReturnNoReasonTime: {validator: checkTime, trigger: 'blur' },
          confirmAllowReturnTime: {validator: checkTime, trigger: 'blur' },
          confirmNotAllowReturnTime: {validator: checkTime, trigger: 'blur' }
        }
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否要提交修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateOrderSetting(1,this.orderSetting).then(data=>{
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                  duration:1000
                });
              })
            });
          } else {
            this.$message({
              message: '提交参数不合法',
              type: 'warning'
            });
            return false;
          }
        });
      },
      getDetail(){
        getOrderSetting(1).then(data=>{
          this.orderSetting=data.info;
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 50%;
  }

  .note-margin {
    margin-left: 5px;
  }
</style>


