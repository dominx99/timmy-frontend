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

        commit('setPlans', [
          {
            timeMeter: {
              name: "Work"
            }
          },
          {
            timeMeter: {
              name: "Learning"
            }
          },
          {
            timeMeter: {
              name: "Dirty dishes"
            }
          },
          {
            timeMeter: {
              name: "Lightning"
            }
          }
        ])
      }
    },
  },
  mutations: {
    setPlans (state, plans) {
      state.plans = plans
    },
  }
}
