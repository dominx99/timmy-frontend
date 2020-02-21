export default {
  namespaced: true,
  state: {
    plans: [],
  },
  actions: {
    async loadByDay({ commit }, day) {
      try {
        let res = await window.axios.get('v1/plans/by/day', { date: day })

        commit("setPlans", res.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    add(_, params) {
      console.log("params", params)

      try {
        window.axios.post('v1/plans', params)
      } catch (e) {
        console.error(e)
      }
    }
  },
  mutations: {
    setPlans (state, plans) {
      state.plans = plans
    },
  }
}
