import moment from 'moment'

export default {
  namespaced: true,
  state: {
    now: "1970-01-01 00:00:00",
  },
  actions: {
    async fetch({ commit }) {
      try {
        let res = await window.axios.get("v1/time/now")

        commit("setActualTime", res.data.data)
      } catch (e) {
        console.error("Could not fetch actual server time")
      }
    },
  },
  mutations: {
    setActualTime(state, time) {
      state.now = time
    },
    addSecond(state) {
      state.now = moment(state.now).add(1, "seconds").format("YYYY-MM-DD HH:mm:ss")
    }
  }
}
