import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'ams/level/list',
    method:'post',
    data:data
  })
}

export function create(data) {
  return request({
    url:'ams/level/create',
    method:'post',
    data:data
  })
}

export function get(data) {
  return request({
    url:'ams/level/info',
    method:'post',
    data:data
  })
}

export function update(data) {
  return request({
    url:'ams/level/update',
    method:'post',
    data:data
  })
}

export function remove(data) {
  return request({
    url:'ams/level/delete',
    method:'post',
    data:data
  })
}