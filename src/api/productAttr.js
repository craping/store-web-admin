import request from '@/utils/request'
export function fetchList(cid,params) {
  return request({
    url:'productAttribute/list',
    method:'post',
    data:{...{cid:cid}, ...params}
  })
}

export function deleteProductAttr(data) {
  return request({
    url:'productAttribute/delete',
    method:'post',
    data:data
  })
}

export function createProductAttr(data) {
  return request({
    url:'productAttribute/create',
    method:'post',
    data:data
  })
}

export function updateProductAttr(id,data) {
  return request({
    url:'productAttribute/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}
export function getProductAttr(id) {
  return request({
    url:'productAttribute/info',
    method:'post',
    data:{id:id}
  })
}

export function getProductAttrInfo(productCategoryId) {
  return request({
    url:'productAttribute/attrInfo',
    method:'post',
    data:{productCategoryId:productCategoryId}
  })
}
