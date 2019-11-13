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
            num: 0,
            currentClientMethods: [],
            settings: {},
            balanceList: [],
	        wxpayList: [],
	        alipayList: [],
            unionpayList: [],
            //--------
            balanceCheck: [],
	        wxpayCheck: [],
	        alipayCheck: [],
            unionpayCheck: [],
            //--------
            settingTableTabsVal: 'APP',
            settingTableTabs:[
                {
                    name: 'APP',
                    icon: 'iphone',
                    title: 'APP （客户端）'
                },
                {
                    name: 'WAP',
                    icon: 'browser',
                    title: 'WAP （H5手机游览器）'
                },
                {
                    name: 'WX',
                    icon: 'wechat',
                    title: 'WX（微信内置游览器）'
                }
            ],

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
            ischecked: false,
        }
    },
    created() {
        this.methodSettings();
        this.initSetting();
        
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
        methodSettings() {
            this.$http.post("payChannelMethod/methodSettings", {}).then(data => {
                this.settings = data.info;
                this.balanceList = this.settings.balanceList;
                this.alipayList = this.settings.alipayList;
                this.wxpayList = this.settings.wxpayList;
                this.unionpayList = this.settings.unionpayList;
            }).catch(error => {
                console.log(error);
            });
        },
        initSetting() {
            this.$http.post("payClientMethod/list", {clientId: this.settingTableTabsVal}).then(data => {
               this.currentClientMethods = data.info;
               
               this.setListChecked(this.balanceList,this.balanceCheck);
               this.setListChecked(this.wxpayList,this.wxpayCheck);
               this.setListChecked(this.alipayList,this.alipayCheck);
               this.setListChecked(this.unionpayList,this.unionpayCheck);
               console.log('this.balanceList',this.balanceList)
               console.log("1:" + this.currentClientMethods.length);
            }).catch(error => {
                console.log(error);
            });
        },
        setListChecked(list,newList){
            let current = this.currentClientMethods;
            for(let i =0;i<list.length;i++){
                for(let j=0;j<current.length;j++){
                    if(list[i].methodId == current[j].methodId){
                        newList.push(current[j].methodId)
                    }
                }
            }
        },
        isChecked(methodId) {
            console.log("2:" + this.currentClientMethods.length);
            if (this.currentClientMethods.length > 0)
                this.ischecked = true;
            
        },
        handleAddChannel() {
            alert(this.isChecked(4));
            console.log(this.balanceCheck);
        },
        showClientMethod() {
            alert(this.isChecked(4));
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
        }
    }
}