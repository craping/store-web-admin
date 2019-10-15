import { fetchList, closeOrder, deleteOrder } from '@/api/order'
import { formatTimestamp } from '@/utils/date'
import balanceDialog from '@/views/ums/user/balanceDialog'
import levelDialog from '@/views/ums/user/levelDialog'
const defaultListQuery = {
  page: 1,
  num: 10,
  nickname: null,
  com_name: null,
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
      statusOptions: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '冻结',
          label: '冻结'
        },
        {
          value: '正常',
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
    },
    formatPayType(value) {
      if (value === 1) {
        return '支付宝'
      } else if (value === 2) {
        return '微信'
      } else {
        return '未支付'
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return 'APP订单'
      } else {
        return 'PC订单'
      }
    },
    formatStatus(value) {
      if (value === 1) {
        return '正常'
      } else if (value === 2) {
        return '已注销'
      } else if (value === 0) {
        return '已停用'
      }
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
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
      console.log(row)
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
      console.log(tree)
      console.log(treeNode)

      this.$http
        .post('member/queryParentList', {
          parentId: tree.id,
          pageNum: 1,
          pageSize: 10
        })
        .then(data => {
          console.log([...data.info])
          resolve([...data.info])
          //   resolve([
          //     {
          //       id: 31,
          //       date: '2016-05-01',
          //       name: '王小虎',
          //       level: '普通会员',
          //       status: '正常',
          //       balance: 20
          //     },
          //     {
          //       id: 32,
          //       date: '2016-05-01',
          //       name: '王小虎',
          //       level: '普通会员',
          //       status: '冻结',
          //       balance: 20
          //     }
          //   ])
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
    getList() {
      this.listLoading = true
      this.$http
        .post('member/queryParentList', {})
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
          })
          this.getList()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
