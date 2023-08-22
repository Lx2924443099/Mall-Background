import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] //设置登录页面为免登录页面

// 配置前置路由守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置页面的title，title在route里定义
  document.title = getPageTitle(to.meta.title)

  // 获取用户token信息
  const hasToken = getToken()

  // 判断用户token是否存在
  if (hasToken) {
    // 如果token存在且目标是登录页面，则定向到首页
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // token存在则查看vux中是否保存了name
      const hasGetUserInfo = store.getters.name
      // 保存了name则继续
      if (hasGetUserInfo) {
        next()
      } else {
        // 否则向后端发送请求，获取用户信息
        try {
          // 触发action
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // token不存在，判断前往的页面是否是不需要登陆的页面
    if (whiteList.indexOf(to.path) !== -1) {
      // 不需要登陆则直接跳转
      next()
    } else {
      // 否则重定向到登陆页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
