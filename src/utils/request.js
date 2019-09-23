import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  if (!config.params || !config.params.format){
    config.params = { ...config.params, format: 'json' };
  }
    
  console.log("token:" + getToken())
  config.data.token = getToken();
  config.data.role = store.getters.roles;
  console.log(store.getters.roles)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.errcode) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.errcode === 401 || res.errcode === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
