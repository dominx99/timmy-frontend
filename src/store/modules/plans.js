import moment from 'moment'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    plans: [],
  },
  actions: {
    async loadByPeriod({ commit }, { startDate, endDate }) {
      try {
        let res = await window.axios({
          url: 'v1/plans/by/period',
          params: {
            startDate,
            endDate,
          }
        })

        commit("setPlans", res.data.data)
      } catch (e) {
        console.error(e)
      }
    },
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
    },
    async delete({ dispatch, commit }, planId) {
      try {
        await window.axios.delete(`v1/plans/${planId}`)

        commit("removePlanById", planId)
      } catch (e) {
        console.error(e)

        dispatch("toasts/error", e, { root: true })
      }
    }
  },
  mutations: {
    setPlans(state, plans) {
      Vue.set(state, "plans", [...plans])
    },
    clear(state) {
      Vue.set(state, "plans", [])
    },
    setMeasurements(state, { planId, measurements }) {
      let plan = state.plans.find(plan => plan.id === planId)

      if (! plan) {
        return
      }

      plan.measurements = measurements
    },
    removePlanById(state, planId) {
      let plan = state.plans.find(plan => plan.id === planId)

      state.plans.splice(state.plans.indexOf(plan), 1)
    }
  }
}
