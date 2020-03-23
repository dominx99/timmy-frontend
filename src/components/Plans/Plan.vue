<template>
  <div :class="cardClass()">
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
      <div class="text-sm text-gray-200" v-text="passedTime"></div>
      <div class="text-sm text-gray-200" v-text="period()"></div>
      <div class="text-sm text-gray-200" v-text="duration()"></div>
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
      passedTime: "00:00:00",
      passedTimeInterval: null,
      disabled: false
    }
  },
  computed: {
    now() {
      return this.$store.state.time.now
    },
  },
  mounted() {
    this.setDisabled()
    this.setPlayed()
    this.updatePassedTime()
    if (this.played) {
      this.scheduleUpdatePassedTime()
    }
  },
  methods: {
    setDisabled() {
      this.disabled = this.$moment(this.now).isAfter(this.plan.endDate)
    },
    cardClass() {
      return {
        "card": true,
        "card-archived": this.disabled,
      }
    },
    updatePassedTime() {
      this.passedTime = this.time(this.calculateMeasurements())
    },
    scheduleUpdatePassedTime() {
      this.passedTimeInterval = setInterval(this.updatePassedTime, 1000)
    },
    stopUpdatePassedTime() {
      clearInterval(this.passedTimeInterval)
    },
    calculateMeasurements() {
      let seconds = 0

      this.plan.measurements.forEach(measurement => {
        seconds += this.calculateDiff(measurement.stopped_at, measurement.created_at)
      })

      return seconds
    },
    calculateDiff(stoppedAt, createdAt) {
      if (stoppedAt === null) {
        stoppedAt = this.now
      }

      return this.$moment(stoppedAt).diff(createdAt, "seconds")
    },
    period() {
      return "From " + this.time(this.plan.minTime) + " to " + this.time(this.plan.maxTime)
    },
    setPlayed() {
      this.played = this.plan.measurements.some(m => m.status === "started")
    },
    async stop() {
      let result = await this.$store.dispatch("measurements/stop", this.plan.id)

      if (! result) {
        return
      }

      await this.$store.dispatch("plans/fetchMeasurements", this.plan.id)

      this.updatePassedTime()
      this.stopUpdatePassedTime()
      this.toggleIcon()
    },
    async start() {
      let result = await this.$store.dispatch("measurements/start", this.plan.id)

      if (! result) {
        return
      }

      await this.$store.dispatch("plans/fetchMeasurements", this.plan.id)

      this.scheduleUpdatePassedTime()
      this.toggleIcon()
    },
    toggle() {
      if (this.played) {
        this.stop()
      } else {
        this.start()
      }
    },
    toggleIcon() {
      Vue.set(this, "played", ! this.played)
    },
    duration() {
      let starts = "Starts at " + this.$moment(this.plan.startDate).format("DD/MM/YY")
      let ends = "Ends " + this.$moment(this.plan.endDate).format("DD/MM/YY")

      return starts + " " + ends
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

  &.card-archived {
    @apply opacity-50;
  }

  @screen md {
    @apply mb-10;
    width: calc(theme("width.1/2") - theme("margin.10"));
  }

  @screen xl {
    width: calc(theme("width.1/3") - theme("margin.10"));
  }
}
</style>
