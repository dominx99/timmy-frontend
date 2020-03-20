<template>
  <div class="min-h-screen bg-gradient-purple-blue text-white">
    <Toasts/>
    <CreatePlanModal/>
    <Navigation :title="date"/>
    <div class="container ml-auto mr-auto">
      <PlansList/>
    </div>
    <PlansFloatingButton />
  </div>
</template>

<script>
import Toasts from './../components/Toasts/Toasts'
import Navigation from './../components/Navigation'
import PlansList from './../components/Plans/PlansList'
import PlansFloatingButton from './../components/Plans/PlansFloatingButton'
import CreatePlanModal from './../components/Plans/CreatePlanModal'

export default {
  components: {
    Navigation,
    PlansList,
    PlansFloatingButton,
    CreatePlanModal,
    Toasts
  },
  data () {
    return {
      date: ""
    }
  },
  mounted() {
    this.$store.dispatch("time/fetch")
    setInterval(() => this.$store.commit("time/addSecond"), 1000)

    this.date = this.$moment().calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tommorow]"
    })
    this.$store.dispatch("plans/loadByDate", this.$moment().format("YYYY-MM-DD HH:mm:ss"))
  },
}
</script>
