import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date'
import balanceDialog from '@/views/ums/user/balanceDialog'
import levelDialog from '@/views/ums/user/levelDialog'
const defaultListQuery = {
  page: 1,
  num: 10,
  nickname: null,
  level: null,
  create_time: null,
  status: null
}
export default {
  name: 'orderList',
  components: { balanceDialog, levelDialog },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      userProps: {},
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },
      tableData: [],
      levelList: [],
      levelListselect: [],
      statusOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '冻结'
        },
        {
          value: '1',
          label: '正常'
        }
      ],
      balanceDialogVisible: false,
      levelDialogVisible: false
    }
  },
  created() {
    this.getUserByStatus()
  },
  filters: {
    formatCreateTime(time) {
      return formatTimestamp(time)
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      const { listQuery } = this

      const params = {
        userName: listQuery.nickname,
        level: listQuery.level,
        startTime: listQuery.create_time,
        status: listQuery.status,
        userName: listQuery.nickname,
        pageNum: listQuery.pageNum
      }
      console.log(' this.listQuery', params)
      this.getList(params)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: '/oms/orderDetail', query: { id: row.id } })
    },
    handleViewInfo(index, row) {
      this.$router.push({ path: '/ums/userInfo', query: { id: row.id } })
    },
    handleUserBill(index, row) {
      this.$router.push({
        path: '/ums/userBill',
        query: { id: row.id, name: row.userName }
      })
    },
    handleUserEdit(index, row) {
      this.$router.push({ path: '/ums/edit', query: { id: row.id } })
    },
    handleToAdduser() {
      this.$router.push({ path: '/ums/addUser' })
    },
    handleDeliveryOrder(index, row) {
      let listItem = this.covertOrder(row)
      this.$router.push({
        path: '/oms/deliverOrderList',
        query: { list: [listItem] }
      })
    },
    handleBalanceDialog(index, row) {
      this.userProps = row
      this.balanceDialogVisible = true
    },
    handleLevelDialog(index, row) {
      this.userProps = row
      this.levelDialogVisible = true
    },
    handleFrozen(index, row) {
      let tipCon1 =
        row.status == '1'
          ? '此操作将冻结该会员, 是否继续?'
          : '此操作将解冻该会员，是否继续?'
      let tipCon2 = row.status == '1' ? '冻结成功!' : '解冻成功!'
      let tipCon3 = row.status == '1' ? '已取消冻结' : '已取消解冻'
      this.$confirm(tipCon1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('member/freezeThaw', {
              id: row.id,
              status: row.status == '1' ? 0 : 1
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: tipCon2
              })
              this.reload()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: tipCon3
          })
        })
    },
    load(tree, treeNode, resolve) {
      this.$http
        .post('member/queryParentList', {
          parentId: tree.id,
          pageNum: 1,
          pageSize: 10
        })
        .then(data => {
          resolve([...data.info])
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    getList(params = {}) {
      this.listLoading = true
      this.$http
        .post('member/queryParentList', params)
        .then(data => {
          this.tableData = data.info
          this.total = data.totalnum
          setTimeout(() => {
            this.listLoading = false
          }, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    reload() {
      this.getList()
    },
    getUserByStatus() {
      this.$http
        .post('ams/level/list', {})
        .then(data => {
          data.info.forEach(item => {
            this.levelList[item.id] = item.name
            this.levelListselect.push({ value: item.id, label: item.name })
          })
          this.getList()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
