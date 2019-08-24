import request from '@/utils/request'

export function login(username, password, role) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password,
      role
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
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
