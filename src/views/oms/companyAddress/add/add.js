import { regionData,CodeToText,TextToCode } from 'element-china-area-data';
const defaultAddress = {
    addressName: "",
    sendStatus: 0,
    receiveStatus: 0,
    name: "",
    phone: "",
    province: "",
    city: "",
    region: "",
    detailAddress: ""
};
export default {
    name: 'addressAdd',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
    },
    data() {
        const validateRegionData = (rule, value, callback) => {
            if (this.selectedOptions.length <= 0) {
                callback(new Error('请选择省市区'))
            } else {
                callback()
            }
        }; 
        return {
            address: Object.assign({}, defaultAddress),
            rules: {
                addressName: [{ required: true, trigger: 'blur', message: '请输入地址名称' }],
                name: [{ required: true, trigger: 'blur', message: '请输入收发货人姓名' }],
                phone: [{ required: true, trigger: 'blur', message: '请输入收发货人电话' }],
                detailAddress: [{ required: true, trigger: 'blur', message: '请输入详细地址' }],
                selectedOptions: [{required: true, trigger: 'change', validator: validateRegionData}],
            },
            options: regionData,
            selectedOptions: []
        }
    },
    created() {
        if (this.isEdit) {
            let data = { id: this.$route.query.id }
            this.$http.post("companyAddress/detail", data).then(data => {
                this.address = data.info;
                let code = TextToCode[this.address.province][this.address.city][this.address.region].code;
                let provide = code.substring(0,2) + "0000";
                let city = code.substring(0,4) + "00";
                this.selectedOptions = [provide, city, code];
            }).catch(error => {
                console.log(error);
            });
        }
    },
    methods: {
        handleChange (value) {
            console.log(this.selectedOptions);
        },
        onSubmit(formName) {
            if (this.selectedOptions.length == 1) {
                this.address.province = CodeToText[this.selectedOptions[0]];
            } else if (this.selectedOptions.length == 2) {
                this.address.province = CodeToText[this.selectedOptions[0]];
                this.address.city = CodeToText[this.selectedOptions[1]];
            } else if (this.selectedOptions.length == 3) {
                this.address.province = CodeToText[this.selectedOptions[0]];
                this.address.city = CodeToText[this.selectedOptions[1]];
                this.address.region = CodeToText[this.selectedOptions[2]];
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('是否提交数据', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.isEdit) {
                            this.$http.post("companyAddress/update/companyAddress", this.address).then(data => {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }).catch(error => {
                                console.log(error);
                            });
                        } else {
                            this.$http.post("companyAddress/insert", this.address).then(data => {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }).catch(error => {
                                console.log(error);
                            });
                        }
                    });
                } else {
                    this.$message({
                        message: '验证失败',
                        type: 'error',
                        duration: 1000
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.address = Object.assign({}, defaultAddress);
        },
    }
}