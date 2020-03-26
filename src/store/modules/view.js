import moment from 'moment'

export default {
  namespaced: true,
  state: {
    activePeriod: {
      startDate: "",
      endDate: ""
    },
    activeStep: "days"
  },
  actions: {
    setActivePeriod({ commit, state }, step) {
      commit("setActivePeriod", {
        startDate: moment(state.activePeriod.startDate).startOf(step).format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment(state.activePeriod.startDate).endOf(step).format("YYYY-MM-DD HH:mm:ss")
      })
    },
    next({ commit, state }) {
      let period = {}

      period.startDate = moment(state.activePeriod.startDate).add(1, state.activeStep).format("YYYY-MM-DD HH:mm:ss")
      period.endDate = moment(state.activePeriod.endDate).add(1, state.activeStep).format("YYYY-MM-DD HH:mm:ss")

      commit("setActivePeriod", period)
    },
    previous({ commit, state }) {
      let period = {}

      period.startDate = moment(state.activePeriod.startDate).subtract(1, state.activeStep).format("YYYY-MM-DD HH:mm:ss")
      period.endDate = moment(state.activePeriod.endDate).subtract(1, state.activeStep).format("YYYY-MM-DD HH:mm:ss")

      commit("setActivePeriod", period)
    }
  },
  mutations: {
    setActivePeriod(state, { startDate, endDate }) {
      state.activePeriod.startDate = startDate
      state.activePeriod.endDate = endDate
    },
    setActiveStep(state, step) {
      state.activeStep = step
    },
  },
  getters: {
    title: state => {
      let sameDay = (startDate, endDate) => {
        return moment(startDate).isSame(endDate, "day")
      }

      if (sameDay(state.activePeriod.startDate, state.activePeriod.endDate)) {
        return moment(state.activePeriod.startDate).calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tommorow]",
          lastDay: '[Yesterday]',
          tuesday: "[Tuesday]",
          nextWeek : 'dddd',
          lastWeek: '[Last] dddd',
        })
      }

      return moment(state.activePeriod.startDate).format("YYYY-MM-DD") + "<br/>" +
        moment(state.activePeriod.endDate).format("YYYY-MM-DD")
    },
  }
}
