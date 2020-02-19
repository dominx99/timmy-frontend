export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async get ({ commit }) {
      let response = await window.axios.get('api/user')

      commit('setUser', response.data.data)
    },
  },
  mutations: {
    setUser (state, user) {
      state.user.id = user.id;
      state.user.email = user.email;
    },
  }
}
