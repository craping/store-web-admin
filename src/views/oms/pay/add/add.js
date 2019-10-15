const defaultChannel = {
    name: "",
    abbr: "",
    type: 1,
    status: 0
};
export default {
    name: 'channelAdd',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            channel: Object.assign({}, defaultChannel),
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
            this.$http.post("payChannel/getItem", data).then(data => {
                this.channel = data.info;
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
                            this.$http.post("payChannel/update/channel", this.channel).then(data => {
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
                            this.$http.post("payChannel/insert", this.channel).then(data => {
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
            this.channel = Object.assign({}, defaultChannel);
        },
    }
}