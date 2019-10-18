import axios from 'axios'
import sync from '@/utils/sync'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, getRole } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 40000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  if (!config.params) {
    config.params = { format: 'json', token: getToken() }
  } else {
    config.params = { ...{ format: 'json', token: getToken() }, ...config.params }
  }

  if (config.headers['Content-Type'].includes('application/json')) {
    if (!config.data) {
      config.data = { format: 'json', token: getToken() }
    } else {
      config.data = { ...{ format: 'json', token: getToken() }, ...config.data }
    }
  }
  
  console.log("roles:" + getRole())
  console.log("token:" + getToken())
  config.data.token = getToken();
  config.data.role = getRole();
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
        message: '错误码:' + res.errcode + '，' + res.msg,
        type: 'error',
        duration: 3 * 1000
      })

      sync.disconnect()

      // 401:未登录;
      if (res.errcode === 101 || res.errcode === 999) {
        MessageBox.confirm('ErrCode:' + res.errcode + '；你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
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
      if (res.hasOwnProperty('result')) return res.data
      else return res
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
