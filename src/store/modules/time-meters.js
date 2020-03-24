export default {
  namespaced: true,
  state: {
    timeMeters: [],
  },
  actions: {
    async add({ dispatch }, { name }) {
      try {
        await window.axios.post("v1/time-meters", {
          name: name
        })
      } catch (e) {
        dispatch("toasts/error", e, { root: true })
      }
    },
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
