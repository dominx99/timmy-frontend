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
    }
  },
  mutations: {
    setPlans (state, plans) {
      state.plans = plans
    },
  }
}
