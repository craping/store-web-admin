const defaultGateway = {
    channelId: null,
    type: "WXPAY",
    requestUrl: "",
    queryUrl: null,
    withdrawUrl: null,
    withdrawQueryUrl: null,
    notifyUrl: null,
    pageNotifyUrl: null,
    reconUrl: null,
    refundUrl: null,
    refundQueryUrl: null,
    bakTemp1: null,
    bakTemp2: null,
    bakTemp3: null,
    status: 1
};
export default {
    name: 'gatewayAdd',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            channelId: null,
            gateway: Object.assign({}, defaultGateway),
            rules: {
                requestUrl: [{ required: true, trigger: 'blur', message: '必填' }],
                queryUrl: [{ required: true, trigger: 'blur', message: '必填' }],
                notifyUrl: [{ required: true, trigger: 'blur', message: '必填',  }],
                pageNotifyUrl: [{ required: true, trigger: 'blur', message: '必填',  }],
                refundUrl: [{ required: true, trigger: 'blur', message: '必填',  }],
                refundQueryUrl: [{ required: true, trigger: 'blur', message: '必填',  }],
            },
            selectedOptions: []
        }
    },
    created() {
        if (this.isEdit) {
            let data = { id: this.$route.query.id }
            this.$http.post("payChannelGateway/getItem", data).then(data => {
                this.gateway = data.info;
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
                            this.$http.post("payChannelGateway/update/gateway", this.gateway).then(data => {
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
                            this.gateway.channelId = this.$route.query.channelId;
                            this.$http.post("payChannelGateway/insert", this.gateway).then(data => {
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
            this.gateway = Object.assign({}, defaultGateway);
        },
    }
}