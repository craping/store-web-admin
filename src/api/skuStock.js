import request from '@/utils/request'
export function fetchList(pid,params) {
  return request({
    url:'sku/list',
    method:'post',
    data:{...{pid:pid}, ...params}
  })
}

export function update(pid,skuStockList) {
  return request({
    url:'sku/update',
    method:'post',
    data:{
      pid:pid,
      skuStockList:skuStockList
    }
  })
}
