<template> 
  <div>
    <el-upload
      action="http://store-images.oss-cn-shenzhen.aliyuncs.com"
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'
  import {UUID} from '@/utils'

  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          url:''
        },
        dialogVisible: false,
        dialogImageUrl:null
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      beforeUpload(file) {
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(data => {
            _self.dataObj.policy = data.info.policy;
            _self.dataObj.signature = data.info.signature;
            _self.dataObj.ossaccessKeyId = data.info.accessKeyId;
            _self.dataObj.key = data.info.dir + "/"+UUID()+"."+file.name.split(".")[1];//'/${filename}';
            _self.dataObj.dir = data.info.dir;
            _self.dataObj.host = data.info.host;
            _self.dataObj.url = _self.dataObj.host +"/"+ _self.dataObj.key;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        this.fileList.push({name: file.name,url:this.dataObj.url});
        this.emitInput(this.fileList);
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


