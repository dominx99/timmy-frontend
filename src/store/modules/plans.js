import moment from 'moment'

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
      } catch (e) {
        console.error(e)
      }
    },
    async add({ dispatch }, params) {
      try {
        await window.axios.post('v1/plans', params)

        dispatch("loadByDate", moment().format("YYYY-MM-DD HH:mm:ss"))
        dispatch("toasts/success", "Successfuly created plan.", { root: true })
      } catch (e) {
        console.error(e)

        dispatch("toasts/error", e, { root: true })
      }
    },
    async fetchMeasurements({ dispatch, commit }, planId) {
      try {
        let measurementsRes = await window.axios.get(`v1/plans/${planId}/measurements`)
        let measurements = measurementsRes.data.data

        commit("setMeasurements", { planId, measurements })
      } catch (e) {
        console.error(e)

        dispatch("toasts/error", e, { root: true })
      }
    }
  },
  mutations: {
    setPlans (state, plans) {
      state.plans = plans
    },
    setMeasurements(state, { planId, measurements }) {
      let plan = state.plans.find(plan => plan.id === planId)

      if (! plan) {
        return
      }

      plan.measurements = measurements
    }
  }
}
