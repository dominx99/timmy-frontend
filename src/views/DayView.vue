<template>
  <div class="min-h-screen bg-gradient-purple-blue text-white">
    <CreatePlanModal/>
    <Navigation :title="date"/>
    <div class="container ml-auto mr-auto">
      <PlansList/>
    </div>
    <PlansFloatingButton />
  </div>
</template>

<script>
import Navigation from './../components/Navigation'
import PlansList from './../components/Plans/PlansList'
import PlansFloatingButton from './../components/Plans/PlansFloatingButton'
import CreatePlanModal from './../components/Plans/CreatePlanModal'

export default {
  components: {
    Navigation,
    PlansList,
    PlansFloatingButton,
    CreatePlanModal
  },
  data () {
    return {
      date: ""
    }
  },
  mounted() {
    this.date = this.$moment().calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tommorow]"
    })
    this.$store.dispatch("plans/loadByDay", this.$moment().format("YYYY-MM-DD"))
  },
}
</script>
