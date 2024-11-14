// 引入路由器配置相关
import { createRouter, createWebHistory} from 'vue-router'
// 引入跳转路由配置
import guestRoutes from './guest-route-config.js'
import adminRoutes from './admin-route-config.js'
// 引入vuex中的数据
import store from '@/store/index.js'

import { getUser } from '@/utils/store.js'

const router = createRouter({
  // hash模式(#)
  history: createWebHistory(),
  // 路由导航
  routes: guestRoutes.concat(adminRoutes)
})

// 路由前置守卫
router.beforeEach(async (to) => {
  // 设置网页标题
  window.document.title = to.meta.title
  // 判断拦截路由
  // 游客路由放行
  if (to.name.includes('guest')) {
    return true
  } else if (to.name.includes('admin')) {
    // 获取token
    const token = getToken()
    if (token) {
      // 用户登录(若去登录页则跳转主页，其他则则放行)
      if (to.name === 'admin-login') {
        return { name:'admin-dashboard' }
      } else {
        return true
      }
    } else {
      // 用户未登录(若去登录页则放行，其他跳转登录页)
      if (to.name === 'admin-login') {
        return true
      } else {
        return { name: 'admin-login' }
      }
    }
  }
})

// 获取token
const getToken = () => {
  let token = ''
  if (store.state.user.token) {
    token = store.state.user.token
  } else if (window.localStorage.getItem('token')) {
    store.state.user = getUser()
    token = store.state.user.token
  } else {
    token = null
  }
  return token
}

export default router