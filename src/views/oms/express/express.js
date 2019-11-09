import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
const defaultListQuery = {
    keyword: null,
    status: null,
    pageNum: 1,
    pageSize: 10
};
export default {
    name: "expressList",
    components: { LogisticsDialog },
    data() {
        return {
            total: null,
            multipleSelection: [],
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            list: null,
            statusOptions: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
            ],
            operateType:null,
            operateOptions: [ { label: "删除", value: 1 } ],
        }
    },
    created() {
        this.getList();
    },
    filters: { },
    methods: {
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
            this.$message({
            message: '请选择要操作的条目',
            type: 'warning',
            duration: 1000
            });
            return;
        }
        if(this.operateType===1){
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                ids.push(this.multipleSelection[i].id);
            }
            this.deleteExpress(ids);
        }
        },
        handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val){
            this.listQuery.pageNum = val;
            this.getList();
        },
        handleAddExpress(){
            this.$router.push('/oms/addExpress');
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
            this.$http.post("express/list", this.listQuery).then(data => {
                this.listLoading = false;
                this.list = data.info;
                this.total = data.totalnum;
            }).catch(error => {
                console.log(error);
            });
        },
        handleUpdate(index, row) {
            this.$router.push({path:'/oms/updateExpress',query:{id:row.id}});
        },
        handleStatusChange(index, row) {
            let data = {
                id: row.id,
                status: row.status,
            }
            this.$http.post("express/updateStatus", data).then(data => {
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
        deleteExpressSingle(index, row){
            let ids=[];
            ids.push(row.id);
            this.deleteExpress(ids);
        },
        deleteExpress(ids) {
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {ids: ids}
                this.$http.post("express/delete", params).then(data => {
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