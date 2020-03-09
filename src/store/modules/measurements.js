export default {
  namespaced: true,
  actions: {
    start(_, planId) {
      window.axios.post(`v1/measurements/${planId}/start`)
    },
    stop(_, planId) {
      window.axios.post(`v1/measurements/${planId}/stop`)
    }
  }
}
