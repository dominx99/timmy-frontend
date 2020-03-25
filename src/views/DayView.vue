<template>
  <div class="min-h-screen bg-gradient-purple-blue text-white">
    <Toasts/>
    <CreatePlanModal/>
    <CreateTimeMeterModal/>
    <Navigation :title="title"/>
    <div class="container ml-auto mr-auto">
      <PlansList v-if="! emptyPlans()"/>
      <PlansNotFound v-else/>
    </div>
    <PlansFloatingButton />
  </div>
</template>

<script>
import Toasts from './../components/Toasts/Toasts'
import Navigation from './../components/Navigation'
import PlansList from './../components/Plans/PlansList'
import PlansFloatingButton from './../components/Plans/PlansFloatingButton'
import PlansNotFound from './../components/Plans/PlansNotFound'
import CreatePlanModal from './../components/Plans/CreatePlanModal'
import CreateTimeMeterModal from './../components/TimeMeters/CreateTimeMeterModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navigation,
    PlansList,
    PlansFloatingButton,
    PlansNotFound,
    CreatePlanModal,
    CreateTimeMeterModal,
    Toasts
  },
  computed: {
    ...mapGetters('view', ['title']),
    period() {
      return this.$store.state.view.activePeriod
    },
    step() {
      return this.$store.state.view.activeStep
    },
  },
  mounted() {
    console.log("env", process.env)
    this.configureServerTime()
    this.configureActivePeriod()
    this.configureActiveStep()

    this.$store.dispatch("plans/loadByPeriod", this.period)
  },
  methods: {
    emptyPlans() {
      return this.$store.state.plans.plans <= 0
    },
    sameDay(startDate, endDate) {
      return this.$moment(startDate).isSame((this.$moment(endDate)).format("YYYY-MM-DD HH:mm:ss"), "day")
    },
    configureServerTime() {
      this.$store.dispatch("time/fetch")
      setInterval(() => this.$store.commit("time/addSecond"), 1000)
    },
    configureActivePeriod() {
      let startDate = this.$moment().startOf("day")
      let endDate = this.$moment().endOf("day")

      this.$store.commit("view/setActivePeriod", {
        startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
        endDate: endDate.format("YYYY-MM-DD HH:mm:ss")
      })
    },
    configureActiveStep() {
      this.$store.commit("view/setActiveStep", "days")
    }
  }
}
</script>
