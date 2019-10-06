import { createCoupon, getCoupon, updateCoupon } from '@/api/coupon';
import {isvalidUsername} from '@/utils/validate';
const defaultSupplier = {
    username: "username1",
    password: "111111",
    nickname: "雅诗兰黛",
    com_name: "深圳市雅诗兰黛科技有限公司",
    com_address: "广东省深圳市南山区南头城文化街4号502号",
    contact: "龙先生",
    tel_no: "0755-86666666",
    mobile: "18688988888",
    email: "yashilandai@qq.com"
};
export default {
    name: 'supplierAdd',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
              callback(new Error('请输入正确的用户名'))
            } else {
              callback()
            }
          };
          const validatePass = (rule, value, callback) => {
            if (value.length < 3) {
              callback(new Error('密码不能小于3位'))
            } else {
              callback()
            }
          };
          const validateRole = (rule, value, callback) => {
            if (value.length < 1) {
              callback(new Error('请选择登录角色'))
            } else {
              callback()
            }
          }; 
        return {
            supplier: Object.assign({}, defaultSupplier),
            rules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePass}],
                nickname: [{ required: true, trigger: 'blur', message: '请输入供应商名称' }],
                com_name: [{ required: true, trigger: 'blur', message: '请输入公司名称' }],
                com_address: [{ required: true, trigger: 'blur', message: '请输入公司地址' }],
                contact: [{ required: true, trigger: 'blur', message: '请输入联系人' }],
                mobile: [{ required: true, trigger: 'blur', message: '请输入手机号码' }]
            },
            selectProduct: null,
            selectProductLoading: false,
            selectProductOptions: [],
            selectProductCate: null,
            productCateOptions: []
        }
    },
    created() {
        if (this.isEdit) {
            getCoupon(this.$route.query.id).then(data => {
                this.coupon = data.info;
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
                            updateCoupon(this.$route.query.id, this.coupon).then(data => {
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            });
                        } else {
                            //createCoupon(this.coupon).then(data => {
                                //this.$refs[formName].resetFields();
                                // this.$message({
                                //     message: '提交成功',
                                //     type: 'success',
                                //     duration: 1000
                                // });
                                //this.$router.back();
                            //});
                            const data = {seq: this.seq, token: this.token}
                            this.$http.post("admin/add?format=json", this.supplier).then(data => {
                                console.log(data.result);
                                if (!data.result) {
                                   
                                } else {
                                    
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        }
                    });
                } else {
                    this.$message({
                        message: '验证失败',
                        type: 'error',
                        duration: 1000
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.supplier = Object.assign({}, defaultSupplier);
        },
    }
}