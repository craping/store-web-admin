import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
const defaultListQuery = {
    page: 1,
    num: 10,
    nickname: null,
    com_name: null,
    create_time: null,
    status: null
};
export default {
    name: "orderList",
    components: { LogisticsDialog },
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            list: null,
            total: null,
            operateType: null,
            multipleSelection: [],
            closeOrder: {
                dialogVisible: false,
                content: null,
                orderIds: []
            },
            statusOptions: [
                {
                    label: '正常',
                    value: 1
                },
                {
                    label: '已停用',
                    value: 0
                },
                {
                    label: '已注销',
                    value: 2
                }
            ],
            orderTypeOptions: [
                {
                    label: '正常订单',
                    value: 0
                },
                {
                    label: '秒杀订单',
                    value: 1
                }
            ],
            sourceTypeOptions: [
                {
                    label: 'PC订单',
                    value: 0
                },
                {
                    label: 'APP订单',
                    value: 1
                }
            ],
            operateOptions: [
                {
                    label: "",
                    value: 1
                },
                {
                    label: "",
                    value: 2
                },
                {
                    label: "",
                    value: 3
                }
            ],
            logisticsDialogVisible: false
        }
    },
    created() {
        this.getList();
    },
    filters: {
        formatCreateTime(time) {
            return formatTimestamp(time)
        },
        formatPayType(value) {
            if (value === 1) {
                return '支付宝';
            } else if (value === 2) {
                return '微信';
            } else {
                return '未支付';
            }
        },
        formatSourceType(value) {
            if (value === 1) {
                return 'APP订单';
            } else {
                return 'PC订单';
            }
        },
        formatStatus(value) {
            if (value === 1) {
                return '正常';
            } else if (value === 2) {
                return '已注销';
            } else if (value === 0) {
                return '已停用';
            }
        },
    },
    methods: {
        handleResetSearch() {
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        handleSearchList() {
            this.listQuery.pageNum = 1;
            this.getList();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleViewOrder(index, row) {
            this.$router.push({ path: '/oms/orderDetail', query: { id: row.id } })
        },
        handleCloseOrder(index, row) {
            this.closeOrder.dialogVisible = true;
            this.closeOrder.orderIds = [row.id];
        },
        handleDeliveryOrder(index, row) {
            let listItem = this.covertOrder(row);
            this.$router.push({ path: '/oms/deliverOrderList', query: { list: [listItem] } })
        },
        handleViewLogistics(index, row) {
            this.logisticsDialogVisible = true;
        },
        handleDeleteOrder(index, row) {
            let ids = [];
            ids.push(row.id);
            this.deleteOrder(ids);
        },
        handleBatchOperate() {
            if (this.multipleSelection == null || this.multipleSelection.length < 1) {
                this.$message({
                    message: '请选择要操作的订单',
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            if (this.operateType === 1) {
                //批量发货
                let list = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].status === 1) {
                        list.push(this.covertOrder(this.multipleSelection[i]));
                    }
                }
                if (list.length === 0) {
                    this.$message({
                        message: '选中订单中没有可以发货的订单',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                this.$router.push({ path: '/oms/deliverOrderList', query: { list: list } })
            } else if (this.operateType === 2) {
                //关闭订单
                this.closeOrder.orderIds = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.closeOrder.orderIds.push(this.multipleSelection[i].id);
                }
                this.closeOrder.dialogVisible = true;
            } else if (this.operateType === 3) {
                //删除订单
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    ids.push(this.multipleSelection[i].id);
                }
                this.deleteOrder(ids);
            }
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getList();
        },
        handleCloseOrderConfirm() {
            if (this.closeOrder.content == null || this.closeOrder.content === '') {
                this.$message({
                    message: '操作备注不能为空',
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            let params = new URLSearchParams();
            params.append('ids', this.closeOrder.orderIds);
            params.append('note', this.closeOrder.content);
            closeOrder(params).then(data => {
                this.closeOrder.orderIds = [];
                this.closeOrder.dialogVisible = false;
                this.getList();
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            });
        },
        getList() {
            this.listLoading = true;
            // fetchList(this.listQuery).then(data => {
            //     this.listLoading = false;
            //     this.list = data.info;
            //     this.total = data.totalnum;
            // });

            this.$http.post("sup/supList?format=json", this.listQuery).then(data => {
                this.listLoading = false;
                this.list = data.info;
                this.total = data.totalnum;
                console.log(this.$store.getters.roles[0]);
                // if (!data.result) {
                //     this.bettings = data.info;
                // } else {
                //     Toast.fail(data.msg);
                // }
            })
            .catch(error => {
                console.log(error);
            });

        },
        deleteOrder(ids) {
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = new URLSearchParams();
                params.append("ids", ids);
                deleteOrder(params).then(data => {
                    this.$message({
                        message: '删除成功！',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
            })
        },
        covertOrder(order) {
            let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress;
            let listItem = {
                orderId: order.id,
                orderSn: order.orderSn,
                receiverName: order.receiverName,
                receiverPhone: order.receiverPhone,
                receiverPostCode: order.receiverPostCode,
                address: address,
                deliveryCompany: null,
                deliverySn: null
            };
            return listItem;
        }
    }
}