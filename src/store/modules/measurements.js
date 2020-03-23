export default {
  namespaced: true,
  actions: {
    async start({ dispatch }, planId) {
      try {
        await window.axios.post(`v1/measurements/${planId}/start`)
      } catch(e) {
        dispatch("toasts/error", e, { root: true })

        return false
      }

      return true
    },
    async stop({ dispatch }, planId) {
      try {
        await window.axios.post(`v1/measurements/${planId}/stop`)
      } catch(e) {
        dispatch("toasts/error", e, { root: true })

        return false
      }

      return true
    }
  }
}
