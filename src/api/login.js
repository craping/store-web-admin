import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login?format=json',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info?format=json',
    method: 'post',
    data: {
      token
    }
  })
}

export function logout(token) {
  return request({
    url: '/admin/logout',
    method: 'post',
    data: {
      token
    }
  })
}
