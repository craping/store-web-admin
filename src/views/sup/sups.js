import { formatTimestamp } from '@/utils/date';
const defaultListQuery = {
    page: 1,
    num: 10,
    nickname: null,
    com_name: null,
    create_time: null,
    status: null
};
export default {
    name: "supList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            list: null,
            total: null,
            operateType: null,
            multipleSelection: [],
            statusOptions: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 }
            ],
            operateOptions: [
                { label: "启用", value: 1 },
                { label: "禁用", value: 0 }
            ]
        }
    },
    created() {
        this.getList();
    },
    filters: {
        formatCreateTime(time) {
            return formatTimestamp(time)
        },
        formatStatus(value) {
            if (value === 1) {
                return '正常';
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
        handleAddSup(){
            this.$router.push('/sup/addSup');
        },
        handleView(index, row) {
            this.$router.push({path:'/sup/editSup',query:{id:row.id}});
        },
        updateStatus(ids, status) {
            let data = {ids: ids, status, status}
            this.$http.post("sup/updateStatus", data).then(data => {
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
        handleUpdateStatus(index, row, status) {
            let ids = [];
            ids.push(row.id);
            this.updateStatus(ids, status);
        },
        handleDeliveryOrder(index, row) {
            let listItem = this.covertOrder(row);
            this.$router.push({ path: '/oms/deliverOrderList', query: { list: [listItem] } })
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
            let ids = [];
            for(let i=0;i<this.multipleSelection.length;i++){
                ids.push(this.multipleSelection[i].id);
            }
            if (this.operateType === 1) {
                this.updateStatus(ids, 1);
            } else if (this.operateType === 0) {
                this.updateStatus(ids, 0);
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
        getList() {
            this.listLoading = true;
            this.$http.post("sup/supList?format=json", this.listQuery).then(data => {
                this.listLoading = false;
                this.list = data.info;
                this.total = data.totalnum;
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}