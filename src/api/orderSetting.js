import request from '@/utils/request'
export function getOrderSetting(id) {
  return request({
    url:'/orderSetting/getItem',
    method:'post',
    data:{
      id:id
    }
  })
}

export function updateOrderSetting(id,data) {
  return request({
    url:'/orderSetting/update',
    method:'post',
    data:{...{id:id}, ...data}
  })
}
