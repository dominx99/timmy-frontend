export default {
  namespaced: true,
  actions: {
    async start(_, planId) {
      await window.axios.post(`v1/measurements/${planId}/start`)
    },
    async stop(_, planId) {
      await window.axios.post(`v1/measurements/${planId}/stop`)
    }
  }
}
