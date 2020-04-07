<template>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-container modal-fullscreen">
        <div class="modal-top">
          <div class="modal-header">Create Plan</div>
          <d-svg @click.native="closeModal()" class="close-icon" icon="cancel"/>
        </div>
        <div class="modal-body w-full mt-12">
          <div class="mb-5">
            <Label id="timeMeters" value="Time meter" />
            <v-select
              id="timeMeters"
              class="style-chooser"
              label="name"
              :options="timeMeters"
              v-model="form.timeMeterId"
              :reduce="timeMeter => timeMeter.id"
            />
          </div>

          <div class="mb-5">
            <Label id="period" value="Period" />
            <select
              id="period"
              class="form-input"
              v-model="form.period"
            >
              <option
                  v-for="(period, index) in periods"
                  v-bind:key="index"
                  :value="period.value"
                  v-text="period.name"
              ></option>
            </select>
          </div>

          <div class="flex flex-row flex-wrap">
            <div class="w-1/2 pr-3 mb-6">
              <Label id="minTime" value="Min time (in mins)" />
              <NumberInput
                id="minTime"
                v-model="form.minTime"
                :step="15"
                placeholder="15"
              />
            </div>
            <div class="w-1/2 pl-3">
              <Label id="maxTime" value="Max time (in mins)" />
              <NumberInput
                id="maxTime"
                v-model="form.maxTime"
                step="15"
                placeholder="30"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="save"
            class="btn bg-blue-500 rounded ml-auto"
            type="button"
          >Save</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DSvg from './../DSvg'
import NumberInput from './../Forms/NumberInput'
import Label from './../Forms/Label'

export default {
  components: {
    DSvg,
    NumberInput,
    Label
  },
  computed: {
    timeMeters() {
      return this.$store.state.timeMeters.timeMeters
    }
  },
  data () {
    return {
      showModal: false,
      form: {
        period: {},
        minTime: "",
        maxTime: "",
        timeMeterId: ""
      },
      periods: [],
    }
  },
  mounted() {
    this.$store.dispatch("timeMeters/get")
    this.preparePeriods()
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    clearModal() {
      this.form = {
        minTime: "",
        maxTime: "",
        timeMeterId: ""
      }

      this.form.period = this.periods[0].value
    },
    save() {
      let params = this.form

      params.startDate = params.period.startDate
      params.endDate = params.period.endDate

      this.$store.dispatch("plans/add", params)

      this.closeModal()
      this.clearModal()
    },
    preparePeriods() {
      let formats = {
        sameDay: "[Today]",
        nextDay: "[Tommorow]"
      }

      let format = "YYYY-MM-DD HH:mm:ss"

      let periods = [
        {
          value: this.$moment().startOf("day"),
          step: "day",
        },
        {
          value: this.$moment().startOf("day").add(1, "day"),
          step: "day",
        },
        {
          value: this.$moment().startOf("week"),
          step: "week",
          name: "This week"
        },
        {
          value: this.$moment().startOf("week").add(1, "week"),
          step: "week",
          name: "Next week"
        },
        {
          value: this.$moment().startOf("month"),
          step: "month",
          name: "This month"
        },
        {
          value: this.$moment().startOf("month").add(1, "month"),
          step: "month",
          name: "Next month"
        }
      ]

      for (let i = 0; i < periods.length; i++) {
        this.periods.push({
          name: typeof periods[i].name !== "undefined" ? periods[i].name : periods[i].value.calendar(null, formats),
          value: {
            startDate: periods[i].value.startOf(periods[i].step).format(format),
            endDate: periods[i].value.endOf(periods[i].step).format(format)
          }
        })
      }

      this.form.period = this.periods[0].value
    }
  },
  created () {
    this.$bus.$on('openCreatePlanModal', this.openModal)
  },
  beforeDestroy () {
    this.$bus.$off('openCreatePlanModal', this.openModal)
  }
}
</script>
