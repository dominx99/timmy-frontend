export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('access_token') || ''
  },
  actions: {
    login(context, params) {
      return window.axios.post('v1/auth/login', {
        email: params.email,
        password: params.password,
        grant_type: "credentials"
      })
    },
    register(context, params) {
      return window.axios.post('v1/auth/register', {
        email: params.email,
        password: params.password
      })
    }
  }
}
