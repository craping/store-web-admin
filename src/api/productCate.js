import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/productCategory/list',
    method:'post',
    data:{...{parentId:parentId}, ...params}
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/productCategory/delete',
    method:'post',
    data:{id:id}
  })
}

export function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/productCategory/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}

export function getProductCate(id) {
  return request({
    url:'/productCategory/info',
    method:'post',
    data:{id:id}
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'post',
    data:{}
  })
}
