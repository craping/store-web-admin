import request from '@/utils/request'

export function login(username, password, userrole) {
  return request({
    url: '/umscm/login',
    method: 'post',
    data: {
      username,
      password,
      userrole
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

export function logout(token, role) {
  return request({
    url: '/umscm/logout',
    method: 'post',
    data: {}
  })
}
