// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import px2rem from './utils/rem'
import './permission'
import Mui from 'vue-awesome-mui'
import('babel-polyfill')

Vue.config.productionTip = false

Vue.use(Mui)
Vue.use(MintUI)
Vue.use(px2rem)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
