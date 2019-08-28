import request from '@/utils/request'

export function login(username, password, role) {
  return request({
    url: '/umscm/login',
    method: 'post',
    data: {
      username,
      password,
      role
    }
  })
}

export function getInfo() {
  return request({
    url: '/umscm/info',
    method: 'post',
    data: {}
  })
}

export function logout(token) {
  return request({
    url: '/umscm/logout',
    method: 'post',
    data: {
      token
    }
  })
}
