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
      isFreezen: true,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          level: '普通会员',
          status: '正常',
          balance: 20
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          level: '白金会员',
          status: '正常',
          balance: 20
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          level: '普通会员',
          status: '正常',
          balance: 20,
          hasChildren: true
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          level: '黄金会员',
          status: '正常',
          balance: 20
        }
      ],
      statusOptions: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '冻结',
          value: 0
        }
      ],
      balanceDialogVisible: false,
      levelDialogVisible: false
    }
  },
  created() {
    this.getList()
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
      this.$router.push({ path: '/ums/userBill', query: { id: row.id } })
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
      let tipCon1 = this.isFreezen
        ? '此操作将解冻该会员，是否继续'
        : '此操作将冻结该会员, 是否继续?'
      let tipCon2 = this.isFreezen ? '解冻成功!' : '冻结成功!'
      let tipCon3 = this.isFreezen ? '已取消解冻' : '已取消冻结'
      this.$confirm(tipCon1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.isFreezen = !this.isFreezen
          this.$message({
            type: 'success',
            message: tipCon2
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
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            level: '普通会员',
            status: '正常',
            balance: 20
          },
          {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            level: '普通会员',
            status: '冻结',
            balance: 20
          }
        ])
      }, 1000)
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      // fetchList(this.listQuery).then(data => {
      //     this.listLoading = false;
      //     this.list = data.info;
      //     this.total = data.totalnum;
      // });

      this.$http
        .post('sup/supList?format=json', this.listQuery)
        .then(data => {
          this.listLoading = false
          this.list = data.info
          this.total = data.totalnum
          console.log(this.$store.getters.roles[0])
          // if (!data.result) {
          //     this.bettings = data.info;
          // } else {
          //     Toast.fail(data.msg);
          // }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
