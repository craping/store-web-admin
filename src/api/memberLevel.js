import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/memberLevel/list',
    method:'post',
    data:params
  })
}
