import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
export default {
    name: "orderList",
    components: { LogisticsDialog },
    data() {
        return {
            listLoading: true,
            list: null,
            logisticsDialogVisible: false
        }
    },
    created() {
        this.getList();
    },
    methods: {
        handleAddAddress(){
            this.$router.push('/oms/addCompanyAddress');
        },
        getList() {
            this.listLoading = true;
            this.$http.post("companyAddress/list", {}).then(data => {
                this.listLoading = false;
                this.list = data.info;
            }).catch(error => {
                console.log(error);
            });
        },
        handleUpdate(index, row) {
            this.$router.push({path:'/oms/updateAddress',query:{id:row.id}});
        },
        handleSendStatusChange(index, row) {
            let data = {
                id: row.id,
                sendStatus: row.sendStatus
            }
            this.$http.post("companyAddress/update/sendStatus", data).then(data => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
                this.getList();
            }).catch(error => {
                console.log(error);
            });
        },
        handleReceiveStatusChange(index, row) {
            let data = {
                id: row.id,
                receiveStatus: row.receiveStatus
            }
            this.$http.post("companyAddress/update/receiveStatus", data).then(data => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
                this.getList();
            }).catch(error => {
                console.log(error);
            });
        },
        deleteAddress(index, row) {
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {id: row.id}
                this.$http.post("companyAddress/delete", params).then(data => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                }).catch(error => {
                    console.log(error);
                });
            })
        }
    }
}