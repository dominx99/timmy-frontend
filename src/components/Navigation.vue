<template>
  <nav class="mb-6">
    <div class="container ml-auto mr-auto p-5 flex justify-between items-center">
      <button @click="previous()">
        <Dsvg class="white fill-current" style="width: 30px;" icon="left-arrow" />
      </button>
      <div class="text-2xl" v-text="title"></div>
      <button @click="setStep('day')">Day</button>
      <button @click="setStep('week')">Week</button>
      <button @click="setStep('month')">Month</button>
      <button @click="next()">
        <Dsvg class="white fill-current" style="width: 30px;" icon="right-arrow" />
      </button>
    </div>
  </nav>
</template>

<script>
import Dsvg from '../components/DSvg'

export default {
  props: ["title"],
  components: {
    Dsvg
  },
  computed: {
    period() {
      return this.$store.state.view.activePeriod
    }
  },
  methods: {
    previous() {
      this.$store.dispatch("view/previous")
      this.$store.commit("plans/clear")
      this.$store.dispatch("plans/loadByPeriod", this.period)
    },
    next() {
      this.$store.dispatch("view/next")
      this.$store.commit("plans/clear")
      this.$store.dispatch("plans/loadByPeriod", this.period)
    },
    setStep(step) {
      this.$store.dispatch("view/setActivePeriod", step)
      this.$store.commit("view/setActiveStep", `${step}s`)
      this.$store.dispatch("plans/loadByPeriod", this.period)
    },
  }
}
</script>
