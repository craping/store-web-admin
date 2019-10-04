import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/returnApply/list',
    method:'post',
    data:params
  })
}

export function deleteApply(params) {
  return request({
    url:'/returnApply/delete',
    method:'post',
    data:params
  })
}
export function updateApplyStatus(id,data) {
  return request({
    url:'/returnApply/update/updateStatus',
    method:'post',
    data:{...{id:id}, ...data}
  })
}

export function getApplyDetail(id) {
  return request({
    url:'/returnApply/getItem',
    method:'post',
    data:{id:id}
  })
}
