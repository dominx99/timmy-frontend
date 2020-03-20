import moment from 'moment';

export default {
  namespaced: true,
  state: {
    toasts: []
  },
  actions: {
    success({ dispatch }, message) {
      dispatch("add", {
        type: "success",
        lifetime: moment().add(8, 'seconds'),
        message: message
      })
    },
    danger({ dispatch }, message) {
      dispatch("add", {
        type: "danger",
        lifetime: moment().add(8, 'seconds'),
        message: message
      })
    },
    error({ dispatch }, e) {
      if (typeof e.response === "undefined") {
        return
      }

      if (typeof e.response.data.error === "undefined") {
        return
      }

      dispatch("danger", e.response.data.error)
    },
    add({ commit }, toast) {
      commit("addToast", Object.assign({}, toast, {
        id: Math.random().toString(36).substr(2, 9),
      }))

      setInterval(() => {
        commit("removeExpired")
      }, 500)
    },
  },
  mutations: {
    addToast(state, toast) {
      state.toasts.unshift(toast)
    },
    removeExpired(state) {
      state.toasts = state.toasts.filter(toast => {
        return toast.lifetime > moment()
      })
    }
  }
}
