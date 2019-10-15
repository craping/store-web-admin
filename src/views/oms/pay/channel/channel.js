import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
const defaultListQuery = {
    keyword: null,
    type: null,
    status: null,
};
export default {
    name: "channelList",
    components: { LogisticsDialog },
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            list: null,
            logisticsDialogVisible: false,
            statusOptions: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
            ],
            typeOptions: [
                { label: '微信', value: 1 },
                { label: '支付宝', value: 2 },
                { label: '银联', value: 3 },
                { label: '余额钱包', value: 4 }
            ],
        }
    },
    created() {
        this.getList();
    },
    filters: {
        formatType(value) {
          if (value === 2) {
            return '支付宝';
          } else if (value === 1) {
            return '微信';
          } else if (value === 3) {
            return '银联';
          } else {
            return '余额钱包';
          }
        }
    },
    methods: {
        handleAddChannel(){
            this.$router.push('/scm/addChannel');
        },
        handleResetSearch() {
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        handleSearchList() {
            this.listQuery.pageNum = 1;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            this.$http.post("payChannel/list", this.listQuery).then(data => {
                this.listLoading = false;
                this.list = data.info;
            }).catch(error => {
                console.log(error);
            });
        },
        handleUpdate(index, row) {
            this.$router.push({path:'/scm/updateChannel',query:{id:row.id}});
        },
        handleStatusChange(index, row) {
            let data = {
                id: row.id,
                status: row.status,
                type: row.type
            }
            this.$http.post("payChannel/update/updateStatus", data).then(data => {
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
        deleteChannel(index, row) {
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids=[];
                ids.push(row.id);
                let params = {ids: ids}
                this.$http.post("payChannel/delete", params).then(data => {
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