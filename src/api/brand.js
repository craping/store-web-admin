import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/brand/list',
    method:'post',
    data:params
  })
}
export function createBrand(data) {
  return request({
    url:'/brand/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/brand/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/brand/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteBrand(id) {
  return request({
    url:'/brand/delete',
    method:'post',
    data:{id:id}
  })
}

export function getBrand(id) {
  return request({
    url:'/brand/info',
    method:'post',
    data:{id:id}
  })
}

export function updateBrand(id,data) {
  return request({
    url:'/brand/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}

