<template>
  <div class="flex flex-col md:flex-row md:flex-wrap">
    <Plan v-for="(plan, index) of plans" v-bind:key="index" :plan="plan"/>
  </div>
</template>

<script>
import Plan from './Plan'

export default {
  components: {
    Plan
  },
  computed: {
    plans() {
      return this.$store.state.plans.plans
    }
  },
}
</script>
