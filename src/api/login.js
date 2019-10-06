import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password,
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'post',
    data: {}
  })
}

export function logout(token, role) {
  return request({
    url: '/admin/logout',
    method: 'post',
    data: {}
  })
}
