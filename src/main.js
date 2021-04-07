import Vue from 'vue'
import Cookies from 'js-cookie'             /// cookie
import 'normalize.css/normalize.css'        /// CSS重置的现代替代方案
import Element from 'element-ui'            /// ui组件
import './styles/element-variables.scss'    /// ui组件css
import '@/styles/index.scss'                /// 全局css
import App from './App'
import store from './store'                 /// vuex store仓库
import router from './router'               /// 路由

import i18n from './lang'                   /// 国际化
import './icons'                            /// 图标
import './permission'                       /// 权限控制
import './utils/error-log'                  /// 错误日志

import * as filters from './filters'        /// 全局筛选器

/**
 * 如果你不想使用模拟服务器
 * 您想将MockJs用于mock api
 * 可以执行：mockXHR()
 * 目前MockJs将用于生产环境，
 * 请在上线前删除！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // 设置元素ui默认大小
  i18n: (key, value) => i18n.t(key, value)
})

//// 注册全局实用程序筛选器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 消息提示的环境配置，是否为生产环境：
// false 开发环境 ：Vue会提供很多警告来方便调试。
// true 生产环境 ：警告却没有用，反而会增加应用的体积
Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV) //开发环境 development, 生产环境 production

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
