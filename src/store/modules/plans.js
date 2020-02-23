export default {
  namespaced: true,
  state: {
    plans: [],
  },
  actions: {
    async loadByDate({ commit }, date) {
      try {
        let res = await window.axios({
          url: 'v1/plans/by/date',
          params: {
            date: date
          }
        })

        commit("setPlans", res.data.data)
        console.log(res.data.data)
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
