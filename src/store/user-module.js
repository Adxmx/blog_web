import router from '@/router/router-generate.js'

import { getUserAPI } from '@/api/admin/user.js'
import { setUser, clearUser } from '@/utils/store.js'

export default {

  state: {
    id: '',
    token: '',
    nickname: '',
    username: '',
    avatar: ''
  },

  actions: {
    // 用户登录
    login: (context, token) => {
      context.commit('LOGIN', token)
      // 将用户token存储带localStorage中
      localStorage.setItem('token', token)
      getUserAPI().then(response => {
        const user = response.data.user
        context.commit('INFO', user)
        // 将用户信息存储到localStorage中
        setUser(user)
        // 路由跳转至登录首页
        router.push({name: 'admin-dashboard'})
      })
    },
    // 用户注销
    logout: (context) => {
      context.commit('LOGOUT')
      // 清除localStorage中的用户信息
      clearUser()
      // 路由跳转至登录页
      router.push({ name: 'admin-login' })
    }
  },

  mutations: {
    // 存储token
    LOGIN: (state, token) => {
      state.token = token
    },
    // 存储用户信息
    INFO: (state, user) => {
      state.id = user.id
      state.nickname = user.nickname
      state.username = user.username
      state.avatar = user.avatar
    },
    LOGOUT: (state) => {
      state.id = ''
      state.token = ''
      state.nickname = ''
      state.username = ''
      state.avatar = ''
    }
  }

}
