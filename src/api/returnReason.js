import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/returnReason/list',
    method:'post',
    data:params
  })
}

export function deleteReason(params) {
  return request({
    url:'/returnReason/delete',
    method:'post',
    data:params
  })
}

export function updateStatus(params) {
  return request({
    url:'/returnReason/update/updateStatus',
    method:'post',
    data:params
  })
}

export function addReason(data) {
  return request({
    url:'/returnReason/create',
    method:'post',
    data:data
  })
}

export function getReasonDetail(id) {
  return request({
    url:'/returnReason/getItem',
    method:'post',
    data:{
      id:id
    }
  })
}

export function updateReason(id,data) {
  return request({
    url:'/returnReason/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}
