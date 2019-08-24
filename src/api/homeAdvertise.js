import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/home/advertise/list',
    method:'post',
    data:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/home/advertise/update/status',
    method:'post',
    data:{...{id:id}, ...params}
  })
}
export function deleteHomeAdvertise(data) {
  return request({
    url:'/home/advertise/delete',
    method:'post',
    data:data
  })
}
export function createHomeAdvertise(data) {
  return request({
    url:'/home/advertise/create',
    method:'post',
    data:data
  })
}
export function getHomeAdvertise(id) {
  return request({
    url:'/home/advertise/info',
    method:'post',
    data:{id:id}
  })
}

export function updateHomeAdvertise(id,data) {
  return request({
    url:'/home/advertise/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}
