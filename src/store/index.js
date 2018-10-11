import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import scan from './modules/scan'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    scan
  },
  getters
  // plugins: [createPersistedState({ storage: window.sessionStorage })]
})

export default store
