import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/productAttribute/category/list',
    method:'post',
    data:params
  })
}

export function createProductAttrCate(data) {
  return request({
    url:'/productAttribute/category/create',
    method:'post',
    data:data
  })
}

export function deleteProductAttrCate(id) {
  return request({
    url:'/productAttribute/category/delete',
    method:'post',
    data:{id:id}
  })
}

export function updateProductAttrCate(id,data) {
  return request({
    url:'/productAttribute/category/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}
export function fetchListWithAttr() {
  return request({
    url:'/productAttribute/category/list/withAttr',
    method:'post',
    data:{}
  })
}
