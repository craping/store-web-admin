const defaultExpress = {
    name: "",
    abbr: "",
    website: "",
    logo: "",
    status: 0
};
export default {
    name: 'expressAdd',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            express: Object.assign({}, defaultExpress),
            rules: {
                name: [{ required: true, trigger: 'blur', message: '请输入渠道名称' }],
                abbr: [{ required: true, trigger: 'blur', message: '请输入渠道简称：WX***' }],
                type: [{ required: true, trigger: 'change', message: '请选择渠道类型',  }]
            },
            selectedOptions: []
        }
    },
    created() {
        if (this.isEdit) {
            let data = { id: this.$route.query.id }
            this.$http.post("express/detail", data).then(data => {
                this.express = data.info;
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
                            this.$http.post("express/update", this.express).then(data => {
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
                            this.$http.post("express/insert", this.express).then(data => {
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
            this.express = Object.assign({}, defaultExpress);
        },
    }
}