import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getRole, setRole, removeRole } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: getRole()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.role).then(data => {
          const resp = data.info;
          const tokenStr = resp.token;
          const roleStr = resp.roles;
          setToken(tokenStr);
          setRole(roleStr);
          commit('SET_TOKEN', tokenStr)
          commit('SET_ROLES', roleStr)
          commit('SET_AVATAR', resp.icon)
          commit('SET_NAME', resp.username)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(data => {
          //commit('SET_ROLES', data.info.roles)
          //commit('SET_NAME', data.info.username)
          //commit('SET_AVATAR', data.info.icon)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          removeToken()
          removeRole()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeRole()
        resolve()
      })
    }
  }
}

export default user
