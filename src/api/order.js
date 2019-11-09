import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/order/list',
    method:'post',
    data:params
  })
}

export function getSupList() {
  return request({
    url:'/sup/querySupList',
    method:'post',
    data:{}
  })
}

export function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'post',
    data:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/order/delete',
    method:'post',
    data:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'post',
    data:{
      deliveryParamList:data
    }
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/order/detail',
    method:'post',
    data:{id}
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/order/update/updateNote',
    method:'post',
    data:params
  })
}
