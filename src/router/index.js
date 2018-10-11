import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['../components/home/home'], resolve)
    },
    {
      path: '/task',
      name: 'task',
      component: resolve => require(['../components/task/task'], resolve)
    },
    {
      path: '/company',
      name: 'company',
      component: resolve => require(['../components/company/company'], resolve)
    },
    {
      path: '/',
      redirect: '/task'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/login/login'], resolve)
    },
    {
      path: '/warehousing',
      component: resolve => require(['../view/warehousing'], resolve)
    },
    {
      path: '/scan',
      name: 'scan',
      component: resolve => require(['../view/scan'], resolve)
    },
    {
      path: '/warehousing/warehousing01',
      component: resolve => require(['../view/inhousing/warehousing01'], resolve)
    },
    {
      path: '/warehousing/warehousing02',
      component: resolve => require(['../view/outhousing/warehousing02'], resolve)
    },
    {
      path: '/warehousing/warehousing03',
      component: resolve => require(['../view/inforhousing/warehousing02'], resolve)
    },
    {
      path: '/warehousing/warehousing04',
      component: resolve => require(['../view/mousehousing/warehousing02'], resolve)
    },
    {
      path: '/warehousing/warehousing05',
      component: resolve => require(['../view/machining/warehousing02'], resolve)
    },
    {
      path: '/warehousing/warehousing06',
      component: resolve => require(['../view/checkhousing/warehousing02'], resolve)
    },
    {
      path: '/warehousing/warehousing07',
      component: resolve => require(['../view/transport/warehousing02'], resolve)
    }
  ]
})
