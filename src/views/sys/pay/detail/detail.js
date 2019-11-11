import { formatTimestamp } from '@/utils/date';
const defaultMethodInfo = {
    gatewayId: null,
    methodType: "APP",
    feeType: 1,
    roundType: 1,
    payFee: null,
    minFee: null,
    status: 1
};
export default {
    name: 'channelDetail',
    data() {
        return {
            id: null,
            channel: {},
            channelGateways: null,
            channelMethods: [],
            gatewayIds: [],
            search: null,
            methodInfo: Object.assign({}, defaultMethodInfo),
            methodDialogVisible: false,
            methodDialogTitle: "",
            methodIsEdit: false,
            rules: {
                payFee: [{ required: true, trigger: 'blur', message: '必填' }],
                minFee: [{ required: true, trigger: 'blur', message: '必填' }],
            },
        }
    },
    created() {
        this.id = this.list = this.$route.query.id;
        this.deatil(this.id);
        this.getChannelGateways(this.id);
    },
    filters: {
        formatCreateTime(time) {
            return formatTimestamp(time)
        },
        formatStatus(value) {
            if (value === 1) { return '启用'; }
            else if (value === 0) { return '已禁用'; }
        },
        formatFeeType(value) {
            if (value === 1) { return '百分比'; }
            else if (value === 2) { return '固定金额'; }
            else { return '-'; }
        },
        formatRoundType(value) {
            if (value === 1) { return '进一法'; }
            else if (value === 2) { return '四舍五入法'; }
            else if (value === 3) { return '舍尾法'; }
        }
    },
    methods: {
        deatil(id) {
            this.$http.post("payChannel/getItem", { id: id }).then(data => {
                this.channel = data.info;
            }).catch(error => {
                console.log(error);
            });
        },
        gatewayAdd() {
            this.$router.push({ path: '/scm/addGateway', query: { channelId: this.channel.id } });
        },
        gatewayEdit(index, row) {
            this.$router.push({ path: '/scm/updateGateway', query: { id: row.id } });
        },
        gatewayStatusChange(index, row) {
            let ids = [];
            ids.push(row.id);
            let data = { ids: ids, status: row.status }
            this.$http.post("payChannelGateway/update/updateStatus", data).then(data => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            }).catch(error => {
                console.log(error);
            });
        },
        gatewayDelete(index, row) {
            this.$confirm('确定删除通道配置?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                ids.push(row.id);
                let data = { ids: ids, status: row.status }
                this.$http.post("payChannelGateway/delete", data).then(data => {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getChannelGateways(this.channel.id);
                    this.getChannelMethods(this.gatewayIds);
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        getChannelGateways(channelId) {
            this.$http.post("payChannelGateway/list", { channelId: channelId }).then(data => {
                this.channelGateways = data.info;
                if (this.channelGateways == null || this.channelGateways == "") return;
                this.channelGateways.forEach(item => {
                    this.gatewayIds.push(item.id);
                });
                this.getChannelMethods(this.gatewayIds);
            }).catch(error => {
                console.log(error);
            });
        },
        getChannelMethods(ids) {
            this.$http.post("payChannelMethod/listWithGatewayIds", { ids: ids }).then(data => {
                this.channelMethods = data.info;
            }).catch(error => {
                console.log(error);
            });
        },
        methodAddShow(gatewayId) {
            this.methodInfo = Object.assign({}, defaultMethodInfo);
            this.methodIsEdit = false;
            this.methodInfo.gatewayId = gatewayId;
            this.methodDialogVisible = true;
            this.methodDialogTitle = "添加渠道支付信息";
        },
        methodUpdateShow(methodId) {
            this.$http.post("payChannelMethod/getItem", {id:methodId}).then(data => {
                this.methodInfo = data.info;
                this.methodIsEdit = true;
                this.methodDialogVisible = true;
                this.methodDialogTitle = "修改渠道支付信息";
            }).catch(error => {
                console.log(error);
            });
        },
        methodStatusChange(index, row) {
            let ids = [];
            ids.push(row.id);
            let data = { ids: ids, status: row.status }
            this.$http.post("payChannelMethod/update/updateStatus", data).then(data => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            }).catch(error => {
                console.log(error);
            });
        },
        methodDelete(index, row) {
            this.$confirm('确定删除通道配置?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                ids.push(row.id);
                let data = { ids: ids, status: row.status }
                this.$http.post("payChannelMethod/delete", data).then(data => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getChannelMethods(this.gatewayIds);
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        methodOnSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('是否提交数据', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.methodIsEdit) {
                            this.$http.post("payChannelMethod/update/method", this.methodInfo).then(data => {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.methodDialogVisible = false;
                                this.getChannelMethods(this.gatewayIds);
                                this.methodInfo = Object.assign({}, defaultMethodInfo);
                            }).catch(error => {
                                console.log(error);
                            });
                        } else {
                            this.$http.post("payChannelMethod/insert", this.methodInfo).then(data => {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.methodDialogVisible = false;
                                this.getChannelMethods(this.gatewayIds);
                                this.methodInfo = Object.assign({}, defaultMethodInfo);
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
        channelDelete() {
            this.$confirm('确定删除所有渠道配置?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                ids.push(this.channel.id);
                this.$http.post("payChannel/delete", { ids: ids }).then(data => {
                    this.channelMethods = data.info;
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.back();
                }).catch(error => {
                    console.log(error);
                });
            });
        }
    }
}