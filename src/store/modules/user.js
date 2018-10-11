import { loginByUsername, logout, getUserInfo } from '@/api/login'
import {
  getToken,
  setName,
  setToken,
  getName,
  removeToken,
  setUser,
  getUser,
  setUserId,
  getUserId,
  setThisUserId
} from '@/utils/auth'

const user = {
  state: {
    user: getUser(),
    status: getUserId(), // 用户类型
    code: '',
    token: getToken(),
    name: getName(),
    avatar: '',
    introduction: '',
    roles: [],
    thatRole: '', // 避免冲突用于判断
    taskId: '',
    setting: {
      points: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => { // 任务ID
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING_POINTS: (state, points) => {
      state.setting.points = points
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_AVATAR: (state, avatar) => { // 公司ID
      state.avatar = avatar
      localStorage.setItem('companyId', JSON.stringify(avatar))
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_THATROLE: (state, roles) => {
      state.thatRole = roles
    },
    SET_Task: (state, taskId) => {
      state.taskId = taskId
      localStorage.setItem('taskId', JSON.stringify(taskId))
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({commit}, userInfo) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const data = response.data
          if (data.code === 200) {
            commit('SET_TOKEN', data.accessToken)
            commit('SET_NAME', data.userTypeName)
            commit('SET_STATUS', data.userTypeId + '')
            commit('SET_USER', data.userName)
            setToken(data.accessToken)
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
            setUserId(data.userTypeId)
            setName(data.userTypeName)
            setUser(data.userName)
            setThisUserId(data.userId)
          }

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_STATUS', '')
          localStorage.removeItem('companyId')
          localStorage.removeItem('taskId')
          localStorage.clear()
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles ({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
