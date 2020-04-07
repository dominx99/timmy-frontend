<template>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-top">
          <div class="modal-header" v-text="title()"></div>
          <d-svg @click.native="closeModal()" class="close-icon" icon="cancel"/>
        </div>
        <div class="modal-body w-full my-3">
          <span class="text-xl">
            Are you sure to delete this plan?
          </span>
        </div>
        <div class="modal-footer flex justify-end">
          <button
            @click="closeModal()"
            class="btn bg-blue-500 rounded mr-3"
            type="button"
          >No</button>
          <button
            class="btn bg-blue-500 rounded"
            type="button"
            @click="deletePlan()"
          >Yes</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DSvg from './../DSvg'

export default {
  components: {
    DSvg
  },
  data() {
    return {
      showModal: false,
      plan: {
        timeMeter: {
          name: ""
        }
      }
    }
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    openDeletePlanModal(plan) {
      this.plan = plan

      this.openModal()
    },
    title() {
      return `"${this.plan.timeMeter.name}" plan`
    },
    deletePlan() {
      this.$store.dispatch("plans/delete", this.plan.id)

      this.closeModal()
    }
  },
  created () {
    this.$bus.$on('openDeletePlanModal', this.openDeletePlanModal)
  },
  beforeDestroy () {
    this.$bus.$off('openDeletePlanModal', this.openModal)
  }
}
</script>
