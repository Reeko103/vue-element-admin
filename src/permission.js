import router from './router'                     /// 路由
import store from './store'                       /// vuex store仓库
import { Message } from 'element-ui'              /// ui组件
import NProgress from 'nprogress'                 /// 进度条
import 'nprogress/nprogress.css'                  /// 进度条style
import { getToken } from '@/utils/auth'           /// 从cookie获取token
import getPageTitle from '@/utils/get-page-title' /// 设置页面标题

NProgress.configure({ showSpinner: false })       /// NProgress Configuration
const whiteList = ['/login', '/auth-redirect']    /// 白名单重定向

//// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  ///* to: Route: 即将要进入的目标 路由对象
  ///* from: Route: 当前导航正要离开的路由
  ///* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done() // 进度条结束 hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 注意：角色必须是对象数组！例如 ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          console.log(roles)
          // 基于角色生成可访问路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack方法以确保addRoutes是完整的
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

//// 全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
