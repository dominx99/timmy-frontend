export default {
  namespaced: true,
  state: {
    timeMeters: [],
  },
  actions: {
    async get({ commit }) {
      try {
        let res = await window.axios.get("v1/time-meters")

        commit("setTimeMeters", res.data.data)
      } catch (e) {
        console.error(e)
      }
    }
  },
  mutations: {
    setTimeMeters(state, timeMeters) {
      state.timeMeters = timeMeters
    }
  }
}
