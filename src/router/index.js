import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../components/home/home'], resolve)
    },
    {
      path: '/warehousing',
      name: 'warehousing',
      component: resolve => require(['../view/warehousing/warehousing'], resolve)
    }
  ]
})
