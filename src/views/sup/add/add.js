import { isvalidUsername } from '@/utils/validate';
const defaultSupplier = {
    username: "",
    password: "",
    nickName: "",
    comName: "",
    comAddress: "",
    contact: "",
    telNo: "",
    mobile: "",
    email: "",
    note: null,
    status: 1,
    groupId: null
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
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }],
                nickName: [{ required: true, trigger: 'blur', message: '请输入供应商名称' }],
                comName: [{ required: true, trigger: 'blur', message: '请输入公司名称' }],
                comAddress: [{ required: true, trigger: 'blur', message: '请输入公司地址' }],
                contact: [{ required: true, trigger: 'blur', message: '请输入联系人' }],
                mobile: [{ required: true, trigger: 'blur', message: '请输入手机号码' }]
            }
        }
    },
    created() {
        if (this.isEdit) {
            let data = { id: this.$route.query.id }
            this.$http.post("sup/detail", data).then(data => {
                this.supplier = data.info;
            }).catch(error => {
                console.log(error);
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
                            this.$http.post("sup/update", this.supplier).then(data => {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }).catch(error => {
                                console.log(error);
                            });
                        } else {
                            const data = { seq: this.seq, token: this.token }
                            this.$http.post("sup/add?format=json", this.supplier).then(data => {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }).catch(error => {
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