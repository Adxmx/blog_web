import qs from 'qs'

import { message } from 'ant-design-vue'

import axios from 'axios'

import store from '@/store/index.js'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BLOG_SERVER_API,
  timeout: 6000,
  paramsSerializer: {
    serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求头添加token
    config.headers['token'] = store.state.user.token
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code === 20000) {
      // message.success(response.data.msg)
      return Promise.resolve(response.data)
    } else if (response.data.code === 40001) {
      // message.warning(response.data.msg)
      store.dispatch('logout')
      return Promise.reject(response.data)
    } else {
      // message.warning(response.data.msg)
      return Promise.reject(response.data)
    }
  },
  error => {
    message.error('发生未知错误！')
    return Promise.reject(error.data)
  }
)

export default service