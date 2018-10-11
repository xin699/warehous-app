import router from './router'
import store from './store'
// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (JSON.parse(localStorage.getItem('accessToken')) || store.getters.token) { // 判断是否有token，从vuex中取出
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})
