<template>
  <div class="card">
    <div class="ml-8 mr-3 flex items-center justify-center">
      <button
        @click="toggle()"
        class="flex justify-center items-center shadow-md"
        style="width: 50px; height: 50px; border-radius: 100%;"
      >
        <d-svg
          v-show="played === true"
          style="width: 30%"
          icon="pause"
          class="fill-current text-white"
        />
        <d-svg
          v-show="played === false"
          style="width: 30%"
          icon="play"
          class="fill-current text-white"
        >
        </d-svg>
      </button>
    </div>
    <div class="w-full p-5">
      <div v-text="plan.timeMeter.name"></div>
      <div class="text-sm text-gray-200" v-text="time(plan.minTime)"></div>
      <div class="text-sm text-gray-200" v-text="ends()"></div>
    </div>
  </div>
</template>

<script>
import DSvg from './../DSvg'
import Vue from 'vue'

export default {
  props: ["plan"],
  components: {
    "d-svg": DSvg,
  },
  data() {
    return {
      played: false,
    }
  },
  methods: {
    toggle() {
      if (this.played) {
        this.$store.dispatch("measurements/stop", this.plan.id)
      } else {
        this.$store.dispatch("measurements/start", this.plan.id)
      }

      Vue.set(this, "played", ! this.played)
    },
    ends() {
      return "Ends " + this.$moment(this.plan.endDate).format("DD/MM/YY")
    },
    time(time) {
      return this.$moment()
        .startOf("day")
        .seconds(time)
        .format("HH:mm:ss")
    }
  }
}
</script>

<style lang="scss">
.card {
  @apply flex flex-row bg-blue-600 mb-5 rounded shadow-xl mx-5;

  @screen md {
    @apply mb-10;
    width: calc(theme("width.1/2") - theme("margin.10"));
  }

  @screen xl {
    width: calc(theme("width.1/3") - theme("margin.10"));
  }
}
</style>
