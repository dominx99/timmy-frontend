import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import user from './modules/user'
import timeMeters from './modules/time-meters'
import plans from './modules/plans'
import toasts from './modules/toasts'
import measurements from './modules/measurements'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    timeMeters,
    plans,
    toasts,
    measurements
  }
})

export default store;
