import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/subject/listAll',
    method:'post',
    data:{}
  })
}

export function fetchList(params) {
  return request({
    url:'/subject/list',
    method:'post',
    data:params
  })
}
