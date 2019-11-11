import { formatTimestamp } from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
const defaultListQuery = {
    keyword: null,
    status: null,
    page: 1,
    num: 10,
};
export default {
    name: "channelList",
    components: { LogisticsDialog },
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
                { label: '禁用', value: 0 },
            ],
            operateOptions: [
                { label: "启用", value: 1 },
                { label: "禁用", value: 0 },
                { label: "删除", value: 2 }
            ]
        }
    },
    created() {
        this.getList();
    },
    filters: { },
    methods: {
        viewDeatil(index, row) {
            this.$router.push({path:'/scm/channelDetail',query:{id:row.id}});
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
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
                this.total = data.totalnum;
            }).catch(error => {
                console.log(error);
            });
        },
        handleUpdate(index, row) {
            this.$router.push({path:'/scm/updateChannel',query:{id:row.id}});
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
                this.statusChange(ids, 1);
            } else if (this.operateType === 0) {
                this.statusChange(ids, 0);
            } else if (this.operateType === 2) {
                this.doDelete(ids);
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
        handleStatusChange(index, row) {
            let ids = [];
            ids.push(row.id);
            this.statusChange(ids, row.status);
        },
        statusChange(ids, status) {
            let data = { ids: ids, status: status }
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
            let ids=[];
            ids.push(row.id);
            this.doDelete(ids);
        },
        doDelete(ids) {
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
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